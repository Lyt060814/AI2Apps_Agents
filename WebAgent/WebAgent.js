//Auto genterated by Cody
import {$P,VFACT,callAfter,sleep} from "/@vfact";
import pathLib from "/@path";
import inherits from "/@inherits";
import Base64 from "/@tabos/utils/base64.js";
import {trimJSON} from "/@aichat/utils.js";
/*#{1IRMEIBHJ0MoreImports*/
/*}#1IRMEIBHJ0MoreImports*/
const agentURL=(new URL(import.meta.url)).pathname;
const basePath=pathLib.dirname(agentURL);
const $ln=VFACT.lanCode||"EN";
/*#{1IRMEIBHJ0StartDoc*/
/*}#1IRMEIBHJ0StartDoc*/
//----------------------------------------------------------------------------
let WebAgent=async function(session){
	let execInput;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let WebAgent;
	/*#{1IRMEIBHJ0LocalVals*/
	/*}#1IRMEIBHJ0LocalVals*/
	
	function parseAgentArgs(input){
		execInput=input;
		/*#{1IRMEIBHJ0ParseArgs*/
		/*}#1IRMEIBHJ0ParseArgs*/
	}
	
	/*#{1IRMEIBHJ0PreContext*/
	/*}#1IRMEIBHJ0PreContext*/
	context={};
	context=VFACT.flexState(context);
	/*#{1IRMEIBHJ0PostContext*/
	/*}#1IRMEIBHJ0PostContext*/
	let $agent,agent,segs={};
	segs["WebAgent"]=WebAgent=async function(input){//:1IRMEIG640
		let result,args={};
		args['nodeName']="WebAgent";
		args['callAgent']="agent.js";
		args['callArg']=input;
		args['checkUpdate']=true;
		args['options']="";
		result= await session.pipeChat("/@aichat/ai/RemoteChat.js",args,false);
		return {result:result};
	};
	WebAgent.jaxId="1IRMEIG640"
	WebAgent.url="WebAgent@"+agentURL
	
	agent=$agent={
		isAIAgent:true,
		session:session,
		name:"WebAgent",
		url:agentURL,
		autoStart:true,
		jaxId:"1IRMEIBHJ0",
		context:context,
		livingSeg:null,
		execChat:async function(input){
			let result;
			parseAgentArgs(input);
			/*#{1IRMEIBHJ0PreEntry*/
			/*}#1IRMEIBHJ0PreEntry*/
			result={seg:WebAgent,"input":input};
			/*#{1IRMEIBHJ0PostEntry*/
			/*}#1IRMEIBHJ0PostEntry*/
			return result;
		},
		/*#{1IRMEIBHJ0MoreAgentAttrs*/
		/*}#1IRMEIBHJ0MoreAgentAttrs*/
	};
	/*#{1IRMEIBHJ0PostAgent*/
	/*}#1IRMEIBHJ0PostAgent*/
	return agent;
};
/*#{1IRMEIBHJ0ExCodes*/
/*}#1IRMEIBHJ0ExCodes*/

//#CodyExport>>>
export const ChatAPI=[{
	def:{
		name: "WebAgent",
		description: "这是一个控制浏览器协助用户完成网页端任务的通用智能体。",
		parameters:{
			type: "object",
			properties:{
			}
		}
	},
	agent: WebAgent
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
		name:"WebAgent",showName:"WebAgent",icon:"agent.svg",catalog:["AI Call"],
		attrs:{
			...SegObjShellAttr,
			"outlet":{name:"outlet",type:"aioutlet",def:SegOutletDef,key:1,fixed:1,edit:false,navi:"doc"}
		},
		listHint:["id","codes","desc"],
		desc:"这是一个控制浏览器协助用户完成网页端任务的通用智能体。"
	});
	
	DocAIAgentExporter.segTypeExporters["WebAgent"]=
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
			coder.packText(`result= await session.pipeChat("/~/WebAgent/ai/WebAgent.js",args,false);`);coder.newLine();
			this.packExtraCodes(coder,seg,"PostCodes");
			this.packUpdateContext(coder,seg);
			this.packUpdateGlobal(coder,seg);
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
/*#{1IRMEIBHJ0PostDoc*/
/*}#1IRMEIBHJ0PostDoc*/


export default WebAgent;
export{WebAgent};
/*Cody Project Doc*/
//{
//	"type": "docfile",
//	"def": "DocAIAgent",
//	"jaxId": "1IRMEIBHJ0",
//	"attrs": {
//		"editObjs": {
//			"jaxId": "1IRMEIBHJ1",
//			"attrs": {
//				"WebAgent": {
//					"type": "objclass",
//					"def": "ObjClass",
//					"jaxId": "1IRMEIBHJ7",
//					"attrs": {
//						"exportType": "UI Data Template",
//						"constructArgs": {
//							"jaxId": "1IRMEIBHK0",
//							"attrs": {}
//						},
//						"superClass": "",
//						"properties": {
//							"jaxId": "1IRMEIBHK1",
//							"attrs": {}
//						},
//						"functions": {
//							"jaxId": "1IRMEIBHK2",
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
//			"jaxId": "1IRMEIBHJ2",
//			"attrs": {}
//		},
//		"showName": "",
//		"entry": "WebAgent",
//		"autoStart": "true",
//		"inBrowser": "true",
//		"debug": "true",
//		"apiArgs": {
//			"jaxId": "1IRMEIBHJ3",
//			"attrs": {}
//		},
//		"localVars": {
//			"jaxId": "1IRMEIBHJ4",
//			"attrs": {}
//		},
//		"context": {
//			"jaxId": "1IRMEIBHJ5",
//			"attrs": {}
//		},
//		"globalMockup": {
//			"jaxId": "1IRMEIBHJ6",
//			"attrs": {}
//		},
//		"segs": {
//			"attrs": [
//				{
//					"type": "aiseg",
//					"def": "RemoteChat",
//					"jaxId": "1IRMEIG640",
//					"attrs": {
//						"id": "WebAgent",
//						"viewName": "",
//						"label": "",
//						"x": "205",
//						"y": "100",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IRMEIML91",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IRMEIML92",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"nodeName": "WebAgent",
//						"callAgent": "agent.js",
//						"callArg": "#input",
//						"checkUpdate": "true",
//						"options": "\"\"",
//						"outlet": {
//							"jaxId": "1IRMEIML90",
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
//		"desc": "这是一个控制浏览器协助用户完成网页端任务的通用智能体。",
//		"exportAPI": "true",
//		"exportAddOn": "true",
//		"addOnOpts": ""
//	}
//}