import pathLib from "/@path";
import {tabFS as JAXDisk, tabNT} from "/@tabos";
import {zip2Path,zip2NewPath} from "/@zippath";
import Base64 from "/@tabos/utils/base64.js";
import {exportTool,removePackageTools} from "./cmd_toolexport.js";
//----------------------------------------------------------------------------
async function isPkgInstalled(pkgName){
	let tabFS=JAXDisk;
	let diskJSONPath,pkgJSONPath,pkgJSON;

	diskJSONPath=`/-${pkgName}/coke.json`;
	pkgJSONPath=`/coke/lib/${pkgName}/coke.json`;
	try{
		pkgJSON=await tabFS.readFile(diskJSONPath,"utf8");
		pkgJSON=JSON.parse(pkgJSON);
	}catch(err){
		pkgJSON=null;
	}
	if(pkgJSON){
		return pkgJSON; 
	}
	try{
		pkgJSON=await tabFS.readFile(pkgJSONPath,"utf8");
		pkgJSON=JSON.parse(pkgJSON);
	}catch(err){
		pkgJSON=null;
	}
	return pkgJSON||false; 
}

//----------------------------------------------------------------------------
async function getCloudPkgInfo(pkgName){
	let cloudName,pos,resVO,pkgInfo;
	pos=pkgName.indexOf("@");
	if(pos>=0){
		cloudName=pkgName;
		pkgName=pkgName.substring(0,pos);
	}else{
		cloudName=pkgName;
	}
	//Get package's info from server:
	resVO=await tabNT.makeCall("pkgInfo",{name:cloudName});
	if(resVO.code===200){
		return resVO.pkg;
	}
	return null;
};

//----------------------------------------------------------------------------
async function getLocalPkgInfo(pkgName){
	let path,cokeJSON;
	let cloudName,pos,resVO,pkgInfo;
	pos=pkgName.indexOf("@");
	if(pos>=0){
		cloudName=pkgName;
		pkgName=pkgName.substring(0,pos);
	}else{
		cloudName=pkgName;
	}
	path=`/coke/lib/${cloudName}/coke.json`;
	try{
		let tag,tags;
		cokeJSON=await JAXDisk.readFile(path,"utf8");
		cokeJSON=JSON.parse(cokeJSON);
		tags=cokeJSON.tags;
		tag=cokeJSON.tag;
		tag=tags[tag];
		tag.name=cloudName;//Ensure name
		return tag;
	}catch(err){
		//Do nothing, try disk:
	}
	path=`/-${cloudName}/coke.json`;
	try{
		let tag,tags;
		cokeJSON=await JAXDisk.readFile(path,"utf8");
		return JSON.parse(cokeJSON);
	}catch(err){
		//Do nothing, maybe not installed:
	}
	return null;	
};

//----------------------------------------------------------------------------
async function getCloudAppInfo(appId){
	let resVO;
	//Get package's info from server:
	resVO=await tabNT.makeCall("GetAppInfo",{appId:appId});
	if(resVO.code===200){
		return resVO.info;
	}
	return null;
};

//----------------------------------------------------------------------------
async function getLocalAppInfo(appId){
	let path,appJSON;
	path=`/-${appId}/disk.json`;
	try{
		let tag,tags;
		appJSON=await JAXDisk.readFile(path,"utf8");
		appJSON=JSON.parse(appJSON);
		appJSON.path=`/-${appId}`;
		return appJSON;
	}catch(err){
		//Do nothing, maybe not installed:
	}
	return null;	
};

