//Auto genterated by Cody
import pathLib from "path";
import Base64 from "../../agenthub/base64.mjs";
import {trimJSON} from "../../agenthub/ChatSession.mjs";
import {URL} from "url";
/*#{1IM22B6EP0MoreImports*/
import fsp from 'fs/promises';
/*}#1IM22B6EP0MoreImports*/
const agentURL=(new URL(import.meta.url)).pathname;
const basePath=pathLib.dirname(agentURL);
const VFACT=null;
const argsTemplate={
	properties:{
		"gender":{
			"name":"gender","type":"string",
			"required":false,
			"defaultValue":"",
			"desc":"gender of spearker, must select between male and female",
		},
		"text":{
			"name":"text","type":"string",
			"required":false,
			"defaultValue":"",
			"desc":"text to speak",
		},
		"pitch":{
			"name":"pitch","type":"string",
			"required":false,
			"defaultValue":"",
			"desc":"pitch of voice, must select from very_low, low, moderate, high, very_high",
		},
		"speed":{
			"name":"speed","type":"string",
			"required":false,
			"defaultValue":"",
			"desc":"speed of voice,, must select from very_low, low, moderate, high, very_high",
		},
		"speaker":{
			"name":"speaker","type":"string",
			"required":false,
			"defaultValue":"",
			"desc":"speaker name",
		}
	},
	/*#{1IM22B6EP0ArgsView*/
	/*}#1IM22B6EP0ArgsView*/
};

