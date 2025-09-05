//Auto genterated by Cody
import pathLib from "path";
import Base64 from "../../agenthub/base64.mjs";
import {trimJSON} from "../../agenthub/ChatSession.mjs";
import {URL} from "url";
/*#{1HDBOSUN90MoreImports*/
import fsp from 'fs/promises';
import fs from 'fs';
/*}#1HDBOSUN90MoreImports*/
const agentURL=decodeURIComponent((new URL(import.meta.url)).pathname);
const baseURL=pathLib.dirname(agentURL);
const basePath=baseURL.startsWith("file://")?pathLib.fileURLToPath(baseURL):baseURL;
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
	/*#{1HDBOSUN90ArgsView*/
	/*}#1HDBOSUN90ArgsView*/
};

/*#{1HDBOSUN90StartDoc*/
const TTS_MODELS = [
	"tts_models/multilingual/multi-dataset/xtts_v2",
	"tts_models/multilingual/multi-dataset/xtts_v1.1",
	"tts_models/multilingual/multi-dataset/your_tts",
	"tts_models/multilingual/multi-dataset/bark",
	"tts_models/bg/cv/vits",
	"tts_models/cs/cv/vits",
	"tts_models/da/cv/vits",
	"tts_models/et/cv/vits",
	"tts_models/ga/cv/vits",
	"tts_models/en/ek1/tacotron2",
	"tts_models/en/ljspeech/tacotron2-DDC",
	"tts_models/en/ljspeech/tacotron2-DDC_ph",
	"tts_models/en/ljspeech/glow-tts",
	"tts_models/en/ljspeech/speedy-speech",
	"tts_models/en/ljspeech/tacotron2-DCA",
	"tts_models/en/ljspeech/vits",
	"tts_models/en/ljspeech/vits--neon",
	"tts_models/en/ljspeech/fast_pitch",
	"tts_models/en/ljspeech/overflow",
	"tts_models/en/ljspeech/neural_hmm",
	"tts_models/en/vctk/vits",
	"tts_models/en/vctk/fast_pitch",
	"tts_models/en/sam/tacotron-DDC",
	"tts_models/en/blizzard2013/capacitron-t2-c50",
	"tts_models/en/blizzard2013/capacitron-t2-c150_v2",
	"tts_models/en/multi-dataset/tortoise-v2",
	"tts_models/en/jenny/jenny",
	"tts_models/es/mai/tacotron2-DDC",
	"tts_models/es/css10/vits",
	"tts_models/fr/mai/tacotron2-DDC",
	"tts_models/fr/css10/vits",
	"tts_models/uk/mai/glow-tts",
	"tts_models/uk/mai/vits",
	"tts_models/zh-CN/baker/tacotron2-DDC-GST",
	"tts_models/nl/mai/tacotron2-DDC",
	"tts_models/nl/css10/vits",
	"tts_models/de/thorsten/tacotron2-DCA",
	"tts_models/de/thorsten/vits",
	"tts_models/de/thorsten/tacotron2-DDC",
	"tts_models/de/css10/vits-neon",
	"tts_models/ja/kokoro/tacotron2-DDC",
	"tts_models/tr/common-voice/glow-tts",
	"tts_models/it/mai_female/glow-tts",
	"tts_models/it/mai_female/vits",
	"tts_models/it/mai_male/glow-tts",
	"tts_models/it/mai_male/vits",
	"tts_models/ewe/openbible/vits",
	"tts_models/hau/openbible/vits",
	"tts_models/lin/openbible/vits",
	"tts_models/tw_akuapem/openbible/vits",
	"tts_models/tw_asante/openbible/vits",
	"tts_models/yor/openbible/vits",
	"tts_models/hu/css10/vits",
	"tts_models/el/cv/vits",
	"tts_models/fi/css10/vits",
	"tts_models/hr/cv/vits",
	"tts_models/lt/cv/vits",
	"tts_models/lv/cv/vits",
	"tts_models/mt/cv/vits",
	"tts_models/pl/mai_female/vits",
	"tts_models/pt/cv/vits",
	"tts_models/ro/cv/vits",
	"tts_models/sk/cv/vits",
	"tts_models/sl/cv/vits",
	"tts_models/sv/cv/vits",
	"tts_models/ca/custom/vits",
	"tts_models/fa/custom/glow-tts",
	"tts_models/bn/custom/vits-male",
	"tts_models/bn/custom/vits-female",
	"tts_models/be/common-voice/glow-tts"
];

// Vocoder模型列表
const VOCODER_MODELS = [
	"vocoder_models/universal/libri-tts/wavegrad",
	"vocoder_models/universal/libri-tts/fullband-melgan",
	"vocoder_models/en/ek1/wavegrad",
	"vocoder_models/en/ljspeech/multiband-melgan",
	"vocoder_models/en/ljspeech/hifigan_v2",
	"vocoder_models/en/ljspeech/univnet",
	"vocoder_models/en/blizzard2013/hifigan_v2",
	"vocoder_models/en/vctk/hifigan_v2",
	"vocoder_models/en/sam/hifigan_v2",
	"vocoder_models/nl/mai/parallel-wavegan",
	"vocoder_models/de/thorsten/wavegrad",
	"vocoder_models/de/thorsten/fullband-melgan",
	"vocoder_models/de/thorsten/hifigan_v1",
	"vocoder_models/ja/kokoro/hifigan_v1",
	"vocoder_models/uk/mai/multiband-melgan",
	"vocoder_models/tr/common-voice/hifigan",
	"vocoder_models/be/common-voice/hifigan"
];

