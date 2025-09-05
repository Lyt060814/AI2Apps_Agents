//Auto genterated by Cody
import pathLib from "path";
import Base64 from "../../agenthub/base64.mjs";
import {trimJSON} from "../../agenthub/ChatSession.mjs";
import {URL} from "url";
/*#{1IM78P3GH0MoreImports*/
import fsp from 'fs/promises';
/*}#1IM78P3GH0MoreImports*/
const agentURL=(new URL(import.meta.url)).pathname;
const basePath=pathLib.dirname(agentURL);
const VFACT=null;
const argsTemplate={
	properties:{
		"text":{
			"name":"text","type":"string",
			"required":true,
			"defaultValue":"",
			"desc":"需要朗诵的文本",
		}
	},
	/*#{1IM78P3GH0ArgsView*/
	/*}#1IM78P3GH0ArgsView*/
};

/*#{1IM78P3GH0StartDoc*/
async function getMp3FileNames(directory) {
	const files = await fsp.readdir(directory);
	const mp3Files = files.filter(file => file.endsWith('.mp3')).map(file => pathLib.basename(file, '.mp3'));

	return mp3Files;
}


/*}#1IM78P3GH0StartDoc*/
//----------------------------------------------------------------------------
let AutoTTS=async function(session){
	let text;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let Generate,Loop,Run,Merge,InitBash,InitConda,Done,FixArgs,Ask,SelectTone,Generate2,Parse;
	/*#{1IM78P3GH0LocalVals*/
	let path_list = [];
	let nodeJSON, conda, file_path=null;
	try {
			nodeJSON=await fsp.readFile(decodeURIComponent(pathLib.join(basePath, "agent.json")), "utf8");
			nodeJSON=JSON.parse(nodeJSON);
			nodeJSON.entry=nodeJSON.entry||"../tabos/AgentNodeMain.py";
			conda = nodeJSON.conda;
		}catch(err){
			throw Error(`Can't read/parse ${pathLib.join(basePath, "agent.json")}. Please make sure your agent path and agent.json is correct.`);
		}
	/*}#1IM78P3GH0LocalVals*/
	
	function parseAgentArgs(input){
		if(typeof(input)=='object'){
			text=input.text;
		}else{
			text=undefined;
		}
		/*#{1IM78P3GH0ParseArgs*/
		/*}#1IM78P3GH0ParseArgs*/
	}
	
	/*#{1IM78P3GH0PreContext*/
	/*}#1IM78P3GH0PreContext*/
	context={};
	/*#{1IM78P3GH0PostContext*/
	const ts = new Date()
	.toISOString()            // 2025-06-13T09:07:45.123Z
	.replace(/[:.]/g, '-')    // 2025-06-13T09-07-45-123Z  ← 去掉冒号和小数点
	/*}#1IM78P3GH0PostContext*/
	let $agent,agent,segs={};
	segs["Generate"]=Generate=async function(input){//:1IM78EL1C0
		let prompt;
		let result;
		
		let opts={
			platform:"OpenAI",
			mode:"gpt-3.5-turbo",
			maxToken:2000,
			temperature:0,
			topP:1,
			fqcP:0,
			prcP:0,
			secret:false,
			responseFormat:"text"
		};
		let chatMem=Generate.messages
		let seed="";
		if(seed!==undefined){opts.seed=seed;}
		let messages=[
			{role:"system",content:"请将用户提供的文本按语义和情感划分为多个自然段落或句子，并为每个部分分配朗读者性别（male或female），同时根据内容情感动态选择语速（speed）和语调（pitch）。语速和语调的选项为：very_low, low, moderate, high, very_high。输出需满足以下规则：\n\n分配逻辑\n男性声音（male）适用于描述权威、冷静、严肃或技术性内容；女性声音（female）适用于柔和、情感丰富或描述性内容。\n若文本无明显性别倾向，则交替分配性别以平衡多样性。\n语速与语调规则\nspeed：\nvery_low（沉思/悲伤）\nlow（平静叙述）\nmoderate（中性内容）\nhigh（紧张/激动）\nvery_high（极快节奏）\npitch：\nvery_low（低沉/沉重）\nlow（稳重）\nmoderate（自然）\nhigh（轻快/活泼）\nvery_high（兴奋/尖锐）\n输出格式\n返回一个字典列表，每个字典包含字段：\n[\n  {\n    \"text\": \"分配的文本片段\",  \n    \"gender\": \"male/female\",  \n    \"speed\": \"very_low/low/moderate/high/very_high\",  \n    \"pitch\": \"very_low/low/moderate/high/very_high\"  \n  },\n  # 更多条目...\n]\n示例输入与输出：\n\n输入文本：\n\"夕阳缓缓沉入地平线，海面泛起金色的波纹。突然，远处传来一声巨响，乌云迅速聚集，风暴即将来临！\"\n\n输出：\n[\n  {\n    \"text\": \"夕阳缓缓沉入地平线，海面泛起金色的波纹。\",\n    \"gender\": \"female\",\n    \"speed\": \"low\",\n    \"pitch\": \"moderate\"\n  },\n  {\n    \"text\": \"突然，远处传来一声巨响，乌云迅速聚集，风暴即将来临！\",\n    \"gender\": \"male\",\n    \"speed\": \"high\",\n    \"pitch\": \"high\"\n  }\n]\n"},
		];
		prompt=text;
		if(prompt!==null){
			if(typeof(prompt)!=="string"){
				prompt=JSON.stringify(prompt,null,"	");
			}
			let msg={role:"user",content:prompt};messages.push(msg);
		}
		result=await session.callSegLLM("Generate@"+agentURL,opts,messages,true);
		return {seg:Parse,result:(result),preSeg:"1IM78EL1C0",outlet:"1IM78P3GK0"};
	};
	Generate.jaxId="1IM78EL1C0"
	Generate.url="Generate@"+agentURL
	
	segs["Loop"]=Loop=async function(input){//:1IM78T8US0
		let result=input;
		let list=input;
		let i,n,item,loopR;
		n=list.length;
		for(i=0;i<n;i++){
			item=list[i];
			loopR=await session.runAISeg(agent,Run,item,"1IM78T8US0","1IM78V0H60")
			if(loopR==="break"){
				break;
			}
		}
		return {seg:InitBash,result:(result),preSeg:"1IM78T8US0",outlet:"1IM78TDGO0"};
	};
	Loop.jaxId="1IM78T8US0"
	Loop.url="Loop@"+agentURL
	
	segs["Run"]=Run=async function(input){//:1IM78U68R0
		let result,args={};
		args['nodeName']="sparktts";
		args['callAgent']="tts.js";
		args['callArg']=input;
		args['checkUpdate']=true;
		args['options']="";
		/*#{1IM78U68R0PreCodes*/
		/*}#1IM78U68R0PreCodes*/
		result= await session.pipeChat("/@tabos/RemoteChat.mjs",args,false);
		/*#{1IM78U68R0PostCodes*/
		path_list.push(result);
		/*}#1IM78U68R0PostCodes*/
		return {result:result};
	};
	Run.jaxId="1IM78U68R0"
	Run.url="Run@"+agentURL
	
	segs["Merge"]=Merge=async function(input){//:1IM79OHQ30
		let result,args={};
		args['bashId']=globalContext.bash;
		args['action']="Command";
		args['commands']="";
		args['options']="";
		/*#{1IM79OHQ30PreCodes*/
		const fileListPath = 'fileList.txt';
		result = await fsp.writeFile(fileListPath, path_list.map(file => `file '${file}'`).join('\n'));
		
		
		args['commands'] =
		`ffmpeg -f concat -safe 0 -i ${fileListPath} -c copy Spark-TTS/merged_${ts}.mp3`;
		
		
		/*}#1IM79OHQ30PreCodes*/
		result= await session.pipeChat("/@AgentBuilder/Bash.js",args,false);
		/*#{1IM79OHQ30PostCodes*/
		/*}#1IM79OHQ30PostCodes*/
		return {seg:Done,result:(result),preSeg:"1IM79OHQ30",outlet:"1IM79R0UT0"};
	};
	Merge.jaxId="1IM79OHQ30"
	Merge.url="Merge@"+agentURL
	
	segs["InitBash"]=InitBash=async function(input){//:1IM79Q1G80
		let result,args={};
		args['bashId']="";
		args['action']="Create";
		args['commands']=undefined;
		args['options']={client:true};
		/*#{1IM79Q1G80PreCodes*/
		/*}#1IM79Q1G80PreCodes*/
		result= await session.pipeChat("/@AgentBuilder/Bash.js",args,false);
		/*#{1IM79Q1G80PostCodes*/
		globalContext.bash = result;
		/*}#1IM79Q1G80PostCodes*/
		return {seg:InitConda,result:(result),preSeg:"1IM79Q1G80",outlet:"1IM79R0UT1"};
	};
	InitBash.jaxId="1IM79Q1G80"
	InitBash.url="InitBash@"+agentURL
	
	segs["InitConda"]=InitConda=async function(input){//:1IM79QC1D0
		let result,args={};
		args['bashId']=globalContext.bash;
		args['action']="Command";
		args['commands']=[`conda activate ${conda}`,`cd ${basePath}`];
		args['options']="";
		result= await session.pipeChat("/@AgentBuilder/Bash.js",args,false);
		return {seg:Merge,result:(result),preSeg:"1IM79QC1D0",outlet:"1IM79R0UT2"};
	};
	InitConda.jaxId="1IM79QC1D0"
	InitConda.url="InitConda@"+agentURL
	
	segs["Done"]=Done=async function(input){//:1IM7B0F8O0
		let result=input;
		let opts={txtHeader:($agent.showName||$agent.name||null)};
		let role="assistant";
		let content=input;
		/*#{1IM7B0F8O0PreCodes*/
		let data = await fsp.readFile(pathLib.join(basePath, `Spark-TTS/merged_${ts}.mp3`));
		result = await session.saveHubFile("merged.mp3",data);
		opts={"audio":"hub://" + result};
		content = "Completed"
		/*}#1IM7B0F8O0PreCodes*/
		session.addChatText(role,content,opts);
		/*#{1IM7B0F8O0PostCodes*/
		/*}#1IM7B0F8O0PostCodes*/
		return {result:result};
	};
	Done.jaxId="1IM7B0F8O0"
	Done.url="Done@"+agentURL
	
	segs["FixArgs"]=FixArgs=async function(input){//:1IM7CSNOU0
		let result=input;
		let missing=false;
		let smartAsk=false;
		if(text===undefined || text==="") missing=true;
		if(missing){
			result=await session.pipeChat("/@tabos/HubFixArgs.mjs",{"argsTemplate":argsTemplate,"command":input,smartAsk:smartAsk},false);
			parseAgentArgs(result);
		}
		return {seg:Ask,result:(result),preSeg:"1IM7CSNOU0",outlet:"1IM7CTTMS0"};
	};
	FixArgs.jaxId="1IM7CSNOU0"
	FixArgs.url="FixArgs@"+agentURL
	
	segs["Ask"]=Ask=async function(input){//:1IN5MUDJN0
		let prompt=("Select tone or use default tone")||input;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let withChat=false;
		let silent=false;
		let items=[
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"Select Tone",code:0},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"Default",code:1},
		];
		let result="";
		let item=null;
		
		if(silent){
			result="";
			return {seg:SelectTone,result:(result),preSeg:"1IN5MUDJN0",outlet:"1IN5MUDIU0"};
		}
		[result,item]=await session.askUserRaw({type:"menu",prompt:prompt,multiSelect:false,items:items,withChat:withChat,countdown:countdown,placeholder:placeholder});
		if(typeof(item)==='string'){
			result=item;
			return {result:result};
		}else if(item.code===0){
			return {seg:SelectTone,result:(result),preSeg:"1IN5MUDJN0",outlet:"1IN5MUDIU0"};
		}else if(item.code===1){
			return {seg:Generate,result:(result),preSeg:"1IN5MUDJN0",outlet:"1IN5N45AV0"};
		}
		return {result:result};
	};
	Ask.jaxId="1IN5MUDJN0"
	Ask.url="Ask@"+agentURL
	
	segs["SelectTone"]=SelectTone=async function(input){//:1IN5NTQVR0
		let prompt=("Please select one or more speakers")||input;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let withChat=false;
		let items=[
		];
		let result="";
		let item=null;
		
		/*#{1IN5NTQVR0PreCodes*/
		let speakers= await getMp3FileNames("Spark-TTS/audios/");
		speakers.forEach(name => {
			items.push({ text: name });
		});
		/*}#1IN5NTQVR0PreCodes*/
		[result,item]=await session.askUserRaw({type:"menu",prompt:prompt,multiSelect:true,items:items,withChat:withChat,countdown:countdown,placeholder:placeholder});
		/*#{1IN5NTQVR0PostCodes*/
		items = result.split(',').map(item => item);
		return {seg:Generate2,result:items,preSeg:"1IN5NTQVR0",outlet:"1IN5NC5CL0"};
		/*}#1IN5NTQVR0PostCodes*/
	};
	SelectTone.jaxId="1IN5NTQVR0"
	SelectTone.url="SelectTone@"+agentURL
	
	segs["Generate2"]=Generate2=async function(input){//:1IN5RBKVQ0
		let prompt;
		let result=null;
		/*#{1IN5RBKVQ0Input*/
		/*}#1IN5RBKVQ0Input*/
		
		let opts={
			platform:"OpenAI",
			mode:"gpt-4.1",
			maxToken:2000,
			temperature:0,
			topP:1,
			fqcP:0,
			prcP:0,
			secret:false,
			responseFormat:"text"
		};
		let chatMem=Generate2.messages
		let seed="";
		if(seed!==undefined){opts.seed=seed;}
		let messages=[
			{role:"system",content:"请将用户提供的文本按语义和情感划分为多个自然段落或句子，并为每个部分分配朗读者(speaker)，同时根据内容情感动态选择语速（speed）和语调（pitch）。语速和语调的选项为：very_low, low, moderate, high, very_high。输出需满足以下规则：\n\n分配逻辑\n若文本无明显性别倾向，则交替分配性别以平衡多样性。\n语速与语调规则\nspeed：\nvery_low（沉思/悲伤）\nlow（平静叙述）\nmoderate（中性内容）\nhigh（紧张/激动）\nvery_high（极快节奏）\npitch：\nvery_low（低沉/沉重）\nlow（稳重）\nmoderate（自然）\nhigh（轻快/活泼）\nvery_high（兴奋/尖锐）\n输出格式\n返回一个字典列表，每个字典包含字段：\n[\n  {\n    \"text\": \"分配的文本片段\",  \n    \"speaker\": \"读者姓名\",  \n    \"speed\": \"very_low/low/moderate/high/very_high\",  \n    \"pitch\": \"very_low/low/moderate/high/very_high\"  \n  },\n  # 更多条目...\n]\n示例输入与输出：\n\n输入文本：\n\"夕阳缓缓沉入地平线，海面泛起金色的波纹。突然，远处传来一声巨响，乌云迅速聚集，风暴即将来临！\"\nspeakers \"Jack Ma, Sarah\"\n输出：\n[\n  {\n    \"text\": \"夕阳缓缓沉入地平线，海面泛起金色的波纹。\",\n    \"speaker\": \"Sarah\",\n    \"speed\": \"low\",\n    \"pitch\": \"moderate\"\n  },\n  {\n    \"text\": \"突然，远处传来一声巨响，乌云迅速聚集，风暴即将来临！\",\n    \"speaker\": \"Jack Ma\",\n    \"speed\": \"high\",\n    \"pitch\": \"high\"\n  }\n]\n\n\"大家好！\"\nspeakers \"Zhang San\"\n输出：\n[\n  {\n    \"text\": \"大家好\",\n    \"speaker\": \"Zhang San\",\n    \"speed\": \"high\",\n    \"pitch\": \"high\"\n  }\n]\n"},
		];
		/*#{1IN5RBKVQ0PrePrompt*/
		/*}#1IN5RBKVQ0PrePrompt*/
		prompt=text + '\nspeakers "' + input.join(',') + '"'
;
		if(prompt!==null){
			if(typeof(prompt)!=="string"){
				prompt=JSON.stringify(prompt,null,"	");
			}
			let msg={role:"user",content:prompt};
			/*#{1IN5RBKVQ0FilterMessage*/
			/*}#1IN5RBKVQ0FilterMessage*/
			messages.push(msg);
		}
		/*#{1IN5RBKVQ0PreCall*/
		/*}#1IN5RBKVQ0PreCall*/
		result=(result===null)?(await session.callSegLLM("Generate2@"+agentURL,opts,messages,true)):result;
		/*#{1IN5RBKVQ0PostCall*/
		/*}#1IN5RBKVQ0PostCall*/
		return {seg:Parse,result:(result),preSeg:"1IN5RBKVQ0",outlet:"1IN5RBSDF0"};
	};
	Generate2.jaxId="1IN5RBKVQ0"
	Generate2.url="Generate2@"+agentURL
	
	segs["Parse"]=Parse=async function(input){//:1IN5SCANT0
		let result=input
		/*#{1IN5SCANT0Code*/
		result=JSON.parse(result);
		/*}#1IN5SCANT0Code*/
		return {seg:Loop,result:(result),preSeg:"1IN5SCANT0",outlet:"1IN5SCEQS0"};
	};
	Parse.jaxId="1IN5SCANT0"
	Parse.url="Parse@"+agentURL
	
	agent=$agent={
		isAIAgent:true,
		session:session,
		name:"AutoTTS",
		url:agentURL,
		autoStart:true,
		jaxId:"1IM78P3GH0",
		context:context,
		livingSeg:null,
		execChat:async function(input/*{text}*/){
			let result;
			parseAgentArgs(input);
			/*#{1IM78P3GH0PreEntry*/
			/*}#1IM78P3GH0PreEntry*/
			result={seg:FixArgs,"input":input};
			/*#{1IM78P3GH0PostEntry*/
			/*}#1IM78P3GH0PostEntry*/
			return result;
		},
		/*#{1IM78P3GH0MoreAgentAttrs*/
		/*}#1IM78P3GH0MoreAgentAttrs*/
	};
	/*#{1IM78P3GH0PostAgent*/
	/*}#1IM78P3GH0PostAgent*/
	return agent;
};
/*#{1IM78P3GH0ExCodes*/
/*}#1IM78P3GH0ExCodes*/

