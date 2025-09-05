//Auto genterated by Cody
import pathLib from "path";
import Base64 from "../../agenthub/base64.mjs";
import {trimJSON} from "../../agenthub/ChatSession.mjs";
import {URL} from "url";
/*#{1HDBOSUN90MoreImports*/
/*}#1HDBOSUN90MoreImports*/
const agentURL=(new URL(import.meta.url)).pathname;
const basePath=pathLib.dirname(agentURL);
const VFACT=null;
const argsTemplate={
	properties:{
		"question":{
			"name":"question","type":"string",
			"required":true,
			"defaultValue":"",
			"desc":"用户的问题",
		}
	},
	/*#{1HDBOSUN90ArgsView*/
	/*}#1HDBOSUN90ArgsView*/
};

/*#{1HDBOSUN90StartDoc*/
/*}#1HDBOSUN90StartDoc*/
//----------------------------------------------------------------------------
let agent=async function(session){
	let question;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let LLM,Loop,output,WebSearch,Output,Final,final_output,FixArgs;
	/*#{1HDBOSUN90LocalVals*/
	let all_content = "", questions;
	/*}#1HDBOSUN90LocalVals*/
	
	function parseAgentArgs(input){
		if(typeof(input)=='object'){
			question=input.question;
		}else{
			question=undefined;
		}
		/*#{1HDBOSUN90ParseArgs*/
		/*}#1HDBOSUN90ParseArgs*/
	}
	
	/*#{1HDBOSUN90PreContext*/
	/*}#1HDBOSUN90PreContext*/
	context={};
	/*#{1HDBOSUN90PostContext*/
	/*}#1HDBOSUN90PostContext*/
	let agent,segs={};
	segs["LLM"]=LLM=async function(input){//:1IMP46Q3I0
		let prompt;
		let result;
		
		let opts={
			platform:"OpenAI",
			mode:"gpt-4o",
			maxToken:2000,
			temperature:0,
			topP:1,
			fqcP:0,
			prcP:0,
			secret:false,
			responseFormat:"json_object"
		};
		let chatMem=LLM.messages
		let seed="";
		if(seed!==undefined){opts.seed=seed;}
		let messages=[
			{role:"system",content:`当前是${Date().toString()}。你现在是一位搜索策略专家。当我描述一个事件或主题时，请你按照以下要求返回结果：

1. 分析该事件或主题，识别出与之相关的重要方面，如背景、关键人物、关键事件、影响等。
2. 针对每个方面，请提供1个详细的搜索短语。每个搜索短语应包含足够的描述信息，确保查询内容明确指向该事件或主题的具体情况，避免歧义。
3. 返回结果必须是有效的 JSON 格式，并且只包含两个顶级键："event" 和 "analysis"，其中：
   - "event" 的值为事件或主题的名称（字符串）。
   - "analysis" 的值为一个对象，每个键代表一个方面，对应的值为一个字符串，为详细的搜索短语。

请严格遵守以上要求，并仅返回符合要求的 JSON 格式内容。
`},
		];
		prompt=input;
		if(prompt!==null){
			if(typeof(prompt)!=="string"){
				prompt=JSON.stringify(prompt,null,"	");
			}
			let msg={role:"user",content:prompt};messages.push(msg);
		}
		result=await session.callSegLLM("LLM@"+agentURL,opts,messages,true);
		result=trimJSON(result);
		return {seg:Loop,result:(result),preSeg:"1IMP46Q3I0",outlet:"1IMP485FN0"};
	};
	LLM.jaxId="1IMP46Q3I0"
	LLM.url="LLM@"+agentURL
	
	segs["Loop"]=Loop=async function(input){//:1IMP52QHA0
		let result=input;
		let list=Object.values(input.analysis);
		let i,n,item,loopR;
		n=list.length;
		for(i=0;i<n;i++){
			item=list[i];
			loopR=await session.runAISeg(agent,output,item,"1IMP52QHA0","1IMP56A840")
			if(loopR==="break"){
				break;
			}
		}
		return {seg:Final,result:(result),preSeg:"1IMP52QHA0",outlet:"1IMP56A850"};
	};
	Loop.jaxId="1IMP52QHA0"
	Loop.url="Loop@"+agentURL
	
	segs["output"]=output=async function(input){//:1IMP5684K0
		let result=input;
		let opts={};
		let role="assistant";
		let content="正在分析 " + input + "...";
		session.addChatText(role,content,opts);
		return {seg:WebSearch,result:(result),preSeg:"1IMP5684K0",outlet:"1IMP56A851"};
	};
	output.jaxId="1IMP5684K0"
	output.url="output@"+agentURL
	
	segs["WebSearch"]=WebSearch=async function(input){//:1IMP5L27K0
		let result,args={};
		args['nodeName']="AgentBuilder";
		args['callAgent']="RpaWebSearch.js";
		args['callArg']={"search":input, "top_k":3};
		args['checkUpdate']=true;
		result= await session.pipeChat("/@tabos/RemoteChat.mjs",args,false);
		return {seg:Output,result:(result),preSeg:"1IMP5L27K0",outlet:"1IMP5NMT20"};
	};
	WebSearch.jaxId="1IMP5L27K0"
	WebSearch.url="WebSearch@"+agentURL
	
	segs["Output"]=Output=async function(input){//:1IMP64ATS0
		let result=input;
		let opts={};
		let role="assistant";
		let content=Object.values(input);
		/*#{1IMP64ATS0PreCodes*/
		all_content += content + "\n";
		/*}#1IMP64ATS0PreCodes*/
		session.addChatText(role,content,opts);
		/*#{1IMP64ATS0PostCodes*/
		/*}#1IMP64ATS0PostCodes*/
		return {result:result};
	};
	Output.jaxId="1IMP64ATS0"
	Output.url="Output@"+agentURL
	
	segs["Final"]=Final=async function(input){//:1IMP90MF10
		let prompt;
		let result;
		
		let opts={
			platform:"OpenAI",
			mode:"gpt-4o",
			maxToken:2000,
			temperature:0,
			topP:1,
			fqcP:0,
			prcP:0,
			secret:false,
			responseFormat:"text"
		};
		let chatMem=Final.messages
		let seed="";
		if(seed!==undefined){opts.seed=seed;}
		let messages=[
			{role:"system",content:"You are a smart assistant."},
		];
		prompt=`根据以下问题和相关的搜索结果，请总结出一份简明、结构清晰的Markdown文档。

问题：
${questions}

搜索结果：
#{all_content}

要求：

以一个总结问题的标题开始。
基于搜索结果提供一个简短的介绍或概述。
将信息按关键点划分成不同的部分，直接回应问题的核心内容。
使用无序列表、有序列表和标题来提高可读性。
结尾处提供总结或关键要点。
确保Markdown格式清晰易读。`;
		if(prompt!==null){
			if(typeof(prompt)!=="string"){
				prompt=JSON.stringify(prompt,null,"	");
			}
			let msg={role:"user",content:prompt};messages.push(msg);
		}
		result=await session.callSegLLM("Final@"+agentURL,opts,messages,true);
		return {seg:final_output,result:(result),preSeg:"1IMP90MF10",outlet:"1IMP93B7A0"};
	};
	Final.jaxId="1IMP90MF10"
	Final.url="Final@"+agentURL
	
	segs["final_output"]=final_output=async function(input){//:1IMP94H8V0
		let result=input;
		let opts={};
		let role="assistant";
		let content=input;
		session.addChatText(role,content,opts);
		return {result:result};
	};
	final_output.jaxId="1IMP94H8V0"
	final_output.url="final_output@"+agentURL
	
	segs["FixArgs"]=FixArgs=async function(input){//:1IMPAHB210
		let result=input;
		let missing=false;
		/*#{1IMPAHB210PreCodes*/
		/*}#1IMPAHB210PreCodes*/
		if(question===undefined || question==="") missing=true;
		if(missing){
			result=await session.pipeChat("/@tabos/HubFixArgs.mjs",{"argsTemplate":argsTemplate,"command":input},false);
			parseAgentArgs(result);
		}
		/*#{1IMPAHB210PostCodes*/
		questions=question;
		/*}#1IMPAHB210PostCodes*/
		return {seg:LLM,result:(result),preSeg:"1IMPAHB210",outlet:"1IMPAJ16V0"};
	};
	FixArgs.jaxId="1IMPAHB210"
	FixArgs.url="FixArgs@"+agentURL
	
	agent={
		isAIAgent:true,
		session:session,
		name:"agent",
		url:agentURL,
		autoStart:true,
		jaxId:"1HDBOSUN90",
		context:context,
		livingSeg:null,
		execChat:async function(input/*{question}*/){
			let result;
			parseAgentArgs(input);
			/*#{1HDBOSUN90PreEntry*/
			/*}#1HDBOSUN90PreEntry*/
			result={seg:FixArgs,"input":input};
			/*#{1HDBOSUN90PostEntry*/
			/*}#1HDBOSUN90PostEntry*/
			return result;
		},
		/*#{1HDBOSUN90MoreAgentAttrs*/
		/*}#1HDBOSUN90MoreAgentAttrs*/
	};
	/*#{1HDBOSUN90PostAgent*/
	/*}#1HDBOSUN90PostAgent*/
	return agent;
};
/*#{1HDBOSUN90ExCodes*/
/*}#1HDBOSUN90ExCodes*/

