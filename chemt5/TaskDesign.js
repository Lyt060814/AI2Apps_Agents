//Auto genterated by Cody
import pathLib from "path";
import Base64 from "../../agenthub/base64.mjs";
import {trimJSON} from "../../agenthub/ChatSession.mjs";
import {URL} from "url";
/*#{1J29OCDFE0MoreImports*/
/*}#1J29OCDFE0MoreImports*/
const agentURL=(new URL(import.meta.url)).pathname;
const baseURL=pathLib.dirname(agentURL);
const basePath=baseURL.startsWith("file://")?pathLib.pathToFileURL(baseURL):baseURL;
const VFACT=null;
const argsTemplate={
	properties:{
		"Description":{
			"name":"Description","type":"string",
			"required":true,
			"defaultValue":"",
			"desc":"The description of a molecular (eg. The molecule is an indole alkaloid. It has a role as an antiparkinson drug, a hormone antagonist, a dopamine agonist and an antidyskinesia agent. It derives from a hydride of an ergotaman. )",
		}
	},
	/*#{1J29OCDFE0ArgsView*/
	/*}#1J29OCDFE0ArgsView*/
};

/*#{1J29OCDFE0StartDoc*/
/*}#1J29OCDFE0StartDoc*/
//----------------------------------------------------------------------------
let TaskDesign=async function(session){
	let Description;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let FixArgs,Run;
	/*#{1J29OCDFE0LocalVals*/
	let task;
	/*}#1J29OCDFE0LocalVals*/
	
	function parseAgentArgs(input){
		if(typeof(input)=='object'){
			Description=input.Description;
		}else{
			Description=undefined;
		}
		/*#{1J29OCDFE0ParseArgs*/
		/*}#1J29OCDFE0ParseArgs*/
	}
	
	/*#{1J29OCDFE0PreContext*/
	function parseTask(input){
		if(typeof(input)=='object'){
			task=input.task;
		}else{
			task=undefined;
		}
	}
	/*}#1J29OCDFE0PreContext*/
	context={};
	/*#{1J29OCDFE0PostContext*/
	/*}#1J29OCDFE0PostContext*/
	let $agent,agent,segs={};
	segs["FixArgs"]=FixArgs=async function(input){//:1J29OH33Q0
		let result=input;
		let missing=false;
		let smartAsk=false;
		if(Description===undefined || Description==="") missing=true;
		if(missing){
			result=await session.pipeChat("/@tabos/HubFixArgs.mjs",{"argsTemplate":argsTemplate,"command":input,smartAsk:smartAsk},false);
			parseAgentArgs(result);
		}
		return {seg:Run,result:(result),preSeg:"1J29OH33Q0",outlet:"1J29OI9C90"};
	};
	FixArgs.jaxId="1J29OH33Q0"
	FixArgs.url="FixArgs@"+agentURL
	
	segs["Run"]=Run=async function(input){//:1J2A9NMQ80
		let result,args={};
		args['nodeName']="chemt5";
		args['callAgent']="ChemT5.js";
		args['callArg']=undefined;
		args['checkUpdate']=true;
		args['options']="";
		/*#{1J2A9NMQ80PreCodes*/
		args['callArg']={"task":task,"task_input":Description};
		/*}#1J2A9NMQ80PreCodes*/
		result= await session.pipeChat("/@tabos/RemoteChat.mjs",args,false);
		/*#{1J2A9NMQ80PostCodes*/
		/*}#1J2A9NMQ80PostCodes*/
		return {result:result};
	};
	Run.jaxId="1J2A9NMQ80"
	Run.url="Run@"+agentURL
	
	agent=$agent={
		isAIAgent:true,
		session:session,
		name:"TaskDesign",
		url:agentURL,
		autoStart:true,
		jaxId:"1J29OCDFE0",
		context:context,
		livingSeg:null,
		execChat:async function(input/*{Description}*/){
			let result;
			parseAgentArgs(input);
			/*#{1J29OCDFE0PreEntry*/
			parseTask(input);
			/*}#1J29OCDFE0PreEntry*/
			result={seg:FixArgs,"input":input};
			/*#{1J29OCDFE0PostEntry*/
			/*}#1J29OCDFE0PostEntry*/
			return result;
		},
		/*#{1J29OCDFE0MoreAgentAttrs*/
		/*}#1J29OCDFE0MoreAgentAttrs*/
	};
	/*#{1J29OCDFE0PostAgent*/
	/*}#1J29OCDFE0PostAgent*/
	return agent;
};
/*#{1J29OCDFE0ExCodes*/
/*}#1J29OCDFE0ExCodes*/

