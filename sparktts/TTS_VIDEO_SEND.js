//Auto genterated by Cody
import pathLib from "path";
import Base64 from "../../agenthub/base64.mjs";
import {trimJSON} from "../../agenthub/ChatSession.mjs";
import {URL} from "url";
/*#{1IN5UPE620MoreImports*/
import fsp from 'fs/promises';
/*}#1IN5UPE620MoreImports*/
const agentURL=(new URL(import.meta.url)).pathname;
const basePath=pathLib.dirname(agentURL);
const VFACT=null;
/*#{1IN5UPE620StartDoc*/
async function saveBase64(dataUri, outputFilePath) {
try {
// 分离数据URI的MIME类型和Base64数据
const [header, base64Data] = dataUri.split(',');
if (!base64Data) {
throw new Error('无效的数据URI格式');
}

// 解码Base64字符串
const videoBuffer = Buffer.from(base64Data, 'base64');

// 写入文件
await fsp.writeFile(outputFilePath, videoBuffer);
console.log(`已保存至：${outputFilePath}`);
} catch (error) {
console.error('保存时出错：', error.message);
}
}

/*}#1IN5UPE620StartDoc*/
//----------------------------------------------------------------------------
let TTS_VIDEO_SEND=async function(session){
	let execInput;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let TTS,Video,SaveVideo,InitBash,InitConda,Run,Send,Text;
	/*#{1IN5UPE620LocalVals*/
	let nodeJSON, conda, huburl;
	try {
			nodeJSON=await fsp.readFile(pathLib.join(basePath, "agent.json"), "utf8");
			nodeJSON=JSON.parse(nodeJSON);
			nodeJSON.entry=nodeJSON.entry||"../tabos/AgentNodeMain.py";
			conda = nodeJSON.conda;
		}catch(err){
			throw Error(`Can't read/parse ${pathLib.join(basePath, "agent.json")}. Please make sure your agent path and agent.json is correct.`);
		}
	/*}#1IN5UPE620LocalVals*/
	
	function parseAgentArgs(input){
		execInput=input;
		/*#{1IN5UPE620ParseArgs*/
		/*}#1IN5UPE620ParseArgs*/
	}
	
	/*#{1IN5UPE620PreContext*/
	/*}#1IN5UPE620PreContext*/
	context={};
	/*#{1IN5UPE620PostContext*/
	/*}#1IN5UPE620PostContext*/
	let agent,segs={};
	segs["TTS"]=TTS=async function(input){//:1IN5UOUAS0
		let result,args={};
		args['nodeName']="sparktts";
		args['callAgent']="AutoTTS.js";
		args['callArg']=input;
		args['checkUpdate']=true;
		/*#{1IN5UOUAS0PreCodes*/
		/*}#1IN5UOUAS0PreCodes*/
		result= await session.pipeChat("/@tabos/RemoteChat.mjs",args,false);
		/*#{1IN5UOUAS0PostCodes*/
		globalContext.audio_path=result;
		/*}#1IN5UOUAS0PostCodes*/
		return {seg:Video,result:(result),preSeg:"1IN5UOUAS0",outlet:"1IN5UPE621"};
	};
	TTS.jaxId="1IN5UOUAS0"
	TTS.url="TTS@"+agentURL
	
	segs["Video"]=Video=async function(input){//:1IN5UQRIO0
		let prompt=("Please select a video file")||input;
		let resultText="";
		let fileData=null;
		let enc=null;
		let ext=null;
		let fileSys="native";
		let result="";
		let path=("");
		let filter=("");
		[resultText,result]=await session.askUserRaw({type:"input",prompt:prompt,text:"",path:path,file:fileSys,filter:filter,});
		if(!result && resultText){
			result=resultText;
		}else if(resultText && result){
			result=session.arrayBufferToDataURL(resultText,result);
		}
		return {seg:SaveVideo,result:(result),preSeg:"1IN5UQRIO0",outlet:"1IN5US82E0"};
	};
	Video.jaxId="1IN5UQRIO0"
	Video.url="Video@"+agentURL
	
	segs["SaveVideo"]=SaveVideo=async function(input){//:1IN5VCGJJ0
		let result=input
		/*#{1IN5VCGJJ0Code*/
		saveBase64(input,"Spark-TTS/input.mp4");
		/*}#1IN5VCGJJ0Code*/
		return {seg:InitBash,result:(result),preSeg:"1IN5VCGJJ0",outlet:"1IN5VCKQ60"};
	};
	SaveVideo.jaxId="1IN5VCGJJ0"
	SaveVideo.url="SaveVideo@"+agentURL
	
	segs["InitBash"]=InitBash=async function(input){//:1IN5VOODR0
		let result,args={};
		args['bashId']="";
		args['action']="Create";
		args['commands']="";
		args['options']={client:true};
		/*#{1IN5VOODR0PreCodes*/
		/*}#1IN5VOODR0PreCodes*/
		result= await session.pipeChat("/@AgentBuilder/Bash.js",args,false);
		/*#{1IN5VOODR0PostCodes*/
		globalContext.bash=result;
		/*}#1IN5VOODR0PostCodes*/
		return {seg:InitConda,result:(result),preSeg:"1IN5VOODR0",outlet:"1IN5VOODR1"};
	};
	InitBash.jaxId="1IN5VOODR0"
	InitBash.url="InitBash@"+agentURL
	
	segs["InitConda"]=InitConda=async function(input){//:1IN5VOIMI0
		let result,args={};
		args['bashId']=globalContext.bash;
		args['action']="Command";
		args['commands']=[`conda activate ${conda}`,`cd ${basePath}/Spark-TTS`];
		args['options']="";
		result= await session.pipeChat("/@AgentBuilder/Bash.js",args,false);
		return {seg:Run,result:(result),preSeg:"1IN5VOIMI0",outlet:"1IN5VOODR2"};
	};
	InitConda.jaxId="1IN5VOIMI0"
	InitConda.url="InitConda@"+agentURL
	
	segs["Run"]=Run=async function(input){//:1IN5VUCGC0
		let result,args={};
		args['bashId']=globalContext.bash;
		args['action']="Command";
		args['commands']="python ../generate_video.py --video_path \"input.mp4\" --audio_path \"merged.mp3\" --output_path \"output.mp4\"";
		args['options']="";
		/*#{1IN5VUCGC0PreCodes*/
		/*}#1IN5VUCGC0PreCodes*/
		result= await session.pipeChat("/@AgentBuilder/Bash.js",args,false);
		/*#{1IN5VUCGC0PostCodes*/
		let videoDataBuffer = await fsp.readFile("Spark-TTS/output.mp4");
		huburl=await session.saveHubFile("output.mp4", videoDataBuffer);
		/*}#1IN5VUCGC0PostCodes*/
		return {seg:Text,result:(result),preSeg:"1IN5VUCGC0",outlet:"1IN600CHU0"};
	};
	Run.jaxId="1IN5VUCGC0"
	Run.url="Run@"+agentURL
	
	segs["Send"]=Send=async function(input){//:1IN60ST7H0
		let result,args={};
		args['nodeName']="weiboAgent";
		args['callAgent']="agent.js";
		args['callArg']={PoseText:input,Images:["hub://"+huburl],whoCanSee:"公开"};
		args['checkUpdate']=true;
		result= await session.pipeChat("/@tabos/RemoteChat.mjs",args,false);
		return {result:result};
	};
	Send.jaxId="1IN60ST7H0"
	Send.url="Send@"+agentURL
	
	segs["Text"]=Text=async function(input){//:1IN60V4280
		let tip=("Please input the social media copy");
		let tipRole=("assistant");
		let placeholder=("");
		let text=("");
		let result="";
		if(tip){
			session.addChatText(tipRole,tip);
		}
		result=await session.askChatInput({type:"input",placeholder:placeholder,text:text});
		session.addChatText("user",result);
		return {seg:Send,result:(result),preSeg:"1IN60V4280",outlet:"1IN611CPV0"};
	};
	Text.jaxId="1IN60V4280"
	Text.url="Text@"+agentURL
	
	agent={
		isAIAgent:true,
		session:session,
		name:"TTS_VIDEO_SEND",
		url:agentURL,
		autoStart:true,
		jaxId:"1IN5UPE620",
		context:context,
		livingSeg:null,
		execChat:async function(input){
			let result;
			parseAgentArgs(input);
			/*#{1IN5UPE620PreEntry*/
			/*}#1IN5UPE620PreEntry*/
			result={seg:TTS,"input":input};
			/*#{1IN5UPE620PostEntry*/
			/*}#1IN5UPE620PostEntry*/
			return result;
		},
		/*#{1IN5UPE620MoreAgentAttrs*/
		/*}#1IN5UPE620MoreAgentAttrs*/
	};
	/*#{1IN5UPE620PostAgent*/
	/*}#1IN5UPE620PostAgent*/
	return agent;
};
/*#{1IN5UPE620ExCodes*/
/*}#1IN5UPE620ExCodes*/