//----------------------------------------------------------------------------
//Import/install a package:
async function installPkgOnDisk(tty,curDisk,pkgName,options={}){
	let cloudName,tag,noMerge,doUpgrade,tree,mode,dir,inTree,refPkg,refDisk,installType;
	let sysDisk;
	let diskName,diskPath,diskJSON,diskJSONPath,pos,sysJSONPath,sysJSON;
	let pkgInfo;
	let callVO,resVO,pkgZip;
	let pkgJSON,pkgJSONPath,pkgDirPath,tagDirPath,tagDirCokePath,pkgTagVO,pkgTagVIdx,oldPkgTagVO;
	let checkedPkgs,installedPkgs,upgradedPkgs;
	let isInstall,isUpgrade,isInstalled,isActived;
	
	tag=options.tag||"";
	doUpgrade=options.upgrade||false;
	noMerge=options.noMerge||false;
	tree=options.tree||true;
	mode=options.mode||"install";
	dir=options.dir||"";
	checkedPkgs=options.checkedPkgs||{};
	installedPkgs=options.installedPkgs||{};
	upgradedPkgs=options.upgradedPkgs||{};
	inTree=options._inTree||false;
	isActived=false;
	isInstalled=false;
	isInstall=false;
	isUpgrade=false;
	refPkg=options.refPkg||null;
	refDisk=options.refDisk||null;
	sysDisk=options.sysDisk||"coke";
	
	//On coke disk, no import, just install
	if(curDisk==="coke"){
		if(mode==="import"){
			mode="install";
		}
	}
	tty.textOut(`Will ${mode} package: ${pkgName}\n`);

	pos=pkgName.indexOf("@");
	if(pos>=0){
		cloudName=pkgName;
		pkgName=pkgName.substring(0,pos);
	}else{
		cloudName=pkgName;
	}
	
	//Get package's info from server:
	resVO=await tabNT.makeCall("pkgInfo",{name:cloudName});
	switch(resVO.code){
		case 200:
			pkgInfo=resVO.pkg;
			tty.textOut(`Package info retrieved.\n`);
			break;
		default:
			tty.textOut(`Install error, cloud package info error: ${resVO.code}: ${resVO.info||" install error"}`);
			return false;
	}
	
	if(!pkgInfo.diskId && pkgInfo.appId){//This is an app-package:
		let appId,appInfo,oldDiskJSON,diskJSON,diskName,newVersionIdx,zipBuff,imports,pkgTag;
		appId=pkgInfo.appId;
		newVersionIdx=pkgInfo.appVersionIdx;
		diskName="-"+appId;
		try{
			oldDiskJSON=await JAXDisk.readFile(`/${diskName}/disk.json`,"utf8");
			oldDiskJSON=JSON.parse(oldDiskJSON);
		}catch(err){
			oldDiskJSON={
				appId:appId,
				appVersionIdx:-1
			};
		}
		if(newVersionIdx===oldDiskJSON.appVersionIdx){
			tty.textOut(`Package ready.\n`);
			return {
				pkg:pkgName,
				versionIdx:newVersionIdx,
				pkgDir:`/${diskName}`,
				tagDir:`/${diskName}`,
				pkgJSONPath:`/${diskName}/disk.json`,
				pkgJSON:oldDiskJSON,
			};
		}
		resVO=await tabNT.makeCall("GetAppFile",{appId:appId});
		switch(resVO.code){
			case 200:
				tty.textOut(`Package ${pkgName} checkout success:\n`);
				pkgZip=resVO.file;
				break;
			default:
				tty.textOut(`Download package ${pkgName} error: ${resVO.code}: ${resVO.info||" network error"}\n`);
				return false;
		}
		tagDirPath=`/${diskName}`;
		tty.textOut(`Extracting disk zip to ${tagDirPath}...\n`);
		zipBuff=Base64.decode(pkgZip);
		//Drop the old disk then make a new disk then extract files:
		await JAXDisk.dropDisk(diskName);
		await JAXDisk.openDisk(diskName,1);
		await zip2NewPath(tagDirPath,zipBuff,tty);	
		tty.textOut(`Disk zip extracted.\n`);

		await JAXDisk.setDiskAttr(diskName,"diskType","Package");
		try{
			diskJSON=await JAXDisk.readFile(`/${diskName}/disk.json`,"utf8");
			diskJSON=JSON.parse(diskJSON);
		}catch(err){
			diskJSON={
			};
		}

		diskJSON.appId=appId;
		diskJSON.appVersionIdx=newVersionIdx;
		if(diskJSON.toolExport){
			let stub;
			for(stub of diskJSON.toolExport){
				stub.package=appId;
			}
		}
		await JAXDisk.writeFile(`/${diskName}/disk.json`,JSON.stringify(diskJSON,null,"\t"));
		
		imports=diskJSON.imports;
		for(pkgName in imports){
			pkgTag=imports[pkgName];
			tty.textOut(`Import package: ${pkgName}, tag: ${pkgTag}\n`);
			await installPkgOnDisk(tty,diskName,pkgName,{tag:pkgTag,mode:"setup"});
			tty.textOut(`Package: ${pkgName}, tag: ${pkgTag} imported.\n`);
		}
		await removePackageTools(appId,tty,"/"+sysDisk);
		if(diskJSON.toolExport){
			await exportTool(tagDirPath,tty,"/"+sysDisk);
		}
		return {
			pkg:pkgName,
			versionIdx:newVersionIdx,
			pkgDir:`/${diskName}`,
			tagDir:`/${diskName}`,
			pkgJSONPath:`/${diskName}/disk.json`,
			pkgJSON:diskJSON,
		};
	}

	installType=pkgInfo.install||"dir";

	if(!tag){
		tag=pkgInfo.tag;//Use cloud's default tag
	}
	dir="lib";

	pkgTagVO=pkgInfo.tags.find(item=>item.tag===tag);
	if(!pkgTagVO){
		//Required tag missing:
		tty.textOut(`Install error: can't find tag: ${tag} in package${pkgName}`);
		return false;
	}
	pkgTagVIdx=pkgTagVO.versionIdx;
	
	//Gernate install related pathes by install location (local/global).
	diskJSONPath=pathLib.join("/"+curDisk,`disk.json`);
	sysJSONPath=`/${sysDisk}/disk.json`;
	if(installType==="disk"){
		//Install to disk.
		diskName="-"+pkgName;
		diskPath="/"+diskName;
		pkgDirPath=`/-${pkgName}`;
		pkgJSONPath=pathLib.join(pkgDirPath,"coke.json");
		tagDirPath=pkgDirPath;
		tagDirCokePath=pkgDirPath;
	}else{
		//Install in //[sysDisk]/lib/:
		diskName=sysDisk;
		diskPath="/"+diskName;
		pkgDirPath=`/${sysDisk}/${dir}/${pkgName}`;
		pkgJSONPath=pathLib.join(pkgDirPath,"coke.json");
		tagDirPath=pathLib.join(pkgDirPath,tag);
		tagDirCokePath=pathLib.join(`/coke/lib/${pkgName}`,tag);
	}

	//Read /[sysDisk]/disk.json
	try{
		sysJSON=await JAXDisk.readFile(sysJSONPath,"utf8");
		sysJSON=JSON.parse(sysJSON);
	}catch(err){
		sysJSON={
			lib:{},
			bin:{}
		};
	}
	
	let savePkgJSON=false;
	installPkg:{
		//Ensure import disk is package ready.
		diskJSON=null;
		if(mode==="import"){
			try{
				console.log(`diskJSONPath=${diskJSONPath}`);
				diskJSON=await JAXDisk.readFile(diskJSONPath,"utf8");
				diskJSON=JSON.parse(diskJSON);
			}catch(err){
				diskJSON=null;
			}
			if(!diskJSON){
				tty.textOut(`Can't read disk(${diskName})'s disk.json. Run pkg -init in disk path first.`);
				return false;
			}
			if(diskJSON.imports && diskJSON.imports[pkgName]){
				tty.textOut(`Package "${pkgName}" is already been imported, current tag is: "${diskJSON.imports[pkgName]}". To import a new tag, unimport this package first.`);
				return false;
			}
		}

		//Read current package's coke.json:
		try{
			pkgJSON=await JAXDisk.readFile(pkgJSONPath,"utf8");
			pkgJSON=JSON.parse(pkgJSON);

			console.log(`pkgJSONPath=${pkgJSONPath}`);
			console.log(JSON.stringify(pkgJSON,null,"\t"));
		}catch(err){
			pkgJSON=null;
		}
	
		//If installing imports packages, check if tag@package is ready installed on system：
		if(inTree){
			if(sysJSON[dir][pkgName] && sysJSON[dir][pkgName][tag] && 
			   sysJSON[dir][pkgName][tag].versionIdx===pkgTagVIdx){
				tty.textOut(`Package ${tag}@${pkgName} is ready.\n`);
				break installPkg;
			}
		}
		
		//Check if tag@pkgName is already installed the lasted versionIdx:
		if(pkgJSON){
			if(installType==="disk"){
				if(pkgJSON.tag===tag){
					if(pkgJSON.versionIdx>=pkgTagVIdx){
						tty.textOut(`Package ${tag}@${pkgName} is ready.\n`);
						break installPkg;
				}else if(pkgJSON.versionIdx<pkgTagVIdx){
						if(mode==="import"){
							tty.textOut(`Package ${tag}@${pkgName} is ready. There is new version available. You may update this package later.\n`);
							break installPkg;
						}
					}else{
						tty.textOut(`Package ${tag}@${pkgName} is ready, but local version-idx is missing. Install lastest version: ${pkgTagVIdx}.\n`);
					}
				}
			}else{
				let tags;
				tags=pkgJSON.tags;
				if(!tags){
					tags=pkgJSON.tags={};
				}
				console.log(`pkgTagVIdx=${pkgTagVIdx}`);
				console.log(`tags`);
				console.log(tags);
				if(tags && tags[tag] && tags[tag].versionIdx===pkgTagVIdx){
					if(!noMerge || !tags[tag].redirect){
						tty.textOut(`Package ${tag}@${pkgName} is ready.\n`);
						break installPkg;
					}
				}
				if(tags){
					if(tags[tag]){
						if(!doUpgrade){
							tty.textOut(`Package ${tag}@${pkgName} is installed. A new version of the tag found on cloud, but ignored, to install, use -up options\n`);
							break installPkg;
						}
						isUpgrade=true;
					}else{
						//By default try use compatible new tag:
						if(!noMerge){
							let maxTag,maxVIdx,name,chkTag;
							//Check installed tags if can be used:
							maxVIdx=0;
							maxTag=null;
							for(name in tags){
								chkTag=tags[name];
								if(chkTag.cmpTags && chkTag.cmpTags.includes(tag) && 
								   !chkTag.redirect && chkTag.versionIdx>maxVIdx){
									maxTag=name;
									maxVIdx=chkTag.versionIdx;
								}
							}
							if(maxTag){
								//Will redirect to this maxTag:
								tags[tag]={
									versionIdx:pkgTagVIdx,
									version:pkgTagVO.version,
									cmpTags:pkgTagVO.cmpTags,
									main:pkgTagVO.main,
									exports:pkgTagVO.exports,
									redirect:maxTag
								};
								savePkgJSON=true;
								break installPkg;
							}
						}
						isInstall=true;
					}
				}
			}
		}

		//Package info is ready, download the disk-zip by versionIdx:
		{
			let tagVO,diskId,versionIdx,diskVO;
			tagVO=pkgInfo.tags.find(item=>item.tag===tag);
			if(!tagVO){
				tty.textOut(`Error: tag: ${tag} not found in cloud package info.\n`);
				return;
			}
			diskId=pkgInfo.diskId;
			versionIdx=tagVO.versionIdx;
			callVO={
				diskId:diskId,
				versionIdx:versionIdx
			};
			resVO=await tabNT.makeCall("diskCheckOut",callVO);
			switch(resVO.code){
				case 200:
					tty.textOut(`Package ${pkgName} checkout success:\n`);
					diskVO=resVO;
					pkgZip=resVO.zipData;
					break;
				default:
					tty.textOut(`Download package ${pkgName} error: ${resVO.code}: ${resVO.info||" network error"}\n`);
					return false;
			}
		}
		
		if(pkgJSON && pkgJSON.tag){
			//Keep old package's active tag's disk.json
			try{
				oldPkgTagVO=await JAXDisk.readFile(`/${sysDisk}/lib/${pkgName}/${pkgJSON.tag}/disk.json`,"utf8");
				oldPkgTagVO=JSON.parse(oldPkgTagVO);
			}catch(err){
				oldPkgTagVO=null;
			}
		}

		//Make pkage dir, extract zip file...
		if(installType==="dir"){
			let zipBuff;
			tty.textOut(`Extracting disk zip to ${tagDirPath}...\n`);
			zipBuff=Base64.decode(pkgZip);
			//remove old dir:
			await JAXDisk.del(tagDirPath,{recursive:true,force:true});
			//Create pkg's tag dir:
			await JAXDisk.newDir(tagDirPath,{recursive:true});
			//Extract zip to the tag dir:
			await zip2NewPath(tagDirPath,zipBuff,tty);	
			tty.textOut(`Disk zip extracted.\n`);
		}else{
			let zipBuff;
			tty.textOut(`Extracting disk zip to ${tagDirPath}...\n`);
			zipBuff=Base64.decode(pkgZip);
			//Drop the old disk then make a new disk then extract files:
			await JAXDisk.dropDisk(diskName);
			await JAXDisk.openDisk(diskName,1);
			await zip2NewPath(tagDirPath,zipBuff,tty);	
			tty.textOut(`Disk zip extracted.\n`);
			await JAXDisk.setDiskAttr(diskName,"diskType","Package");
		}

		//generate and save coke.json:
		{
			if(!pkgJSON){
				pkgJSON={
					name:pkgName,
					tags:{}
				};
				if(installType==="dir"){
					pkgJSON.tags={};
				}
			}
			if(!pkgJSON.tag){
				//No old active tag, init the coke.json;
				pkgJSON.tag=tag;
				if(installType==="dir"){
					pkgJSON.main=pathLib.join(pkgTagVO.tag,pkgTagVO.main||"");
				}else{
					pkgJSON.main=pkgTagVO.main;
				}
				isActived=true;
			}else{
				let preTagVO;
				pkgJSON.tag=tag;
				preTagVO=pkgJSON.tags?pkgJSON.tags[pkgJSON.tag]:null;
				if(!preTagVO || preTagVO.versionIdx<pkgTagVO.versionIdx){
					//Will replace active tag with this new version
					if(installType==="dir"){
						pkgJSON.main=pathLib.join(pkgTagVO.tag,pkgTagVO.main||"");
					}else{
						pkgJSON.main=pkgTagVO.main;
					}
					isActived=true;
				}
			}
			if(installType==="dir"){
				pkgJSON.tags[tag]={
					versionIdx:pkgTagVO.versionIdx,
					version:pkgTagVO.version,
					main:pkgTagVO.main,
					cmpTags:pkgTagVO.cmpTags,
					exports:pkgTagVO.exports,
					cloudName:cloudName
				};
			}else{
				//disk mode, no tags, reset the exports
				delete pkgJSON.tags;
				pkgJSON.versionIdx=pkgTagVIdx;
				pkgJSON.exports=pkgTagVO.exports;
			}
			savePkgJSON=true;
		}
		isInstalled=true;
	}//installPackage:
	
	if(savePkgJSON){
		await JAXDisk.writeFile(pkgJSONPath,JSON.stringify(pkgJSON,null,"\t"),"utf8");
	}

	let saveDiskJSON=false;
	let saveSysJSON=false;
	
	//When import, update local disk.json:
	if(mode==="import" && diskJSON){
		if(!diskJSON.imports){
			diskJSON.imports={};
		}
		diskJSON.imports[pkgName]=tag;
		saveDiskJSON=true;
	}
	
	if(installType==="dir"){
		let pkgsVO,tagsVO,tagVO;
		pkgsVO=sysJSON[dir][pkgName];
		if(!pkgsVO){
			pkgsVO={tags:{}};
			sysJSON[dir][pkgName]=pkgsVO;
		}
		tagsVO=pkgsVO.tags;
		if(!tagsVO){
			tagsVO={};
			pkgsVO.tags=tagsVO;
		}
		tagVO=tagsVO[tag];
		if(!tagVO){
			tagVO=tagsVO[tag]={disks:[],packages:[]};
		}
		tagVO.versionIdx=pkgTagVIdx;
		if(mode==="import"||mode==="setup"){
			let list;
			list=tagVO.disks;
			if(!list.includes(curDisk)){
				list.push(curDisk);
			}
		}
		if(refPkg){
			let list;
			list=tagVO.packages;
			if(!list.includes(refPkg)){
				list.push(refPkg);
			}
		}
		if(refDisk){
			let list;
			list=tagVO.disks;
			if(!list.includes(refDisk)){
				list.push(refDisk);
			}
		}
		saveSysJSON=true;
	}
	
	if(saveDiskJSON){
		await JAXDisk.writeFile(diskJSONPath,JSON.stringify(diskJSON,null,"\t"),"utf8");
		tty.textOut(`${diskJSONPath} updated.\n`);
	}

	if(saveSysJSON){
		await JAXDisk.writeFile(sysJSONPath,JSON.stringify(sysJSON,null,"\t"),"utf8");
		tty.textOut(`${sysJSONPath} updated.\n`);
	}

	let retVO={
		pkg:pkgName,
		tag:tag,
		versionIdx:pkgTagVIdx,
		pkgDir:pkgDirPath,
		tagDir:tagDirPath,
		pkgJSONPath:pkgJSONPath,
		pkgJSON:pkgJSON,
	};
	let checkVO;
	if(isInstalled || sysDisk!=="coke"){
		checkVO=checkedPkgs[pkgName];
		if(!checkVO){
			checkVO=checkedPkgs[pkgName]={};
		}
		checkVO[tag]=retVO;
		if(isUpgrade){
			checkVO=upgradedPkgs[pkgName];
			if(!checkVO){
				checkVO=upgradedPkgs[pkgName]={};
			}
			checkVO[tag]=retVO;
		}else if(isInstall){
			checkVO=installedPkgs[pkgName];
			if(!checkVO){
				checkVO=installedPkgs[pkgName]={};
			}
			checkVO[tag]=retVO;
		}
	
		//Install imported libs:
		{
			let tagDiskJSONPath,tagDiskJSON;
			let imports,subName,name,pkgTag,opts;
			let refPath,refDisk;
			if(installType==="dir"){
				refPath=`${tag}@${pkgName}`;
			}else{
				refDisk=diskName;
			}
			tagDiskJSONPath=pathLib.join(tagDirPath,"disk.json");
			try{
				tagDiskJSON=await JAXDisk.readFile(tagDiskJSONPath,"utf8");
				tagDiskJSON=JSON.parse(tagDiskJSON);
			}catch(err){
				tagDiskJSON={imports:{}};
			}

			//install imports:
			imports=tagDiskJSON.imports;
			for(subName in imports){
				name=subName;
				pkgTag=imports[name];
				//if the tag@package is already checked, ignore:
				if((!checkedPkgs[name]) || (!checkedPkgs[name][pkgTag])){
					opts={
						tag:pkgTag,
						upgrade:doUpgrade,
						noMerge:noMerge,
						tree:tree,
						mode:"install",
						dir:dir,
						refPkg:refPath,
						refDisk:refDisk
					};
					await installPkgOnDisk(tty,curDisk,name,opts);
				}
			}
			
			if(isActived || sysDisk!=="coke"){
				let binExport,libExport;
				if(oldPkgTagVO){
					let libName,binName,i,n;
					//Uninstall old tag's libExports:
					libExport=oldPkgTagVO.libExport;
					if(Array.isArray(libExport)){
						n=libExport.length;
						for(i=0;i<n;i++){
							libName=libExport[i].name;
							await JAXDisk.del(`/${sysDisk}/lib/${libName}.json`,{force:true});
						}
					}

					//Uninstall old tag's binExports:
					binExport=oldPkgTagVO.binExport;
					if(Array.isArray(binExport)){
						n=binExport.length;
						for(i=0;i<n;i++){
							binName=binExport[i].name;
							await JAXDisk.del(`/${sysDisk}/bin/${binName}.json`,{force:true});
						}
					}else if(binExport){
						if(binExport===true){
							binName=pkgName;
						}else if(typeof(binExport)==="string"){
							binName=binExport;
						}else{
							binName=binExport.name||pkgName;
						}
						await JAXDisk.del(`/${sysDisk}/bin/${binName}.json`,{force:true});
					}
					removePackageTools(pkgName,tty,"/"+sysDisk);
				}
				
				libExport=tagDiskJSON.libExport;
				if(libExport){
					let i,n,item,libName,libPath,libMain,libVO;
					if(!Array.isArray(libExport)){
						libExport=[libExport];
					}
					//Install libExports:
					n=libExport.length;
					for(i=0;i<n;i++){
						item=libExport[i];
						libName=item.name;
						libPath=item.path||"";
						libMain=item.main;
						if(installType==="dir"){
							if(libMain[0]!=="/"){
								libMain=`/coke/lib/${pkgName}/${tag}/${libMain}`;
							}
							if(libPath[0]!=="/"){
								libPath=`/coke/lib/${pkgName}/${tag}${libPath?"/"+libPath:""}`;
							}
						}else{
							if(libMain[0]!=="/"){
								libMain=`/-${pkgName}/${libMain}`;
							}
							if(libPath[0]!=="/"){
								libPath=`/-${pkgName}${libPath?("/"+libPath):""}`;
							}
						}
						libVO={
							main:libMain,
							path:libPath,
						};
						if(installType==="dir"){
							libVO.source=`${tag}@${pkgName}`;
						}else{
							libVO.source=`/-${tag}@${pkgName}`;
						}
						let libJSON=JSON.stringify(libVO,null,"\t");
						await JAXDisk.writeFile(`/${sysDisk}/lib/${libName}.json`,libJSON,"utf8");
					}
				}

				//Install binExports:
				binExport=tagDiskJSON.binExport;
				if(binExport){
					let i,n,binName,binPath,binMain,binVO,binType;
					if(!Array.isArray(binExport)){
						binExport=[binExport];
					}
					binPath=tagDirCokePath;
					n=binExport.length;
					for(i=0;i<n;i++){
						let item=binExport[i];
						binName=item.name||pkgName;
						binMain=item.main;
						binType=item.type||"cmd";
						binVO={
							main:pathLib.join(binPath,binMain),
							path:binPath,
							type:binType,
						};
						if(installType==="dir"){
							binVO.source=`${tag}@${pkgName}`;
						}else{
							binVO.source=`/-${tag}@${pkgName}`;
						}
						let binJSON=JSON.stringify(binVO,null,"\t");
						await JAXDisk.writeFile(`/${sysDisk}/bin/${binName}.json`,binJSON,"utf8");
					}
				}
				
				//Intall toolExports:
				if(tagDiskJSON.toolExport){
					await exportTool(tagDirPath,tty,"/"+sysDisk);
				}
			}
		}
	}
	return retVO;
}