//#CodyExport>>>
//#CodyExport<<<
/*#{1HDBOSUN90PostDoc*/
/*}#1HDBOSUN90PostDoc*/


export default agent;
export{agent};
/*Cody Project Doc*/
//{
//	"type": "docfile",
//	"def": "DocAIAgent",
//	"jaxId": "1HDBOSUN90",
//	"attrs": {
//		"editObjs": {
//			"jaxId": "1HDBOSUNA0",
//			"attrs": {
//				"agent": {
//					"type": "objclass",
//					"def": "ObjClass",
//					"jaxId": "1HDBOSUNA4",
//					"attrs": {
//						"constructArgs": {
//							"jaxId": "1HDBOSUNB0",
//							"attrs": {}
//						},
//						"superClass": "",
//						"properties": {
//							"jaxId": "1HDBOSUNB1",
//							"attrs": {}
//						},
//						"functions": {
//							"jaxId": "1HDBOSUNB2",
//							"attrs": {}
//						},
//						"mockupOnly": "false",
//						"nullMockup": "false",
//						"exportType": "UI Data Template",
//						"exportClass": "false"
//					},
//					"mockups": {}
//				}
//			}
//		},
//		"agent": {
//			"jaxId": "1HDBOSUNA1",
//			"attrs": {}
//		},
//		"entry": "FixArgs",
//		"autoStart": "true",
//		"inBrowser": "false",
//		"debug": "true",
//		"apiArgs": {
//			"jaxId": "1IMP485FP0",
//			"attrs": {
//				"question": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1IMPAJ1770",
//					"attrs": {
//						"type": "String",
//						"mockup": "\"\"",
//						"desc": "用户的问题",
//						"required": "true"
//					}
//				}
//			}
//		},
//		"localVars": {
//			"jaxId": "1HDBOSUNA2",
//			"attrs": {}
//		},
//		"context": {
//			"jaxId": "1HDBOSUNA3",
//			"attrs": {}
//		},
//		"globalMockup": {
//			"jaxId": "1HDIJB7SK6",
//			"attrs": {}
//		},
//		"segs": {
//			"attrs": [
//				{
//					"type": "aiseg",
//					"def": "callLLM",
//					"jaxId": "1IMP46Q3I0",
//					"attrs": {
//						"id": "LLM",
//						"viewName": "",
//						"label": "",
//						"x": "285",
//						"y": "100",
//						"desc": "执行一次LLM调用。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IMP485FP1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IMP485FP2",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"platform": "\"OpenAI\"",
//						"mode": "gpt-4o",
//						"system": "#`当前是${Date().toString()}。你现在是一位搜索策略专家。当我描述一个事件或主题时，请你按照以下要求返回结果：\n\n1. 分析该事件或主题，识别出与之相关的重要方面，如背景、关键人物、关键事件、影响等。\n2. 针对每个方面，请提供1个详细的搜索短语。每个搜索短语应包含足够的描述信息，确保查询内容明确指向该事件或主题的具体情况，避免歧义。\n3. 返回结果必须是有效的 JSON 格式，并且只包含两个顶级键：\"event\" 和 \"analysis\"，其中：\n   - \"event\" 的值为事件或主题的名称（字符串）。\n   - \"analysis\" 的值为一个对象，每个键代表一个方面，对应的值为一个字符串，为详细的搜索短语。\n\n请严格遵守以上要求，并仅返回符合要求的 JSON 格式内容。\n`",
//						"temperature": "0",
//						"maxToken": "2000",
//						"topP": "1",
//						"fqcP": "0",
//						"prcP": "0",
//						"messages": {
//							"attrs": []
//						},
//						"prompt": "#input",
//						"seed": "",
//						"outlet": {
//							"jaxId": "1IMP485FN0",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IMP52QHA0"
//						},
//						"secret": "false",
//						"allowCheat": "false",
//						"GPTCheats": {
//							"attrs": []
//						},
//						"shareChatName": "",
//						"keepChat": "No",
//						"clearChat": "2",
//						"apiFiles": {
//							"attrs": []
//						},
//						"parallelFunction": "false",
//						"responseFormat": "json_object",
//						"formatDef": "\"\""
//					},
//					"icon": "llm.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "loopArray",
//					"jaxId": "1IMP52QHA0",
//					"attrs": {
//						"id": "Loop",
//						"viewName": "",
//						"label": "",
//						"x": "490",
//						"y": "100",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IMP56A8D0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IMP56A8D1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"loopArray": "#Object.values(input.analysis)",
//						"method": "forEach",
//						"outlet": {
//							"jaxId": "1IMP56A840",
//							"attrs": {
//								"id": "Looper",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IMP5684K0"
//						},
//						"catchlet": {
//							"jaxId": "1IMP56A850",
//							"attrs": {
//								"id": "Next",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IMP90MF10"
//						}
//					},
//					"icon": "loop_array.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "output",
//					"jaxId": "1IMP5684K0",
//					"attrs": {
//						"id": "output",
//						"viewName": "",
//						"label": "",
//						"x": "670",
//						"y": "85",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IMP56A8D2",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IMP56A8D3",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"text": "#\"正在分析 \" + input + \"...\"",
//						"outlet": {
//							"jaxId": "1IMP56A851",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IMP5L27K0"
//						}
//					},
//					"icon": "hudtxt.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "RemoteChat",
//					"jaxId": "1IMP5L27K0",
//					"attrs": {
//						"id": "WebSearch",
//						"viewName": "",
//						"label": "",
//						"x": "865",
//						"y": "85",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IMP5NMTD0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IMP5NMTD1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"nodeName": "AgentBuilder",
//						"callAgent": "RpaWebSearch.js",
//						"callArg": "#{\"search\":input, \"top_k\":3}",
//						"checkUpdate": "true",
//						"outlet": {
//							"jaxId": "1IMP5NMT20",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IMP64ATS0"
//						}
//					},
//					"icon": "cloudact.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "output",
//					"jaxId": "1IMP64ATS0",
//					"attrs": {
//						"id": "Output",
//						"viewName": "",
//						"label": "",
//						"x": "1080",
//						"y": "85",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IMP64H0F0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IMP64H0F1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"text": "#Object.values(input)",
//						"outlet": {
//							"jaxId": "1IMP64H080",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							}
//						}
//					},
//					"icon": "hudtxt.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "callLLM",
//					"jaxId": "1IMP90MF10",
//					"attrs": {
//						"id": "Final",
//						"viewName": "",
//						"label": "",
//						"x": "670",
//						"y": "195",
//						"desc": "执行一次LLM调用。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IMP93B7L0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IMP93B7L1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"platform": "\"OpenAI\"",
//						"mode": "gpt-4o",
//						"system": "You are a smart assistant.",
//						"temperature": "0",
//						"maxToken": "2000",
//						"topP": "1",
//						"fqcP": "0",
//						"prcP": "0",
//						"messages": {
//							"attrs": []
//						},
//						"prompt": "#`根据以下问题和相关的搜索结果，请总结出一份简明、结构清晰的Markdown文档。\n\n问题：\n${questions}\n\n搜索结果：\n#{all_content}\n\n要求：\n\n以一个总结问题的标题开始。\n基于搜索结果提供一个简短的介绍或概述。\n将信息按关键点划分成不同的部分，直接回应问题的核心内容。\n使用无序列表、有序列表和标题来提高可读性。\n结尾处提供总结或关键要点。\n确保Markdown格式清晰易读。`",
//						"seed": "",
//						"outlet": {
//							"jaxId": "1IMP93B7A0",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IMP94H8V0"
//						},
//						"secret": "false",
//						"allowCheat": "false",
//						"GPTCheats": {
//							"attrs": []
//						},
//						"shareChatName": "",
//						"keepChat": "No",
//						"clearChat": "2",
//						"apiFiles": {
//							"attrs": []
//						},
//						"parallelFunction": "false",
//						"responseFormat": "text",
//						"formatDef": "\"\""
//					},
//					"icon": "llm.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "output",
//					"jaxId": "1IMP94H8V0",
//					"attrs": {
//						"id": "final_output",
//						"viewName": "",
//						"label": "",
//						"x": "850",
//						"y": "195",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IMP94NS50",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IMP94NS51",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"text": "#input",
//						"outlet": {
//							"jaxId": "1IMP94NRV0",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							}
//						}
//					},
//					"icon": "hudtxt.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "fixArgs",
//					"jaxId": "1IMPAHB210",
//					"attrs": {
//						"id": "FixArgs",
//						"viewName": "",
//						"label": "",
//						"x": "55",
//						"y": "100",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"outlet": {
//							"jaxId": "1IMPAJ16V0",
//							"attrs": {
//								"id": "Next",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IMP46Q3I0"
//						}
//					},
//					"icon": "args.svg"
//				}
//			]
//		},
//		"desc": "这是一个AI代理。",
//		"exportAPI": "false",
//		"exportAddOn": "false",
//		"addOnOpts": ""
//	}
//}