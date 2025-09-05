//Auto genterated by Cody
import pathLib from "path";
import Base64 from "../../agenthub/base64.mjs";
import {trimJSON} from "../../agenthub/ChatSession.mjs";
import {URL} from "url";
/*#{1J247CLNV0MoreImports*/
/*}#1J247CLNV0MoreImports*/
const agentURL=(new URL(import.meta.url)).pathname;
const baseURL=pathLib.dirname(agentURL);
const basePath=baseURL.startsWith("file://")?pathLib.pathToFileURL(baseURL):baseURL;
const VFACT=null;
const argsTemplate={
	properties:{
		"task":{
			"name":"task","type":"string",
			"required":true,
			"defaultValue":"",
			"desc":"",
		},
		"task_input":{
			"name":"task_input","type":"string",
			"required":true,
			"defaultValue":"",
			"desc":"",
		}
	},
	/*#{1J247CLNV0ArgsView*/
	/*}#1J247CLNV0ArgsView*/
};

/*#{1J247CLNV0StartDoc*/
/*}#1J247CLNV0StartDoc*/
//----------------------------------------------------------------------------
let ChemT5=async function(session){
	let task,task_input;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let FixArgs,InitBash,InitConda,Run,Parse,Done;
	/*#{1J247CLNV0LocalVals*/
	const conda="chemt5";
	let save_path="./captioning.json";
	/*}#1J247CLNV0LocalVals*/
	
	function parseAgentArgs(input){
		if(typeof(input)=='object'){
			task=input.task;
			task_input=input.task_input;
		}else{
			task=undefined;
			task_input=undefined;
		}
		/*#{1J247CLNV0ParseArgs*/
		/*}#1J247CLNV0ParseArgs*/
	}
	
	/*#{1J247CLNV0PreContext*/
	/*}#1J247CLNV0PreContext*/
	context={};
	/*#{1J247CLNV0PostContext*/
	/*}#1J247CLNV0PostContext*/
	let $agent,agent,segs={};
	segs["FixArgs"]=FixArgs=async function(input){//:1J24986FO0
		let result=input;
		let missing=false;
		let smartAsk=false;
		if(task===undefined || task==="") missing=true;
		if(task_input===undefined || task_input==="") missing=true;
		if(missing){
			result=await session.pipeChat("/@tabos/HubFixArgs.mjs",{"argsTemplate":argsTemplate,"command":input,smartAsk:smartAsk},false);
			parseAgentArgs(result);
		}
		return {seg:InitBash,result:(result),preSeg:"1J24986FO0",outlet:"1J2498MJ20"};
	};
	FixArgs.jaxId="1J24986FO0"
	FixArgs.url="FixArgs@"+agentURL
	
	segs["InitBash"]=InitBash=async function(input){//:1J24A0VEM0
		let result=input
		/*#{1J24A0VEM0Code*/
		let args={};
		args['bashId']="";
		args['action']="Create";
		args['commands']="";
		args['options']={client:true};
		result= await session.pipeChat("/@AgentBuilder/Bash.js",args,false);
		globalContext.bash=result;
		/*}#1J24A0VEM0Code*/
		return {seg:InitConda,result:(result),preSeg:"1J24A0VEM0",outlet:"1J24A17350"};
	};
	InitBash.jaxId="1J24A0VEM0"
	InitBash.url="InitBash@"+agentURL
	
	segs["InitConda"]=InitConda=async function(input){//:1J24A43120
		let result=input
		/*#{1J24A43120Code*/
		let args={};
		args['bashId']=globalContext.bash;
		args['action']="Command";
		args['commands']=[`conda activate ${conda}`,`cd "${decodeURIComponent(basePath)}"`];
		args['options']="";
		result= await session.pipeChat("/@AgentBuilder/Bash.js",args,false);
		/*}#1J24A43120Code*/
		return {seg:Run,result:(result),preSeg:"1J24A43120",outlet:"1J24A4E3L0"};
	};
	InitConda.jaxId="1J24A43120"
	InitConda.url="InitConda@"+agentURL
	
	segs["Run"]=Run=async function(input){//:1J24BJMF60
		let result=input
		/*#{1J24BJMF60Code*/
		let args={};
		args['bashId']=globalContext.bash;
		args['action']="Command";
		args['commands']=undefined;
		args['options']="";
		/*#{1IM23L7C60PreCodes*/
		let command="";
		command=`python chemt5.py --task "${task}" --input "${task_input}"`;
		args['commands']=command;
		/*}#1IM23L7C60PreCodes*/
		result= await session.pipeChat("/@AgentBuilder/Bash.js",args,false);
		/*}#1J24BJMF60Code*/
		return {seg:Parse,result:(result),preSeg:"1J24BJMF60",outlet:"1J24BK3T70"};
	};
	Run.jaxId="1J24BJMF60"
	Run.url="Run@"+agentURL
	
	segs["Parse"]=Parse=async function(input){//:1J24I9QQB0
		let result=input
		/*#{1J24I9QQB0Code*/
		const startSeparator = "---OUTPUT_START---";
		const endSeparator = "---OUTPUT_END---";
		const startIndex = result.indexOf(startSeparator);
		const endIndex = result.indexOf(endSeparator);
		
		if (startIndex !== -1 && endIndex > startIndex) {
			result = result.substring(startIndex + startSeparator.length, endIndex).trim();
		} else if (startIndex !== -1) {
			result = result.substring(startIndex + startSeparator.length).trim();
		}
		/*}#1J24I9QQB0Code*/
		return {seg:Done,result:(result),preSeg:"1J24I9QQB0",outlet:"1J24IAGSA0"};
	};
	Parse.jaxId="1J24I9QQB0"
	Parse.url="Parse@"+agentURL
	
	segs["Done"]=Done=async function(input){//:1J29RG5E60
		let result=input;
		let opts={txtHeader:($agent.showName||$agent.name||null)};
		let role="assistant";
		let content=input;
		session.addChatText(role,content,opts);
		return {result:result};
	};
	Done.jaxId="1J29RG5E60"
	Done.url="Done@"+agentURL
	
	agent=$agent={
		isAIAgent:true,
		session:session,
		name:"ChemT5",
		url:agentURL,
		autoStart:true,
		jaxId:"1J247CLNV0",
		context:context,
		livingSeg:null,
		execChat:async function(input/*{task,task_input}*/){
			let result;
			parseAgentArgs(input);
			/*#{1J247CLNV0PreEntry*/
			/*}#1J247CLNV0PreEntry*/
			result={seg:FixArgs,"input":input};
			/*#{1J247CLNV0PostEntry*/
			/*}#1J247CLNV0PostEntry*/
			return result;
		},
		/*#{1J247CLNV0MoreAgentAttrs*/
		/*}#1J247CLNV0MoreAgentAttrs*/
	};
	/*#{1J247CLNV0PostAgent*/
	/*}#1J247CLNV0PostAgent*/
	return agent;
};
/*#{1J247CLNV0ExCodes*/
/*}#1J247CLNV0ExCodes*/