/*#{1IM22B6EP0StartDoc*/
/*}#1IM22B6EP0StartDoc*/
//----------------------------------------------------------------------------
let tts=async function(session){
	let gender,text,pitch,speed,speaker;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let InputText,InitBash,InitConda,Pitch,Gender,Speed,Run,Path,Done,Ask,AskAudio,audio,select,FixArgs;
	/*#{1IM22B6EP0LocalVals*/
	let nodeJSON, conda;
	const levels = {
		"非常低": "very_low",
		"低": "low",
		"适中": "moderate",
		"高": "high",
		"非常高": "very_high"
	};
	let audio_file=null, audio_text=null;
	try {
			nodeJSON=await fsp.readFile(decodeURIComponent(pathLib.join(basePath, "agent.json")), "utf8");
			nodeJSON=JSON.parse(nodeJSON);
			nodeJSON.entry=nodeJSON.entry||"../tabos/AgentNodeMain.py";
			conda = nodeJSON.conda;
		}catch(err){
			throw Error(`Can't read/parse ${pathLib.join(basePath, "agent.json")}. Please make sure your agent path and agent.json is correct.`);
		}
	/*}#1IM22B6EP0LocalVals*/
	
	function parseAgentArgs(input){
		if(typeof(input)=='object'){
			gender=input.gender;
			text=input.text;
			pitch=input.pitch;
			speed=input.speed;
			speaker=input.speaker;
		}else{
			gender=undefined;
			text=undefined;
			pitch=undefined;
			speed=undefined;
			speaker=undefined;
		}
		/*#{1IM22B6EP0ParseArgs*/
		globalContext.gender = gender;
		globalContext.text = text;
		globalContext.pitch = pitch;
		globalContext.speed = speed;
		if(speaker){
			audio_file="Spark-TTS/audios/" + speaker + ".mp3";
		}
		/*}#1IM22B6EP0ParseArgs*/
	}
	
	/*#{1IM22B6EP0PreContext*/
	/*}#1IM22B6EP0PreContext*/
	context={};
	/*#{1IM22B6EP0PostContext*/
	/*}#1IM22B6EP0PostContext*/
	let $agent,agent,segs={};
	segs["InputText"]=InputText=async function(input){//:1IM229NOP0
		let tip=("请输入你要生成的音频内容");
		let tipRole=("assistant");
		let placeholder=("");
		let allowFile=(false)||false;
		let askUpward=(false);
		let text=("");
		let result="";
		/*#{1IM229NOP0PreCodes*/
		if(globalContext.text) return {seg:Pitch,result:(result),preSeg:"1IM229NOP0",outlet:"1IM231GBG0"};
		/*}#1IM229NOP0PreCodes*/
		if(askUpward && tip){
			result=await session.askUpward($agent,tip);
		}else{
			if(tip){
				session.addChatText(tipRole,tip);
			}
			result=await session.askChatInput({type:"input",placeholder:placeholder,text:text,allowFile:allowFile});
		}
		if(typeof(result)==="string"){
			session.addChatText("user",result);
		}else if(result.assets && result.prompt){
			session.addChatText("user",`${result.prompt}\n- - -\n${result.assets.join("\n- - -\n")}`,{render:true});
		}else{
			session.addChatText("user",result.text||result.prompt||result);
		}
		/*#{1IM229NOP0PostCodes*/
		globalContext.text=result;
		/*}#1IM229NOP0PostCodes*/
		return {seg:Ask,result:(result),preSeg:"1IM229NOP0",outlet:"1IM22B6EQ0"};
	};
	InputText.jaxId="1IM229NOP0"
	InputText.url="InputText@"+agentURL
	
	segs["InitBash"]=InitBash=async function(input){//:1IM22EH0L0
		let result,args={};
		args['bashId']="";
		args['action']="Create";
		args['commands']="";
		args['options']={client:true};
		/*#{1IM22EH0L0PreCodes*/
		/*}#1IM22EH0L0PreCodes*/
		result= await session.pipeChat("/@AgentBuilder/Bash.js",args,false);
		/*#{1IM22EH0L0PostCodes*/
		globalContext.bash=result;
		/*}#1IM22EH0L0PostCodes*/
		return {seg:InitConda,result:(result),preSeg:"1IM22EH0L0",outlet:"1IM22FINV0"};
	};
	InitBash.jaxId="1IM22EH0L0"
	InitBash.url="InitBash@"+agentURL
	
	segs["InitConda"]=InitConda=async function(input){//:1IM22G9G80
		let result,args={};
		args['bashId']=globalContext.bash;
		args['action']="Command";
		args['commands']=[`conda activate ${conda}`,`cd "${decodeURIComponent(basePath)}/Spark-TTS"`];
		args['options']="";
		result= await session.pipeChat("/@AgentBuilder/Bash.js",args,false);
		return {seg:Path,result:(result),preSeg:"1IM22G9G80",outlet:"1IM22GUS50"};
	};
	InitConda.jaxId="1IM22G9G80"
	InitConda.url="InitConda@"+agentURL
	
	segs["Pitch"]=Pitch=async function(input){//:1IM231GBG0
		let prompt=("请选择音调")||input;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let withChat=false;
		let silent=false;
		let items=[
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"非常低",code:0},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"低",code:1},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"适中",code:2},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"高",code:3},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"非常高",code:4},
		];
		let result="";
		let item=null;
		
		/*#{1IM231GBG0PreCodes*/
		if(globalContext.pitch) return {seg:Speed,result:(result),preSeg:"1IM231GBG0",outlet:"1IM231GBH0"};
		/*}#1IM231GBG0PreCodes*/
		if(silent){
			result="";
			return {seg:Speed,result:(result),preSeg:"1IM231GBG0",outlet:"1IM22P5FS0"};
		}
		[result,item]=await session.askUserRaw({type:"menu",prompt:prompt,multiSelect:false,items:items,withChat:withChat,countdown:countdown,placeholder:placeholder});
		/*#{1IM231GBG0PostCodes*/
		globalContext.pitch=levels[result];
		/*}#1IM231GBG0PostCodes*/
		if(typeof(item)==='string'){
			result=item;
			return {seg:Speed,result:(result),preSeg:"1IM231GBG0",outlet:"1IM231GBH0"};
		}else if(item.code===0){
			return {seg:Speed,result:(result),preSeg:"1IM231GBG0",outlet:"1IM22P5FS0"};
		}else if(item.code===1){
			return {seg:Speed,result:(result),preSeg:"1IM231GBG0",outlet:"1IM22P5FT0"};
		}else if(item.code===2){
			return {seg:Speed,result:(result),preSeg:"1IM231GBG0",outlet:"1IM22P5FT1"};
		}else if(item.code===3){
			return {seg:Speed,result:(result),preSeg:"1IM231GBG0",outlet:"1IM22V9UM0"};
		}else if(item.code===4){
			return {seg:Speed,result:(result),preSeg:"1IM231GBG0",outlet:"1IM22VBE40"};
		}
		/*#{1IM231GBG0FinCodes*/
		/*}#1IM231GBG0FinCodes*/
		return {seg:Speed,result:(result),preSeg:"1IM231GBG0",outlet:"1IM231GBH0"};
	};
	Pitch.jaxId="1IM231GBG0"
	Pitch.url="Pitch@"+agentURL
	
	segs["Gender"]=Gender=async function(input){//:1IM231GBH1
		let prompt=("请选择性别")||input;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let withChat=false;
		let silent=false;
		let items=[
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"男",code:0},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"女",code:1},
		];
		let result="";
		let item=null;
		
		/*#{1IM231GBH1PreCodes*/
		if(globalContext.gender) return {seg:Pitch,result:(result),preSeg:"1IM231GBH1",outlet:"1IM231GBH2"};
		/*}#1IM231GBH1PreCodes*/
		if(silent){
			result="";
			/*#{1IM22R5UR0Silent*/
			/*}#1IM22R5UR0Silent*/
			return {seg:Pitch,result:(result),preSeg:"1IM231GBH1",outlet:"1IM22R5UR0"};
		}
		[result,item]=await session.askUserRaw({type:"menu",prompt:prompt,multiSelect:false,items:items,withChat:withChat,countdown:countdown,placeholder:placeholder});
		/*#{1IM231GBH1PostCodes*/
		/*}#1IM231GBH1PostCodes*/
		if(typeof(item)==='string'){
			result=item;
			return {seg:Pitch,result:(result),preSeg:"1IM231GBH1",outlet:"1IM231GBH2"};
		}else if(item.code===0){
			/*#{1IM22R5UR0*/
			globalContext.gender="male";
			/*}#1IM22R5UR0*/
			return {seg:Pitch,result:(result),preSeg:"1IM231GBH1",outlet:"1IM22R5UR0"};
		}else if(item.code===1){
			/*#{1IM22R5UR1*/
			globalContext.gender="female";
			/*}#1IM22R5UR1*/
			return {seg:Pitch,result:(result),preSeg:"1IM231GBH1",outlet:"1IM22R5UR1"};
		}
		/*#{1IM231GBH1FinCodes*/
		/*}#1IM231GBH1FinCodes*/
		return {seg:Pitch,result:(result),preSeg:"1IM231GBH1",outlet:"1IM231GBH2"};
	};
	Gender.jaxId="1IM231GBH1"
	Gender.url="Gender@"+agentURL
	
	segs["Speed"]=Speed=async function(input){//:1IM23EA8L0
		let prompt=("请选择语速")||input;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let withChat=false;
		let silent=false;
		let items=[
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"非常低",code:0},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"低",code:1},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"适中",code:2},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"高",code:3},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"非常高",code:4},
		];
		let result="";
		let item=null;
		
		/*#{1IM23EA8L0PreCodes*/
		if(globalContext.speed) return {seg:Run,result:(result),preSeg:"1IM23EA8L0",outlet:"1IM23JIQ60"};
		/*}#1IM23EA8L0PreCodes*/
		if(silent){
			result="";
			return {seg:Run,result:(result),preSeg:"1IM23EA8L0",outlet:"1IM23EA7O0"};
		}
		[result,item]=await session.askUserRaw({type:"menu",prompt:prompt,multiSelect:false,items:items,withChat:withChat,countdown:countdown,placeholder:placeholder});
		/*#{1IM23EA8L0PostCodes*/
		globalContext.speed = levels[result];
		/*}#1IM23EA8L0PostCodes*/
		if(typeof(item)==='string'){
			result=item;
			return {seg:Run,result:(result),preSeg:"1IM23EA8L0",outlet:"1IM23JIQ60"};
		}else if(item.code===0){
			return {seg:Run,result:(result),preSeg:"1IM23EA8L0",outlet:"1IM23EA7O0"};
		}else if(item.code===1){
			return {seg:Run,result:(result),preSeg:"1IM23EA8L0",outlet:"1IM23EA7O1"};
		}else if(item.code===2){
			return {seg:Run,result:(result),preSeg:"1IM23EA8L0",outlet:"1IM23EA7O2"};
		}else if(item.code===3){
			return {seg:Run,result:(result),preSeg:"1IM23EA8L0",outlet:"1IM23JIQ61"};
		}else if(item.code===4){
			return {result:result};
		}
		/*#{1IM23EA8L0FinCodes*/
		/*}#1IM23EA8L0FinCodes*/
		return {seg:Run,result:(result),preSeg:"1IM23EA8L0",outlet:"1IM23JIQ60"};
	};
	Speed.jaxId="1IM23EA8L0"
	Speed.url="Speed@"+agentURL
	
	segs["Run"]=Run=async function(input){//:1IM23L7C60
		let result,args={};
		args['bashId']=globalContext.bash;
		args['action']="Command";
		args['commands']=undefined;
		args['options']="";
		/*#{1IM23L7C60PreCodes*/
		let command="";
		if(audio_file===null){
			command=`python -m cli.inference --text "${globalContext.text}" --device "cpu" --save_dir "./output/" --model_dir /tmp/Spark-TTS-0.5B --gender ${globalContext.gender} --pitch ${globalContext.pitch} --speed ${globalContext.speed} --save_path "${globalContext.save_path}"`;
		}else{
			command=`python -m cli.inference --text "${globalContext.text}" --device "cpu" --save_dir "./output/" --model_dir /tmp/Spark-TTS-0.5B --prompt_speech_path "${pathLib.join(basePath, audio_file)}" --pitch ${globalContext.pitch} --speed ${globalContext.speed} --save_path "${globalContext.save_path}"`;
		}
		args['commands']=command;
		/*}#1IM23L7C60PreCodes*/
		result= await session.pipeChat("/@AgentBuilder/Bash.js",args,false);
		/*#{1IM23L7C60PostCodes*/
		result =globalContext.final_path;
		/*}#1IM23L7C60PostCodes*/
		return {seg:Done,result:(result),preSeg:"1IM23L7C60",outlet:"1IM23NFO70"};
	};
	Run.jaxId="1IM23L7C60"
	Run.url="Run@"+agentURL
	
	segs["Path"]=Path=async function(input){//:1IM244M9S0
		let result=input
		/*#{1IM244M9S0Code*/
		const randomInt = Math.floor(Math.random() * 1000000000); 
		const fileName = `${randomInt}.mp3`;
		globalContext.save_path = fileName;
		globalContext.final_path = decodeURIComponent(pathLib.join(basePath, "Spark-TTS", "output", fileName));
		/*}#1IM244M9S0Code*/
		return {seg:InputText,result:(result),preSeg:"1IM244M9S0",outlet:"1IM2452EC0"};
	};
	Path.jaxId="1IM244M9S0"
	Path.url="Path@"+agentURL
	
	segs["Done"]=Done=async function(input){//:1IM24DF9J0
		let result=input;
		let opts={txtHeader:($agent.showName||$agent.name||null)};
		let role="assistant";
		let content=text;
		/*#{1IM24DF9J0PreCodes*/
		let data = await fsp.readFile(globalContext.final_path);
		result = await session.saveHubFile(globalContext.save_path,data);
		/*
		opts={"audio":"hub://" + result};
		*/
		/*}#1IM24DF9J0PreCodes*/
		session.addChatText(role,content,opts);
		/*#{1IM24DF9J0PostCodes*/
		result =globalContext.final_path;
		/*}#1IM24DF9J0PostCodes*/
		return {result:result};
	};
	Done.jaxId="1IM24DF9J0"
	Done.url="Done@"+agentURL
	
	segs["Ask"]=Ask=async function(input){//:1IM298TM60
		let prompt=("是否要指定声音克隆")||input;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let withChat=false;
		let silent=false;
		let items=[
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"否",code:0},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"是",code:1},
		];
		let result="";
		let item=null;
		
		if(silent){
			result="";
			return {seg:Gender,result:(result),preSeg:"1IM298TM60",outlet:"1IM298TL50"};
		}
		[result,item]=await session.askUserRaw({type:"menu",prompt:prompt,multiSelect:false,items:items,withChat:withChat,countdown:countdown,placeholder:placeholder});
		if(typeof(item)==='string'){
			result=item;
			return {result:result};
		}else if(item.code===0){
			return {seg:Gender,result:(result),preSeg:"1IM298TM60",outlet:"1IM298TL50"};
		}else if(item.code===1){
			return {seg:AskAudio,result:(result),preSeg:"1IM298TM60",outlet:"1IM298TL51"};
		}
		return {result:result};
	};
	Ask.jaxId="1IM298TM60"
	Ask.url="Ask@"+agentURL
	
	segs["AskAudio"]=AskAudio=async function(input){//:1IM29GH1P0
		let prompt=("选择音频文件还是录音")||input;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let withChat=false;
		let silent=false;
		let items=[
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"录音",code:0},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"选择音频文件",code:1},
		];
		let result="";
		let item=null;
		
		if(silent){
			result="";
			return {seg:audio,result:(result),preSeg:"1IM29GH1P0",outlet:"1IM29GH0Q0"};
		}
		[result,item]=await session.askUserRaw({type:"menu",prompt:prompt,multiSelect:false,items:items,withChat:withChat,countdown:countdown,placeholder:placeholder});
		if(typeof(item)==='string'){
			result=item;
			return {result:result};
		}else if(item.code===0){
			return {seg:audio,result:(result),preSeg:"1IM29GH1P0",outlet:"1IM29GH0Q0"};
		}else if(item.code===1){
			return {seg:select,result:(result),preSeg:"1IM29GH1P0",outlet:"1IM29GH0R0"};
		}
		return {result:result};
	};
	AskAudio.jaxId="1IM29GH1P0"
	AskAudio.url="AskAudio@"+agentURL
	
	segs["audio"]=audio=async function(input){//:1IM29JVFU0
		let prompt=("录制语音采样，大概10秒左右的清晰语音。")||input;
		let placeholder=(undefined)||null;
		let result="";
		let audioData=null;
		/*#{1IM29JVFU0PreCodes*/
		/*}#1IM29JVFU0PreCodes*/
		[result,audioData]=await session.askUserRaw({type:"audio",prompt:prompt});
		/*#{1IM29JVFU0PostCodes*/
		audio_file = "temp.wav";
		let audioDataBuffer = Buffer.from(audioData, 'base64');
		fsp.writeFile(audio_file, audioDataBuffer, (err) => {
			result = audio_file;
		});
		/*}#1IM29JVFU0PostCodes*/
		return {seg:Pitch,result:(audioData),preSeg:"1IM29JVFU0",outlet:"1IM29KEKM1"};
	};
	audio.jaxId="1IM29JVFU0"
	audio.url="audio@"+agentURL
	
	segs["select"]=select=async function(input){//:1IM4A0C4U0
		let prompt=("请选择语音采样的文件，大概10秒左右的清晰语音。")||input;
		let resultText="";
		let fileData=null;
		let enc=null;
		let ext=null;
		let fileSys="native";
		let result="";
		let path=("");
		let filter=("");
		/*#{1IM4A0C4U0PreCodes*/
		/*}#1IM4A0C4U0PreCodes*/
		[resultText,result]=await session.askUserRaw({type:"input",prompt:prompt,text:"",path:path,file:fileSys,filter:filter,});
		fileData=result||(await (await fetch(resultText)).arrayBuffer());
		result=fileData;
		/*#{1IM4A0C4U0PostCodes*/
		let audioDataBuffer = Buffer.from(result, 'base64');
		audio_file = "temp.wav";
		fsp.writeFile(audio_file, audioDataBuffer, (err) => {
			result = audio_file;
		});
		/*}#1IM4A0C4U0PostCodes*/
		return {seg:Pitch,result:(result),preSeg:"1IM4A0C4U0",outlet:"1IM4A1NMH0"};
	};
	select.jaxId="1IM4A0C4U0"
	select.url="select@"+agentURL
	
	segs["FixArgs"]=FixArgs=async function(input){//:1IM7728TA0
		let result=input;
		let missing=false;
		let smartAsk=false;
		/*#{1IM7728TA0PreCodes*/
		/*}#1IM7728TA0PreCodes*/
		if(missing){
			result=await session.pipeChat("/@tabos/HubFixArgs.mjs",{"argsTemplate":argsTemplate,"command":input,smartAsk:smartAsk},false);
			parseAgentArgs(result);
		}
		/*#{1IM7728TA0PostCodes*/
		/*}#1IM7728TA0PostCodes*/
		return {seg:InitBash,result:(result),preSeg:"1IM7728TA0",outlet:"1IM77D6CS0"};
	};
	FixArgs.jaxId="1IM7728TA0"
	FixArgs.url="FixArgs@"+agentURL
	
	agent=$agent={
		isAIAgent:true,
		session:session,
		name:"tts",
		url:agentURL,
		autoStart:true,
		jaxId:"1IM22B6EP0",
		context:context,
		livingSeg:null,
		execChat:async function(input/*{gender,text,pitch,speed,speaker}*/){
			let result;
			parseAgentArgs(input);
			/*#{1IM22B6EP0PreEntry*/
			/*}#1IM22B6EP0PreEntry*/
			result={seg:FixArgs,"input":input};
			/*#{1IM22B6EP0PostEntry*/
			/*}#1IM22B6EP0PostEntry*/
			return result;
		},
		/*#{1IM22B6EP0MoreAgentAttrs*/
		/*}#1IM22B6EP0MoreAgentAttrs*/
	};
	/*#{1IM22B6EP0PostAgent*/
	/*}#1IM22B6EP0PostAgent*/
	return agent;
};
/*#{1IM22B6EP0ExCodes*/
/*}#1IM22B6EP0ExCodes*/

