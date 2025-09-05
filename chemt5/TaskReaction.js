//Auto genterated by Cody
import pathLib from "path";
import Base64 from "../../agenthub/base64.mjs";
import {trimJSON} from "../../agenthub/ChatSession.mjs";
import {URL} from "url";
/*#{1J29NKHR60MoreImports*/
/*}#1J29NKHR60MoreImports*/
const agentURL=(new URL(import.meta.url)).pathname;
const baseURL=pathLib.dirname(agentURL);
const basePath=baseURL.startsWith("file://")?pathLib.pathToFileURL(baseURL):baseURL;
const VFACT=null;
const argsTemplate={
	properties:{
		"Precursors":{
			"name":"Precursors","type":"string",
			"required":true,
			"defaultValue":"",
			"desc":"The precursors of a reaction (eg. CN(C)C=O.O=C([O-])[O-].O=[N+]([O-])c1cc(Br)ccc1F.Oc1ccccc1.[K+].[K+]>>___ )",
		}
	},
	/*#{1J29NKHR60ArgsView*/
	/*}#1J29NKHR60ArgsView*/
};

/*#{1J29NKHR60StartDoc*/
/*}#1J29NKHR60StartDoc*/
//----------------------------------------------------------------------------
let TaskReaction=async function(session){
	let Precursors;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let FixArgs,Run;
	/*#{1J29NKHR60LocalVals*/
	let task;
	/*}#1J29NKHR60LocalVals*/
	
	function parseAgentArgs(input){
		if(typeof(input)=='object'){
			Precursors=input.Precursors;
		}else{
			Precursors=undefined;
		}
		/*#{1J29NKHR60ParseArgs*/
		/*}#1J29NKHR60ParseArgs*/
	}
	
	/*#{1J29NKHR60PreContext*/
	function parseTask(input){
		if(typeof(input)=='object'){
			task=input.task;
		}else{
			task=undefined;
		}
	}
	/*}#1J29NKHR60PreContext*/
	context={};
	/*#{1J29NKHR60PostContext*/
	/*}#1J29NKHR60PostContext*/
	let $agent,agent,segs={};
	segs["FixArgs"]=FixArgs=async function(input){//:1J29NO72F0
		let result=input;
		let missing=false;
		let smartAsk=false;
		if(Precursors===undefined || Precursors==="") missing=true;
		if(missing){
			result=await session.pipeChat("/@tabos/HubFixArgs.mjs",{"argsTemplate":argsTemplate,"command":input,smartAsk:smartAsk},false);
			parseAgentArgs(result);
		}
		return {seg:Run,result:(result),preSeg:"1J29NO72F0",outlet:"1J29NPS2M0"};
	};
	FixArgs.jaxId="1J29NO72F0"
	FixArgs.url="FixArgs@"+agentURL
	
	segs["Run"]=Run=async function(input){//:1J29NOVRQ0
		let result,args={};
		args['nodeName']="chemt5";
		args['callAgent']="ChemT5.js";
		args['callArg']=undefined;
		args['checkUpdate']=true;
		args['options']="";
		/*#{1J29NOVRQ0PreCodes*/
		args['callArg']={
			"task": task,
			"task_input": Precursors
		};
		/*}#1J29NOVRQ0PreCodes*/
		result= await session.pipeChat("/@tabos/RemoteChat.mjs",args,false);
		/*#{1J29NOVRQ0PostCodes*/
		/*}#1J29NOVRQ0PostCodes*/
		return {result:result};
	};
	Run.jaxId="1J29NOVRQ0"
	Run.url="Run@"+agentURL
	
	agent=$agent={
		isAIAgent:true,
		session:session,
		name:"TaskReaction",
		url:agentURL,
		autoStart:true,
		jaxId:"1J29NKHR60",
		context:context,
		livingSeg:null,
		execChat:async function(input/*{Precursors}*/){
			let result;
			parseAgentArgs(input);
			/*#{1J29NKHR60PreEntry*/
			parseTask(input);
			/*}#1J29NKHR60PreEntry*/
			result={seg:FixArgs,"input":input};
			/*#{1J29NKHR60PostEntry*/
			/*}#1J29NKHR60PostEntry*/
			return result;
		},
		/*#{1J29NKHR60MoreAgentAttrs*/
		/*}#1J29NKHR60MoreAgentAttrs*/
	};
	/*#{1J29NKHR60PostAgent*/
	/*}#1J29NKHR60PostAgent*/
	return agent;
};
/*#{1J29NKHR60ExCodes*/
/*}#1J29NKHR60ExCodes*/

//#CodyExport>>>
//#CodyExport<<<
/*#{1J29NKHR60PostDoc*/
/*}#1J29NKHR60PostDoc*/


export default TaskReaction;
export{TaskReaction};
/*Cody Project Doc*/
//{
//	"type": "docfile",
//	"def": "DocAIAgent",
//	"jaxId": "1J29NKHR60",
//	"attrs": {
//		"editObjs": {
//			"jaxId": "1J29NKHR61",
//			"attrs": {
//				"TaskReaction": {
//					"type": "objclass",
//					"def": "ObjClass",
//					"jaxId": "1J29NKHR70",
//					"attrs": {
//						"exportType": "UI Data Template",
//						"constructArgs": {
//							"jaxId": "1J29NKHR71",
//							"attrs": {}
//						},
//						"superClass": "",
//						"properties": {
//							"jaxId": "1J29NKHR72",
//							"attrs": {}
//						},
//						"functions": {
//							"jaxId": "1J29NKHR73",
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
//			"jaxId": "1J29NKHR62",
//			"attrs": {}
//		},
//		"showName": "",
//		"entry": "",
//		"autoStart": "true",
//		"inBrowser": "false",
//		"debug": "true",
//		"apiArgs": {
//			"jaxId": "1J29NKHR63",
//			"attrs": {
//				"Precursors": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1J29O39G40",
//					"attrs": {
//						"type": "String",
//						"mockup": "\"\"",
//						"desc": "The precursors of a reaction (eg. CN(C)C=O.O=C([O-])[O-].O=[N+]([O-])c1cc(Br)ccc1F.Oc1ccccc1.[K+].[K+]>>___ )",
//						"required": "true"
//					}
//				}
//			}
//		},
//		"localVars": {
//			"jaxId": "1J29NKHR64",
//			"attrs": {}
//		},
//		"context": {
//			"jaxId": "1J29NKHR65",
//			"attrs": {}
//		},
//		"globalMockup": {
//			"jaxId": "1J29NKHR66",
//			"attrs": {}
//		},
//		"segs": {
//			"attrs": [
//				{
//					"type": "aiseg",
//					"def": "fixArgs",
//					"jaxId": "1J29NO72F0",
//					"attrs": {
//						"id": "FixArgs",
//						"viewName": "",
//						"label": "",
//						"x": "460",
//						"y": "365",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"smartAsk": "false",
//						"outlet": {
//							"jaxId": "1J29NPS2M0",
//							"attrs": {
//								"id": "Next",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J29NOVRQ0"
//						}
//					},
//					"icon": "args.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "RemoteChat",
//					"jaxId": "1J29NOVRQ0",
//					"attrs": {
//						"id": "Run",
//						"viewName": "",
//						"label": "",
//						"x": "730",
//						"y": "365",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J29O39G41",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J29O39G42",
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
//							"jaxId": "1J29NPS2M1",
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