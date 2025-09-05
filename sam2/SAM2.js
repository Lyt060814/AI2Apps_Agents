//Auto genterated by Cody
import {$P,VFACT,callAfter,sleep} from "/@vfact";
import pathLib from "/@path";
import inherits from "/@inherits";
import Base64 from "/@tabos/utils/base64.js";
import {trimJSON} from "/@aichat/utils.js";
/*#{1J2KBK5420MoreImports*/
/*}#1J2KBK5420MoreImports*/
const agentURL=(new URL(import.meta.url)).pathname;
const baseURL=pathLib.dirname(agentURL);
const basePath=baseURL.startsWith("file://")?decodeURI(baseURL):baseURL;
const $ln=VFACT.lanCode||"EN";
/*#{1J2KBK5420StartDoc*/
/*}#1J2KBK5420StartDoc*/
//----------------------------------------------------------------------------
let SAM2=async function(session){
	let execInput;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let Run;
	/*#{1J2KBK5420LocalVals*/
	/*}#1J2KBK5420LocalVals*/
	
	function parseAgentArgs(input){
		execInput=input;
		/*#{1J2KBK5420ParseArgs*/
		/*}#1J2KBK5420ParseArgs*/
	}
	
	/*#{1J2KBK5420PreContext*/
	/*}#1J2KBK5420PreContext*/
	context={};
	context=VFACT.flexState(context);
	/*#{1J2KBK5420PostContext*/
	/*}#1J2KBK5420PostContext*/
	let $agent,agent,segs={};
	segs["Run"]=Run=async function(input){//:1J2KBKGKO0
		let result,args={};
		args['nodeName']="sam2";
		args['callAgent']="agent.js";
		args['callArg']=undefined;
		args['checkUpdate']=true;
		args['options']="";
		result= await session.pipeChat("/@aichat/ai/RemoteChat.js",args,false);
		return {result:result};
	};
	Run.jaxId="1J2KBKGKO0"
	Run.url="Run@"+agentURL
	
	agent=$agent={
		isAIAgent:true,
		session:session,
		name:"SAM2",
		url:agentURL,
		autoStart:true,
		jaxId:"1J2KBK5420",
		context:context,
		livingSeg:null,
		execChat:async function(input){
			let result;
			parseAgentArgs(input);
			/*#{1J2KBK5420PreEntry*/
			/*}#1J2KBK5420PreEntry*/
			result={seg:Run,"input":input};
			/*#{1J2KBK5420PostEntry*/
			/*}#1J2KBK5420PostEntry*/
			return result;
		},
		/*#{1J2KBK5420MoreAgentAttrs*/
		/*}#1J2KBK5420MoreAgentAttrs*/
	};
	/*#{1J2KBK5420PostAgent*/
	/*}#1J2KBK5420PostAgent*/
	return agent;
};
/*#{1J2KBK5420ExCodes*/
/*}#1J2KBK5420ExCodes*/

//#CodyExport>>>
export const ChatAPI=[{
	def:{
		name: "SAM2",
		description: "Segment Anything Model 2 (SAM 2) is a foundation model towards solving promptable visual segmentation in images.",
		parameters:{
			type: "object",
			properties:{
			}
		}
	},
	agent: SAM2
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
		name:"SAM2",showName:"SAM2",icon:"agent.svg",catalog:["AI Call"],
		attrs:{
			...SegObjShellAttr,
			"outlet":{name:"outlet",type:"aioutlet",def:SegOutletDef,key:1,fixed:1,edit:false,navi:"doc"}
		},
		listHint:["id","codes","desc"],
		desc:"Segment Anything Model 2 (SAM 2) is a foundation model towards solving promptable visual segmentation in images."
	});
	
	DocAIAgentExporter.segTypeExporters["SAM2"]=
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
			coder.packText(`result= await session.pipeChat("/~/sam2/ai/SAM2.js",args,false);`);coder.newLine();
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
/*#{1J2KBK5420PostDoc*/
/*}#1J2KBK5420PostDoc*/


export default SAM2;
export{SAM2};
/*Cody Project Doc*/
//{
//	"type": "docfile",
//	"def": "DocAIAgent",
//	"jaxId": "1J2KBK5420",
//	"attrs": {
//		"editObjs": {
//			"jaxId": "1J2KBK5421",
//			"attrs": {
//				"SAM2": {
//					"type": "objclass",
//					"def": "ObjClass",
//					"jaxId": "1J2KBK5430",
//					"attrs": {
//						"exportType": "UI Data Template",
//						"constructArgs": {
//							"jaxId": "1J2KBK5440",
//							"attrs": {}
//						},
//						"superClass": "",
//						"properties": {
//							"jaxId": "1J2KBK5441",
//							"attrs": {}
//						},
//						"functions": {
//							"jaxId": "1J2KBK5442",
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
//			"jaxId": "1J2KBK5422",
//			"attrs": {}
//		},
//		"showName": "",
//		"entry": "",
//		"autoStart": "true",
//		"inBrowser": "true",
//		"debug": "true",
//		"apiArgs": {
//			"jaxId": "1J2KBK5423",
//			"attrs": {}
//		},
//		"localVars": {
//			"jaxId": "1J2KBK5424",
//			"attrs": {}
//		},
//		"context": {
//			"jaxId": "1J2KBK5425",
//			"attrs": {}
//		},
//		"globalMockup": {
//			"jaxId": "1J2KBK5426",
//			"attrs": {}
//		},
//		"segs": {
//			"attrs": [
//				{
//					"type": "aiseg",
//					"def": "RemoteChat",
//					"jaxId": "1J2KBKGKO0",
//					"attrs": {
//						"id": "Run",
//						"viewName": "",
//						"label": "",
//						"x": "3450",
//						"y": "320",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2KBM0540",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2KBM0541",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"nodeName": "sam2",
//						"callAgent": "agent.js",
//						"callArg": "",
//						"checkUpdate": "true",
//						"options": "\"\"",
//						"outlet": {
//							"jaxId": "1J2KBL7CG0",
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
//		"desc": "Segment Anything Model 2 (SAM 2) is a foundation model towards solving promptable visual segmentation in images.",
//		"exportAPI": "true",
//		"exportAddOn": "true",
//		"addOnOpts": ""
//	}
//}