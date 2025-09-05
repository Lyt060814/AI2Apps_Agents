//Auto genterated by Cody
import pathLib from "path";
import Base64 from "../../agenthub/base64.mjs";
import {trimJSON} from "../../agenthub/ChatSession.mjs";
import {URL} from "url";
/*#{1J29ONR4B0MoreImports*/
/*}#1J29ONR4B0MoreImports*/
const agentURL=(new URL(import.meta.url)).pathname;
const baseURL=pathLib.dirname(agentURL);
const basePath=baseURL.startsWith("file://")?pathLib.pathToFileURL(baseURL):baseURL;
const VFACT=null;
const argsTemplate={
	properties:{
		"SMILES":{
			"name":"SMILES","type":"string",
			"required":true,
			"defaultValue":"",
			"desc":"The SMILES of a molecular (eg. C[C@@H](C(=O)N[C@@H](CC(=O)O)C(=O)NCC(=O)O)N )",
		}
	},
	/*#{1J29ONR4B0ArgsView*/
	/*}#1J29ONR4B0ArgsView*/
};

/*#{1J29ONR4B0StartDoc*/
/*}#1J29ONR4B0StartDoc*/
//----------------------------------------------------------------------------
let TaskCaptioning=async function(session){
	let SMILES;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let FixArgs,Run;
	/*#{1J29ONR4B0LocalVals*/
	let task;
	/*}#1J29ONR4B0LocalVals*/
	
	function parseAgentArgs(input){
		if(typeof(input)=='object'){
			SMILES=input.SMILES;
		}else{
			SMILES=undefined;
		}
		/*#{1J29ONR4B0ParseArgs*/
		/*}#1J29ONR4B0ParseArgs*/
	}
	
	/*#{1J29ONR4B0PreContext*/
	function parseTask(input){
		if(typeof(input)=='object'){
			task=input.task;
		}else{
			task=undefined;
		}
	}
	/*}#1J29ONR4B0PreContext*/
	context={};
	/*#{1J29ONR4B0PostContext*/
	/*}#1J29ONR4B0PostContext*/
	let $agent,agent,segs={};
	segs["FixArgs"]=FixArgs=async function(input){//:1J29PQQ5T0
		let result=input;
		let missing=false;
		let smartAsk=false;
		/*#{1J29PQQ5T0PreCodes*/
		/*}#1J29PQQ5T0PreCodes*/
		if(SMILES===undefined || SMILES==="") missing=true;
		if(missing){
			result=await session.pipeChat("/@tabos/HubFixArgs.mjs",{"argsTemplate":argsTemplate,"command":input,smartAsk:smartAsk},false);
			parseAgentArgs(result);
		}
		/*#{1J29PQQ5T0PostCodes*/
		/*}#1J29PQQ5T0PostCodes*/
		return {seg:Run,result:(result),preSeg:"1J29PQQ5T0",outlet:"1J29PRCIB0"};
	};
	FixArgs.jaxId="1J29PQQ5T0"
	FixArgs.url="FixArgs@"+agentURL
	
	segs["Run"]=Run=async function(input){//:1J29PSD8H0
		let result,args={};
		args['nodeName']="chemt5";
		args['callAgent']="ChemT5.js";
		args['callArg']=undefined;
		args['checkUpdate']=true;
		args['options']="";
		/*#{1J29PSD8H0PreCodes*/
		args['callArg']={"task":task,"task_input":SMILES};
		/*}#1J29PSD8H0PreCodes*/
		result= await session.pipeChat("/@tabos/RemoteChat.mjs",args,false);
		/*#{1J29PSD8H0PostCodes*/
		/*}#1J29PSD8H0PostCodes*/
		return {result:result};
	};
	Run.jaxId="1J29PSD8H0"
	Run.url="Run@"+agentURL
	
	agent=$agent={
		isAIAgent:true,
		session:session,
		name:"TaskCaptioning",
		url:agentURL,
		autoStart:true,
		jaxId:"1J29ONR4B0",
		context:context,
		livingSeg:null,
		execChat:async function(input/*{SMILES}*/){
			let result;
			parseAgentArgs(input);
			/*#{1J29ONR4B0PreEntry*/
			parseTask(input);
			/*}#1J29ONR4B0PreEntry*/
			result={seg:FixArgs,"input":input};
			/*#{1J29ONR4B0PostEntry*/
			/*}#1J29ONR4B0PostEntry*/
			return result;
		},
		/*#{1J29ONR4B0MoreAgentAttrs*/
		/*}#1J29ONR4B0MoreAgentAttrs*/
	};
	/*#{1J29ONR4B0PostAgent*/
	/*}#1J29ONR4B0PostAgent*/
	return agent;
};
/*#{1J29ONR4B0ExCodes*/
/*}#1J29ONR4B0ExCodes*/

//#CodyExport>>>
//#CodyExport<<<
/*#{1J29ONR4B0PostDoc*/
/*}#1J29ONR4B0PostDoc*/


export default TaskCaptioning;
export{TaskCaptioning};
/*Cody Project Doc*/
//{
//	"type": "docfile",
//	"def": "DocAIAgent",
//	"jaxId": "1J29ONR4B0",
//	"attrs": {
//		"editObjs": {
//			"jaxId": "1J29ONR4B1",
//			"attrs": {
//				"TaskCaptioning": {
//					"type": "objclass",
//					"def": "ObjClass",
//					"jaxId": "1J29ONR4B7",
//					"attrs": {
//						"exportType": "UI Data Template",
//						"constructArgs": {
//							"jaxId": "1J29ONR4C0",
//							"attrs": {}
//						},
//						"superClass": "",
//						"properties": {
//							"jaxId": "1J29ONR4C1",
//							"attrs": {}
//						},
//						"functions": {
//							"jaxId": "1J29ONR4C2",
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
//			"jaxId": "1J29ONR4B2",
//			"attrs": {}
//		},
//		"showName": "",
//		"entry": "",
//		"autoStart": "true",
//		"inBrowser": "false",
//		"debug": "true",
//		"apiArgs": {
//			"jaxId": "1J29ONR4B3",
//			"attrs": {
//				"SMILES": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1J29OTKFS0",
//					"attrs": {
//						"type": "String",
//						"mockup": "\"\"",
//						"desc": "The SMILES of a molecular (eg. C[C@@H](C(=O)N[C@@H](CC(=O)O)C(=O)NCC(=O)O)N )",
//						"required": "true"
//					}
//				}
//			}
//		},
//		"localVars": {
//			"jaxId": "1J29ONR4B4",
//			"attrs": {}
//		},
//		"context": {
//			"jaxId": "1J29ONR4B5",
//			"attrs": {}
//		},
//		"globalMockup": {
//			"jaxId": "1J29ONR4B6",
//			"attrs": {}
//		},
//		"segs": {
//			"attrs": [
//				{
//					"type": "aiseg",
//					"def": "fixArgs",
//					"jaxId": "1J29PQQ5T0",
//					"attrs": {
//						"id": "FixArgs",
//						"viewName": "",
//						"label": "",
//						"x": "515",
//						"y": "390",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"smartAsk": "false",
//						"outlet": {
//							"jaxId": "1J29PRCIB0",
//							"attrs": {
//								"id": "Next",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J29PSD8H0"
//						}
//					},
//					"icon": "args.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "RemoteChat",
//					"jaxId": "1J29PSD8H0",
//					"attrs": {
//						"id": "Run",
//						"viewName": "",
//						"label": "",
//						"x": "830",
//						"y": "390",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J29PTCPT0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J29PTCPT1",
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
//							"jaxId": "1J29PSRTR0",
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