import pathLib from "/@path";
let $ln="EN";

async function setupPrj(session,path,lan="EN"){
	let steps,dirName,nodeDirPath;
	$ln=lan;
	dirName=pathLib.basename(path);
	steps={
		"start":{
			"action":"Info",
			"description":(($ln==="CN")?("开始配置项目开发环境"):/*EN*/("Start configuring project development environment")),
			"next":"syncDir",
		},
		"syncDir":{
			"action":"SyncDir",
			"dir":"ai",
			"target":dirName,
			"description":(($ln==="CN")?("同步项目目录。"):/*EN*/("Sync project directory.")),
			"next":(result)=>{
				nodeDirPath=result.agentDir;
				if(nodeDirPath.startsWith("AGENTS/")){
					nodeDirPath=nodeDirPath.substring("AGENTS/".length);
				}
				steps["callStepUpAgent"].args={"prjPath":nodeDirPath};
				return"callStepUpAgent";
			}
		},
		"callStepUpAgent":{
			"action":"CallHubAgent",
			"agentNode":"AgentBuilder",
			"agent":"PrjSetupBySteps.js",
			"args":null,//Will be set on running...
			"next":"syncTip",
		},
		"syncTip":{
			"action":"Info",
			"description":(($ln==="CN")?("### 注意\n 这个工程项目的智能体是运行在后端的。"):/*EN*/("### Notice: this project is running in backend.")),
			"next":null,
		},
	};
	return steps;
}

async function setupAgent(session,path,lan="EN"){
	let steps,dirName,nodeDirPath;
	$ln=lan;
	dirName=pathLib.basename(path);
	async function checkEnv(session){
		return true;
	}
	steps={
		"start":{
			"action":"Info",
			"description":"开始安装智能体项目",
			"next":"syncDir",
		},
		"syncDir":{
			"action":"SyncDir",
			"dir":"ai",
			"target":dirName,
			"next":(result)=>{
				nodeDirPath=result.agentDir;
				if(nodeDirPath.startsWith("AGENTS/")){
					nodeDirPath=nodeDirPath.substring("AGENTS/".length);
				}
				steps["callStepUpAgent"].args={"prjPath":nodeDirPath};
				return "callStepUpAgent";
			}
		},
		"callStepUpAgent":{
			"action":"CallHubAgent",
			"agentNode":"AgentBuilder",
			"agent":"PrjSetupBySteps.js",
			"args":null,//Will be set on running...
			"next":"syncTip",
		},
	};
	return steps;
}

async function uninstall(path){
	return true;
}

export {setupPrj,setupAgent,uninstall};