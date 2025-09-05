//Auto genterated by Cody
import {$P,VFACT,callAfter,sleep} from "/@vfact";
import pathLib from "/@path";
import inherits from "/@inherits";
import Base64 from "/@tabos/utils/base64.js";
import {trimJSON} from "/@aichat/utils.js";
/*#{1IMPAFVPB0MoreImports*/
/*}#1IMPAFVPB0MoreImports*/
const agentURL=(new URL(import.meta.url)).pathname;
const basePath=pathLib.dirname(agentURL);
const $ln=VFACT.lanCode||"EN";
/*#{1IMPAFVPB0StartDoc*/
/*}#1IMPAFVPB0StartDoc*/
//----------------------------------------------------------------------------
let Search=async function(session){
	let execInput;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let Run;
	/*#{1IMPAFVPB0LocalVals*/
	/*}#1IMPAFVPB0LocalVals*/
	
	function parseAgentArgs(input){
		execInput=input;
		/*#{1IMPAFVPB0ParseArgs*/
		/*}#1IMPAFVPB0ParseArgs*/
	}
	
	/*#{1IMPAFVPB0PreContext*/
	/*}#1IMPAFVPB0PreContext*/
	context={};
	context=VFACT.flexState(context);
	/*#{1IMPAFVPB0PostContext*/
	/*}#1IMPAFVPB0PostContext*/
	let agent,segs={};
	segs["Run"]=Run=async function(input){//:1IMPAG4QH0
		let result,args={};
		args['nodeName']="DeepSearch";
		args['callAgent']="agent.js";
		args['callArg']=input;
		args['checkUpdate']=true;
		result= await session.pipeChat("/@aichat/ai/RemoteChat.js",args,false);
		return {result:result};
	};
	Run.jaxId="1IMPAG4QH0"
	Run.url="Run@"+agentURL
	
	agent={
		isAIAgent:true,
		session:session,
		name:"Search",
		url:agentURL,
		autoStart:true,
		jaxId:"1IMPAFVPB0",
		context:context,
		livingSeg:null,
		execChat:async function(input){
			let result;
			parseAgentArgs(input);
			/*#{1IMPAFVPB0PreEntry*/
			/*}#1IMPAFVPB0PreEntry*/
			result={seg:Run,"input":input};
			/*#{1IMPAFVPB0PostEntry*/
			/*}#1IMPAFVPB0PostEntry*/
			return result;
		},
		/*#{1IMPAFVPB0MoreAgentAttrs*/
		/*}#1IMPAFVPB0MoreAgentAttrs*/
	};
	/*#{1IMPAFVPB0PostAgent*/
	/*}#1IMPAFVPB0PostAgent*/
	return agent;
};
/*#{1IMPAFVPB0ExCodes*/
/*}#1IMPAFVPB0ExCodes*/

//#CodyExport>>>
export const ChatAPI=[{
	def:{
		name: "Search",
		description: "这是一个用于调用浏览器搜索相关信息，总结并给出答案的智能体。如果用户希望获取具体信息，做进一步的分析，请调用这个智能体。",
		parameters:{
			type: "object",
			properties:{
			}
		}
	},
	agent: Search
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
		name:"Search",showName:"Search",icon:"agent.svg",catalog:["AI Call"],
		attrs:{
			...SegObjShellAttr,
			"outlet":{name:"outlet",type:"aioutlet",def:SegOutletDef,key:1,fixed:1,edit:false,navi:"doc"}
		},
		listHint:["id","codes","desc"],
		desc:"这是一个用于调用浏览器搜索相关信息，总结并给出答案的智能体。如果用户希望获取具体信息，做进一步的分析，请调用这个智能体。"
	});
	
	DocAIAgentExporter.segTypeExporters["Search"]=
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
			coder.packText(`result= await session.pipeChat("/~/DeepSearch/ai/Search.js",args,false);`);coder.newLine();
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
/*#{1IMPAFVPB0PostDoc*/
/*}#1IMPAFVPB0PostDoc*/


export default Search;
export{Search};
/*Cody Project Doc*/
//{
//	"type": "docfile",
//	"def": "DocAIAgent",
//	"jaxId": "1IMPAFVPB0",
//	"attrs": {
//		"editObjs": {
//			"jaxId": "1IMPAG8EN1",
//			"attrs": {}
//		},
//		"agent": {
//			"jaxId": "1IMPAG8EN2",
//			"attrs": {}
//		},
//		"entry": "",
//		"autoStart": "true",
//		"inBrowser": "true",
//		"debug": "true",
//		"apiArgs": {
//			"jaxId": "1IMPAG8EN3",
//			"attrs": {}
//		},
//		"localVars": {
//			"jaxId": "1IMPAG8EN4",
//			"attrs": {}
//		},
//		"context": {
//			"jaxId": "1IMPAG8EN5",
//			"attrs": {}
//		},
//		"globalMockup": {
//			"jaxId": "1IMPAG8EN6",
//			"attrs": {}
//		},
//		"segs": {
//			"attrs": [
//				{
//					"type": "aiseg",
//					"def": "RemoteChat",
//					"jaxId": "1IMPAG4QH0",
//					"attrs": {
//						"id": "Run",
//						"viewName": "",
//						"label": "",
//						"x": "405",
//						"y": "115",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IMPAG8EO0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IMPAG8EO1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"nodeName": "DeepSearch",
//						"callAgent": "agent.js",
//						"callArg": "#input",
//						"checkUpdate": "true",
//						"outlet": {
//							"jaxId": "1IMPAG8EN0",
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
//		"desc": "这是一个用于调用浏览器搜索相关信息，总结并给出答案的智能体。如果用户希望获取具体信息，做进一步的分析，请调用这个智能体。",
//		"exportAPI": "true",
//		"exportAddOn": "true",
//		"addOnOpts": ""
//	}
//}