//Auto genterated by Cody
import {$P,VFACT,callAfter,sleep} from "/@vfact";
import pathLib from "/@path";
import inherits from "/@inherits";
import Base64 from "/@tabos/utils/base64.js";
import {trimJSON} from "/@aichat/utils.js";
/*#{1HDBOSUN90MoreImports*/
import fsp from 'fs/promises';
import fs from 'fs';
/*}#1HDBOSUN90MoreImports*/
const agentURL=(new URL(import.meta.url)).pathname;
const baseURL=pathLib.dirname(agentURL);
const basePath=baseURL.startsWith("file://")?decodeURI(baseURL):baseURL;
const $ln=VFACT.lanCode||"EN";
/*#{1HDBOSUN90StartDoc*/
// Helper functions for audio file handling
async function saveBase64Audio(dataUri, outputFilePath) {
	try {
		const [header, base64Data] = dataUri.split(',');
		if (!base64Data) {
			throw new Error('Invalid data URI format');
		}
		const audioBuffer = Buffer.from(base64Data, 'base64');
		await fsp.writeFile(outputFilePath, audioBuffer);
		console.log(`Audio saved to: ${outputFilePath}`);
		return true;
	} catch (error) {
		console.error('Error saving audio:', error.message);
		return false;
	}
}

async function checkAudioFile(filePath) {
	try {
		const stats = await fsp.stat(filePath);
		const sizeInMB = stats.size / (1024 * 1024);
		
		// Check file extension
		const ext = pathLib.extname(filePath).toLowerCase();
		const supportedFormats = ['.flac', '.mp3', '.wav'];
		
		if (!supportedFormats.includes(ext)) {
			return { valid: false, error: 'File must be a FLAC, MP3, or WAV file' };
		}
		
		// Check file size (limit to 100MB for practical purposes)
		if (sizeInMB > 100) {
			return { valid: false, error: 'Audio file must be less than 100MB' };
		}
		
		return { valid: true, size: sizeInMB, format: ext };
	} catch (error) {
		return { valid: false, error: error.message };
	}
}