//----------------------------------------------------------------------------
//Import/install a package:
async function installPkg(env,pkgName,options={}){
	let curDisk,tty,pkgVO,pkgPath,setup,session,setupType;
	let tabFS=JAXDisk;
	if(env){
		curDisk=env.diskName();
	}
	if(!curDisk){
		curDisk="coke";
	}
	tty=options.tty||env.tty;
	pkgVO=await installPkgOnDisk(tty,curDisk,pkgName,options);
	if(!pkgVO){
		return null;
	}
	pkgPath=pkgVO.pkgDir;
	try{
		setup=(await import(pathLib.join(`/~${pkgPath}`,"setup.js")));
	}catch(err){
		setup=null;
	}
	if(!setup){
		return pkgVO;
	}
	let diskJSON,vidx;
	try{
		diskJSON=await tabFS.readFile(pathLib.join(pkgPath,"disk.json"),"utf8");
		diskJSON=JSON.parse(diskJSON);
		vidx=diskJSON.appVersionIdx||diskJSON.versionIdx||0;
		if(diskJSON.setupVersionIdx===vidx){
			return;
		}
	}catch(err){
		return;
	}
	session=tty.session;
	setupType=options.setupType||"setupPkg";
	if(session){
		await session.pipeChat("/@AgentBuilder/ai/PrjTabOSPrjSetup.js",{dirPath:pkgPath,setupType:setupType});
	}else{
		let callAgent;
		callAgent=(await import("/@AgentBuilder/ai/RunAgent.js")).callAgent;
		await callAgent({agent:"/@AgentBuilder/ai/PrjTabOSPrjSetup.js",args:{dirPath:pkgPath,setupType:"setupPkg"},title:"Setup project"});
	}
	diskJSON.setupVersionIdx=vidx;
	await tabFS.writeFile(pathLib.join(pkgPath,"disk.json"),JSON.stringify(diskJSON,null,"\t"));
	return pkgVO;
}