// 解析TTS模型信息的函数
function parseTTSModelInfo(rawOutput) {
	try {
		// 移除终端提示符和其他无关信息
		const cleanOutput = rawOutput.replace(/AGENT_SHELL>.*$/g, '').trim();
		const info = {};
		
		// 使用正则表达式提取信息
		const modelTypeMatch = cleanOutput.match(/model type\s*:\s*([^\s]+(?:\s+[^:]+)*?)(?=\s+language supported|$)/);
		if (modelTypeMatch) info.modelType = modelTypeMatch[1].trim();
		
		const languageMatch = cleanOutput.match(/language supported\s*:\s*([^\s]+(?:\s+[^:]+)*?)(?=\s+dataset used|$)/);
		if (languageMatch) info.language = languageMatch[1].trim();
		
		const datasetMatch = cleanOutput.match(/dataset used\s*:\s*([^\s]+(?:\s+[^:]+)*?)(?=\s+model name|$)/);
		if (datasetMatch) info.dataset = datasetMatch[1].trim();
		
		const modelNameMatch = cleanOutput.match(/model name\s*:\s*([^\s]+(?:\s+[^:]+)*?)(?=\s+description|$)/);
		if (modelNameMatch) info.modelName = modelNameMatch[1].trim();
		
		const descriptionMatch = cleanOutput.match(/description\s*:\s*([^:]+?)(?=\s+default_vocoder|$)/);
		if (descriptionMatch) info.description = descriptionMatch[1].trim();
		
		const vocoderMatch = cleanOutput.match(/default_vocoder\s*:\s*([^\s]+(?:\s+[^\(]+)*?)(?=\s*\(|$)/);
		if (vocoderMatch) info.defaultVocoder = vocoderMatch[1].trim();
		
		// 格式化输出
		let formattedInfo = `🎤 TTS 模型信息:\n\n`;
		if (info.modelType) formattedInfo += `• 模型类型: ${info.modelType}\n`;
		if (info.language) formattedInfo += `• 支持语言: ${info.language}\n`;
		if (info.dataset) formattedInfo += `• 数据集: ${info.dataset}\n`;
		if (info.modelName) formattedInfo += `• 模型名称: ${info.modelName}\n`;
		if (info.description) formattedInfo += `• 描述: ${info.description}\n`;
		if (info.defaultVocoder) formattedInfo += `• 默认 Vocoder: ${info.defaultVocoder}\n`;
		
		return formattedInfo;
	} catch (error) {
		return `解析模型信息时出错: ${error.message}`;
	}
}

// 解析Vocoder模型信息的函数
function parseVocoderModelInfo(rawOutput) {
	try {
		// 移除终端提示符和其他无关信息
		const cleanOutput = rawOutput.replace(/AGENT_SHELL>.*$/g, '').trim();
		const info = {};
		
		// 使用正则表达式提取信息
		const modelTypeMatch = cleanOutput.match(/model type\s*:\s*([^\s]+(?:\s+[^:]+)*?)(?=\s+language supported|$)/);
		if (modelTypeMatch) info.modelType = modelTypeMatch[1].trim();
		
		const languageMatch = cleanOutput.match(/language supported\s*:\s*([^\s]+(?:\s+[^:]+)*?)(?=\s+dataset used|$)/);
		if (languageMatch) info.language = languageMatch[1].trim();
		
		const datasetMatch = cleanOutput.match(/dataset used\s*:\s*([^\s]+(?:\s+[^:]+)*?)(?=\s+model name|$)/);
		if (datasetMatch) info.dataset = datasetMatch[1].trim();
		
		const modelNameMatch = cleanOutput.match(/model name\s*:\s*([^\s]+(?:\s+[^:]+)*?)(?=\s+description|$)/);
		if (modelNameMatch) info.modelName = modelNameMatch[1].trim();
		
		const descriptionMatch = cleanOutput.match(/description\s*:\s*([^:]+?)(?=\s*$)/);
		if (descriptionMatch) info.description = descriptionMatch[1].trim();
		
		// 格式化输出
		let formattedInfo = `🎙️ Vocoder 模型信息:\n\n`;
		if (info.modelType) formattedInfo += `• 模型类型: ${info.modelType}\n`;
		if (info.language) formattedInfo += `• 支持语言: ${info.language}\n`;
		if (info.dataset) formattedInfo += `• 数据集: ${info.dataset}\n`;
		if (info.modelName) formattedInfo += `• 模型名称: ${info.modelName}\n`;
		if (info.description) formattedInfo += `• 描述: ${info.description}\n`;
		
		return formattedInfo;
	} catch (error) {
		return `解析 Vocoder 模型信息时出错: ${error.message}`;
	}
}
/*}#1HDBOSUN90StartDoc*/
//----------------------------------------------------------------------------
let agent=async function(session){
	let text;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let FIxArgs,AskDefault,ShowTTS,InputTTS,CheckTTS,TTSInfo,AskVocoder,RunTTSInfo,InitBash,InitConda,ShowVocoder,InputVocoder,CheckVocoder,RunVocoderInfo,VocoderInfo,Generate,goto2,goto1,ShowAudio,InitFile;
	/*#{1HDBOSUN90LocalVals*/
	let nodeJSON, conda;
	let selectedTTSModel = null;
	let selectedVocoderModel = null;
	let inputText = "";
	let outputPath = "";
	
	// 初始化conda环境
	try {
		nodeJSON = await fsp.readFile(pathLib.join(basePath, "agent.json"), "utf8");
		nodeJSON = JSON.parse(nodeJSON);
		conda = nodeJSON.conda || "coqui-tts";
	} catch(err) {
		console.warn("Could not read agent.json, using default conda environment");
		conda = "coqui-tts";
	}
	/*}#1HDBOSUN90LocalVals*/
	
	function parseAgentArgs(input){
		if(typeof(input)=='object'){
			text=input.text;
		}else{
			text=undefined;
		}
		/*#{1HDBOSUN90ParseArgs*/
		/*}#1HDBOSUN90ParseArgs*/
	}
	
	/*#{1HDBOSUN90PreContext*/
	/*}#1HDBOSUN90PreContext*/
	context={};
	/*#{1HDBOSUN90PostContext*/
	/*}#1HDBOSUN90PostContext*/
	let $agent,agent,segs={};
	segs["FIxArgs"]=FIxArgs=async function(input){//:1J2LPP3KJ0
		let result=input;
		let missing=false;
		let smartAsk=false;
		if(text===undefined || text==="") missing=true;
		if(missing){
			result=await session.pipeChat("/@tabos/HubFixArgs.mjs",{"argsTemplate":argsTemplate,"command":input,smartAsk:smartAsk},false);
			parseAgentArgs(result);
		}
		return {seg:InitBash,result:(result),preSeg:"1J2LPP3KJ0",outlet:"1J2LQI1B30"};
	};
	FIxArgs.jaxId="1J2LPP3KJ0"
	FIxArgs.url="FIxArgs@"+agentURL
	
	segs["AskDefault"]=AskDefault=async function(input){//:1J2LPQG7I0
		let prompt=("请选择 TTS 模型")||input;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let withChat=false;
		let silent=false;
		let items=[
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"自定义选择 TTS 模型",code:0},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"使用默认模型",code:1},
		];
		let result="";
		let item=null;
		
		if(silent){
			result="";
			return {seg:ShowTTS,result:(result),preSeg:"1J2LPQG7I0",outlet:"1J2LPQG6L0"};
		}
		[result,item]=await session.askUserRaw({type:"menu",prompt:prompt,multiSelect:false,items:items,withChat:withChat,countdown:countdown,placeholder:placeholder});
		if(typeof(item)==='string'){
			result=item;
			return {result:result};
		}else if(item.code===0){
			return {seg:ShowTTS,result:(result),preSeg:"1J2LPQG7I0",outlet:"1J2LPQG6L0"};
		}else if(item.code===1){
			return {seg:goto1,result:(result),preSeg:"1J2LPQG7I0",outlet:"1J2LPQG6L1"};
		}
		return {result:result};
	};
	AskDefault.jaxId="1J2LPQG7I0"
	AskDefault.url="AskDefault@"+agentURL
	
	segs["ShowTTS"]=ShowTTS=async function(input){//:1J2LPTK140
		let result=input;
		let channel="Chat";
		let opts={txtHeader:($agent.showName||$agent.name||null),channel:channel};
		let role="assistant";
		let content="🎤 可用的 TTS 模型列表:\n\n";
		/*#{1J2LPTK140PreCodes*/
		// 显示模型列表
		TTS_MODELS.forEach((model, index) => {
			content += `${index + 1}. ${model}\n`;
		});
		
		content += "\n请输入您想使用的模型序号（1-" + TTS_MODELS.length + "）:";
		/*}#1J2LPTK140PreCodes*/
		session.addChatText(role,content,opts);
		/*#{1J2LPTK140PostCodes*/
		/*}#1J2LPTK140PostCodes*/
		return {seg:InputTTS,result:(result),preSeg:"1J2LPTK140",outlet:"1J2LQI1B41"};
	};
	ShowTTS.jaxId="1J2LPTK140"
	ShowTTS.url="ShowTTS@"+agentURL
	
	segs["InputTTS"]=InputTTS=async function(input){//:1J2LPUHAN0
		let tip=("");
		let tipRole=("assistant");
		let placeholder=("11");
		let allowFile=(false)||false;
		let askUpward=(false);
		let text=("");
		let result="";
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
		return {seg:CheckTTS,result:(result),preSeg:"1J2LPUHAN0",outlet:"1J2LPUO242"};
	};
	InputTTS.jaxId="1J2LPUHAN0"
	InputTTS.url="InputTTS@"+agentURL
	
	segs["CheckTTS"]=CheckTTS=async function(input){//:1J2LQ09TI0
		let result=input
		/*#{1J2LQ09TI0Code*/
		// 验证TTS模型序号是否有效
		const inputStr = typeof result === 'string' ? result.trim() : String(result).trim();
		const modelIndex = parseInt(inputStr) - 1; // 转换为0基索引
		
		if (isNaN(modelIndex) || modelIndex < 0 || modelIndex >= TTS_MODELS.length) {
			session.addChatText("assistant", `❌ 无效的序号 "${inputStr}"，请输入 1-${TTS_MODELS.length} 之间的数字。`);
			return {seg:ShowTTS,result:(""),preSeg:"1J2LQ09TI0",outlet:"1J2LQ0GJR2"};
		}
		
		// 保存选中的模型
		selectedTTSModel = TTS_MODELS[modelIndex];
		session.addChatText("assistant", `✅ 选中 TTS 模型 (${modelIndex + 1}): ${selectedTTSModel}`);
		/*}#1J2LQ09TI0Code*/
		return {seg:RunTTSInfo,result:(result),preSeg:"1J2LQ09TI0",outlet:"1J2LQ0GJR2"};
	};
	CheckTTS.jaxId="1J2LQ09TI0"
	CheckTTS.url="CheckTTS@"+agentURL
	
	segs["TTSInfo"]=TTSInfo=async function(input){//:1J2LQ11NP0
		let result=input;
		let channel="Chat";
		let opts={txtHeader:($agent.showName||$agent.name||null),channel:channel};
		let role="assistant";
		let content=input;
		session.addChatText(role,content,opts);
		return {seg:AskVocoder,result:(result),preSeg:"1J2LQ11NP0",outlet:"1J2LQI1B50"};
	};
	TTSInfo.jaxId="1J2LQ11NP0"
	TTSInfo.url="TTSInfo@"+agentURL
	
	segs["AskVocoder"]=AskVocoder=async function(input){//:1J2LQ1SPO0
		let prompt=("请选择 Vocoder 模型")||input;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let withChat=false;
		let silent=false;
		let items=[
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"自定义选择 Vocoder 模型",code:0},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"使用默认 Vocoder",code:1},
		];
		let result="";
		let item=null;
		
		if(silent){
			result="";
			return {seg:ShowVocoder,result:(result),preSeg:"1J2LQ1SPO0",outlet:"1J2LQ1SP00"};
		}
		[result,item]=await session.askUserRaw({type:"menu",prompt:prompt,multiSelect:false,items:items,withChat:withChat,countdown:countdown,placeholder:placeholder});
		if(typeof(item)==='string'){
			result=item;
			return {result:result};
		}else if(item.code===0){
			return {seg:ShowVocoder,result:(result),preSeg:"1J2LQ1SPO0",outlet:"1J2LQ1SP00"};
		}else if(item.code===1){
			return {seg:goto2,result:(result),preSeg:"1J2LQ1SPO0",outlet:"1J2LQ1SP01"};
		}
		return {result:result};
	};
	AskVocoder.jaxId="1J2LQ1SPO0"
	AskVocoder.url="AskVocoder@"+agentURL
	
	segs["RunTTSInfo"]=RunTTSInfo=async function(input){//:1J2LQ54AR0
		let result=input
		/*#{1J2LQ54AR0Code*/
		// 获取TTS模型信息
		session.addChatText("assistant", "🔍 正在获取模型信息...");
		try {
			const command = `tts --model_info_by_name "${selectedTTSModel}"`;
			
			const infoResult = await session.pipeChat("/@AgentBuilder/Bash.js", {
				bashId: globalContext.bashId,
				action: "Command",
				commands: command,
				options: ""
			}, false);
			
			// 解析模型信息
			const parsedInfo = parseTTSModelInfo(infoResult);
			result = parsedInfo;
		
			session.addChatText("assistant", "✅ 模型信息获取成功");
		} catch (error) {
			session.addChatText("assistant", `❌ 获取模型信息失败: ${error.message}`);
			result = `错误: ${error.message}`;
		}
		/*}#1J2LQ54AR0Code*/
		return {seg:TTSInfo,result:(result),preSeg:"1J2LQ54AR0",outlet:"1J2LQI1B51"};
	};
	RunTTSInfo.jaxId="1J2LQ54AR0"
	RunTTSInfo.url="RunTTSInfo@"+agentURL
	
	segs["InitBash"]=InitBash=async function(input){//:1J2LQ66RE0
		let result=input
		/*#{1J2LQ66RE0Code*/
		// 初始化bash环境
		session.addChatText("assistant", "🔧 正在初始化运行环境...");
		try {
			const bashResult = await session.pipeChat("/@AgentBuilder/Bash.js", {
				bashId: "",
				action: "Create", 
				commands: "",
				options: {client: true}
			}, false);
			globalContext.bashId = bashResult;
			result = bashResult;
		} catch (error) {
			session.addChatText("assistant", `❌ 初始化 Bash 失败: ${error.message}`);
			throw error;
		}
		/*}#1J2LQ66RE0Code*/
		return {seg:InitConda,result:(result),preSeg:"1J2LQ66RE0",outlet:"1J2LQI1B52"};
	};
	InitBash.jaxId="1J2LQ66RE0"
	InitBash.url="InitBash@"+agentURL
	
	segs["InitConda"]=InitConda=async function(input){//:1J2LQ6EQJ0
		let result=input
		/*#{1J2LQ6EQJ0Code*/
		session.addChatText("assistant", "🐍 正在激活 Conda 环境...");
		try {
			const commands = [
				`conda activate ${conda}`
			];
			
			const condaResult = await session.pipeChat("/@AgentBuilder/Bash.js", {
				bashId: globalContext.bashId,
				action: "Command",
				commands: commands,
				options: ""
			}, false);
			
			result = condaResult;
			session.addChatText("assistant", "✅ Conda 环境激活成功");
		} catch (error) {
			session.addChatText("assistant", `❌ 激活 Conda 环境失败: ${error.message}`);
			throw error;
		}
		/*}#1J2LQ6EQJ0Code*/
		return {seg:AskDefault,result:(result),preSeg:"1J2LQ6EQJ0",outlet:"1J2LQ6N1T2"};
	};
	InitConda.jaxId="1J2LQ6EQJ0"
	InitConda.url="InitConda@"+agentURL
	
	segs["ShowVocoder"]=ShowVocoder=async function(input){//:1J2LQ8RFL0
		let result=input;
		let channel="Chat";
		let opts={txtHeader:($agent.showName||$agent.name||null),channel:channel};
		let role="assistant";
		let content="🎙️ 可用的 Vocoder 模型列表:\n\n";
		/*#{1J2LQ8RFL0PreCodes*/
		// 显示模型列表
		VOCODER_MODELS.forEach((model, index) => {
			content += `${index + 1}. ${model}\n`;
		});
		
		content += "\n请输入您想使用的 Vocoder 模型序号（1-" + VOCODER_MODELS.length + "）:";
		/*}#1J2LQ8RFL0PreCodes*/
		session.addChatText(role,content,opts);
		/*#{1J2LQ8RFL0PostCodes*/
		/*}#1J2LQ8RFL0PostCodes*/
		return {seg:InputVocoder,result:(result),preSeg:"1J2LQ8RFL0",outlet:"1J2LQ8RLR2"};
	};
	ShowVocoder.jaxId="1J2LQ8RFL0"
	ShowVocoder.url="ShowVocoder@"+agentURL
	
	segs["InputVocoder"]=InputVocoder=async function(input){//:1J2LQ9FE50
		let tip=("");
		let tipRole=("assistant");
		let placeholder=("5");
		let allowFile=(false)||false;
		let askUpward=(false);
		let text=("");
		let result="";
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
		return {seg:CheckVocoder,result:(result),preSeg:"1J2LQ9FE50",outlet:"1J2LQI1B53"};
	};
	InputVocoder.jaxId="1J2LQ9FE50"
	InputVocoder.url="InputVocoder@"+agentURL
	
	segs["CheckVocoder"]=CheckVocoder=async function(input){//:1J2LQA1F40
		let result=input
		/*#{1J2LQA1F40Code*/
		// 验证Vocoder模型序号是否有效
		const inputStr = typeof result === 'string' ? result.trim() : String(result).trim();
		const modelIndex = parseInt(inputStr) - 1; // 转换为0基索引
		
		if (isNaN(modelIndex) || modelIndex < 0 || modelIndex >= VOCODER_MODELS.length) {
			session.addChatText("assistant", `❌ 无效的序号 "${inputStr}"，请输入 1-${VOCODER_MODELS.length} 之间的数字。`);
			return {seg:ShowVocoder,result:(""),preSeg:"1J2LQA1F40",outlet:"1J2LQI1B54"};
		}
		
		// 保存选中的模型
		selectedVocoderModel = VOCODER_MODELS[modelIndex];
		session.addChatText("assistant", `✅ 选中 Vocoder 模型 (${modelIndex + 1}): ${selectedVocoderModel}`);
		/*}#1J2LQA1F40Code*/
		return {seg:RunVocoderInfo,result:(result),preSeg:"1J2LQA1F40",outlet:"1J2LQI1B54"};
	};
	CheckVocoder.jaxId="1J2LQA1F40"
	CheckVocoder.url="CheckVocoder@"+agentURL
	
	segs["RunVocoderInfo"]=RunVocoderInfo=async function(input){//:1J2LQB8JS0
		let result=input
		/*#{1J2LQB8JS0Code*/
		// 获取Vocoder模型信息
		session.addChatText("assistant", "🔍 正在获取 Vocoder 模型信息...");
		try {
			const command = `tts --model_info_by_name "${selectedVocoderModel}"`;
			
			const infoResult = await session.pipeChat("/@AgentBuilder/Bash.js", {
				bashId: globalContext.bashId,
				action: "Command",
				commands: command,
				options: ""
			}, false);
			
			// 解析Vocoder模型信息
			const parsedInfo = parseVocoderModelInfo(infoResult);
			result = parsedInfo;

			session.addChatText("assistant", "✅ Vocoder 模型信息获取成功");
		} catch (error) {
			session.addChatText("assistant", `❌ 获取 Vocoder 模型信息失败: ${error.message}`);
			result = `错误: ${error.message}`;
		}
		/*}#1J2LQB8JS0Code*/
		return {seg:VocoderInfo,result:(result),preSeg:"1J2LQB8JS0",outlet:"1J2LQI1B55"};
	};
	RunVocoderInfo.jaxId="1J2LQB8JS0"
	RunVocoderInfo.url="RunVocoderInfo@"+agentURL
	
	segs["VocoderInfo"]=VocoderInfo=async function(input){//:1J2LQBJIC0
		let result=input;
		let channel="Chat";
		let opts={txtHeader:($agent.showName||$agent.name||null),channel:channel};
		let role="assistant";
		let content=input;
		session.addChatText(role,content,opts);
		return {seg:Generate,result:(result),preSeg:"1J2LQBJIC0",outlet:"1J2LQBSFB2"};
	};
	VocoderInfo.jaxId="1J2LQBJIC0"
	VocoderInfo.url="VocoderInfo@"+agentURL
	
	segs["Generate"]=Generate=async function(input){//:1J2LQDUMK0
		let result=input
		/*#{1J2LQDUMK0Code*/
		// 生成TTS音频
		session.addChatText("assistant", "🎵 正在生成音频，请耐心等待...");
		
		try {
			// 准备输出文件路径
			const timestamp = Date.now();
			const outputFileName = `generated_audio_${timestamp}.wav`;
			outputPath = pathLib.join(basePath, "output", outputFileName);
			
			// 确保输出目录存在
			const outputDir = pathLib.dirname(outputPath);
			await fsp.mkdir(outputDir, { recursive: true });
			
			// 构建命令
			let command = `tts --text "${text}" --out_path "${outputPath}"`;
			
			// 添加TTS模型
			if (selectedTTSModel) {
				command += ` --model_name "${selectedTTSModel}"`;
			}
			
			// 添加Vocoder模型
			if (selectedVocoderModel) {
				command += ` --vocoder_name "${selectedVocoderModel}"`;
			}
			
			session.addChatText("assistant", `🔧 运行命令: ${command}`);
			
			// 执行TTS生成
			const generateResult = await session.pipeChat("/@AgentBuilder/Bash.js", {
				bashId: globalContext.bashId,
				action: "Command",
				commands: command,
				options: ""
			}, false);
			
			result = generateResult;
			
			// 保存输出路径供下一个segment使用
			globalContext.outputPath = outputPath;
			globalContext.outputFileName = outputFileName;
			
			session.addChatText("assistant", "✅ 音频生成完成！");
			
		} catch (error) {
			session.addChatText("assistant", `❌ 音频生成失败: ${error.message}`);
			throw error;
		}
		/*}#1J2LQDUMK0Code*/
		return {seg:InitFile,result:(result),preSeg:"1J2LQDUMK0",outlet:"1J2LQE4E92"};
	};
	Generate.jaxId="1J2LQDUMK0"
	Generate.url="Generate@"+agentURL
	
	segs["goto2"]=goto2=async function(input){//:1J2LQEDO60
		let result=input;
		return {seg:Generate,result:result,preSeg:"1J2LQDUMK0",outlet:"1J2LQI1B56"};
	
	};
	goto2.jaxId="1J2LQDUMK0"
	goto2.url="goto2@"+agentURL
	
	segs["goto1"]=goto1=async function(input){//:1J2LQEUS80
		let result=input;
		return {seg:Generate,result:result,preSeg:"1J2LQDUMK0",outlet:"1J2LQI1B57"};
	
	};
	goto1.jaxId="1J2LQDUMK0"
	goto1.url="goto1@"+agentURL
	
	segs["ShowAudio"]=ShowAudio=async function(input){//:1J2LQGPRO0
		let result=input
		/*#{1J2LQGPRO0Code*/
		// 显示生成的音频
		try {
			const audioFilePath = globalContext.outputPath;
			const audioFileName = globalContext.outputFileName;
			
			if (audioFilePath && fs.existsSync(audioFilePath)) {
				// 读取生成的音频文件
				const audioData = await fsp.readFile(audioFilePath);
				const hubUrl = await session.saveHubFile(audioFileName, audioData);
				
				// 在聊天界面中显示音频
				session.addChatText("assistant", "🎉 TTS 音频生成成功！", {
					audio: "hub://" + hubUrl
				});
				
				// 显示生成参数总结
				const summary = `
		📊 生成参数总结:
		• 输入文本: "${text}"
		• TTS 模型: ${selectedTTSModel || '默认模型'}
		• Vocoder 模型: ${selectedVocoderModel || '默认 Vocoder'}
		• 输出文件: ${audioFileName}
				`;
				session.addChatText("assistant", summary);
				
				result = hubUrl;
			} else {
				session.addChatText("assistant", "❌ 未找到生成的音频文件");
				result = null;
			}
			
		} catch (error) {
			session.addChatText("assistant", `❌ 显示生成音频时出错: ${error.message}`);
			result = null;
		}
		/*}#1J2LQGPRO0Code*/
		return {result:result};
	};
	ShowAudio.jaxId="1J2LQGPRO0"
	ShowAudio.url="ShowAudio@"+agentURL
	
	segs["InitFile"]=InitFile=async function(input){//:1J2LR0SGI0
		let result=input
		/*#{1J2LR0SGI0Code*/
		try {
			// 初始化文件系统目录
			session.addChatText("assistant", "🔧 正在初始化文件系统...");
			
			// 确保filelib目录存在，用于Hub文件系统
			const filelibDir = pathLib.join(pathLib.dirname(pathLib.dirname(basePath)), "filelib");
			await fsp.mkdir(filelibDir, { recursive: true });
			
			// 初始化文件ID计数器（如果不存在）
			const fileIdPath = pathLib.join(filelibDir, "_file_id.txt");
			if (!fs.existsSync(fileIdPath)) {
				await fsp.writeFile(fileIdPath, "0", "utf8");
			}
			
			// 确保输出目录存在
			const outputDir = pathLib.join(basePath, "output");
			await fsp.mkdir(outputDir, { recursive: true });
			
			session.addChatText("assistant", "✅ 文件系统初始化完成");
			
		} catch (error) {
			session.addChatText("assistant", `❌ 文件系统初始化失败: ${error.message}`);
		}
		/*}#1J2LR0SGI0Code*/
		return {seg:ShowAudio,result:(result),preSeg:"1J2LR0SGI0",outlet:"1J2LR1K6E0"};
	};
	InitFile.jaxId="1J2LR0SGI0"
	InitFile.url="InitFile@"+agentURL
	
	agent=$agent={
		isAIAgent:true,
		session:session,
		name:"agent",
		url:agentURL,
		autoStart:true,
		jaxId:"1HDBOSUN90",
		context:context,
		livingSeg:null,
		execChat:async function(input/*{text}*/){
			let result;
			parseAgentArgs(input);
			/*#{1HDBOSUN90PreEntry*/
			/*}#1HDBOSUN90PreEntry*/
			result={seg:FIxArgs,"input":input};
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
//		"showName": "",
//		"entry": "",
//		"autoStart": "true",
//		"inBrowser": "false",
//		"debug": "true",
//		"apiArgs": {
//			"jaxId": "1J2LP7DDS0",
//			"attrs": {
//				"text": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1J2LQI1BF0",
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
//					"def": "fixArgs",
//					"jaxId": "1J2LPP3KJ0",
//					"attrs": {
//						"id": "FIxArgs",
//						"viewName": "",
//						"label": "",
//						"x": "-405",
//						"y": "575",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"smartAsk": "false",
//						"outlet": {
//							"jaxId": "1J2LQI1B30",
//							"attrs": {
//								"id": "Next",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2LQ66RE0"
//						}
//					},
//					"icon": "args.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "askMenu",
//					"jaxId": "1J2LPQG7I0",
//					"attrs": {
//						"id": "AskDefault",
//						"viewName": "",
//						"label": "",
//						"x": "335",
//						"y": "575",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"prompt": "请选择 TTS 模型",
//						"multi": "false",
//						"withChat": "false",
//						"outlet": {
//							"jaxId": "1J2LQI1B40",
//							"attrs": {
//								"id": "ChatInput",
//								"desc": "Outlet.",
//								"codes": "false"
//							}
//						},
//						"outlets": {
//							"attrs": [
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2LPQG6L0",
//									"attrs": {
//										"id": "choose",
//										"desc": "Outlet.",
//										"text": "自定义选择 TTS 模型",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1J2LQI1BF1",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2LQI1BF2",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2LPTK140"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2LPQG6L1",
//									"attrs": {
//										"id": "default",
//										"desc": "Outlet.",
//										"text": "使用默认模型",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1J2LQI1BF3",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2LQI1BF4",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2LQEUS80"
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
//					"def": "output",
//					"jaxId": "1J2LPTK140",
//					"attrs": {
//						"id": "ShowTTS",
//						"viewName": "",
//						"label": "",
//						"x": "675",
//						"y": "495",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2LQI1BF5",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2LQI1BF6",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"channel": "Chat",
//						"text": "🎤 可用的 TTS 模型列表:\n\n",
//						"outlet": {
//							"jaxId": "1J2LQI1B41",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2LPUHAN0"
//						}
//					},
//					"icon": "hudtxt.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "askChat",
//					"jaxId": "1J2LPUHAN0",
//					"attrs": {
//						"id": "InputTTS",
//						"viewName": "",
//						"label": "",
//						"x": "930",
//						"y": "495",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2LPUO240",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2LPUO241",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"tip": "",
//						"tipRole": "Assistant",
//						"placeholder": "11",
//						"text": "",
//						"file": "false",
//						"showText": "true",
//						"askUpward": "false",
//						"outlet": {
//							"jaxId": "1J2LPUO242",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2LQ09TI0"
//						}
//					},
//					"icon": "chat.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1J2LQ09TI0",
//					"attrs": {
//						"id": "CheckTTS",
//						"viewName": "",
//						"label": "",
//						"x": "1180",
//						"y": "495",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2LQ0GJR0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2LQ0GJR1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2LQ0GJR2",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2LQ54AR0"
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
//					"jaxId": "1J2LQ11NP0",
//					"attrs": {
//						"id": "TTSInfo",
//						"viewName": "",
//						"label": "",
//						"x": "1730",
//						"y": "495",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2LQI1BF7",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2LQI1BF8",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"channel": "Chat",
//						"text": "#input",
//						"outlet": {
//							"jaxId": "1J2LQI1B50",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2LQ1SPO0"
//						}
//					},
//					"icon": "hudtxt.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "askMenu",
//					"jaxId": "1J2LQ1SPO0",
//					"attrs": {
//						"id": "AskVocoder",
//						"viewName": "",
//						"label": "",
//						"x": "1980",
//						"y": "495",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"prompt": "请选择 Vocoder 模型",
//						"multi": "false",
//						"withChat": "false",
//						"outlet": {
//							"jaxId": "1J2LQ1TDG0",
//							"attrs": {
//								"id": "ChatInput",
//								"desc": "Outlet.",
//								"codes": "false"
//							}
//						},
//						"outlets": {
//							"attrs": [
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2LQ1SP00",
//									"attrs": {
//										"id": "choose",
//										"desc": "Outlet.",
//										"text": "自定义选择 Vocoder 模型",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1J2LQ1TDG1",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2LQ1TDG2",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2LQ8RFL0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2LQ1SP01",
//									"attrs": {
//										"id": "default",
//										"desc": "Outlet.",
//										"text": "使用默认 Vocoder",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1J2LQ1TDG3",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2LQ1TDG4",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2LQEDO60"
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
//					"def": "code",
//					"jaxId": "1J2LQ54AR0",
//					"attrs": {
//						"id": "RunTTSInfo",
//						"viewName": "",
//						"label": "",
//						"x": "1435",
//						"y": "495",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2LQI1BF9",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2LQI1BF10",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2LQI1B51",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2LQ11NP0"
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
//					"jaxId": "1J2LQ66RE0",
//					"attrs": {
//						"id": "InitBash",
//						"viewName": "",
//						"label": "",
//						"x": "-170",
//						"y": "575",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2LQI1BF11",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2LQI1BF12",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2LQI1B52",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2LQ6EQJ0"
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
//					"jaxId": "1J2LQ6EQJ0",
//					"attrs": {
//						"id": "InitConda",
//						"viewName": "",
//						"label": "",
//						"x": "100",
//						"y": "575",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2LQ6N1T0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2LQ6N1T1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2LQ6N1T2",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2LPQG7I0"
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
//					"jaxId": "1J2LQ8RFL0",
//					"attrs": {
//						"id": "ShowVocoder",
//						"viewName": "",
//						"label": "",
//						"x": "2305",
//						"y": "390",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2LQ8RLR0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2LQ8RLR1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"channel": "Chat",
//						"text": "🎙️ 可用的 Vocoder 模型列表:\n\n",
//						"outlet": {
//							"jaxId": "1J2LQ8RLR2",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2LQ9FE50"
//						}
//					},
//					"icon": "hudtxt.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "askChat",
//					"jaxId": "1J2LQ9FE50",
//					"attrs": {
//						"id": "InputVocoder",
//						"viewName": "",
//						"label": "",
//						"x": "2600",
//						"y": "390",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2LQI1BF13",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2LQI1BF14",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"tip": "",
//						"tipRole": "Assistant",
//						"placeholder": "5",
//						"text": "",
//						"file": "false",
//						"showText": "true",
//						"askUpward": "false",
//						"outlet": {
//							"jaxId": "1J2LQI1B53",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2LQA1F40"
//						}
//					},
//					"icon": "chat.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1J2LQA1F40",
//					"attrs": {
//						"id": "CheckVocoder",
//						"viewName": "",
//						"label": "",
//						"x": "2895",
//						"y": "390",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2LQI1BF15",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2LQI1BF16",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2LQI1B54",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2LQB8JS0"
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
//					"jaxId": "1J2LQB8JS0",
//					"attrs": {
//						"id": "RunVocoderInfo",
//						"viewName": "",
//						"label": "",
//						"x": "3195",
//						"y": "390",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2LQI1BF17",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2LQI1BF18",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2LQI1B55",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2LQBJIC0"
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
//					"jaxId": "1J2LQBJIC0",
//					"attrs": {
//						"id": "VocoderInfo",
//						"viewName": "",
//						"label": "",
//						"x": "3515",
//						"y": "390",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2LQBSFB0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2LQBSFB1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"channel": "Chat",
//						"text": "#input",
//						"outlet": {
//							"jaxId": "1J2LQBSFB2",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2LQDUMK0"
//						}
//					},
//					"icon": "hudtxt.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1J2LQDUMK0",
//					"attrs": {
//						"id": "Generate",
//						"viewName": "",
//						"label": "",
//						"x": "3815",
//						"y": "515",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2LQE4E90",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2LQE4E91",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2LQE4E92",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2LR0SGI0"
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
//					"def": "jumper",
//					"jaxId": "1J2LQEDO60",
//					"attrs": {
//						"id": "goto2",
//						"viewName": "",
//						"label": "",
//						"x": "2305",
//						"y": "545",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"seg": "1J2LQDUMK0",
//						"outlet": {
//							"jaxId": "1J2LQI1B56",
//							"attrs": {
//								"id": "Next",
//								"desc": "Outlet."
//							}
//						}
//					},
//					"icon": "arrowupright.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "jumper",
//					"jaxId": "1J2LQEUS80",
//					"attrs": {
//						"id": "goto1",
//						"viewName": "",
//						"label": "",
//						"x": "675",
//						"y": "680",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"seg": "1J2LQDUMK0",
//						"outlet": {
//							"jaxId": "1J2LQI1B57",
//							"attrs": {
//								"id": "Next",
//								"desc": "Outlet."
//							}
//						}
//					},
//					"icon": "arrowupright.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1J2LQGPRO0",
//					"attrs": {
//						"id": "ShowAudio",
//						"viewName": "",
//						"label": "",
//						"x": "4355",
//						"y": "515",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2LQI1BF19",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2LQI1BF20",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2LQI1B58",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							}
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
//					"jaxId": "1J2LR0SGI0",
//					"attrs": {
//						"id": "InitFile",
//						"viewName": "",
//						"label": "",
//						"x": "4080",
//						"y": "515",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2LR1K6N0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2LR1K6N1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2LR1K6E0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2LQGPRO0"
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
//		"desc": "这是一个AI代理。",
//		"exportAPI": "false",
//		"exportAddOn": "false",
//		"addOnOpts": ""
//	}
//}