//Auto genterated by Cody
import {$P,VFACT,callAfter,sleep} from "/@vfact";
import pathLib from "/@path";
import inherits from "/@inherits";
import Base64 from "/@tabos/utils/base64.js";
import {trimJSON} from "/@aichat/utils.js";
/*#{1J2KQ343H0MoreImports*/
/*}#1J2KQ343H0MoreImports*/
const agentURL=(new URL(import.meta.url)).pathname;
const baseURL=pathLib.dirname(agentURL);
const basePath=baseURL.startsWith("file://")?decodeURI(baseURL):baseURL;
const $ln=VFACT.lanCode||"EN";
/*#{1J2KQ343H0StartDoc*/
/*}#1J2KQ343H0StartDoc*/
//----------------------------------------------------------------------------
let MegaTTS3=async function(session){
	let execInput;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let Run;
	/*#{1J2KQ343H0LocalVals*/
	/*}#1J2KQ343H0LocalVals*/
	
	function parseAgentArgs(input){
		execInput=input;
		/*#{1J2KQ343H0ParseArgs*/
		/*}#1J2KQ343H0ParseArgs*/
	}
	
	/*#{1J2KQ343H0PreContext*/
	/*}#1J2KQ343H0PreContext*/
	context={};
	context=VFACT.flexState(context);
	/*#{1J2KQ343H0PostContext*/
	/*}#1J2KQ343H0PostContext*/
	let $agent,agent,segs={};
	segs["Run"]=Run=async function(input){//:1J2KQ3BUF0
		let result,args={};
		args['nodeName']="mega_tts3";
		args['callAgent']="agent.js";
		args['callArg']=undefined;
		args['checkUpdate']=true;
		args['options']="";
		result= await session.pipeChat("/@aichat/ai/RemoteChat.js",args,false);
		return {result:result};
	};
	Run.jaxId="1J2KQ3BUF0"
	Run.url="Run@"+agentURL
	
	agent=$agent={
		isAIAgent:true,
		session:session,
		name:"MegaTTS3",
		url:agentURL,
		autoStart:true,
		jaxId:"1J2KQ343H0",
		context:context,
		livingSeg:null,
		execChat:async function(input){
			let result;
			parseAgentArgs(input);
			/*#{1J2KQ343H0PreEntry*/
			/*}#1J2KQ343H0PreEntry*/
			result={seg:Run,"input":input};
			/*#{1J2KQ343H0PostEntry*/
			/*}#1J2KQ343H0PostEntry*/
			return result;
		},
		/*#{1J2KQ343H0MoreAgentAttrs*/
		/*}#1J2KQ343H0MoreAgentAttrs*/
	};
	/*#{1J2KQ343H0PostAgent*/
	/*}#1J2KQ343H0PostAgent*/
	return agent;
};
/*#{1J2KQ343H0ExCodes*/
/*}#1J2KQ343H0ExCodes*/

//#CodyExport>>>
//#CodyExport<<<
/*#{1J2KQ343H0PostDoc*/
/*}#1J2KQ343H0PostDoc*/


export default MegaTTS3;
export{MegaTTS3};
/*Cody Project Doc*/
//{
//	"type": "docfile",
//	"def": "DocAIAgent",
//	"jaxId": "1J2KQ343H0",
//	"attrs": {
//		"editObjs": {
//			"jaxId": "1J2KQ343H1",
//			"attrs": {
//				"MegaTTS3": {
//					"type": "objclass",
//					"def": "ObjClass",
//					"jaxId": "1J2KQ343I0",
//					"attrs": {
//						"exportType": "UI Data Template",
//						"constructArgs": {
//							"jaxId": "1J2KQ343I1",
//							"attrs": {}
//						},
//						"superClass": "",
//						"properties": {
//							"jaxId": "1J2KQ343I2",
//							"attrs": {}
//						},
//						"functions": {
//							"jaxId": "1J2KQ343I3",
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
//			"jaxId": "1J2KQ343H2",
//			"attrs": {}
//		},
//		"showName": "",
//		"entry": "",
//		"autoStart": "true",
//		"inBrowser": "true",
//		"debug": "true",
//		"apiArgs": {
//			"jaxId": "1J2KQ343H3",
//			"attrs": {}
//		},
//		"localVars": {
//			"jaxId": "1J2KQ343H4",
//			"attrs": {}
//		},
//		"context": {
//			"jaxId": "1J2KQ343H5",
//			"attrs": {}
//		},
//		"globalMockup": {
//			"jaxId": "1J2KQ343H6",
//			"attrs": {}
//		},
//		"segs": {
//			"attrs": [
//				{
//					"type": "aiseg",
//					"def": "RemoteChat",
//					"jaxId": "1J2KQ3BUF0",
//					"attrs": {
//						"id": "Run",
//						"viewName": "",
//						"label": "",
//						"x": "130",
//						"y": "335",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2KQ3UI80",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2KQ3UI81",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"nodeName": "mega_tts3",
//						"callAgent": "agent.js",
//						"callArg": "",
//						"checkUpdate": "true",
//						"options": "\"\"",
//						"outlet": {
//							"jaxId": "1J2KQ3UI70",
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