//------------------------------------------------------------------------
//Unimport dependent packages:
async function unimportDep(env,pkgs,refPath,refDisk){
	let name,tagName;
	let opts;
	for(name in pkgs){
		tagName=pkgs[name];
		opts={
			mode:"uninstall",
			refPkg:refPath||undefined,
			refDisk:refDisk||undefined,
			tag:tagName,
		};
		await uninstallPkg(env,name,opts);
	}
}

//----------------------------------------------------------------------------
//Uninstall/Unimport a package
async function uninstallPkg(env,pkgName,options={}){
	let tty;
	let tag,mode,refPkg,refDisk,dir,installType;
	let curDisk,pos,diskJSONPath,sysJSONPath,diskName,diskPath,pkgJSONPath,pkgDirPath,tagDirPath;
	let diskJSON,sysJSON,pkgJSON,refJSON,tagJSON;
	let saveDiskJSON,saveSysJSON,savePkgJSON;
	let tagDirRemoved=false;
	let depList=[];
	let hasBinExport=false,binExportNames=[];
	let hasLibExport=false,libExportNames=[];
	
	tty=options.tty||(env && env.tty)||null;
	
	if(!tty){
		tty={
			textOut(...args){console.log(...args);}
		};
	}
	
	//Get params from options:
	tag=options.tag||null;
	mode=options.mode||"uninstall";
	refPkg=options.refPkg||null;
	refDisk=options.refDisk||null;
	dir="lib";
	
	//parse tag if it's in pkgName:
	pos=pkgName.indexOf("@");
	if(pos>=0){
		tag=pkgName.substring(0,pos);
		pkgName=pkgName.substring(pos+1);
	}

	//Get work path infomation:
	if(env){
		curDisk=env.diskName();
	}
	if(!curDisk){
		curDisk="coke";
	}

	//On coke disk, no import/unimport, just install/uninstall
	if(curDisk==="coke"){
		mode="uninstall";
	}

	tty.textOut(`Performing: ${mode}: ${pkgName}...\n`);

	sysJSONPath="/coke/disk.json";
	
	//Global:
	diskName="coke";
	diskPath="/"+diskName;
	
	//Read local disk.json
	diskJSONPath=pathLib.join("/"+curDisk,`disk.json`);
	diskJSON=null;
	if(mode==="unimport"){
		try{
			diskJSON=await JAXDisk.readFile(diskJSONPath,"utf8");
			diskJSON=JSON.parse(diskJSON);
		}catch(err){
			diskJSON=null;
		}
		if(!diskJSON){
			
textOut(`Can't read disk(${curDisk})'s disk.json. Run pkg -install in disk path first.`);
			return;
		}
		saveDiskJSON=true;
	}

	//Read /coke/disk.json
	try{
		sysJSON=await JAXDisk.readFile(sysJSONPath,"utf8");
		sysJSON=JSON.parse(sysJSON);
	}catch(err){
		sysJSON={};
	}
	
	//When unimport, get tag from disk.json
	if((mode==="unimport" && diskJSON)){
		let imports=diskJSON.imports;
		if(pkgName in imports){
			tag=imports[pkgName];
			delete imports[pkgName];
		}else{
			tty.textOut(`Can't get disk(${curDisk})'s package "${pkgName}" import info.`);
			return;
		}
	}
	
	//Locate installed dir, read package json:
	LocatePkg:{
		let path,dirPath;

		//Try "coke/lib/${pkgName}" dir:
		try{
			dirPath=`/coke/lib/${pkgName}`;
			path=pathLib.join(dirPath,`coke.json`);
			pkgJSON=await JAXDisk.readFile(path,"utf8");
			pkgJSON=JSON.parse(pkgJSON);
			pkgJSONPath=path;
			pkgDirPath=dirPath;
			installType="dir";
			break LocatePkg;
		}catch(err){
		}

		//Try -pkgName disk:
		try{
			let disk;
			dirPath=`/-${pkgName}`;
			disk=JAXDisk.openDisk(`/-${pkgName}`,false);
			if(!disk){
				throw Error("Disk not found.");
			}
			installType="disk";
			break LocatePkg;
		}catch(err){
		}
		//When reach here, throw err:
		throw new Error(`Can't locate installed package: ${pkgName}`);
	}
	
	//Uninstall/unimport package based on intallType
	if(installType==="dir"){
		//Reduce(unimport)/Check(uninstall) package tag's ref:
		ReduceRef:{
			let pkgsVO,pkgTagsVO,tagsVO,tagVO,pkgTagVO,rdtMap,i,n;
			refJSON=sysJSON;
			saveSysJSON=true;
			pkgsVO=refJSON[dir][pkgName];
			if(!pkgsVO){
				tty.textOut(`/coke/disk.json missing package "${pkgName}"'s record.\n`);
				return;
			}
			tagsVO=pkgsVO.tags;
			if(!tagsVO){
				tty.textOut(`Package "${pkgName}" has not tags record in /coke/disk.json.\n`);
				break ReduceRef;
			}
			pkgTagsVO=pkgJSON.tags||{};

			let names=Object.keys(tagsVO);
			names.sort((a,b)=>pkgTagsVO[names[a]].versionIdx-pkgTagsVO[names[b]].versionIdx);
			
			//build redirect map, tags been redirected can't be uninstalled.
			rdtMap={};
			n=names.length;
			for(i=0;i<n;i++){
				let tagVO;
				tagVO=pkgTagsVO[names[i]];
				if(tagVO.redirect){
					rdtMap[tagVO.redirect]=rdtMap[tagVO.redirect]?rdtMap[tagVO.redirect]+1:1;
				}
			}
			
			if(mode==="uninstall" && names && !tag){
				//When uninstall without tag, remove all tags that no longer been imported, remove whole package if no more tags remains.
				n=names.length;
				for(i=0;i<n;i++){
					let tag,pkgTagVO,tagVO,tagDirPath;
					tag=names[i];
					pkgTagVO=pkgTagsVO[tag];
					tagVO=tagsVO[tag];
					tagDirPath=pathLib.join(pkgDirPath,tag);
					if((!tagVO.packages || !tagVO.packages.length) &&
					   (!tagVO.disks || !tagVO.disks.length)&&
					   (!rdtMap[tag])){
						//Read disk.json in tag:
						try{
							//Read tag's disk.json:
							tagJSON=await JAXDisk.readFile(pathLib.join(tagDirPath,"disk.json"),"utf8");
							tagJSON=JSON.parse(tagJSON);
							if(tagJSON && tagJSON.imports){
								depList.push({pkgs:tagJSON.imports,refPath:`${tag}@${pkgName}`});
							}
							
							let libExport=tagJSON.libExport;
							if(libExport){
								let i,n,item,libName,libJSON;
								n=libExport.length;
								for(i=0;i<n;i++){
									item=libExport[i];
									libName=item.name;
									try{
										libJSON=await JAXDisk.readFile(`/coke/bin/${libName}.json`,"utf8");
										libJSON=JSON.parse(libJSON);
										if(libJSON.souce===`${tag}@${pkgName}`){
											hasLibExport=true;
											libExportNames.push(libName);
										}
									}catch(error){
									}
								}
							}
							
							let binExport=tagJSON.binExport;
							if(Array.isArray(binExport)){
								let i,n,item,binName,binJSON;
								n=binExport.length;
								for(i=0;i<n;i++){
									item=binExport[i];
									binName=item.name;
									try{
										binJSON=await JAXDisk.readFile(`/coke/bin/${binName}.json`,"utf8");
										binJSON=JSON.parse(binJSON);
										if(binJSON.souce===`${tag}@${pkgName}`){
											hasBinExport=true;
											binExportNames.push(binName);
										}
									}catch(error){
									}
								}
							}else if(binExport){
								let binJSON,binName;
								binName=binExport.name||pkgName;
								try{
									binJSON=await JAXDisk.readFile(`/coke/bin/${binName}.json`,"utf8");
									binJSON=JSON.parse(binJSON);
									if(binJSON.souce===`${tag}@${pkgName}`){
										hasBinExport=true;
										binExportNames.push(binName);
									}
								}catch(error){
								}
							}
						}catch(error){
						}

						//Reduce redirect:
						if(pkgTagVO.redirect){
							rdtMap[pkgTagVO.redirect]=rdtMap[pkgTagVO.redirect]>0?rdtMap[pkgTagVO.redirect]-1:0;
						}
						tty.textOut(`Uninstall package tag: ${tag}@${pkgName}...\n`);
						//Remove tag's entry in pkgJSON
						delete pkgJSON.tags[tag];
						savePkgJSON=true;
						//Remove tag stub:
						delete tagsVO[tag];
						//Remove tag dir:
						await JAXDisk.del(tagDirPath,{recursive:true,force:true});
						tty.textOut(`Tag dir: "${tagDirPath}" removed.\n`);
					}else{
						//This tag is in use, can't remove.
						if(tagVO.packages && tagVO.packages.length){
							tty.textOut(`Package tag: "${tag}" is imported by packages: ${tagVO.packages}.\n`);
						}
						if(tagVO.disks && tagVO.disks.length){
							tty.textOut(`Package tag: "${tag}" is imported by disks: ${tagVO.disks}.\n`);
						}
						tty.textOut(`Tag "${tag}" won't be removed.\n`);
					}
				}
				names=Object.keys(tagsVO);
				//Uninstall whole packages? If all tags in package removed, remove package:
				if(!names.length){
					//All tags in package removed, remove package:
					delete refJSON[dir][pkgName];//
					await JAXDisk.del(pkgDirPath,{recursive:true,force:true});
					tty.textOut(`Package dir: "${pkgDirPath}" removed.\n`);
				}else{
					tty.textOut("At least one tag is need for other packages.\n");
					tty.textOut(`Remain package tags: ${names}".\n`);
				}
				break ReduceRef;
			}

			//Uninstall a tag, or unimport. We will only remove certain tag:
			if(!tag){
				throw new Error(`Unknown package tag to ${mode}. Installed tags: ${names}`);
			}
			tagVO=tagsVO[tag];
			if(!tagVO){
				throw new Error(`Missing package tag: ${tag}. Installed tags: ${names}`);
			}
			pkgTagVO=pkgTagsVO[tag];

			if(refDisk){
				let list,idx;
				list=tagVO.disks;
				idx=list.indexOf(refDisk);
				if(idx>=0){
					list.splice(idx,1);
				}
			}else if(refPkg){
				let list,idx;
				list=tagVO.packages;
				idx=list.indexOf(refPkg);
				if(idx>=0){
					list.splice(idx,1);
				}
			}else{
				let list,idx;
				list=tagVO.disks;
				idx=list.indexOf(curDisk);
				if(idx>=0){
					list.splice(idx,1);
				}
			}

			//Check if this tag/pkg shuold be remove from disk?
			if((!tagVO.packages || !tagVO.packages.length) &&
			   (!tagVO.disks || !tagVO.disks.length)&&
			   (!rdtMap[tag])){
				//Read the tag's disk.json to record imports that should be also unimported.
				tagDirPath=pathLib.join(pkgDirPath,tag);
				try{
					//Read tag's disk.json:
					tagJSON=await JAXDisk.readFile(pathLib.join(tagDirPath,"disk.json"),"utf8");
					tagJSON=JSON.parse(tagJSON);
					if(tagJSON && tagJSON.imports){
						depList.push({pkgs:tagJSON.imports,refPath:`${tag}@${pkgName}`});
					}
					
					let libExport=tagJSON.libExport;
					if(libExport){
						let i,n,item,libName,libJSON;
						n=libExport.length;
						for(i=0;i<n;i++){
							item=libExport[i];
							libName=item.name;
							try{
								libJSON=await JAXDisk.readFile(`/coke/bin/${libName}.json`,"utf8");
								libJSON=JSON.parse(libJSON);
								if(libJSON.souce===`${tag}@${pkgName}`){
									hasLibExport=true;
									libExportNames.push(libName);
								}
							}catch(error){
							}
						}
					}
					
					let binExport=tagJSON.binExport;
					if(Array.isArray(binExport)){
						let i,n,item,binName,binJSON;
						n=binExport.length;
						for(i=0;i<n;i++){
							item=binExport[i];
							binName=item.name;
							try{
								binJSON=await JAXDisk.readFile(`/coke/bin/${binName}.json`,"utf8");
								binJSON=JSON.parse(binJSON);
								if(binJSON.souce===`${tag}@${pkgName}`){
									hasBinExport=true;
									binExportNames.push(binName);
								}
							}catch(error){
							}
						}
					}else if(binExport){
						let binJSON,binName;
						binName=binExport.name||pkgName;
						try{
							binJSON=await JAXDisk.readFile(`/coke/bin/${binName}.json`,"utf8");
							binJSON=JSON.parse(binJSON);
							if(binJSON.souce===`${tag}@${pkgName}`){
								hasBinExport=true;
								binExportNames.push(binName);
							}
						}catch(error){
						}
					}
				}catch(error){
					tagJSON=null;
				}

				//Reduce redirect:
				if(pkgTagVO.redirect){
					rdtMap[pkgTagVO.redirect]=rdtMap[pkgTagVO.redirect]>0?rdtMap[pkgTagVO.redirect]-1:0;
					if(!rdtMap[pkgTagVO.redirect]){
						//Maybe uninstall the tag?
						depList.push({pkgs:{pkgName:pkgTagVO.redirect},refPath:`${tag}@${pkgName}`});
					}
				}

				tty.textOut(`Uninstall package tag: ${tag}@${pkgName}...\n`);
				//Remove tag's entry in pkgJSON
				delete pkgJSON.tags[tag];
				savePkgJSON=true;

				//Remove tag stub:
				delete tagsVO[tag];
				//Remove tag dir:
				await JAXDisk.del(tagDirPath,{recursive:true,force:true});
				tty.textOut(`Tag dir: "${tagDirPath}" removed.\n`);
				tagDirRemoved=true;

				//If all tags in package removed, remove package:
				let names=Object.keys(tagsVO);
				if(!names.length){
					//All tags in package removed, remove package:
					delete refJSON[dir][pkgName];//
					await JAXDisk.del(pkgDirPath,{recursive:true,force:true});
					tty.textOut(`Package dir: "${pkgDirPath}" removed.\n`);
				}
			}else{
				tty.textOut(`Refenerce to package ${pkgName} reduced.\n`);
			}
		}//ReduceRef:
	}else{
		//intallType is disk. No packages or disk should import a disk, so we can just drop the disk, then, uninstall it's imports.
		tty.textOut(`Uninstall package disk: -${pkgName}...\n`);
		tagDirPath=pkgDirPath;
		try{
			//Read tag's disk.json:
			tagJSON=await JAXDisk.readFile(pathLib.join(tagDirPath,"disk.json"),"utf8");
			tagJSON=JSON.parse(tagJSON);
			if(tagJSON && tagJSON.imports){
				depList.push({pkgs:tagJSON.imports,refDisk:`-${pkgName}`});
			}
			
			//Check if needs to uninstall libExport by this package:
			let libExport=tagJSON.libExport;
			if(libExport){
				let i,n,item,libName,libJSON;
				n=libExport.length;
				for(i=0;i<n;i++){
					item=libExport[i];
					libName=item.name;
					try{
						libJSON=await JAXDisk.readFile(`/coke/bin/${libName}.json`,"utf8");
						libJSON=JSON.parse(libJSON);
						if(libJSON.souce===`${tag}@${pkgName}`){
							hasLibExport=true;
							libExportNames.push(libName);
						}
					}catch(error){
					}
				}
			}

			//Check if needs to uninstall binExport entries:
			let binExport=tagJSON.binExport;
			if(Array.isArray(binExport)){
				let i,n,item,binName,binJSON;
				n=binExport.length;
				for(i=0;i<n;i++){
					item=binExport[i];
					binName=item.name;
					try{
						binJSON=await JAXDisk.readFile(`/coke/bin/${binName}.json`,"utf8");
						binJSON=JSON.parse(binJSON);
						if(binJSON.souce===`/-${tag}@${pkgName}`){
							hasBinExport=true;
							binExportNames.push(binName);
						}
					}catch(error){
					}
				}
			}else if(binExport){
				let binJSON,binName;
				binName=binExport.name||pkgName;
				try{
					binJSON=await JAXDisk.readFile(`/coke/bin/${binName}.json`,"utf8");
					binJSON=JSON.parse(binJSON);
					if(binJSON.souce===`/-${tag}@${pkgName}`){
						hasBinExport=true;
						binExportNames.push(binName);
					}
				}catch(error){
				}
			}
		}catch(error){
			tagJSON=null;
		}
		//Remove tools:
		await removePackageTools(pkgName,tty);
		//Drop the disk:
		JAXDisk.dropDisk(`-${pkgName}`);
	}

	//delete lib entry if needed:
	if(hasLibExport){
		let i,n;
		//delete recorded names:
		n=libExportNames.length;
		for(i=0;i<n;i++){
			await JAXDisk.del(`/code/lib/${libExportNames[i]}.json`,{force:true});
		}
	}
	
	//delete bin entry if needed:
	if(hasBinExport){
		let i,n;
		//delete recorded names:
		n=binExportNames.length;
		for(i=0;i<n;i++){
			await JAXDisk.del(`/code/bin/${binExportNames[i]}.json`,{force:true});
		}
	}
	
	//Save pkgJSON if needed:
	if(savePkgJSON){
		//Check default tag:
		let defTag,name,tagVO,maxVersionIdx,maxTag;
		defTag=pkgJSON.tag;
		if(!pkgJSON.tags[defTag]){
			//find new default tag:
			maxVersionIdx=0;
			for(name in pkgJSON.tags){
				tagVO=pkgJSON.tags[name];
				if(tagVO.versionIdx>maxVersionIdx && !tag.redirect){
					maxVersionIdx=tagVO.versionIdx;
					maxTag=name;
				}
			}
			if(maxTag){
				pkgJSON.tag=maxTag;
				tagVO=pkgJSON.tags[maxTag];
				pkgJSON.main=`${maxTag}/${tagVO.main}`;

				//Export new tag's bin entries:
				let binExport=tagVO.binExport;
				if(Array.isArray(binExport)){
					let i,n,binName,binPath,binMain,binVO,binType;
					binPath=tagDirPath;
					n=binExport.length;
					for(i=0;i<n;i++){
						let item=binExport[i];
						binName=item.name;
						binMain=item.main;
						binType=item.type||"cmd";
						binVO={
							main:pathLib.join(binPath,binMain),
							path:binPath,
							type:binType,
						};
						if(installType==="dir"){
							binVO.source=`${tag}@${pkgName}`;
						}
						let binJSON=JSON.stringify(binVO,null,"\t");
						await JAXDisk.writeFile(`/coke/bin/${binName}.json`,binJSON,"utf8");
					}
				}else if(binExport){
					let binName,binPath,binMain,binVO,binType;
					binPath=tagDirPath;
					if(binExport===true){
						binName=pkgName;
						binMain=tagVO.main;
						binType="cmd";
					}else if(typeof(binExport)==="string"){
						binName=binExport;
						binMain=tagVO.main;
						binType="cmd";
					}else{
						binName=binExport.name||pkgName;
						binMain=binExport.main||binMain;
						binType=binExport.type;
					}
					binVO={
						main:pathLib.join(binPath,binMain),
						path:binPath,
						type:binType,
					};
					binVO.source=`${maxTag}@${pkgName}`;
					let binJSON=JSON.stringify(binVO,null,"\t");
					await JAXDisk.writeFile(`/coke/bin/${binName}.json`,binJSON,"utf8");
					tty.textOut(`Bin exec entry now linked to ${maxTag}@${pkgName}.`);
				}
			}
		}
		await JAXDisk.writeFile(pkgJSONPath,JSON.stringify(pkgJSON,null,"\t"),"utf8");
		tty.textOut(`${pkgJSONPath} updated.\n`);
	}

	//Save disk/system json if needed
	if(saveDiskJSON){
		await JAXDisk.writeFile(diskJSONPath,JSON.stringify(diskJSON,null,"\t"),"utf8");
		tty.textOut(`${diskJSONPath} updated.\n`);
	}

	if(saveSysJSON){
		await JAXDisk.writeFile(sysJSONPath,JSON.stringify(sysJSON,null,"\t"),"utf8");
		tty.textOut(`${sysJSONPath} updated.\n`);
	}

	//Uninstall imports:
	{
		let i,n,dep;
		n=depList.length;
		for(i=0;i<n;i++){
			dep=depList[i];
			await unimportDep(env,dep.pkgs,dep.refPath,dep.refDisk);		
		}
	}
}

