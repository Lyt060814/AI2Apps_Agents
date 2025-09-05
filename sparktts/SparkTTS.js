//Auto genterated by Cody
import {$P,VFACT,callAfter,sleep} from "/@vfact";
import pathLib from "/@path";
import inherits from "/@inherits";
import Base64 from "/@tabos/utils/base64.js";
import {trimJSON} from "/@aichat/utils.js";
/*#{1IM269VFR0MoreImports*/
/*}#1IM269VFR0MoreImports*/
const agentURL=(new URL(import.meta.url)).pathname;
const basePath=pathLib.dirname(agentURL);
const $ln=VFACT.lanCode||"EN";
/*#{1IM269VFR0StartDoc*/
/*}#1IM269VFR0StartDoc*/
//----------------------------------------------------------------------------
let SparkTTS=async function(session){
	let execInput;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let run;
	/*#{1IM269VFR0LocalVals*/
	/*}#1IM269VFR0LocalVals*/
	
	function parseAgentArgs(input){
		execInput=input;
		/*#{1IM269VFR0ParseArgs*/
		/*}#1IM269VFR0ParseArgs*/
	}
	
	/*#{1IM269VFR0PreContext*/
	/*}#1IM269VFR0PreContext*/
	context={};
	context=VFACT.flexState(context);
	/*#{1IM269VFR0PostContext*/
	/*}#1IM269VFR0PostContext*/
	let $agent,agent,segs={};
	segs["run"]=run=async function(input){//:1IM268P480
		let result,args={};
		args['nodeName']="sparktts";
		args['callAgent']="AutoTTS.js";
		args['callArg']=input;
		args['checkUpdate']=true;
		args['options']="";
		result= await session.pipeChat("/@aichat/ai/RemoteChat.js",args,false);
		return {result:result};
	};
	run.jaxId="1IM268P480"
	run.url="run@"+agentURL
	
	agent=$agent={
		isAIAgent:true,
		session:session,
		name:"SparkTTS",
		url:agentURL,
		autoStart:true,
		jaxId:"1IM269VFR0",
		context:context,
		livingSeg:null,
		execChat:async function(input){
			let result;
			parseAgentArgs(input);
			/*#{1IM269VFR0PreEntry*/
			/*}#1IM269VFR0PreEntry*/
			result={seg:run,"input":input};
			/*#{1IM269VFR0PostEntry*/
			/*}#1IM269VFR0PostEntry*/
			return result;
		},
		/*#{1IM269VFR0MoreAgentAttrs*/
		/*}#1IM269VFR0MoreAgentAttrs*/
	};
	/*#{1IM269VFR0PostAgent*/
	/*}#1IM269VFR0PostAgent*/
	return agent;
};
/*#{1IM269VFR0ExCodes*/
/*}#1IM269VFR0ExCodes*/

//#CodyExport>>>
export const ChatAPI=[{
	def:{
		name: "SparkTTS",
		description: "This is an agent that can help transform text into speech with different voices.",
		parameters:{
			type: "object",
			properties:{
			}
		}
	},
	agent: SparkTTS
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
		name:"SparkTTS",showName:"SparkTTS",icon:"agent.svg",catalog:["AI Call"],
		attrs:{
			...SegObjShellAttr,
			"outlet":{name:"outlet",type:"aioutlet",def:SegOutletDef,key:1,fixed:1,edit:false,navi:"doc"}
		},
		listHint:["id","codes","desc"],
		desc:"This is an agent that can help transform text into speech with different voices."
	});
	
	DocAIAgentExporter.segTypeExporters["SparkTTS"]=
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
			coder.packText(`result= await session.pipeChat("/~/sparktts/ai/SparkTTS.js",args,false);`);coder.newLine();
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
/*#{1IM269VFR0PostDoc*/
/*}#1IM269VFR0PostDoc*/


export default SparkTTS;
export{SparkTTS};
/*Cody Project Doc*/
//{
//	"type": "docfile",
//	"def": "DocAIAgent",
//	"jaxId": "1IM269VFR0",
//	"attrs": {
//		"editObjs": {
//			"jaxId": "1IM269VFU0",
//			"attrs": {}
//		},
//		"agent": {
//			"jaxId": "1IM26970C0",
//			"attrs": {}
//		},
//		"showName": "",
//		"entry": "",
//		"autoStart": "true",
//		"inBrowser": "true",
//		"debug": "true",
//		"apiArgs": {
//			"jaxId": "1IM269VFU1",
//			"attrs": {}
//		},
//		"localVars": {
//			"jaxId": "1IM269VFU2",
//			"attrs": {}
//		},
//		"context": {
//			"jaxId": "1IM269VFU3",
//			"attrs": {}
//		},
//		"globalMockup": {
//			"jaxId": "1IM269VFU4",
//			"attrs": {}
//		},
//		"segs": {
//			"attrs": [
//				{
//					"type": "aiseg",
//					"def": "RemoteChat",
//					"jaxId": "1IM268P480",
//					"attrs": {
//						"id": "run",
//						"viewName": "",
//						"label": "",
//						"x": "435",
//						"y": "210",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IM269VFV0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IM269VFV1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"nodeName": "sparktts",
//						"callAgent": "AutoTTS.js",
//						"callArg": "#input",
//						"checkUpdate": "true",
//						"options": "\"\"",
//						"outlet": {
//							"jaxId": "1IM269VFS0",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							}
//						}
//					},
//					"icon": "cloudact.svg"
//				}
//			]
//		},
//		"desc": "This is an agent that can help transform text into speech with different voices.",
//		"exportAPI": "true",
//		"exportAddOn": "true",
//		"addOnOpts": ""
//	}
//}