//#CodyExport>>>
//#CodyExport<<<
/*#{1IM22B6EP0PostDoc*/
/*}#1IM22B6EP0PostDoc*/


export default tts;
export{tts};
/*Cody Project Doc*/
//{
//	"type": "docfile",
//	"def": "DocAIAgent",
//	"jaxId": "1IM22B6EP0",
//	"attrs": {
//		"editObjs": {
//			"jaxId": "1IM22B6ET0",
//			"attrs": {}
//		},
//		"agent": {
//			"jaxId": "1IM22B6ET1",
//			"attrs": {}
//		},
//		"showName": "",
//		"entry": "FixArgs",
//		"autoStart": "true",
//		"inBrowser": "false",
//		"debug": "true",
//		"apiArgs": {
//			"jaxId": "1IM22B6ET2",
//			"attrs": {
//				"gender": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1IM77GLQ30",
//					"attrs": {
//						"type": "String",
//						"mockup": "\"\"",
//						"desc": "gender of spearker, must select between male and female",
//						"enum": {
//							"type": "array",
//							"def": "Array",
//							"attrs": [
//								{
//									"type": "auto",
//									"valText": "male"
//								},
//								{
//									"type": "auto",
//									"valText": "female"
//								}
//							]
//						},
//						"required": "false"
//					}
//				},
//				"text": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1IM77GLQ31",
//					"attrs": {
//						"type": "String",
//						"mockup": "\"\"",
//						"desc": "text to speak",
//						"required": "false"
//					}
//				},
//				"pitch": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1IM77GLQ32",
//					"attrs": {
//						"type": "String",
//						"mockup": "\"\"",
//						"desc": "pitch of voice, must select from very_low, low, moderate, high, very_high",
//						"enum": {
//							"type": "array",
//							"def": "Array",
//							"attrs": [
//								{
//									"type": "auto",
//									"valText": "very_low"
//								},
//								{
//									"type": "auto",
//									"valText": "low"
//								},
//								{
//									"type": "auto",
//									"valText": "moderate"
//								},
//								{
//									"type": "auto",
//									"valText": "high"
//								},
//								{
//									"type": "auto",
//									"valText": "very_high"
//								}
//							]
//						},
//						"required": "false"
//					}
//				},
//				"speed": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1IM77GLQ33",
//					"attrs": {
//						"type": "String",
//						"mockup": "\"\"",
//						"desc": "speed of voice,, must select from very_low, low, moderate, high, very_high",
//						"required": "false",
//						"enum": {
//							"type": "array",
//							"def": "Array",
//							"attrs": [
//								{
//									"type": "auto",
//									"valText": "very_low"
//								},
//								{
//									"type": "auto",
//									"valText": "low"
//								},
//								{
//									"type": "auto",
//									"valText": "moderate"
//								},
//								{
//									"type": "auto",
//									"valText": "high"
//								},
//								{
//									"type": "auto",
//									"valText": "very_high"
//								}
//							]
//						}
//					}
//				},
//				"speaker": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1IN5R3PHR0",
//					"attrs": {
//						"type": "String",
//						"mockup": "\"\"",
//						"desc": "speaker name",
//						"required": "false"
//					}
//				}
//			}
//		},
//		"localVars": {
//			"jaxId": "1IM22B6ET3",
//			"attrs": {}
//		},
//		"context": {
//			"jaxId": "1IM22B6ET4",
//			"attrs": {}
//		},
//		"globalMockup": {
//			"jaxId": "1IM22B6ET5",
//			"attrs": {}
//		},
//		"segs": {
//			"attrs": [
//				{
//					"type": "aiseg",
//					"def": "askChat",
//					"jaxId": "1IM229NOP0",
//					"attrs": {
//						"id": "InputText",
//						"viewName": "",
//						"label": "",
//						"x": "60",
//						"y": "190",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IM22B6ET6",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IM22B6ET7",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"tip": "请输入你要生成的音频内容",
//						"tipRole": "Assistant",
//						"placeholder": "",
//						"text": "",
//						"file": "false",
//						"showText": "true",
//						"askUpward": "false",
//						"outlet": {
//							"jaxId": "1IM22B6EQ0",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IM298TM60"
//						}
//					},
//					"icon": "chat.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "Bash",
//					"jaxId": "1IM22EH0L0",
//					"attrs": {
//						"id": "InitBash",
//						"viewName": "",
//						"label": "",
//						"x": "-550",
//						"y": "190",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IM22FIO20",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IM22FIO21",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"bashId": "\"\"",
//						"action": "Create",
//						"commands": "\"\"",
//						"options": "#{client:true}",
//						"outlet": {
//							"jaxId": "1IM22FINV0",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IM22G9G80"
//						}
//					},
//					"icon": "terminal.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "Bash",
//					"jaxId": "1IM22G9G80",
//					"attrs": {
//						"id": "InitConda",
//						"viewName": "",
//						"label": "",
//						"x": "-340",
//						"y": "190",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IM22H98F0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IM22H98F1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"bashId": "#globalContext.bash",
//						"action": "Command",
//						"commands": "#[`conda activate ${conda}`,`cd \"${decodeURIComponent(basePath)}/Spark-TTS\"`]",
//						"options": "\"\"",
//						"outlet": {
//							"jaxId": "1IM22GUS50",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IM244M9S0"
//						}
//					},
//					"icon": "terminal.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "askMenu",
//					"jaxId": "1IM231GBG0",
//					"attrs": {
//						"id": "Pitch",
//						"viewName": "",
//						"label": "",
//						"x": "1200",
//						"y": "175",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"prompt": "请选择音调",
//						"multi": "false",
//						"withChat": "false",
//						"outlet": {
//							"jaxId": "1IM231GBH0",
//							"attrs": {
//								"id": "ChatInput",
//								"desc": "输出节点。",
//								"codes": "false"
//							},
//							"linkedSeg": "1IM23EA8L0"
//						},
//						"outlets": {
//							"attrs": [
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1IM22P5FS0",
//									"attrs": {
//										"id": "very_low",
//										"desc": "输出节点。",
//										"text": "非常低",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IM231GBU0",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IM231GBU1",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1IM23EA8L0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1IM22P5FT0",
//									"attrs": {
//										"id": "low",
//										"desc": "输出节点。",
//										"text": "低",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IM231GBU2",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IM231GBU3",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1IM23EA8L0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1IM22P5FT1",
//									"attrs": {
//										"id": "moderate",
//										"desc": "输出节点。",
//										"text": "适中",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IM231GBU4",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IM231GBU5",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1IM23EA8L0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1IM22V9UM0",
//									"attrs": {
//										"id": "high",
//										"desc": "输出节点。",
//										"text": "高",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IM231GBU6",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IM231GBU7",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1IM23EA8L0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1IM22VBE40",
//									"attrs": {
//										"id": "very_high",
//										"desc": "输出节点。",
//										"text": "非常高",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IM231GBU8",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IM231GBU9",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1IM23EA8L0"
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
//					"jaxId": "1IM231GBH1",
//					"attrs": {
//						"id": "Gender",
//						"viewName": "",
//						"label": "",
//						"x": "550",
//						"y": "185",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"prompt": "请选择性别",
//						"multi": "false",
//						"withChat": "false",
//						"outlet": {
//							"jaxId": "1IM231GBH2",
//							"attrs": {
//								"id": "ChatInput",
//								"desc": "输出节点。",
//								"codes": "false"
//							},
//							"linkedSeg": "1IM231GBG0"
//						},
//						"outlets": {
//							"attrs": [
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1IM22R5UR0",
//									"attrs": {
//										"id": "male",
//										"desc": "输出节点。",
//										"text": "男",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1IM231GBU10",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IM231GBU11",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1IM231GBG0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1IM22R5UR1",
//									"attrs": {
//										"id": "female",
//										"desc": "输出节点。",
//										"text": "女",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1IM231GBU12",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IM231GBU13",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1IM231GBG0"
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
//					"jaxId": "1IM23EA8L0",
//					"attrs": {
//						"id": "Speed",
//						"viewName": "",
//						"label": "",
//						"x": "1485",
//						"y": "175",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"prompt": "请选择语速",
//						"multi": "false",
//						"withChat": "false",
//						"outlet": {
//							"jaxId": "1IM23JIQ60",
//							"attrs": {
//								"id": "ChatInput",
//								"desc": "输出节点。",
//								"codes": "false"
//							},
//							"linkedSeg": "1IM23L7C60"
//						},
//						"outlets": {
//							"attrs": [
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1IM23EA7O0",
//									"attrs": {
//										"id": "very_low",
//										"desc": "输出节点。",
//										"text": "非常低",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IM23RF040",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IM23RF041",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1IM23L7C60"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1IM23EA7O1",
//									"attrs": {
//										"id": "low",
//										"desc": "输出节点。",
//										"text": "低",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IM23RF042",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IM23RF043",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1IM23L7C60"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1IM23EA7O2",
//									"attrs": {
//										"id": "moderate",
//										"desc": "输出节点。",
//										"text": "适中",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IM23RF044",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IM23RF045",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1IM23L7C60"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1IM23JIQ61",
//									"attrs": {
//										"id": "high",
//										"desc": "输出节点。",
//										"text": "高",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IM23RF046",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IM23RF047",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1IM23L7C60"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1IM23HOVC0",
//									"attrs": {
//										"id": "very_high",
//										"desc": "输出节点。",
//										"text": "非常高",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IM23RF048",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IM23RF049",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									}
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
//					"def": "Bash",
//					"jaxId": "1IM23L7C60",
//					"attrs": {
//						"id": "Run",
//						"viewName": "",
//						"label": "",
//						"x": "1835",
//						"y": "175",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IM23RF0410",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IM23RF0411",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"bashId": "#globalContext.bash",
//						"action": "Command",
//						"commands": "",
//						"options": "\"\"",
//						"outlet": {
//							"jaxId": "1IM23NFO70",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IM24DF9J0"
//						}
//					},
//					"icon": "terminal.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1IM244M9S0",
//					"attrs": {
//						"id": "Path",
//						"viewName": "",
//						"label": "",
//						"x": "-130",
//						"y": "190",
//						"desc": "这是一个AISeg。",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IM247RRR0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IM247RRR1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IM2452EC0",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IM229NOP0"
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
//					"jaxId": "1IM24DF9J0",
//					"attrs": {
//						"id": "Done",
//						"viewName": "",
//						"label": "",
//						"x": "2015",
//						"y": "175",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IM24FLA40",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IM24FLA41",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"text": "#text",
//						"outlet": {
//							"jaxId": "1IM24DTEI0",
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
//					"def": "askMenu",
//					"jaxId": "1IM298TM60",
//					"attrs": {
//						"id": "Ask",
//						"viewName": "",
//						"label": "",
//						"x": "260",
//						"y": "190",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"prompt": "是否要指定声音克隆",
//						"multi": "false",
//						"withChat": "false",
//						"outlet": {
//							"jaxId": "1IM29KEKL0",
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
//									"jaxId": "1IM298TL50",
//									"attrs": {
//										"id": "no",
//										"desc": "输出节点。",
//										"text": "否",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IM29PB0B0",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IM29PB0C0",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1IM231GBH1"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1IM298TL51",
//									"attrs": {
//										"id": "yes",
//										"desc": "输出节点。",
//										"text": "是",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IM29PB0C1",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IM29PB0C2",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1IM29GH1P0"
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
//					"jaxId": "1IM29GH1P0",
//					"attrs": {
//						"id": "AskAudio",
//						"viewName": "",
//						"label": "",
//						"x": "550",
//						"y": "420",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"prompt": "选择音频文件还是录音",
//						"multi": "false",
//						"withChat": "false",
//						"outlet": {
//							"jaxId": "1IM29KEKM0",
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
//									"jaxId": "1IM29GH0Q0",
//									"attrs": {
//										"id": "Record",
//										"desc": "输出节点。",
//										"text": "录音",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IM29PB0C3",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IM29PB0C4",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1IM29JVFU0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1IM29GH0R0",
//									"attrs": {
//										"id": "Select",
//										"desc": "输出节点。",
//										"text": "选择音频文件",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IM29PB0C5",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IM29PB0C6",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1IM4A0C4U0"
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
//					"def": "askAudio",
//					"jaxId": "1IM29JVFU0",
//					"attrs": {
//						"id": "audio",
//						"viewName": "",
//						"label": "",
//						"x": "785",
//						"y": "315",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IM29PB0C7",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IM29PB0C8",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"prompt": "录制语音采样，大概10秒左右的清晰语音。",
//						"outlet": {
//							"jaxId": "1IM29KEKM1",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IM231GBG0"
//						}
//					},
//					"icon": "voice.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "askFile",
//					"jaxId": "1IM4A0C4U0",
//					"attrs": {
//						"id": "select",
//						"viewName": "",
//						"label": "",
//						"x": "785",
//						"y": "420",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IM4A2FRD0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IM4A2FRD1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"prompt": "请选择语音采样的文件，大概10秒左右的清晰语音。",
//						"path": "",
//						"fileSys": "naive",
//						"filter": "",
//						"read": "Data",
//						"outlet": {
//							"jaxId": "1IM4A1NMH0",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IM231GBG0"
//						}
//					},
//					"icon": "folder.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "fixArgs",
//					"jaxId": "1IM7728TA0",
//					"attrs": {
//						"id": "FixArgs",
//						"viewName": "",
//						"label": "",
//						"x": "-760",
//						"y": "190",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"smartAsk": "false",
//						"outlet": {
//							"jaxId": "1IM77D6CS0",
//							"attrs": {
//								"id": "Next",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IM22EH0L0"
//						}
//					},
//					"icon": "args.svg"
//				}
//			]
//		},
//		"desc": "这是一个AI智能体。",
//		"exportAPI": "false",
//		"exportAddOn": "false",
//		"addOnOpts": ""
//	}
//}