//#CodyExport>>>
let ChatAPI=[{
	def:{
		name: "TTS_VIDEO_SEND",
		description: "This is an AI agent.",
		parameters:{
			type: "object",
			properties:{
			}
		}
	}
}];

//:Export Edit-AddOn:
const DocAIAgentExporter=VFACT?VFACT.classRegs.DocAIAgentExporter:null;
if(DocAIAgentExporter){
	const EditAttr=VFACT.classRegs.EditAttr;
	const EditAISeg=VFACT.classRegs.EditAISeg;
	const EditAISegOutlet=VFACT.classRegs.EditAISegOutlet;
	const SegObjShellAttr=EditAISeg.SegObjShellAttr;
	const SegOutletDef=EditAISegOutlet.SegOutletDef;
	const docAIAgentExporter=DocAIAgentExporter.prototype;
	const packExtraCodes=docAIAgentExporter.packExtraCodes;
	const packResult=docAIAgentExporter.packResult;
	const varNameRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
	
	EditAISeg.regDef({
		name:"TTS_VIDEO_SEND",showName:"TTS_VIDEO_SEND",icon:"agent.svg",catalog:["AI Call"],
		attrs:{
			...SegObjShellAttr,
			"outlet":{name:"outlet",type:"aioutlet",def:SegOutletDef,key:1,fixed:1,edit:false,navi:"doc"}
		},
		listHint:["id","codes","desc"],
		desc:"This is an AI agent."
	});
	
	DocAIAgentExporter.segTypeExporters["TTS_VIDEO_SEND"]=
	function(seg){
		let coder=this.coder;
		let segName=seg.idVal.val;
		let exportDebug=this.isExportDebug();
		segName=(segName &&varNameRegex.test(segName))?segName:("SEG"+seg.jaxId);
		coder.packText(`segs["${segName}"]=${segName}=async function(input){//:${seg.jaxId}`);
		coder.indentMore();coder.newLine();
		{
			coder.packText(`let result,args={};`);coder.newLine();
			this.packExtraCodes(coder,seg,"PreCodes");
			coder.packText(`result= await session.pipeChat("/~/sparktts/ai/TTS_VIDEO_SEND.js",args,false);`);coder.newLine();
			this.packExtraCodes(coder,seg,"PostCodes");
			this.packResult(coder,seg,seg.outlet);
		}
		coder.indentLess();coder.maybeNewLine();
		coder.packText(`};`);coder.newLine();
		if(exportDebug){
			coder.packText(`${segName}.jaxId="${seg.jaxId}"`);coder.newLine();
		}
		coder.packText(`${segName}.url="${segName}@"+agentURL`);coder.newLine();
		coder.newLine();
	};
}
//#CodyExport<<<
/*#{1IN5UPE620PostDoc*/
/*}#1IN5UPE620PostDoc*/