//----------------------------------------------------------------------------
//Redirect a package:
async function redirectPkgTag(env,pkgName,orgTag,newTag,options={})
{
	let tty;
	let pkgJSONPath,pkgJSON,tags,orgTagVO,newTagVO,pkgJSONChanged;
	let deimports;

	tty=options.tty||env.tty;

	pkgJSONChanged=false;
	pkgJSONPath=`/coke/lib/${pkgName}/coke.json`;
	try{
		pkgJSON=await JAXDisk.readFile(pkgJSONPath,"utf8");
		pkgJSON=JSON.parse(pkgJSON);
	}catch(e){
		pkgJSON=null;
	}
	if(!pkgJSON){
		tty.textOut(`Read package "${pkgName}"'s coke.json error.`);
		return false;
	}
	
	tags=pkgJSON.tags;
	orgTagVO=tags[orgTag];
	newTagVO=tags[newTag];
	if(!orgTagVO || !orgTagVO.versionIdx){
		tty.textOut(`Org-tag is illegal.`);
		return false;
	}
	if(!newTagVO || !newTagVO.versionIdx){
		tty.textOut(`New-tag is illegal.`);
		return false;
	}
	if(!newTagVO.cmpTags || !newTagVO.cmpTags.includes(orgTag)){
		tty.textOut(`Tag "${newTag}" is not compatible with tag "${orgTag}".`);
		return false;
	}
	
	deimports=null;
	Redirect:{
		let tagPath,tagJSONPath,tagJSON;
		if(orgTagVO.redirect){
			//Org tag is already redirected to another tag, set to new tag then done.
			orgTagVO.redirect=newTag;
			pkgJSONChanged=true;
			break Redirect;
		}

		tagPath=`/coke/lib/${pkgName}/${orgTag}`;
		//Read tag's imports, unimport them later.
		tagJSONPath=`${tagPath}/coke.json`;
		try{
			tagJSON=await JAXDisk.readFile(tagJSONPath,"utf8");
			tagJSON=JSON.parse(tagJSON);
		}catch(e){
			tagJSON=null;
		}
		if(tagJSON && tagJSON.imports){
			deimports=tagJSON.imports;
		}
		
		//Remove tag dir:
		await JAXDisk.del(tagPath,{recursive:true,force:true});
		tty.textOut(`Tag dir: "${tagPath}" removed.\n`);

		//SetTag redirect:
		orgTagVO.redirect=newTag;
		pkgJSONChanged=true;
		
		//Check package's default tag:
		if(pkgJSON.tag===orgTag){
			pkgJSON.tag=newTag;
			pkgJSON.main=`${newTag}/${newTagVO.main}`;
			pkgJSONChanged=true;
		}
	}
	
	//Save pkgJSON:
	if(pkgJSONChanged){
		await JAXDisk.writeFile(pkgJSONPath,JSON.stringify(pkgJSON,null,"\t"),"utf8");
		tty.textOut(`${pkgJSONPath} updated.\n`);
	}
	if(deimports){
		await unimportDep(env,deimports,`${orgTag}@${pkgName}`,null);
	}
	return true;
}

