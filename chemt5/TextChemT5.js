//Auto genterated by Cody
import {$P,VFACT,callAfter,sleep} from "/@vfact";
import pathLib from "/@path";
import inherits from "/@inherits";
import Base64 from "/@tabos/utils/base64.js";
import {trimJSON} from "/@aichat/utils.js";
/*#{1J24M4Q0P0MoreImports*/
/*}#1J24M4Q0P0MoreImports*/
const agentURL=(new URL(import.meta.url)).pathname;
const baseURL=pathLib.dirname(agentURL);
const basePath=baseURL.startsWith("file://")?decodeURI(baseURL):baseURL;
const $ln=VFACT.lanCode||"EN";
const argsTemplate={
	properties:{
		"task":{
			"name":"task","type":"string",
			"required":true,
			"defaultValue":"",
			"desc":"The task to perform. Choose from: 'Reaction Prediction', 'Text-Based Molecule Design', 'Molecule Captioning'",
		}
	},
	/*#{1J24M4Q0P0ArgsView*/
	/*}#1J24M4Q0P0ArgsView*/
};

/*#{1J24M4Q0P0StartDoc*/
/*}#1J24M4Q0P0StartDoc*/
//----------------------------------------------------------------------------
let TextChemT5=async function(session){
	let task;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let FixArgs,GetInput;
	/*#{1J24M4Q0P0LocalVals*/
	let task_file = {
		"Reaction Prediction": "TaskReaction.js",
		"Text-Based Molecule Design": "TaskDesign.js",
		"Molecule Captioning": "TaskCaptioning.js"
	};
	/*}#1J24M4Q0P0LocalVals*/
	
	function parseAgentArgs(input){
		if(typeof(input)=='object'){
			task=input.task;
		}else{
			task=undefined;
		}
		/*#{1J24M4Q0P0ParseArgs*/
		/*}#1J24M4Q0P0ParseArgs*/
	}
	
	/*#{1J24M4Q0P0PreContext*/
	/*}#1J24M4Q0P0PreContext*/
	context={};
	context=VFACT.flexState(context);
	/*#{1J24M4Q0P0PostContext*/
	/*}#1J24M4Q0P0PostContext*/
	let $agent,agent,segs={};
	segs["FixArgs"]=FixArgs=async function(input){//:1J29DQMAE0
		let result=input;
		let missing=false;
		let smartAsk=false;
		if(task===undefined || task==="") missing=true;
		if(missing){
			result=await session.pipeChat("/@aichat/ai/CompleteArgs.js",{"argsTemplate":argsTemplate,"command":input,smartAsk:smartAsk},false);
			parseAgentArgs(result);
		}
		return {seg:GetInput,result:(result),preSeg:"1J29DQMAE0",outlet:"1J29DRDV70"};
	};
	FixArgs.jaxId="1J29DQMAE0"
	FixArgs.url="FixArgs@"+agentURL
	
	segs["GetInput"]=GetInput=async function(input){//:1J29R6GOH0
		let result,args={};
		args['nodeName']="chemt5";
		args['callAgent']="";
		args['callArg']=undefined;
		args['checkUpdate']=true;
		args['options']="";
		/*#{1J29R6GOH0PreCodes*/
		args['callAgent']=task_file[task];
		args['callArg']={"task":task};
		/*}#1J29R6GOH0PreCodes*/
		result= await session.pipeChat("/@aichat/ai/RemoteChat.js",args,false);
		/*#{1J29R6GOH0PostCodes*/
		/*}#1J29R6GOH0PostCodes*/
		return {result:result};
	};
	GetInput.jaxId="1J29R6GOH0"
	GetInput.url="GetInput@"+agentURL
	
	agent=$agent={
		isAIAgent:true,
		session:session,
		name:"TextChemT5",
		url:agentURL,
		autoStart:true,
		jaxId:"1J24M4Q0P0",
		context:context,
		livingSeg:null,
		execChat:async function(input/*{task}*/){
			let result;
			parseAgentArgs(input);
			/*#{1J24M4Q0P0PreEntry*/
			/*}#1J24M4Q0P0PreEntry*/
			result={seg:FixArgs,"input":input};
			/*#{1J24M4Q0P0PostEntry*/
			/*}#1J24M4Q0P0PostEntry*/
			return result;
		},
		/*#{1J24M4Q0P0MoreAgentAttrs*/
		/*}#1J24M4Q0P0MoreAgentAttrs*/
	};
	/*#{1J24M4Q0P0PostAgent*/
	/*}#1J24M4Q0P0PostAgent*/
	return agent;
};
/*#{1J24M4Q0P0ExCodes*/
/*}#1J24M4Q0P0ExCodes*/