// Language validation function
function isValidLanguage(languageInput) {
	const languages = {
		"en": "english", "zh": "chinese", "de": "german", "es": "spanish", "ru": "russian",
		"ko": "korean", "fr": "french", "ja": "japanese", "pt": "portuguese", "tr": "turkish",
		"pl": "polish", "ca": "catalan", "nl": "dutch", "ar": "arabic", "sv": "swedish",
		"it": "italian", "id": "indonesian", "hi": "hindi", "fi": "finnish", "vi": "vietnamese",
		"he": "hebrew", "uk": "ukrainian", "el": "greek", "ms": "malay", "cs": "czech",
		"ro": "romanian", "da": "danish", "hu": "hungarian", "ta": "tamil", "no": "norwegian",
		"th": "thai", "ur": "urdu", "hr": "croatian", "bg": "bulgarian", "lt": "lithuanian",
		"la": "latin", "mi": "maori", "ml": "malayalam", "cy": "welsh", "sk": "slovak",
		"te": "telugu", "fa": "persian", "lv": "latvian", "bn": "bengali", "sr": "serbian",
		"az": "azerbaijani", "sl": "slovenian", "kn": "kannada", "et": "estonian",
		"mk": "macedonian", "br": "breton", "eu": "basque", "is": "icelandic",
		"hy": "armenian", "ne": "nepali", "mn": "mongolian", "bs": "bosnian",
		"kk": "kazakh", "sq": "albanian", "sw": "swahili", "gl": "galician",
		"mr": "marathi", "pa": "punjabi", "si": "sinhala", "km": "khmer",
		"sn": "shona", "yo": "yoruba", "so": "somali", "af": "afrikaans",
		"oc": "occitan", "ka": "georgian", "be": "belarusian", "tg": "tajik",
		"sd": "sindhi", "gu": "gujarati", "am": "amharic", "yi": "yiddish",
		"lo": "lao", "uz": "uzbek", "fo": "faroese", "ht": "haitian creole",
		"ps": "pashto", "tk": "turkmen", "nn": "nynorsk", "mt": "maltese",
		"sa": "sanskrit", "lb": "luxembourgish", "my": "myanmar", "bo": "tibetan",
		"tl": "tagalog", "mg": "malagasy", "as": "assamese", "tt": "tatar",
		"haw": "hawaiian", "ln": "lingala", "ha": "hausa", "ba": "bashkir",
		"jw": "javanese", "su": "sundanese", "yue": "cantonese"
	};
	
	const input = languageInput.toLowerCase();
	return languages[input] || Object.values(languages).includes(input) ? input : null;
}
/*}#1HDBOSUN90StartDoc*/
//----------------------------------------------------------------------------
let agent=async function(session){
	let execInput;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let Start,UploadAudio,CheckAudio,ShowAudio,InitFile,SaveAudio,AskTask,AskLanguage,InputLanguage,Transcribe,InitBash,InitConda,ShowText,AskLanguage2,CheckLanguage,InputLanguage2,CheckLanguage2,Translate,ShowText2;
	/*#{1HDBOSUN90LocalVals*/
	let nodeJSON, conda;
	let audioFile = null;
	let audioFileName = "";
	let taskType = ""; // "transcribe" or "translate"
	let selectedLanguage = "";
	
	// Initialize conda environment
	try {
		nodeJSON = await fsp.readFile(pathLib.join(basePath, "agent.json"), "utf8");
		nodeJSON = JSON.parse(nodeJSON);
		conda = nodeJSON.conda || "whisper";
	} catch(err) {
		console.warn("Could not read agent.json, using default conda environment");
		conda = "whisper";
	}
	/*}#1HDBOSUN90LocalVals*/
	
	function parseAgentArgs(input){
		execInput=input;
		/*#{1HDBOSUN90ParseArgs*/
		/*}#1HDBOSUN90ParseArgs*/
	}
	
	/*#{1HDBOSUN90PreContext*/
	/*}#1HDBOSUN90PreContext*/
	context={};
	context=VFACT.flexState(context);
	/*#{1HDBOSUN90PostContext*/
	/*}#1HDBOSUN90PostContext*/
	let $agent,agent,segs={};
	segs["Start"]=Start=async function(input){//:1J2M1ADDI0
		let result=input;
		let channel="Chat";
		let opts={txtHeader:($agent.showName||$agent.name||null),channel:channel};
		let role="assistant";
		let content="欢迎使用 Whisper 语音转录和翻译系统！请上传您的音频文件。";
		session.addChatText(role,content,opts);
		return {seg:InitFile,result:(result),preSeg:"1J2M1ADDI0",outlet:"1J2M1ADDI1"};
	};
	Start.jaxId="1J2M1ADDI0"
	Start.url="Start@"+agentURL
	
	segs["UploadAudio"]=UploadAudio=async function(input){//:1J2M050DF0
		let prompt=("请上传音频文件（支持 .flac, .mp3, .wav 格式）")||input;
		let resultText="";
		let fileData=null;
		let enc=null;
		let ext=null;
		let fileSys="native";
		let result="";
		let path=("");
		let filter=("*.flac;*.mp3;*.wav");
		[resultText,result]=await session.askUserRaw({type:"input",prompt:prompt,text:"",path:path,file:fileSys,filter:filter,});
		if(!result && resultText){
			result=resultText;
		}else if(resultText && result){
			result=session.arrayBufferToDataURL(resultText,result);
		}
		return {seg:CheckAudio,result:(result),preSeg:"1J2M050DF0",outlet:"1J2M1ADDI2"};
	};
	UploadAudio.jaxId="1J2M050DF0"
	UploadAudio.url="UploadAudio@"+agentURL
	
	segs["CheckAudio"]=CheckAudio=async function(input){//:1J2M07TMS0
		let result=input
		/*#{1J2M07TMS0Code*/
		try {
			// Save the uploaded file temporarily
			const tempAudioPath = pathLib.join(basePath, "temp_upload_audio");
			await saveBase64Audio(input, tempAudioPath);
			
			// Check if it's a valid audio file
			const checkResult = await checkAudioFile(tempAudioPath);
			
			if (!checkResult.valid) {
				session.addChatText("assistant", `❌ 文件检查失败: ${checkResult.error}`);
				// Clean up temp file
				try {
					await fsp.unlink(tempAudioPath);
				} catch(e) {}
				return {seg:UploadAudio,result:(""),preSeg:"1J2M07TMS0",outlet:"1J2M1ADDI2"};
			}
			
			session.addChatText("assistant", `✅ 音频文件检查通过，格式: ${checkResult.format}，大小: ${checkResult.size.toFixed(2)} MB`);
			globalContext.tempAudioPath = tempAudioPath;
			globalContext.audioFormat = checkResult.format;
			
		} catch (error) {
			session.addChatText("assistant", `❌ 文件处理出错: ${error.message}`);
			return {seg:UploadAudio,result:(""),preSeg:"1J2M07TMS0",outlet:"1J2M1ADDI2"};
		}
		/*}#1J2M07TMS0Code*/
		return {seg:SaveAudio,result:(result),preSeg:"1J2M07TMS0",outlet:"1J2M1ADDI3"};
	};
	CheckAudio.jaxId="1J2M07TMS0"
	CheckAudio.url="CheckAudio@"+agentURL
	
	segs["ShowAudio"]=ShowAudio=async function(input){//:1J2M08SLP0
		let result=input
		/*#{1J2M08SLP0Code*/
		try {
			// Read the temporary audio file and create a hub file for playback
			const tempAudioPath = globalContext.tempAudioPath;
			if (tempAudioPath && fs.existsSync(tempAudioPath)) {
				const audioData = await fsp.readFile(tempAudioPath);
				const hubUrl = await session.saveHubFile("uploaded_audio" + globalContext.audioFormat, audioData);
				
				// Display the audio in the chat interface
				session.addChatText("assistant", "📁 已上传的音频文件:", {
					audio: "hub://" + hubUrl
				});
			}
		} catch (error) {
			session.addChatText("assistant", `❌ 显示音频时出错: ${error.message}`);
		}
		/*}#1J2M08SLP0Code*/
		return {seg:InitBash,result:(result),preSeg:"1J2M08SLP0",outlet:"1J2M1ADDI4"};
	};
	ShowAudio.jaxId="1J2M08SLP0"
	ShowAudio.url="ShowAudio@"+agentURL
	
	segs["InitFile"]=InitFile=async function(input){//:1J2M097V10
		let result=input
		/*#{1J2M097V10Code*/
		try {
			// Initialize file system directories
			session.addChatText("assistant", "🔧 正在初始化文件系统...");
			
			// Ensure filelib directory exists for Hub file system
			const filelibDir = pathLib.join(pathLib.dirname(pathLib.dirname(basePath)), "filelib");
			await fsp.mkdir(filelibDir, { recursive: true });
			
			// Initialize file ID counter if it doesn't exist
			const fileIdPath = pathLib.join(filelibDir, "_file_id.txt");
			if (!fs.existsSync(fileIdPath)) {
				await fsp.writeFile(fileIdPath, "0", "utf8");
			}
			
			session.addChatText("assistant", "✅ 文件系统初始化完成");
			
		} catch (error) {
			session.addChatText("assistant", `❌ 文件系统初始化失败: ${error.message}`);
		}
		/*}#1J2M097V10Code*/
		return {seg:UploadAudio,result:(result),preSeg:"1J2M097V10",outlet:"1J2M1ADDI5"};
	};
	InitFile.jaxId="1J2M097V10"
	InitFile.url="InitFile@"+agentURL
	
	segs["SaveAudio"]=SaveAudio=async function(input){//:1J2M0AGOM0
		let result=input
		/*#{1J2M0AGOM0Code*/
		try {
			const tempAudioPath = globalContext.tempAudioPath;
			if (tempAudioPath && fs.existsSync(tempAudioPath)) {
				// Generate a unique filename
				const timestamp = Date.now();
				const audioFormat = globalContext.audioFormat || '.wav';
				const fileName = `audio_${timestamp}${audioFormat}`;
				const finalAudioPath = pathLib.join(basePath, fileName);
				
				// Move the temporary file to the base directory
				await fsp.rename(tempAudioPath, finalAudioPath);
				
				// Store the file paths for later use
				audioFile = finalAudioPath;
				audioFileName = pathLib.basename(fileName, audioFormat); // Store base name without extension
				globalContext.audioFile = audioFile;
				globalContext.audioFileName = audioFileName;
				
				session.addChatText("assistant", `✅ 音频文件已保存: ${fileName}`);
			}
		} catch (error) {
			session.addChatText("assistant", `❌ 保存音频文件时出错: ${error.message}`);
		}
		/*}#1J2M0AGOM0Code*/
		return {seg:ShowAudio,result:(result),preSeg:"1J2M0AGOM0",outlet:"1J2M0B1A42"};
	};
	SaveAudio.jaxId="1J2M0AGOM0"
	SaveAudio.url="SaveAudio@"+agentURL
	
	segs["AskTask"]=AskTask=async function(input){//:1J2M0BTIV0
		let prompt=("请选择要执行的任务类型")||input;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let withChat=false;
		let silent=false;
		let items=[
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"语音转录（转换为文字）",code:0},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"语音翻译（翻译为英文）",code:1},
		];
		let result="";
		let item=null;
		
		if(silent){
			result="";
			/*#{1J2M0BTIG0Silent*/
			taskType = "transcribe";
			/*}#1J2M0BTIG0Silent*/
			return {seg:AskLanguage,result:(result),preSeg:"1J2M0BTIV0",outlet:"1J2M0BTIG0"};
		}
		[result,item]=await session.askUserRaw({type:"menu",prompt:prompt,multiSelect:false,items:items,withChat:withChat,countdown:countdown,placeholder:placeholder});
		if(typeof(item)==='string'){
			result=item;
			return {result:result};
		}else if(item.code===0){
			/*#{1J2M0BTIG0*/
			taskType = "transcribe";
			session.addChatText("assistant", "✅ 选择了语音转录任务");
			/*}#1J2M0BTIG0*/
			return {seg:AskLanguage,result:(result),preSeg:"1J2M0BTIV0",outlet:"1J2M0BTIG0"};
		}else if(item.code===1){
			/*#{1J2M0BTIG1*/
			taskType = "translate";
			session.addChatText("assistant", "✅ 选择了语音翻译任务");
			/*}#1J2M0BTIG1*/
			return {seg:AskLanguage2,result:(result),preSeg:"1J2M0BTIV0",outlet:"1J2M0BTIG1"};
		}
		return {result:result};
	};
	AskTask.jaxId="1J2M0BTIV0"
	AskTask.url="AskTask@"+agentURL
	
	segs["AskLanguage"]=AskLanguage=async function(input){//:1J2M0G1AV0
		let prompt=("请选择音频的语言（转录任务）")||input;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let withChat=false;
		let silent=false;
		let items=[
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"英语 (English)",code:0},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"中文 (Chinese)",code:1},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"其他语言（手动输入）",code:2},
		];
		let result="";
		let item=null;
		
		if(silent){
			result="";
			/*#{1J2M0G1AF0Silent*/
			selectedLanguage = "english";
			/*}#1J2M0G1AF0Silent*/
			return {seg:Transcribe,result:(result),preSeg:"1J2M0G1AV0",outlet:"1J2M0G1AF0"};
		}
		[result,item]=await session.askUserRaw({type:"menu",prompt:prompt,multiSelect:false,items:items,withChat:withChat,countdown:countdown,placeholder:placeholder});
		if(typeof(item)==='string'){
			result=item;
			return {result:result};
		}else if(item.code===0){
			/*#{1J2M0G1AF0*/
			selectedLanguage = "english";
			session.addChatText("assistant", "✅ 选择了英语");
			/*}#1J2M0G1AF0*/
			return {seg:Transcribe,result:(result),preSeg:"1J2M0G1AV0",outlet:"1J2M0G1AF0"};
		}else if(item.code===1){
			/*#{1J2M0G1AF1*/
			selectedLanguage = "chinese";
			session.addChatText("assistant", "✅ 选择了中文");
			/*}#1J2M0G1AF1*/
			return {seg:Transcribe,result:(result),preSeg:"1J2M0G1AV0",outlet:"1J2M0G1AF1"};
		}else if(item.code===2){
			/*#{1J2M0G1AF2*/
			/*}#1J2M0G1AF2*/
			return {seg:InputLanguage,result:(result),preSeg:"1J2M0G1AV0",outlet:"1J2M0G1AF2"};
		}
		return {result:result};
	};
	AskLanguage.jaxId="1J2M0G1AV0"
	AskLanguage.url="AskLanguage@"+agentURL
	
	segs["InputLanguage"]=InputLanguage=async function(input){//:1J2M0H4U00
		let tip=("请输入音频的语言（例如：japanese, spanish, french 等）");
		let tipRole=("assistant");
		let placeholder=("例如：japanese");
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
		return {seg:CheckLanguage,result:(result),preSeg:"1J2M0H4U00",outlet:"1J2M1ADDJ1"};
	};
	InputLanguage.jaxId="1J2M0H4U00"
	InputLanguage.url="InputLanguage@"+agentURL
	
	segs["Transcribe"]=Transcribe=async function(input){//:1J2M0KTMI0
		let result=input
		/*#{1J2M0KTMI0Code*/
		// Execute Whisper transcription
		session.addChatText("assistant", "🎵 正在进行语音转录，请耐心等待...");
		
		try {
			// Build the whisper command
			let command = `whisper "${globalContext.audioFile}"`;
			command += ` --model tiny`;
			command += ` --language ${selectedLanguage}`;
			command += ` --output_dir "${basePath}"`;
			
			session.addChatText("assistant", `🔧 运行命令: ${command}`);
			
			// Execute the transcription
			const transcribeResult = await session.pipeChat("/@AgentBuilder/Bash.js", {
				bashId: globalContext.bashId,
				action: "Command",
				commands: command,
				options: ""
			}, false);
			
			result = transcribeResult;
			
			session.addChatText("assistant", "✅ 语音转录完成！");
			
		} catch (error) {
			session.addChatText("assistant", `❌ 语音转录失败: ${error.message}`);
			throw error;
		}
		/*}#1J2M0KTMI0Code*/
		return {seg:ShowText,result:(result),preSeg:"1J2M0KTMI0",outlet:"1J2M0L89L2"};
	};
	Transcribe.jaxId="1J2M0KTMI0"
	Transcribe.url="Transcribe@"+agentURL
	
	segs["InitBash"]=InitBash=async function(input){//:1J2M0M7PM0
		let result=input
		/*#{1J2M0M7PM0Code*/
		// Initialize bash session
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
		/*}#1J2M0M7PM0Code*/
		return {seg:InitConda,result:(result),preSeg:"1J2M0M7PM0",outlet:"1J2M1ADDJ2"};
	};
	InitBash.jaxId="1J2M0M7PM0"
	InitBash.url="InitBash@"+agentURL
	
	segs["InitConda"]=InitConda=async function(input){//:1J2M0MH0P0
		let result=input
		/*#{1J2M0MH0P0Code*/
		// Initialize conda environment
		session.addChatText("assistant", "🐍 正在激活 Conda 环境...");
		try {
			const commands = [
				`conda activate ${conda}`,
				`cd "${basePath}"`
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
		/*}#1J2M0MH0P0Code*/
		return {seg:AskTask,result:(result),preSeg:"1J2M0MH0P0",outlet:"1J2M1ADDJ3"};
	};
	InitConda.jaxId="1J2M0MH0P0"
	InitConda.url="InitConda@"+agentURL
	
	segs["ShowText"]=ShowText=async function(input){//:1J2M0TT750
		let result=input;
		let channel="Chat";
		let opts={txtHeader:($agent.showName||$agent.name||null),channel:channel};
		let role="assistant";
		let content=input;
		/*#{1J2M0TT750PreCodes*/
		// Try to read the generated text file
		try {
			const txtFileName = globalContext.audioFileName + ".txt";
			const txtFilePath = pathLib.join(basePath, txtFileName);
			
			if (fs.existsSync(txtFilePath)) {
				const transcribedText = await fsp.readFile(txtFilePath, 'utf8');
				content = `📝 转录结果:\n\n${transcribedText}`;
				
				// Show generation summary
				const summary = `
		📊 转录参数总结:
		• 任务类型: 语音转录
		• 音频语言: ${selectedLanguage}
		• 模型: tiny
		• 输出文件: ${txtFileName}
				`;
				session.addChatText("assistant", summary);
			} else {
				content = "❌ 未找到转录文本文件";
			}
		} catch (error) {
			content = `❌ 读取转录文件时出错: ${error.message}`;
		}
		/*}#1J2M0TT750PreCodes*/
		session.addChatText(role,content,opts);
		/*#{1J2M0TT750PostCodes*/
		/*}#1J2M0TT750PostCodes*/
		return {result:result};
	};
	ShowText.jaxId="1J2M0TT750"
	ShowText.url="ShowText@"+agentURL
	
	segs["AskLanguage2"]=AskLanguage2=async function(input){//:1J2M11DV40
		let prompt=("请选择音频的语言（翻译任务，将翻译为英文）")||input;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let withChat=false;
		let silent=false;
		let items=[
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"中文 (Chinese)",code:0},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"日语 (Japanese)",code:1},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"其他语言（手动输入）",code:2},
		];
		let result="";
		let item=null;
		
		/*#{1J2M11DV40PreCodes*/
		/*}#1J2M11DV40PreCodes*/
		if(silent){
			result="";
			/*#{1J2M11DUK0Silent*/
			/*}#1J2M11DUK0Silent*/
			return {seg:Translate,result:(result),preSeg:"1J2M11DV40",outlet:"1J2M11DUK0"};
		}
		[result,item]=await session.askUserRaw({type:"menu",prompt:prompt,multiSelect:false,items:items,withChat:withChat,countdown:countdown,placeholder:placeholder});
		/*#{1J2M11DV40PostCodes*/
		/*}#1J2M11DV40PostCodes*/
		if(typeof(item)==='string'){
			result=item;
			return {result:result};
		}else if(item.code===0){
			/*#{1J2M11DUK0*/
			selectedLanguage = "chinese";
			session.addChatText("assistant", "✅ 选择了中文，将翻译为英文");
			/*}#1J2M11DUK0*/
			return {seg:Translate,result:(result),preSeg:"1J2M11DV40",outlet:"1J2M11DUK0"};
		}else if(item.code===1){
			/*#{1J2M11DUK1*/
			selectedLanguage = "japanese";
			session.addChatText("assistant", "✅ 选择了日语，将翻译为英文");
			/*}#1J2M11DUK1*/
			return {seg:Translate,result:(result),preSeg:"1J2M11DV40",outlet:"1J2M11DUK1"};
		}else if(item.code===2){
			/*#{1J2M14USK0*/
			/*}#1J2M14USK0*/
			return {seg:InputLanguage2,result:(result),preSeg:"1J2M11DV40",outlet:"1J2M14USK0"};
		}
		/*#{1J2M11DV40FinCodes*/
		/*}#1J2M11DV40FinCodes*/
		return {result:result};
	};
	AskLanguage2.jaxId="1J2M11DV40"
	AskLanguage2.url="AskLanguage2@"+agentURL
	
	segs["CheckLanguage"]=CheckLanguage=async function(input){//:1J2M14FDI0
		let prompt;
		let result=null;
		/*#{1J2M14FDI0Input*/
		/*}#1J2M14FDI0Input*/
		
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
		let chatMem=CheckLanguage.messages
		let seed="";
		if(seed!==undefined){opts.seed=seed;}
		let messages=[
			{role:"system",content:"You are a language validation assistant. Check if the user input is a valid language name that Whisper supports. Respond with 'VALID: [language_name]' if valid, or 'INVALID: reason' if not valid. Supported languages include: english, chinese, japanese, spanish, french, german, etc."},
		];
		/*#{1J2M14FDI0PrePrompt*/
		let preprompt=`Please validate this language input for Whisper: "${input}"`;
		/*}#1J2M14FDI0PrePrompt*/
		prompt=preprompt;
		if(prompt!==null){
			if(typeof(prompt)!=="string"){
				prompt=JSON.stringify(prompt,null,"	");
			}
			let msg={role:"user",content:prompt};
			/*#{1J2M14FDI0FilterMessage*/
			/*}#1J2M14FDI0FilterMessage*/
			messages.push(msg);
		}
		/*#{1J2M14FDI0PreCall*/
		/*}#1J2M14FDI0PreCall*/
		result=(result===null)?(await session.callSegLLM("CheckLanguage@"+agentURL,opts,messages,true)):result;
		/*#{1J2M14FDI0PostCall*/
		// Process LLM response
		if(result && result.includes("VALID:")) {
			const validatedLanguage = result.replace("VALID:", "").trim().toLowerCase();
			selectedLanguage = validatedLanguage;
			session.addChatText("assistant", `✅ 语言验证通过: ${validatedLanguage}`);
		} else {
			session.addChatText("assistant", `❌ 语言验证失败: ${result}`);
			return {seg:InputLanguage,result:(""),preSeg:"1J2M14FDI0",outlet:"1J2M0H4U00"};
		}
		/*}#1J2M14FDI0PostCall*/
		return {seg:Transcribe,result:(result),preSeg:"1J2M14FDI0",outlet:"1J2M1ADDJ5"};
	};
	CheckLanguage.jaxId="1J2M14FDI0"
	CheckLanguage.url="CheckLanguage@"+agentURL
	
	segs["InputLanguage2"]=InputLanguage2=async function(input){//:1J2M15FMS0
		let tip=("请输入音频的语言（例如：spanish, french, german 等，将翻译为英文）");
		let tipRole=("assistant");
		let placeholder=("例如：spanish");
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
		return {seg:CheckLanguage2,result:(result),preSeg:"1J2M15FMS0",outlet:"1J2M1ADDJ6"};
	};
	InputLanguage2.jaxId="1J2M15FMS0"
	InputLanguage2.url="InputLanguage2@"+agentURL
	
	segs["CheckLanguage2"]=CheckLanguage2=async function(input){//:1J2M164JU0
		let prompt;
		let result=null;
		/*#{1J2M164JU0Input*/
		/*}#1J2M164JU0Input*/
		
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
		let chatMem=CheckLanguage2.messages
		let seed="";
		if(seed!==undefined){opts.seed=seed;}
		let messages=[
			{role:"system",content:"You are a language validation assistant. Check if the user input is a valid language name that Whisper supports for translation. Respond with 'VALID: [language_name]' if valid, or 'INVALID: reason' if not valid. Supported languages include: chinese, japanese, spanish, french, german, etc."},
		];
		/*#{1J2M164JU0PrePrompt*/
		let preprompt2=`Please validate this language input for Whisper translation: "${input}"`;
		/*}#1J2M164JU0PrePrompt*/
		prompt=preprompt2;
		if(prompt!==null){
			if(typeof(prompt)!=="string"){
				prompt=JSON.stringify(prompt,null,"	");
			}
			let msg={role:"user",content:prompt};
			/*#{1J2M164JU0FilterMessage*/
			/*}#1J2M164JU0FilterMessage*/
			messages.push(msg);
		}
		/*#{1J2M164JU0PreCall*/
		/*}#1J2M164JU0PreCall*/
		result=(result===null)?(await session.callSegLLM("CheckLanguage2@"+agentURL,opts,messages,true)):result;
		/*#{1J2M164JU0PostCall*/
		// Process LLM response
		if(result && result.includes("VALID:")) {
			const validatedLanguage = result.replace("VALID:", "").trim().toLowerCase();
			selectedLanguage = validatedLanguage;
			session.addChatText("assistant", `✅ 语言验证通过: ${validatedLanguage}，将翻译为英文`);
		} else {
			session.addChatText("assistant", `❌ 语言验证失败: ${result}`);
			return {seg:InputLanguage2,result:(""),preSeg:"1J2M164JU0",outlet:"1J2M15FMS0"};
		}
		/*}#1J2M164JU0PostCall*/
		return {seg:Translate,result:(result),preSeg:"1J2M164JU0",outlet:"1J2M170UR2"};
	};
	CheckLanguage2.jaxId="1J2M164JU0"
	CheckLanguage2.url="CheckLanguage2@"+agentURL
	
	segs["Translate"]=Translate=async function(input){//:1J2M17I520
		let result=input
		/*#{1J2M17I520Code*/
		// Execute Whisper translation
		session.addChatText("assistant", "🌐 正在进行语音翻译，请耐心等待...");
		
		try {
			// Build the whisper command for translation
			let command = `whisper "${globalContext.audioFile}"`;
			command += ` --model tiny`;
			command += ` --language ${selectedLanguage}`;
			command += ` --task translate`;
			command += ` --output_dir "${basePath}"`;
			
			session.addChatText("assistant", `🔧 运行命令: ${command}`);
			
			// Execute the translation
			const translateResult = await session.pipeChat("/@AgentBuilder/Bash.js", {
				bashId: globalContext.bashId,
				action: "Command",
				commands: command,
				options: ""
			}, false);
			
			result = translateResult;
			
			session.addChatText("assistant", "✅ 语音翻译完成！");
			
		} catch (error) {
			session.addChatText("assistant", `❌ 语音翻译失败: ${error.message}`);
			throw error;
		}
		/*}#1J2M17I520Code*/
		return {seg:ShowText2,result:(result),preSeg:"1J2M17I520",outlet:"1J2M188IR2"};
	};
	Translate.jaxId="1J2M17I520"
	Translate.url="Translate@"+agentURL
	
	segs["ShowText2"]=ShowText2=async function(input){//:1J2M18R2O0
		let result=input;
		let channel="Chat";
		let opts={txtHeader:($agent.showName||$agent.name||null),channel:channel};
		let role="assistant";
		let content=input;
		/*#{1J2M18R2O0PreCodes*/
		// Try to read the generated text file
		try {
			const txtFileName = globalContext.audioFileName + ".txt";
			const txtFilePath = pathLib.join(basePath, txtFileName);
			
			if (fs.existsSync(txtFilePath)) {
				const translatedText = await fsp.readFile(txtFilePath, 'utf8');
				content = `🌐 翻译结果:\n\n${translatedText}`;
				
				// Show generation summary
				const summary = `
📊 翻译参数总结:
• 任务类型: 语音翻译
• 原始语言: ${selectedLanguage}
• 目标语言: 英文
• 模型: tiny
• 输出文件: ${txtFileName}
				`;
				session.addChatText("assistant", summary);
			} else {
				content = "❌ 未找到翻译文本文件";
			}
		} catch (error) {
			content = `❌ 读取翻译文件时出错: ${error.message}`;
		}
		/*}#1J2M18R2O0PreCodes*/
		session.addChatText(role,content,opts);
		/*#{1J2M18R2O0PostCodes*/
		/*}#1J2M18R2O0PostCodes*/
		return {result:result};
	};
	ShowText2.jaxId="1J2M18R2O0"
	ShowText2.url="ShowText2@"+agentURL
	
	agent=$agent={
		isAIAgent:true,
		session:session,
		name:"agent",
		url:agentURL,
		autoStart:true,
		jaxId:"1HDBOSUN90",
		context:context,
		livingSeg:null,
		execChat:async function(input){
			let result;
			parseAgentArgs(input);
			/*#{1HDBOSUN90PreEntry*/
			/*}#1HDBOSUN90PreEntry*/
			result={seg:Start,"input":input};
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
//		"inBrowser": "true",
//		"debug": "true",
//		"apiArgs": {
//			"jaxId": "1J2M1ADDL0",
//			"attrs": {}
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
//					"def": "output",
//					"jaxId": "1J2M1ADDI0",
//					"attrs": {
//						"id": "Start",
//						"viewName": "",
//						"label": "",
//						"x": "230",
//						"y": "345",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2M1ADDL1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2M1ADDL2",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"channel": "Chat",
//						"text": "欢迎使用 Whisper 语音转录和翻译系统！请上传您的音频文件。",
//						"outlet": {
//							"jaxId": "1J2M1ADDI1",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2M097V10"
//						}
//					},
//					"icon": "hudtxt.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "askFile",
//					"jaxId": "1J2M050DF0",
//					"attrs": {
//						"id": "UploadAudio",
//						"viewName": "",
//						"label": "",
//						"x": "725",
//						"y": "345",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2M1ADDL3",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2M1ADDL4",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"prompt": "请上传音频文件（支持 .flac, .mp3, .wav 格式）",
//						"path": "",
//						"fileSys": "naive",
//						"filter": "*.flac;*.mp3;*.wav",
//						"read": "No",
//						"outlet": {
//							"jaxId": "1J2M1ADDI2",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2M07TMS0"
//						}
//					},
//					"icon": "folder.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1J2M07TMS0",
//					"attrs": {
//						"id": "CheckAudio",
//						"viewName": "",
//						"label": "",
//						"x": "985",
//						"y": "345",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2M1ADDL5",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2M1ADDL6",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2M1ADDI3",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2M0AGOM0"
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
//					"jaxId": "1J2M08SLP0",
//					"attrs": {
//						"id": "ShowAudio",
//						"viewName": "",
//						"label": "",
//						"x": "1525",
//						"y": "345",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2M1ADDL7",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2M1ADDL8",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2M1ADDI4",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2M0M7PM0"
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
//					"jaxId": "1J2M097V10",
//					"attrs": {
//						"id": "InitFile",
//						"viewName": "",
//						"label": "",
//						"x": "490",
//						"y": "345",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2M1ADDL9",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2M1ADDL10",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2M1ADDI5",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2M050DF0"
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
//					"jaxId": "1J2M0AGOM0",
//					"attrs": {
//						"id": "SaveAudio",
//						"viewName": "",
//						"label": "",
//						"x": "1250",
//						"y": "345",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2M0B1A40",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2M0B1A41",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2M0B1A42",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2M08SLP0"
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
//					"def": "askMenu",
//					"jaxId": "1J2M0BTIV0",
//					"attrs": {
//						"id": "AskTask",
//						"viewName": "",
//						"label": "",
//						"x": "1830",
//						"y": "345",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"prompt": "请选择要执行的任务类型",
//						"multi": "false",
//						"withChat": "false",
//						"outlet": {
//							"jaxId": "1J2M1ADDI6",
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
//									"jaxId": "1J2M0BTIG0",
//									"attrs": {
//										"id": "transcription",
//										"desc": "Outlet.",
//										"text": "语音转录（转换为文字）",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2M1ADDL11",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2M1ADDL12",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2M0G1AV0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2M0BTIG1",
//									"attrs": {
//										"id": "translation",
//										"desc": "Outlet.",
//										"text": "语音翻译（翻译为英文）",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2M1ADDL13",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2M1ADDL14",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2M11DV40"
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
//					"jaxId": "1J2M0G1AV0",
//					"attrs": {
//						"id": "AskLanguage",
//						"viewName": "",
//						"label": "",
//						"x": "2185",
//						"y": "240",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"prompt": "请选择音频的语言（转录任务）",
//						"multi": "false",
//						"withChat": "false",
//						"outlet": {
//							"jaxId": "1J2M1ADDJ0",
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
//									"jaxId": "1J2M0G1AF0",
//									"attrs": {
//										"id": "English",
//										"desc": "Outlet.",
//										"text": "英语 (English)",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2M1ADDL15",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2M1ADDL16",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2M0KTMI0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2M0G1AF1",
//									"attrs": {
//										"id": "Chinese",
//										"desc": "Outlet.",
//										"text": "中文 (Chinese)",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2M1ADDL17",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2M1ADDL18",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2M0KTMI0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2M0G1AF2",
//									"attrs": {
//										"id": "Else",
//										"desc": "Outlet.",
//										"text": "其他语言（手动输入）",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2M1ADDL19",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2M1ADDL20",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2M0H4U00"
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
//					"def": "askChat",
//					"jaxId": "1J2M0H4U00",
//					"attrs": {
//						"id": "InputLanguage",
//						"viewName": "",
//						"label": "",
//						"x": "2490",
//						"y": "325",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2M1ADDL21",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2M1ADDL22",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"tip": "请输入音频的语言（例如：japanese, spanish, french 等）",
//						"tipRole": "Assistant",
//						"placeholder": "例如：japanese",
//						"text": "",
//						"file": "false",
//						"showText": "true",
//						"askUpward": "false",
//						"outlet": {
//							"jaxId": "1J2M1ADDJ1",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2M14FDI0"
//						}
//					},
//					"icon": "chat.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1J2M0KTMI0",
//					"attrs": {
//						"id": "Transcribe",
//						"viewName": "",
//						"label": "",
//						"x": "2995",
//						"y": "240",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2M0L89L0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2M0L89L1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2M0L89L2",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2M0TT750"
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
//					"jaxId": "1J2M0M7PM0",
//					"attrs": {
//						"id": "InitBash",
//						"viewName": "",
//						"label": "",
//						"x": "1590",
//						"y": "520",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2M1ADDL23",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2M1ADDL24",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2M1ADDJ2",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2M0MH0P0"
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
//					"jaxId": "1J2M0MH0P0",
//					"attrs": {
//						"id": "InitConda",
//						"viewName": "",
//						"label": "",
//						"x": "1785",
//						"y": "520",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2M1ADDM0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2M1ADDM1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2M1ADDJ3",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2M0BTIV0"
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
//					"jaxId": "1J2M0TT750",
//					"attrs": {
//						"id": "ShowText",
//						"viewName": "",
//						"label": "",
//						"x": "3285",
//						"y": "240",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2M0UET20",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2M0UET21",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"channel": "Chat",
//						"text": "#input",
//						"outlet": {
//							"jaxId": "1J2M0UET22",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							}
//						}
//					},
//					"icon": "hudtxt.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "askMenu",
//					"jaxId": "1J2M11DV40",
//					"attrs": {
//						"id": "AskLanguage2",
//						"viewName": "",
//						"label": "",
//						"x": "2185",
//						"y": "500",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"prompt": "请选择音频的语言（翻译任务，将翻译为英文）",
//						"multi": "false",
//						"withChat": "false",
//						"outlet": {
//							"jaxId": "1J2M1ADDJ4",
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
//									"jaxId": "1J2M11DUK0",
//									"attrs": {
//										"id": "Chinese",
//										"desc": "Outlet.",
//										"text": "中文 (Chinese)",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2M1ADDM2",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2M1ADDM3",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2M17I520"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2M11DUK1",
//									"attrs": {
//										"id": "Japanese",
//										"desc": "Outlet.",
//										"text": "日语 (Japanese)",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2M1ADDM4",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2M1ADDM5",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2M17I520"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2M14USK0",
//									"attrs": {
//										"id": "Else",
//										"desc": "Outlet.",
//										"text": "其他语言（手动输入）",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2M1ADDM6",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2M1ADDM7",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2M15FMS0"
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
//					"def": "callLLM",
//					"jaxId": "1J2M14FDI0",
//					"attrs": {
//						"id": "CheckLanguage",
//						"viewName": "",
//						"label": "",
//						"x": "2745",
//						"y": "325",
//						"desc": "Excute a LLM call.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2M1ADDM8",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2M1ADDM9",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"platform": "\"OpenAI\"",
//						"mode": "GPT-3.5",
//						"system": "You are a language validation assistant. Check if the user input is a valid language name that Whisper supports. Respond with 'VALID: [language_name]' if valid, or 'INVALID: reason' if not valid. Supported languages include: english, chinese, japanese, spanish, french, german, etc.",
//						"temperature": "0",
//						"maxToken": "2000",
//						"topP": "1",
//						"fqcP": "0",
//						"prcP": "0",
//						"messages": {
//							"attrs": []
//						},
//						"prompt": "#preprompt",
//						"seed": "",
//						"outlet": {
//							"jaxId": "1J2M1ADDJ5",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2M0KTMI0"
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
//					"def": "askChat",
//					"jaxId": "1J2M15FMS0",
//					"attrs": {
//						"id": "InputLanguage2",
//						"viewName": "",
//						"label": "",
//						"x": "2490",
//						"y": "605",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2M1ADDM10",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2M1ADDM11",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"tip": "请输入音频的语言（例如：spanish, french, german 等，将翻译为英文）",
//						"tipRole": "Assistant",
//						"placeholder": "例如：spanish",
//						"text": "",
//						"file": "false",
//						"showText": "true",
//						"askUpward": "false",
//						"outlet": {
//							"jaxId": "1J2M1ADDJ6",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2M164JU0"
//						}
//					},
//					"icon": "chat.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "callLLM",
//					"jaxId": "1J2M164JU0",
//					"attrs": {
//						"id": "CheckLanguage2",
//						"viewName": "",
//						"label": "",
//						"x": "2745",
//						"y": "605",
//						"desc": "Excute a LLM call.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2M170UR0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2M170UR1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"platform": "\"OpenAI\"",
//						"mode": "GPT-3.5",
//						"system": "You are a language validation assistant. Check if the user input is a valid language name that Whisper supports for translation. Respond with 'VALID: [language_name]' if valid, or 'INVALID: reason' if not valid. Supported languages include: chinese, japanese, spanish, french, german, etc.",
//						"temperature": "0",
//						"maxToken": "2000",
//						"topP": "1",
//						"fqcP": "0",
//						"prcP": "0",
//						"messages": {
//							"attrs": []
//						},
//						"prompt": "#preprompt2",
//						"seed": "",
//						"outlet": {
//							"jaxId": "1J2M170UR2",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2M17I520"
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
//					"jaxId": "1J2M17I520",
//					"attrs": {
//						"id": "Translate",
//						"viewName": "",
//						"label": "",
//						"x": "2995",
//						"y": "500",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2M188IR0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2M188IR1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2M188IR2",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2M18R2O0"
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
//					"jaxId": "1J2M18R2O0",
//					"attrs": {
//						"id": "ShowText2",
//						"viewName": "",
//						"label": "",
//						"x": "3285",
//						"y": "500",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2M1ADDM12",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2M1ADDM13",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"channel": "Chat",
//						"text": "#input",
//						"outlet": {
//							"jaxId": "1J2M1ADDJ7",
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
//		"desc": "这是一个AI代理。",
//		"exportAPI": "false",
//		"exportAddOn": "false",
//		"addOnOpts": ""
//	}
//}