//----------------------------------------------------------------------------
//Setup packages for disk by disk.json.
async function setupDiskPkgs(tty,diskName){
	let diskObj,diskJSON,imports,pkgName,pkgTag;
	if(!tty){
		//Dummy tty:
		tty={
			textOut(text){
				console.log(text);
			},
			clearLine(){
			}
		};
	}
	diskObj=await JAXDisk.openDisk(diskName,false);
	if(!diskObj){
		tty.textOut(`Disk ${diskName} not found.\n`);
		return;
	}
	try{
		diskJSON=await diskObj.readFile("disk.json","utf8");
		diskJSON=JSON.parse(diskJSON);
	}catch(err){
		tty.textOut(`Read /${diskName}/disk.json error: ${err}\n`);
	}
	imports=diskJSON.imports;
	for(pkgName in imports){
		pkgTag=imports[pkgName];
		tty.textOut(`Import package: ${pkgName}, tag: ${pkgTag}\n`);
		await installPkgOnDisk(tty,diskName,pkgName,{tag:pkgTag,mode:"setup"});
		tty.textOut(`Package: ${pkgName}, tag: ${pkgTag} imported.\n`);
	}
}

export {installPkg,uninstallPkg,redirectPkgTag,installPkgOnDisk,setupDiskPkgs,isPkgInstalled,getLocalPkgInfo,getCloudPkgInfo,getLocalAppInfo,getCloudAppInfo};