//#CodyExport>>>
export const ChatAPI=[{
	def:{
		name: "TextChemT5",
		description: "This is an agent that can use Chem-T5 Model to complete chemistry tasks like Molecule Captioning.",
		parameters:{
			type: "object",
			properties:{
				task:{type:"string",description:"The task to perform. Choose from: 'Reaction Prediction', 'Text-Based Molecule Design', 'Molecule Captioning'",enum:["Reaction Prediction","Text-Based Molecule Design","Molecule Captioning"]}
			}
		}
	},
	agent: TextChemT5
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
		name:"TextChemT5",showName:"TextChemT5",icon:"agent.svg",catalog:["AI Call"],
		attrs:{
			...SegObjShellAttr,
			"task":{name:"task",showName:undefined,type:"string",key:1,fixed:1,initVal:""},
			"outlet":{name:"outlet",type:"aioutlet",def:SegOutletDef,key:1,fixed:1,edit:false,navi:"doc"}
		},
		listHint:["id","task","codes","desc"],
		desc:"This is an agent that can use Chem-T5 Model to complete chemistry tasks like Molecule Captioning."
	});
	
	DocAIAgentExporter.segTypeExporters["TextChemT5"]=
	function(seg){
		let coder=this.coder;
		let segName=seg.idVal.val;
		let exportDebug=this.isExportDebug();
		segName=(segName &&varNameRegex.test(segName))?segName:("SEG"+seg.jaxId);
		coder.packText(`segs["${segName}"]=${segName}=async function(input){//:${seg.jaxId}`);
		coder.indentMore();coder.newLine();
		{
			coder.packText(`let result,args={};`);coder.newLine();
			coder.packText("args['task']=");this.genAttrStatement(seg.getAttr("task"));coder.packText(";");coder.newLine();
			this.packExtraCodes(coder,seg,"PreCodes");
			coder.packText(`result= await session.pipeChat("/~/chemt5/ai/TextChemT5.js",args,false);`);coder.newLine();
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
/*#{1J24M4Q0P0PostDoc*/
/*}#1J24M4Q0P0PostDoc*/


export default TextChemT5;
export{TextChemT5};
/*Cody Project Doc*/
//{
//	"type": "docfile",
//	"def": "DocAIAgent",
//	"jaxId": "1J24M4Q0P0",
//	"attrs": {
//		"editObjs": {
//			"jaxId": "1J24M4Q0P1",
//			"attrs": {
//				"TextChemT5": {
//					"type": "objclass",
//					"def": "ObjClass",
//					"jaxId": "1J24M4Q0Q0",
//					"attrs": {
//						"exportType": "UI Data Template",
//						"constructArgs": {
//							"jaxId": "1J24M4Q0Q1",
//							"attrs": {}
//						},
//						"superClass": "",
//						"properties": {
//							"jaxId": "1J24M4Q0Q2",
//							"attrs": {}
//						},
//						"functions": {
//							"jaxId": "1J24M4Q0Q3",
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
//			"jaxId": "1J24M4Q0P2",
//			"attrs": {}
//		},
//		"showName": "",
//		"entry": "",
//		"autoStart": "true",
//		"inBrowser": "true",
//		"debug": "true",
//		"apiArgs": {
//			"jaxId": "1J24M4Q0P3",
//			"attrs": {
//				"task": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1J29E30HU0",
//					"attrs": {
//						"type": "String",
//						"mockup": "\"\"",
//						"desc": "The task to perform. Choose from: 'Reaction Prediction', 'Text-Based Molecule Design', 'Molecule Captioning'",
//						"required": "true",
//						"enum": {
//							"type": "array",
//							"def": "Array",
//							"attrs": [
//								{
//									"type": "auto",
//									"valText": "Reaction Prediction"
//								},
//								{
//									"type": "auto",
//									"valText": "Text-Based Molecule Design"
//								},
//								{
//									"type": "auto",
//									"valText": "Molecule Captioning"
//								}
//							]
//						}
//					}
//				}
//			}
//		},
//		"localVars": {
//			"jaxId": "1J24M4Q0P4",
//			"attrs": {}
//		},
//		"context": {
//			"jaxId": "1J24M4Q0P5",
//			"attrs": {}
//		},
//		"globalMockup": {
//			"jaxId": "1J24M4Q0P6",
//			"attrs": {}
//		},
//		"segs": {
//			"attrs": [
//				{
//					"type": "aiseg",
//					"def": "fixArgs",
//					"jaxId": "1J29DQMAE0",
//					"attrs": {
//						"id": "FixArgs",
//						"viewName": "",
//						"label": "",
//						"x": "480",
//						"y": "370",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"smartAsk": "false",
//						"outlet": {
//							"jaxId": "1J29DRDV70",
//							"attrs": {
//								"id": "Next",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J29R6GOH0"
//						}
//					},
//					"icon": "args.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "RemoteChat",
//					"jaxId": "1J29R6GOH0",
//					"attrs": {
//						"id": "GetInput",
//						"viewName": "",
//						"label": "",
//						"x": "710",
//						"y": "370",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J29REAUI0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J29REAUI1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"nodeName": "chemt5",
//						"callAgent": "",
//						"callArg": "",
//						"checkUpdate": "true",
//						"options": "\"\"",
//						"outlet": {
//							"jaxId": "1J29R8NTP0",
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
//		"desc": "This is an agent that can use Chem-T5 Model to complete chemistry tasks like Molecule Captioning.",
//		"exportAPI": "true",
//		"exportAddOn": "true",
//		"addOnOpts": ""
//	}
//}