export default TTS_VIDEO_SEND;
export{TTS_VIDEO_SEND,ChatAPI};
/*Cody Project Doc*/
//{
//	"type": "docfile",
//	"def": "DocAIAgent",
//	"jaxId": "1IN5UPE620",
//	"attrs": {
//		"editObjs": {
//			"jaxId": "1IN5UPE650",
//			"attrs": {}
//		},
//		"agent": {
//			"jaxId": "1IN5UPE651",
//			"attrs": {}
//		},
//		"entry": "TTS",
//		"autoStart": "true",
//		"inBrowser": "false",
//		"debug": "true",
//		"apiArgs": {
//			"jaxId": "1IN5UPE652",
//			"attrs": {}
//		},
//		"localVars": {
//			"jaxId": "1IN5UPE653",
//			"attrs": {}
//		},
//		"context": {
//			"jaxId": "1IN5UPE654",
//			"attrs": {}
//		},
//		"globalMockup": {
//			"jaxId": "1IN5UPE655",
//			"attrs": {}
//		},
//		"segs": {
//			"attrs": [
//				{
//					"type": "aiseg",
//					"def": "RemoteChat",
//					"jaxId": "1IN5UOUAS0",
//					"attrs": {
//						"id": "TTS",
//						"viewName": "",
//						"label": "",
//						"x": "280",
//						"y": "355",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IN5UPE656",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IN5UPE657",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"nodeName": "sparktts",
//						"callAgent": "AutoTTS.js",
//						"callArg": "#input",
//						"checkUpdate": "true",
//						"outlet": {
//							"jaxId": "1IN5UPE621",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IN5UQRIO0"
//						}
//					},
//					"icon": "cloudact.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "askFile",
//					"jaxId": "1IN5UQRIO0",
//					"attrs": {
//						"id": "Video",
//						"viewName": "",
//						"label": "",
//						"x": "515",
//						"y": "355",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IN5US82G0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IN5US82G1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"prompt": "Please select a video file",
//						"path": "",
//						"fileSys": "naive",
//						"filter": "",
//						"read": "No",
//						"outlet": {
//							"jaxId": "1IN5US82E0",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IN5VCGJJ0"
//						}
//					},
//					"icon": "folder.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1IN5VCGJJ0",
//					"attrs": {
//						"id": "SaveVideo",
//						"viewName": "",
//						"label": "",
//						"x": "715",
//						"y": "355",
//						"desc": "这是一个AISeg。",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IN5VDDPD0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IN5VDDPD1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IN5VCKQ60",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IN5VOODR0"
//						},
//						"result": "#input"
//					},
//					"icon": "tab_css.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "Bash",
//					"jaxId": "1IN5VOODR0",
//					"attrs": {
//						"id": "InitBash",
//						"viewName": "",
//						"label": "",
//						"x": "955",
//						"y": "355",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IN5VOOE00",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IN5VOOE01",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"bashId": "\"\"",
//						"action": "Create",
//						"commands": "\"\"",
//						"options": "#{client:true}",
//						"outlet": {
//							"jaxId": "1IN5VOODR1",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IN5VOIMI0"
//						}
//					},
//					"icon": "terminal.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "Bash",
//					"jaxId": "1IN5VOIMI0",
//					"attrs": {
//						"id": "InitConda",
//						"viewName": "",
//						"label": "",
//						"x": "1145",
//						"y": "355",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IN5VOOE02",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IN5VOOE03",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"bashId": "#globalContext.bash",
//						"action": "Command",
//						"commands": "#[`conda activate ${conda}`,`cd ${basePath}/Spark-TTS`]",
//						"options": "\"\"",
//						"outlet": {
//							"jaxId": "1IN5VOODR2",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IN5VUCGC0"
//						}
//					},
//					"icon": "terminal.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "Bash",
//					"jaxId": "1IN5VUCGC0",
//					"attrs": {
//						"id": "Run",
//						"viewName": "",
//						"label": "",
//						"x": "1355",
//						"y": "355",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IN600CI00",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IN600CI01",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"bashId": "#globalContext.bash",
//						"action": "Command",
//						"commands": "python ../generate_video.py --video_path \"input.mp4\" --audio_path \"merged.mp3\" --output_path \"output.mp4\"",
//						"options": "\"\"",
//						"outlet": {
//							"jaxId": "1IN600CHU0",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IN60V4280"
//						}
//					},
//					"icon": "terminal.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "RemoteChat",
//					"jaxId": "1IN60ST7H0",
//					"attrs": {
//						"id": "Send",
//						"viewName": "",
//						"label": "",
//						"x": "1725",
//						"y": "355",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IN611CQ40",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IN611CQ41",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"nodeName": "weiboAgent",
//						"callAgent": "agent.js",
//						"callArg": "#{PoseText:input,Images:[\"hub://\"+huburl],whoCanSee:\"公开\"}",
//						"checkUpdate": "true",
//						"outlet": {
//							"jaxId": "1IN611CPU0",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							}
//						}
//					},
//					"icon": "cloudact.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "askChat",
//					"jaxId": "1IN60V4280",
//					"attrs": {
//						"id": "Text",
//						"viewName": "",
//						"label": "",
//						"x": "1540",
//						"y": "355",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IN611CQ42",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IN611CQ43",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"tip": "Please input the social media copy",
//						"tipRole": "Assistant",
//						"placeholder": "",
//						"text": "",
//						"file": "false",
//						"showText": "true",
//						"outlet": {
//							"jaxId": "1IN611CPV0",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IN60ST7H0"
//						}
//					},
//					"icon": "chat.svg"
//				}
//			]
//		},
//		"desc": "This is an AI agent.",
//		"exportAPI": "true",
//		"exportAddOn": "true",
//		"addOnOpts": ""
//	}
//}