//#CodyExport>>>
//#CodyExport<<<
/*#{1J247CLNV0PostDoc*/
/*}#1J247CLNV0PostDoc*/


export default ChemT5;
export{ChemT5};
/*Cody Project Doc*/
//{
//	"type": "docfile",
//	"def": "DocAIAgent",
//	"jaxId": "1J247CLNV0",
//	"attrs": {
//		"editObjs": {
//			"jaxId": "1J247CLO00",
//			"attrs": {
//				"ChemT5": {
//					"type": "objclass",
//					"def": "ObjClass",
//					"jaxId": "1J247CLO10",
//					"attrs": {
//						"exportType": "UI Data Template",
//						"constructArgs": {
//							"jaxId": "1J247CLO11",
//							"attrs": {}
//						},
//						"superClass": "",
//						"properties": {
//							"jaxId": "1J247CLO12",
//							"attrs": {}
//						},
//						"functions": {
//							"jaxId": "1J247CLO13",
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
//			"jaxId": "1J247CLO01",
//			"attrs": {}
//		},
//		"showName": "",
//		"entry": "",
//		"autoStart": "true",
//		"inBrowser": "false",
//		"debug": "true",
//		"apiArgs": {
//			"jaxId": "1J247CLO02",
//			"attrs": {
//				"task": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1J29PAATM0",
//					"attrs": {
//						"type": "String",
//						"mockup": "\"\"",
//						"desc": "",
//						"required": "true"
//					}
//				},
//				"task_input": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1J29CU8U31",
//					"attrs": {
//						"type": "String",
//						"mockup": "\"\"",
//						"desc": "",
//						"required": "true"
//					}
//				}
//			}
//		},
//		"localVars": {
//			"jaxId": "1J247CLO03",
//			"attrs": {}
//		},
//		"context": {
//			"jaxId": "1J247CLO04",
//			"attrs": {}
//		},
//		"globalMockup": {
//			"jaxId": "1J247CLO05",
//			"attrs": {}
//		},
//		"segs": {
//			"attrs": [
//				{
//					"type": "aiseg",
//					"def": "fixArgs",
//					"jaxId": "1J24986FO0",
//					"attrs": {
//						"id": "FixArgs",
//						"viewName": "",
//						"label": "",
//						"x": "345",
//						"y": "375",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"smartAsk": "false",
//						"outlet": {
//							"jaxId": "1J2498MJ20",
//							"attrs": {
//								"id": "Next",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J24A0VEM0"
//						}
//					},
//					"icon": "args.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1J24A0VEM0",
//					"attrs": {
//						"id": "InitBash",
//						"viewName": "",
//						"label": "",
//						"x": "570",
//						"y": "375",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J24C13PS0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J24C13PS1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J24A17350",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J24A43120"
//						},
//						"outlets": {
//							"attrs": []
//						},
//						"result": "#input"
//					},
//					"icon": "tab_css.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1J24A43120",
//					"attrs": {
//						"id": "InitConda",
//						"viewName": "",
//						"label": "",
//						"x": "845",
//						"y": "375",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J24C13PS2",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J24C13PS3",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J24A4E3L0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J24BJMF60"
//						},
//						"outlets": {
//							"attrs": []
//						},
//						"result": "#input"
//					},
//					"icon": "tab_css.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1J24BJMF60",
//					"attrs": {
//						"id": "Run",
//						"viewName": "",
//						"label": "",
//						"x": "1125",
//						"y": "375",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J24C13PS4",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J24C13PS5",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J24BK3T70",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J24I9QQB0"
//						},
//						"outlets": {
//							"attrs": []
//						},
//						"result": "#input"
//					},
//					"icon": "tab_css.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1J24I9QQB0",
//					"attrs": {
//						"id": "Parse",
//						"viewName": "",
//						"label": "",
//						"x": "1385",
//						"y": "375",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J24IC6M80",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J24IC6M81",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J24IAGSA0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J29RG5E60"
//						},
//						"outlets": {
//							"attrs": []
//						},
//						"result": "#input"
//					},
//					"icon": "tab_css.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "output",
//					"jaxId": "1J29RG5E60",
//					"attrs": {
//						"id": "Done",
//						"viewName": "",
//						"label": "",
//						"x": "1650",
//						"y": "375",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J29RHIM00",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J29RHIM01",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"text": "#input",
//						"outlet": {
//							"jaxId": "1J29RGGJE0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							}
//						}
//					},
//					"icon": "hudtxt.svg"
//				}
//			]
//		},
//		"desc": "This is an AI agent.",
//		"exportAPI": "false",
//		"exportAddOn": "false",
//		"addOnOpts": ""
//	}
//}