//#CodyExport>>>
//#CodyExport<<<
/*#{1IM78P3GH0PostDoc*/
/*}#1IM78P3GH0PostDoc*/


export default AutoTTS;
export{AutoTTS};
/*Cody Project Doc*/
//{
//	"type": "docfile",
//	"def": "DocAIAgent",
//	"jaxId": "1IM78P3GH0",
//	"attrs": {
//		"editObjs": {
//			"jaxId": "1IM78P3GN0",
//			"attrs": {}
//		},
//		"agent": {
//			"jaxId": "1IM78P3GN1",
//			"attrs": {}
//		},
//		"showName": "",
//		"entry": "FixArgs",
//		"autoStart": "true",
//		"inBrowser": "false",
//		"debug": "true",
//		"apiArgs": {
//			"jaxId": "1IM78P3GN2",
//			"attrs": {
//				"text": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1IM7CTTN20",
//					"attrs": {
//						"type": "String",
//						"mockup": "\"\"",
//						"desc": "需要朗诵的文本",
//						"required": "true"
//					}
//				}
//			}
//		},
//		"localVars": {
//			"jaxId": "1IM78P3GN3",
//			"attrs": {}
//		},
//		"context": {
//			"jaxId": "1IM78P3GN4",
//			"attrs": {}
//		},
//		"globalMockup": {
//			"jaxId": "1IM78P3GN5",
//			"attrs": {}
//		},
//		"segs": {
//			"attrs": [
//				{
//					"type": "aiseg",
//					"def": "callLLM",
//					"jaxId": "1IM78EL1C0",
//					"attrs": {
//						"id": "Generate",
//						"viewName": "",
//						"label": "",
//						"x": "520",
//						"y": "355",
//						"desc": "执行一次LLM调用。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IM78P3GN6",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IM78P3GN7",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"platform": "\"OpenAI\"",
//						"mode": "GPT-3.5",
//						"system": "请将用户提供的文本按语义和情感划分为多个自然段落或句子，并为每个部分分配朗读者性别（male或female），同时根据内容情感动态选择语速（speed）和语调（pitch）。语速和语调的选项为：very_low, low, moderate, high, very_high。输出需满足以下规则：\n\n分配逻辑\n男性声音（male）适用于描述权威、冷静、严肃或技术性内容；女性声音（female）适用于柔和、情感丰富或描述性内容。\n若文本无明显性别倾向，则交替分配性别以平衡多样性。\n语速与语调规则\nspeed：\nvery_low（沉思/悲伤）\nlow（平静叙述）\nmoderate（中性内容）\nhigh（紧张/激动）\nvery_high（极快节奏）\npitch：\nvery_low（低沉/沉重）\nlow（稳重）\nmoderate（自然）\nhigh（轻快/活泼）\nvery_high（兴奋/尖锐）\n输出格式\n返回一个字典列表，每个字典包含字段：\n[\n  {\n    \"text\": \"分配的文本片段\",  \n    \"gender\": \"male/female\",  \n    \"speed\": \"very_low/low/moderate/high/very_high\",  \n    \"pitch\": \"very_low/low/moderate/high/very_high\"  \n  },\n  # 更多条目...\n]\n示例输入与输出：\n\n输入文本：\n\"夕阳缓缓沉入地平线，海面泛起金色的波纹。突然，远处传来一声巨响，乌云迅速聚集，风暴即将来临！\"\n\n输出：\n[\n  {\n    \"text\": \"夕阳缓缓沉入地平线，海面泛起金色的波纹。\",\n    \"gender\": \"female\",\n    \"speed\": \"low\",\n    \"pitch\": \"moderate\"\n  },\n  {\n    \"text\": \"突然，远处传来一声巨响，乌云迅速聚集，风暴即将来临！\",\n    \"gender\": \"male\",\n    \"speed\": \"high\",\n    \"pitch\": \"high\"\n  }\n]\n",
//						"temperature": "0",
//						"maxToken": "2000",
//						"topP": "1",
//						"fqcP": "0",
//						"prcP": "0",
//						"messages": {
//							"attrs": []
//						},
//						"prompt": "#text",
//						"seed": "",
//						"outlet": {
//							"jaxId": "1IM78P3GK0",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IN5SCANT0"
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
//					"def": "loopArray",
//					"jaxId": "1IM78T8US0",
//					"attrs": {
//						"id": "Loop",
//						"viewName": "",
//						"label": "",
//						"x": "955",
//						"y": "355",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IM78V0HC0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IM78V0HC1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"loopArray": "#input",
//						"method": "forEach",
//						"outlet": {
//							"jaxId": "1IM78V0H60",
//							"attrs": {
//								"id": "Looper",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IM78U68R0"
//						},
//						"catchlet": {
//							"jaxId": "1IM78TDGO0",
//							"attrs": {
//								"id": "Next",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IM79Q1G80"
//						}
//					},
//					"icon": "loop_array.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "RemoteChat",
//					"jaxId": "1IM78U68R0",
//					"attrs": {
//						"id": "Run",
//						"viewName": "",
//						"label": "",
//						"x": "1175",
//						"y": "280",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IM78V0HC2",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IM78V0HC3",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"nodeName": "sparktts",
//						"callAgent": "tts.js",
//						"callArg": "#input",
//						"checkUpdate": "true",
//						"options": "\"\"",
//						"outlet": {
//							"jaxId": "1IM78V0H70",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							}
//						}
//					},
//					"icon": "cloudact.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "Bash",
//					"jaxId": "1IM79OHQ30",
//					"attrs": {
//						"id": "Merge",
//						"viewName": "",
//						"label": "",
//						"x": "1645",
//						"y": "370",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IM79RIGH0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IM79RIGH1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"bashId": "#globalContext.bash",
//						"action": "Command",
//						"commands": "\"\"",
//						"options": "\"\"",
//						"outlet": {
//							"jaxId": "1IM79R0UT0",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IM7B0F8O0"
//						}
//					},
//					"icon": "terminal.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "Bash",
//					"jaxId": "1IM79Q1G80",
//					"attrs": {
//						"id": "InitBash",
//						"viewName": "",
//						"label": "",
//						"x": "1175",
//						"y": "370",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IM79RIGH2",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IM79RIGH3",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"bashId": "\"\"",
//						"action": "Create",
//						"commands": "",
//						"options": "#{client:true}",
//						"outlet": {
//							"jaxId": "1IM79R0UT1",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IM79QC1D0"
//						}
//					},
//					"icon": "terminal.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "Bash",
//					"jaxId": "1IM79QC1D0",
//					"attrs": {
//						"id": "InitConda",
//						"viewName": "",
//						"label": "",
//						"x": "1405",
//						"y": "370",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IM79RIGH4",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IM79RIGH5",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"bashId": "#globalContext.bash",
//						"action": "Command",
//						"commands": "#[`conda activate ${conda}`,`cd ${basePath}`]",
//						"options": "\"\"",
//						"outlet": {
//							"jaxId": "1IM79R0UT2",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IM79OHQ30"
//						}
//					},
//					"icon": "terminal.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "output",
//					"jaxId": "1IM7B0F8O0",
//					"attrs": {
//						"id": "Done",
//						"viewName": "",
//						"label": "",
//						"x": "1845",
//						"y": "370",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IM7B2GGA0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IM7B2GGA1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"text": "#input",
//						"outlet": {
//							"jaxId": "1IM7B0NR40",
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
//					"jaxId": "1IM7CSNOU0",
//					"attrs": {
//						"id": "FixArgs",
//						"viewName": "",
//						"label": "",
//						"x": "-315",
//						"y": "355",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"smartAsk": "false",
//						"outlet": {
//							"jaxId": "1IM7CTTMS0",
//							"attrs": {
//								"id": "Next",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IN5MUDJN0"
//						}
//					},
//					"icon": "args.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "askMenu",
//					"jaxId": "1IN5MUDJN0",
//					"attrs": {
//						"id": "Ask",
//						"viewName": "",
//						"label": "",
//						"x": "75",
//						"y": "355",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"prompt": "Select tone or use default tone",
//						"multi": "false",
//						"withChat": "false",
//						"outlet": {
//							"jaxId": "1IN5N71GN0",
//							"attrs": {
//								"id": "ChatInput",
//								"desc": "输出节点。",
//								"codes": "false"
//							}
//						},
//						"outlets": {
//							"attrs": [
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1IN5MUDIU0",
//									"attrs": {
//										"id": "Item1",
//										"desc": "输出节点。",
//										"text": "Select Tone",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IN5NA5VI0",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IN5NA5VI1",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1IN5NTQVR0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1IN5N45AV0",
//									"attrs": {
//										"id": "Result",
//										"desc": "输出节点。",
//										"text": "Default",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IN5NA5VI6",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IN5NA5VI7",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1IM78EL1C0"
//								}
//							]
//						},
//						"silent": "false"
//					},
//					"icon": "menu.svg",
//					"reverseOutlets": true
//				},
//				{
//					"type": "aiseg",
//					"def": "askMenu",
//					"jaxId": "1IN5NTQVR0",
//					"attrs": {
//						"id": "SelectTone",
//						"viewName": "",
//						"label": "",
//						"x": "285",
//						"y": "215",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"prompt": "Please select one or more speakers",
//						"multi": "true",
//						"withChat": "false",
//						"outlet": {
//							"jaxId": "1IN5NU3MC0",
//							"attrs": {
//								"id": "ChatInput",
//								"desc": "输出节点。",
//								"codes": "false"
//							},
//							"linkedSeg": "1IN5RBKVQ0"
//						},
//						"outlets": {
//							"attrs": []
//						},
//						"silent": "false"
//					},
//					"icon": "menu.svg",
//					"reverseOutlets": true
//				},
//				{
//					"type": "aiseg",
//					"def": "callLLM",
//					"jaxId": "1IN5RBKVQ0",
//					"attrs": {
//						"id": "Generate2",
//						"viewName": "",
//						"label": "",
//						"x": "520",
//						"y": "215",
//						"desc": "执行一次LLM调用。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IN5RFE0S0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IN5RFE0S1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"platform": "\"OpenAI\"",
//						"mode": "gpt-4.1",
//						"system": "请将用户提供的文本按语义和情感划分为多个自然段落或句子，并为每个部分分配朗读者(speaker)，同时根据内容情感动态选择语速（speed）和语调（pitch）。语速和语调的选项为：very_low, low, moderate, high, very_high。输出需满足以下规则：\n\n分配逻辑\n若文本无明显性别倾向，则交替分配性别以平衡多样性。\n语速与语调规则\nspeed：\nvery_low（沉思/悲伤）\nlow（平静叙述）\nmoderate（中性内容）\nhigh（紧张/激动）\nvery_high（极快节奏）\npitch：\nvery_low（低沉/沉重）\nlow（稳重）\nmoderate（自然）\nhigh（轻快/活泼）\nvery_high（兴奋/尖锐）\n输出格式\n返回一个字典列表，每个字典包含字段：\n[\n  {\n    \"text\": \"分配的文本片段\",  \n    \"speaker\": \"读者姓名\",  \n    \"speed\": \"very_low/low/moderate/high/very_high\",  \n    \"pitch\": \"very_low/low/moderate/high/very_high\"  \n  },\n  # 更多条目...\n]\n示例输入与输出：\n\n输入文本：\n\"夕阳缓缓沉入地平线，海面泛起金色的波纹。突然，远处传来一声巨响，乌云迅速聚集，风暴即将来临！\"\nspeakers \"Jack Ma, Sarah\"\n输出：\n[\n  {\n    \"text\": \"夕阳缓缓沉入地平线，海面泛起金色的波纹。\",\n    \"speaker\": \"Sarah\",\n    \"speed\": \"low\",\n    \"pitch\": \"moderate\"\n  },\n  {\n    \"text\": \"突然，远处传来一声巨响，乌云迅速聚集，风暴即将来临！\",\n    \"speaker\": \"Jack Ma\",\n    \"speed\": \"high\",\n    \"pitch\": \"high\"\n  }\n]\n\n\"大家好！\"\nspeakers \"Zhang San\"\n输出：\n[\n  {\n    \"text\": \"大家好\",\n    \"speaker\": \"Zhang San\",\n    \"speed\": \"high\",\n    \"pitch\": \"high\"\n  }\n]\n",
//						"temperature": "0",
//						"maxToken": "2000",
//						"topP": "1",
//						"fqcP": "0",
//						"prcP": "0",
//						"messages": {
//							"attrs": []
//						},
//						"prompt": "#text + '\\nspeakers \"' + input.join(',') + '\"'\n",
//						"seed": "",
//						"outlet": {
//							"jaxId": "1IN5RBSDF0",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IN5SCANT0"
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
//					"def": "code",
//					"jaxId": "1IN5SCANT0",
//					"attrs": {
//						"id": "Parse",
//						"viewName": "",
//						"label": "",
//						"x": "755",
//						"y": "355",
//						"desc": "这是一个AISeg。",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IN5SCT7G0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IN5SCT7H0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IN5SCEQS0",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IM78T8US0"
//						},
//						"outlets": {
//							"attrs": []
//						},
//						"result": "#input"
//					},
//					"icon": "tab_css.svg"
//				}
//			]
//		},
//		"desc": "这是一个AI智能体。",
//		"exportAPI": "false",
//		"exportAddOn": "false",
//		"addOnOpts": ""
//	}
//}