//#CodyExport>>>
//#CodyExport<<<
/*#{1J29OCDFE0PostDoc*/
/*}#1J29OCDFE0PostDoc*/


export default TaskDesign;
export{TaskDesign};
/*Cody Project Doc*/
//{
//	"type": "docfile",
//	"def": "DocAIAgent",
//	"jaxId": "1J29OCDFE0",
//	"attrs": {
//		"editObjs": {
//			"jaxId": "1J29OCDFE1",
//			"attrs": {
//				"TaskDesign": {
//					"type": "objclass",
//					"def": "ObjClass",
//					"jaxId": "1J29OCDFF0",
//					"attrs": {
//						"exportType": "UI Data Template",
//						"constructArgs": {
//							"jaxId": "1J29OCDFF1",
//							"attrs": {}
//						},
//						"superClass": "",
//						"properties": {
//							"jaxId": "1J29OCDFF2",
//							"attrs": {}
//						},
//						"functions": {
//							"jaxId": "1J29OCDFF3",
//							"attrs": {}
//						},
//						"mockupOnly": "false",
//						"nullMockup": "false",
//						"exportClass": "false"
//					},
//					"mockups": {}
//				}
//			}
//		},
//		"agent": {
//			"jaxId": "1J29OCDFE2",
//			"attrs": {}
//		},
//		"showName": "",
//		"entry": "",
//		"autoStart": "true",
//		"inBrowser": "false",
//		"debug": "true",
//		"apiArgs": {
//			"jaxId": "1J29OCDFE3",
//			"attrs": {
//				"Description": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1J29OKASK0",
//					"attrs": {
//						"type": "String",
//						"mockup": "\"\"",
//						"desc": "The description of a molecular (eg. The molecule is an indole alkaloid. It has a role as an antiparkinson drug, a hormone antagonist, a dopamine agonist and an antidyskinesia agent. It derives from a hydride of an ergotaman. )",
//						"required": "true"
//					}
//				}
//			}
//		},
//		"localVars": {
//			"jaxId": "1J29OCDFE4",
//			"attrs": {}
//		},
//		"context": {
//			"jaxId": "1J29OCDFE5",
//			"attrs": {}
//		},
//		"globalMockup": {
//			"jaxId": "1J29OCDFE6",
//			"attrs": {}
//		},
//		"segs": {
//			"attrs": [
//				{
//					"type": "aiseg",
//					"def": "fixArgs",
//					"jaxId": "1J29OH33Q0",
//					"attrs": {
//						"id": "FixArgs",
//						"viewName": "",
//						"label": "",
//						"x": "445",
//						"y": "365",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"smartAsk": "false",
//						"outlet": {
//							"jaxId": "1J29OI9C90",
//							"attrs": {
//								"id": "Next",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2A9NMQ80"
//						}
//					},
//					"icon": "args.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "RemoteChat",
//					"jaxId": "1J2A9NMQ80",
//					"attrs": {
//						"id": "Run",
//						"viewName": "",
//						"label": "",
//						"x": "725",
//						"y": "365",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2A9Q32D0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2A9Q32D1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"nodeName": "chemt5",
//						"callAgent": "ChemT5.js",
//						"callArg": "",
//						"checkUpdate": "true",
//						"options": "\"\"",
//						"outlet": {
//							"jaxId": "1J2A9OEBA0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							}
//						}
//					},
//					"icon": "cloudact.svg"
//				}
//			]
//		},
//		"desc": "This is an AI agent.",
//		"exportAPI": "false",
//		"exportAddOn": "false",
//		"addOnOpts": ""
//	}
//}