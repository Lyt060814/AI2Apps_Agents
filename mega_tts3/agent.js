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

async function checkWavFile(filePath) {
	try {
		const stats = await fsp.stat(filePath);
		const sizeInMB = stats.size / (1024 * 1024);
		
		// Check file extension
		if (!filePath.toLowerCase().endsWith('.wav')) {
			return { valid: false, error: 'File must be a WAV file' };
		}
		
		// Rough estimation: assume 16-bit, 44.1kHz stereo
		// 1 second ≈ 176.4KB, so 24s ≈ 4.2MB
		const estimatedDuration = sizeInMB / 0.175; // rough estimation
		
		if (estimatedDuration > 24) {
			return { valid: false, error: 'Audio file must be less than 24 seconds' };
		}
		
		return { valid: true, duration: estimatedDuration };
	} catch (error) {
		return { valid: false, error: error.message };
	}
}

async function checkNpyFile(filePath) {
	try {
		if (!filePath.toLowerCase().endsWith('.npy')) {
			return { valid: false, error: 'File must be a NPY file' };
		}
		return { valid: true };
	} catch (error) {
		return { valid: false, error: error.message };
	}
}
/*}#1HDBOSUN90StartDoc*/
//----------------------------------------------------------------------------
let agent=async function(session){
	let execInput;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let UploadAudio,AskLanguage,AskDefault,UploadWAV,CheckWAV,UploadNPY,ShowWAV,SaveWAV,CheckNPY,SaveNPY,ShowDefault,InputText,goto,TimeSteps,AskAccent,AskEmotion,InitBash,InitConda,Generate,ShowAudio,InitFile;
	/*#{1HDBOSUN90LocalVals*/
	let nodeJSON, conda;
	let audioFile = null;
	let npyFile = null;
	let inputText = "";
	let timeSteps = 32;
	let p_w = 1.6; // intelligibility weight
	let t_w = 2.5; // similarity weight
	let outputPath = "";
	
	// Initialize conda environment
	try {
		nodeJSON = await fsp.readFile(pathLib.join(basePath, "agent.json"), "utf8");
		nodeJSON = JSON.parse(nodeJSON);
		conda = nodeJSON.conda || "megatts3";
	} catch(err) {
		console.warn("Could not read agent.json, using default conda environment");
		conda = "megatts3";
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
	/*#{1HDBOSUN90PostContext*/
	/*}#1HDBOSUN90PostContext*/
	let $agent,agent,segs={};
	segs["UploadAudio"]=UploadAudio=async function(input){//:1J2KKGJ1U0
		let result=input;
		let channel="Chat";
		let opts={txtHeader:($agent.showName||$agent.name||null),channel:channel};
		let role="assistant";
		let content="欢迎使用 MegaTTS3 音频生成系统！请选择您的音频来源。";
		/*#{1J2KKGJ1U0PreCodes*/
		/*}#1J2KKGJ1U0PreCodes*/
		session.addChatText(role,content,opts);
		/*#{1J2KKGJ1U0PostCodes*/
		/*}#1J2KKGJ1U0PostCodes*/
		return {seg:InitFile,result:(result),preSeg:"1J2KKGJ1U0",outlet:"1J2KKGJ1U1"};
	};
	UploadAudio.jaxId="1J2KKGJ1U0"
	UploadAudio.url="UploadAudio@"+agentURL
	
	segs["AskLanguage"]=AskLanguage=async function(input){//:1J2KK70NK0
		let prompt=("请选择默认音频语言")||input;
		let silent=false;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let button1=("中文")||"OK";
		let button2=("英文")||"Cancel";
		let button3="";
		let result="";
		let value=0;
		/*#{1J2KK70NK0PreCodes*/
		/*}#1J2KK70NK0PreCodes*/
		if(silent){
			result="";
			/*#{1J2KK70N30Silent*/
			audioFile = "MegaTTS3/assets/Chinese_prompt.wav";
			/*}#1J2KK70N30Silent*/
			return {seg:ShowDefault,result:(result),preSeg:"1J2KK70NK0",outlet:"1J2KK70N30"};
		}
		[result,value]=await session.askUserRaw({type:"confirm",prompt:prompt,button1:button1,button2:button2,button3:button3,countdown:countdown,withChat:undefined,placeholder:placeholder});
		/*#{1J2KK70NK0PostCodes*/
		/*}#1J2KK70NK0PostCodes*/
		if(value===1){
			result=("")||result;
			/*#{1J2KK70N30Btn1*/
			result=("选择了中文默认音频")||result;
			audioFile = "MegaTTS3/assets/Chinese_prompt.wav";
			/*}#1J2KK70N30Btn1*/
			return {seg:ShowDefault,result:(result),preSeg:"1J2KK70NK0",outlet:"1J2KK70N30"};
		}
		result=("")||result;
		/*#{1J2KK70N31Btn2*/
		result=("选择了英文默认音频")||result;
		audioFile = "MegaTTS3/assets/English_prompt.wav";
		/*}#1J2KK70N31Btn2*/
		return {seg:ShowDefault,result:(result),preSeg:"1J2KK70NK0",outlet:"1J2KK70N31"};
	
	};
	AskLanguage.jaxId="1J2KK70NK0"
	AskLanguage.url="AskLanguage@"+agentURL
	
	segs["AskDefault"]=AskDefault=async function(input){//:1J2KK893K0
		let prompt=("请选择音频来源")||input;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let withChat=false;
		let silent=false;
		let items=[
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"使用自己的音频",code:0},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"使用默认音频",code:1},
		];
		let result="";
		let item=null;
		
		if(silent){
			result="";
			return {seg:UploadWAV,result:(result),preSeg:"1J2KK893K0",outlet:"1J2KK89300"};
		}
		[result,item]=await session.askUserRaw({type:"menu",prompt:prompt,multiSelect:false,items:items,withChat:withChat,countdown:countdown,placeholder:placeholder});
		if(typeof(item)==='string'){
			result=item;
			return {result:result};
		}else if(item.code===0){
			return {seg:UploadWAV,result:(result),preSeg:"1J2KK893K0",outlet:"1J2KK89300"};
		}else if(item.code===1){
			return {seg:AskLanguage,result:(result),preSeg:"1J2KK893K0",outlet:"1J2KK89301"};
		}
		return {result:result};
	};
	AskDefault.jaxId="1J2KK893K0"
	AskDefault.url="AskDefault@"+agentURL
	
	segs["UploadWAV"]=UploadWAV=async function(input){//:1J2KKAS6I0
		let prompt=("请上传 WAV 音频文件（小于24秒）")||input;
		let resultText="";
		let fileData=null;
		let enc=null;
		let ext=null;
		let fileSys="native";
		let result="";
		let path=("");
		let filter=("*.wav");
		[resultText,result]=await session.askUserRaw({type:"input",prompt:prompt,text:"",path:path,file:fileSys,filter:filter,});
		if(!result && resultText){
			result=resultText;
		}else if(resultText && result){
			result=session.arrayBufferToDataURL(resultText,result);
		}
		return {seg:CheckWAV,result:(result),preSeg:"1J2KKAS6I0",outlet:"1J2KKGJ200"};
	};
	UploadWAV.jaxId="1J2KKAS6I0"
	UploadWAV.url="UploadWAV@"+agentURL
	
	segs["CheckWAV"]=CheckWAV=async function(input){//:1J2KKCO8S0
		let result=input
		/*#{1J2KKCO8S0Code*/
		try {
			// Save the uploaded file temporarily
			const tempWavPath = pathLib.join(basePath, "temp_upload.wav");
			await saveBase64Audio(input, tempWavPath);
			
			// Check if it's a valid WAV file
			const checkResult = await checkWavFile(tempWavPath);
			
			if (!checkResult.valid) {
				session.addChatText("assistant", `❌ 文件检查失败: ${checkResult.error}`);
				// Clean up temp file
				try {
					await fsp.unlink(tempWavPath);
				} catch(e) {}
				return {seg:UploadWAV,result:(""),preSeg:"1J2KKCO8S0",outlet:"1J2KKGJ201"};
			}
			
			session.addChatText("assistant", `✅ WAV 文件检查通过，预计时长: ${checkResult.duration.toFixed(1)} 秒`);
			globalContext.tempWavPath = tempWavPath;
			
		} catch (error) {
			session.addChatText("assistant", `❌ 文件处理出错: ${error.message}`);
			return {seg:UploadWAV,result:(""),preSeg:"1J2KKCO8S0",outlet:"1J2KKGJ201"};
		}
		/*}#1J2KKCO8S0Code*/
		return {seg:ShowWAV,result:(result),preSeg:"1J2KKCO8S0",outlet:"1J2KKGJ201"};
	};
	CheckWAV.jaxId="1J2KKCO8S0"
	CheckWAV.url="CheckWAV@"+agentURL
	
	segs["UploadNPY"]=UploadNPY=async function(input){//:1J2KKE3P50
		let prompt=("请上传对应的 NPY 特征文件")||input;
		let resultText="";
		let fileData=null;
		let enc=null;
		let ext=null;
		let fileSys="native";
		let result="";
		let path=("");
		let filter=("*.npy");
		[resultText,result]=await session.askUserRaw({type:"input",prompt:prompt,text:"",path:path,file:fileSys,filter:filter,});
		if(!result && resultText){
			result=resultText;
		}else if(resultText && result){
			result=session.arrayBufferToDataURL(resultText,result);
		}
		return {seg:CheckNPY,result:(result),preSeg:"1J2KKE3P50",outlet:"1J2KKF07R2"};
	};
	UploadNPY.jaxId="1J2KKE3P50"
	UploadNPY.url="UploadNPY@"+agentURL
	
	segs["ShowWAV"]=ShowWAV=async function(input){//:1J2KL7GM60
		let result=input
		/*#{1J2KL7GM60Code*/
		try {
			// Read the temporary WAV file and create a hub file for playback
			const tempWavPath = globalContext.tempWavPath;
			if (tempWavPath && fs.existsSync(tempWavPath)) {
				const audioData = await fsp.readFile(tempWavPath);
				const hubUrl = await session.saveHubFile("uploaded_audio.wav", audioData);
				
				// Display the audio in the chat interface
				session.addChatText("assistant", "📁 已上传的音频文件:", {
					audio: "hub://" + hubUrl
				});
			}
		} catch (error) {
			session.addChatText("assistant", `❌ 显示音频时出错: ${error.message}`);
		}
		/*}#1J2KL7GM60Code*/
		return {seg:SaveWAV,result:(result),preSeg:"1J2KL7GM60",outlet:"1J2KM74A80"};
	};
	ShowWAV.jaxId="1J2KL7GM60"
	ShowWAV.url="ShowWAV@"+agentURL
	
	segs["SaveWAV"]=SaveWAV=async function(input){//:1J2KL83VD0
		let result=input
		/*#{1J2KL83VD0Code*/
		try {
			const tempWavPath = globalContext.tempWavPath;
			if (tempWavPath && fs.existsSync(tempWavPath)) {
				// Generate a unique filename
				const timestamp = Date.now();
				const fileName = `user_audio_${timestamp}.wav`;
				const assetsDir = pathLib.join(basePath, "MegaTTS3", "assets");
				const finalWavPath = pathLib.join(assetsDir, fileName);
				
				// Ensure assets directory exists
				await fsp.mkdir(assetsDir, { recursive: true });
				
				// Move the temporary file to assets directory
				await fsp.rename(tempWavPath, finalWavPath);
				
				// Store the file paths for later use
				audioFile = pathLib.join("MegaTTS3", "assets", fileName);
				globalContext.audioFileName = fileName.replace('.wav', ''); // Store base name without extension
				
				session.addChatText("assistant", `✅ WAV 文件已保存: ${fileName}`);
			}
		} catch (error) {
			session.addChatText("assistant", `❌ 保存 WAV 文件时出错: ${error.message}`);
		}
		/*}#1J2KL83VD0Code*/
		return {seg:UploadNPY,result:(result),preSeg:"1J2KL83VD0",outlet:"1J2KM74A81"};
	};
	SaveWAV.jaxId="1J2KL83VD0"
	SaveWAV.url="SaveWAV@"+agentURL
	
	segs["CheckNPY"]=CheckNPY=async function(input){//:1J2KL9B650
		let result=input
		/*#{1J2KL9B650Code*/
		try {
			// Save the uploaded NPY file temporarily
			const tempNpyPath = pathLib.join(basePath, "temp_upload.npy");
			await saveBase64Audio(input, tempNpyPath);
			
			// Check if it's a valid NPY file
			const checkResult = await checkNpyFile(tempNpyPath);
			
			if (!checkResult.valid) {
				session.addChatText("assistant", `❌ NPY 文件检查失败: ${checkResult.error}`);
				// Clean up temp file
				try {
					await fsp.unlink(tempNpyPath);
				} catch(e) {}
				return {seg:UploadNPY,result:(""),preSeg:"1J2KL9B650",outlet:"1J2KM74A82"};
			}
			
			session.addChatText("assistant", "✅ NPY 文件检查通过");
			globalContext.tempNpyPath = tempNpyPath;
			
		} catch (error) {
			session.addChatText("assistant", `❌ NPY 文件处理出错: ${error.message}`);
			return {seg:UploadNPY,result:(""),preSeg:"1J2KL9B650",outlet:"1J2KM74A82"};
		}
		/*}#1J2KL9B650Code*/
		return {seg:SaveNPY,result:(result),preSeg:"1J2KL9B650",outlet:"1J2KM74A82"};
	};
	CheckNPY.jaxId="1J2KL9B650"
	CheckNPY.url="CheckNPY@"+agentURL
	
	segs["SaveNPY"]=SaveNPY=async function(input){//:1J2KL9UN20
		let result=input
		/*#{1J2KL9UN20Code*/
		try {
			const tempNpyPath = globalContext.tempNpyPath;
			if (tempNpyPath && fs.existsSync(tempNpyPath)) {
				// Use the same base filename as the WAV file
				const baseFileName = globalContext.audioFileName;
				if (baseFileName) {
					const npyFileName = `${baseFileName}.npy`;
					const assetsDir = pathLib.join(basePath, "MegaTTS3", "assets");
					const finalNpyPath = pathLib.join(assetsDir, npyFileName);
					
					// Move the temporary file to assets directory
					await fsp.rename(tempNpyPath, finalNpyPath);
					
					// Store the NPY file path
					npyFile = pathLib.join("MegaTTS3", "assets", npyFileName);
					
					session.addChatText("assistant", `✅ NPY 文件已保存: ${npyFileName}`);
				} else {
					session.addChatText("assistant", "❌ 无法获取音频文件基础名称");
				}
			}
		} catch (error) {
			session.addChatText("assistant", `❌ 保存 NPY 文件时出错: ${error.message}`);
		}
		/*}#1J2KL9UN20Code*/
		return {seg:InputText,result:(result),preSeg:"1J2KL9UN20",outlet:"1J2KM74A83"};
	};
	SaveNPY.jaxId="1J2KL9UN20"
	SaveNPY.url="SaveNPY@"+agentURL
	
	segs["ShowDefault"]=ShowDefault=async function(input){//:1J2KLB1IN0
		let result=input
		/*#{1J2KLB1IN0Code*/
		try {
			if (audioFile) {
				const defaultAudioPath = pathLib.join(basePath, audioFile);
				
				if (fs.existsSync(defaultAudioPath)) {
					const audioData = await fsp.readFile(defaultAudioPath);
					const hubUrl = await session.saveHubFile(pathLib.basename(audioFile), audioData);
					
					// Display the audio in the chat interface
					session.addChatText("assistant", "🎵 默认音频文件:", {
						audio: "hub://" + hubUrl
					});
				} else {
					session.addChatText("assistant", `❌ 默认音频文件不存在: ${defaultAudioPath}`);
				}
			} else {
				session.addChatText("assistant", "❌ audioFile 变量为空或未定义");
			}
		} catch (error) {
			session.addChatText("assistant", `❌ 显示默认音频时出错: ${error.message || error}`);
		}
		/*}#1J2KLB1IN0Code*/
		return {seg:goto,result:(result),preSeg:"1J2KLB1IN0",outlet:"1J2KM74A84"};
	};
	ShowDefault.jaxId="1J2KLB1IN0"
	ShowDefault.url="ShowDefault@"+agentURL
	
	segs["InputText"]=InputText=async function(input){//:1J2KLJ97U0
		let tip=("请输入要合成的文本内容（支持中英文）:");
		let tipRole=("assistant");
		let placeholder=("例如：Hello, this is a test. 这是一个测试。");
		let allowFile=(false)||false;
		let askUpward=(false);
		let text=("");
		let result="";
		/*#{1J2KLJ97U0PreCodes*/
		/*}#1J2KLJ97U0PreCodes*/
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
		/*#{1J2KLJ97U0PostCodes*/
		inputText = result; // Store the input text
		/*}#1J2KLJ97U0PostCodes*/
		return {seg:TimeSteps,result:(result),preSeg:"1J2KLJ97U0",outlet:"1J2KM74A85"};
	};
	InputText.jaxId="1J2KLJ97U0"
	InputText.url="InputText@"+agentURL
	
	segs["goto"]=goto=async function(input){//:1J2KLK1A30
		let result=input;
		return {seg:InputText,result:result,preSeg:"1J2KLJ97U0",outlet:"1J2KM74A86"};
	
	};
	goto.jaxId="1J2KLJ97U0"
	goto.url="goto@"+agentURL
	
	segs["TimeSteps"]=TimeSteps=async function(input){//:1J2KLMUDJ0
		let tip=("请输入推理步数 (默认32，范围1-100):");
		let tipRole=("assistant");
		let placeholder=("32");
		let allowFile=(false)||false;
		let askUpward=(false);
		let text=("32");
		let result="";
		/*#{1J2KLMUDJ0PreCodes*/
		/*}#1J2KLMUDJ0PreCodes*/
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
		/*#{1J2KLMUDJ0PostCodes*/
		const steps = parseInt(result);
		if (isNaN(steps) || steps < 1 || steps > 100) {
			timeSteps = 32;
			session.addChatText("assistant", "⚠️ 无效输入，使用默认值 32");
		} else {
			timeSteps = steps;
		}
		/*}#1J2KLMUDJ0PostCodes*/
		return {seg:AskAccent,result:(result),preSeg:"1J2KLMUDJ0",outlet:"1J2KM74A87"};
	};
	TimeSteps.jaxId="1J2KLMUDJ0"
	TimeSteps.url="TimeSteps@"+agentURL
	
	segs["AskAccent"]=AskAccent=async function(input){//:1J2KLR1MQ0
		let prompt=("是否希望音频具有口音特征？")||input;
		let silent=false;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let button1=("是，需要口音")||"OK";
		let button2=("否，标准发音")||"Cancel";
		let button3="";
		let result="";
		let value=0;
		if(silent){
			result="";
			/*#{1J2KLR1M80Silent*/
			p_w = 1.6; // Default value
			/*}#1J2KLR1M80Silent*/
			return {seg:AskEmotion,result:(result),preSeg:"1J2KLR1MQ0",outlet:"1J2KLR1M80"};
		}
		[result,value]=await session.askUserRaw({type:"confirm",prompt:prompt,button1:button1,button2:button2,button3:button3,countdown:countdown,withChat:undefined,placeholder:placeholder});
		if(value===1){
			result=("")||result;
			/*#{1J2KLR1M80Btn1*/
			result=("选择了有口音的发音")||result;
			p_w = 1.0; // Lower value for more accent
			session.addChatText("assistant", `✅ 设置 p_w = ${p_w} (有口音)`);
			/*}#1J2KLR1M80Btn1*/
			return {seg:AskEmotion,result:(result),preSeg:"1J2KLR1MQ0",outlet:"1J2KLR1M80"};
		}
		result=("")||result;
		/*#{1J2KLR1M81Btn2*/
		result=("选择了标准发音")||result;
		p_w = 2.5; // Higher value for clearer pronunciation
		session.addChatText("assistant", `✅ 设置 p_w = ${p_w} (标准发音)`);
		/*}#1J2KLR1M81Btn2*/
		return {seg:AskEmotion,result:(result),preSeg:"1J2KLR1MQ0",outlet:"1J2KLR1M81"};
	
	};
	AskAccent.jaxId="1J2KLR1MQ0"
	AskAccent.url="AskAccent@"+agentURL
	
	segs["AskEmotion"]=AskEmotion=async function(input){//:1J2KLVIAC0
		let prompt=("是否希望音频更加情绪化？")||input;
		let silent=false;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let button1=("是，更情绪化")||"OK";
		let button2=("否，保持平淡")||"Cancel";
		let button3="";
		let result="";
		let value=0;
		if(silent){
			result="";
			/*#{1J2KLVI9T0Silent*/
			t_w = 2.5; // Default value
			/*}#1J2KLVI9T0Silent*/
			return {seg:InitBash,result:(result),preSeg:"1J2KLVIAC0",outlet:"1J2KLVI9T0"};
		}
		[result,value]=await session.askUserRaw({type:"confirm",prompt:prompt,button1:button1,button2:button2,button3:button3,countdown:countdown,withChat:undefined,placeholder:placeholder});
		if(value===1){
			result=("")||result;
			/*#{1J2KLVI9T0Btn1*/
			result=("选择了情绪化的音频")||result;
			t_w = 4.0; // Higher value for more emotion
			session.addChatText("assistant", `✅ 设置 t_w = ${t_w} (情绪化)`);
			/*}#1J2KLVI9T0Btn1*/
			return {seg:InitBash,result:(result),preSeg:"1J2KLVIAC0",outlet:"1J2KLVI9T0"};
		}
		result=("")||result;
		/*#{1J2KLVI9T1Btn2*/
		result=("选择了平淡的音频")||result;
		t_w = 2.5; // Standard value
		session.addChatText("assistant", `✅ 设置 t_w = ${t_w} (平淡)`);
		/*}#1J2KLVI9T1Btn2*/
		return {seg:InitBash,result:(result),preSeg:"1J2KLVIAC0",outlet:"1J2KLVI9T1"};
	
	};
	AskEmotion.jaxId="1J2KLVIAC0"
	AskEmotion.url="AskEmotion@"+agentURL
	
	segs["InitBash"]=InitBash=async function(input){//:1J2KM2F9O0
		let result=input
		/*#{1J2KM2F9O0Code*/
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
		/*}#1J2KM2F9O0Code*/
		return {seg:InitConda,result:(result),preSeg:"1J2KM2F9O0",outlet:"1J2KM74A88"};
	};
	InitBash.jaxId="1J2KM2F9O0"
	InitBash.url="InitBash@"+agentURL
	
	segs["InitConda"]=InitConda=async function(input){//:1J2KM32P00
		let result=input
		/*#{1J2KM32P00Code*/
		// Initialize conda environment and navigate to project directory
		session.addChatText("assistant", "🐍 正在激活 Conda 环境...");
		try {
			const commands = [
				`conda activate ${conda}`,
				`cd "${pathLib.join(basePath, "MegaTTS3")}"`
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
		/*}#1J2KM32P00Code*/
		return {seg:Generate,result:(result),preSeg:"1J2KM32P00",outlet:"1J2KM3C0G2"};
	};
	InitConda.jaxId="1J2KM32P00"
	InitConda.url="InitConda@"+agentURL
	
	segs["Generate"]=Generate=async function(input){//:1J2KM3POV0
		let result=input
		/*#{1J2KM3POV0Code*/
		// Generate TTS audio
		session.addChatText("assistant", "🎵 正在生成音频，请耐心等待...");
		
		try {
			// Prepare the command
			const outputDir = pathLib.join(basePath, "MegaTTS3", "gen");
			
			// Ensure output directory exists
			await fsp.mkdir(outputDir, { recursive: true });
			
			// Build the command
			let command = `python tts/infer_cli.py`;
			command += ` --input_wav "${audioFile}"`;
			command += ` --input_text "${inputText}"`;
			command += ` --output_dir "./gen"`;
			command += ` --time_step ${timeSteps}`;
			command += ` --p_w ${p_w}`;
			command += ` --t_w ${t_w}`;
			
			session.addChatText("assistant", `🔧 运行命令: ${command}`);
			
			// Execute the TTS generation
			const generateResult = await session.pipeChat("/@AgentBuilder/Bash.js", {
				bashId: globalContext.bashId,
				action: "Command",
				commands: command,
				options: ""
			}, false);
			
			result = generateResult;
			
			// Store output path for the next segment
			outputPath = outputDir;
			globalContext.outputPath = outputPath;
			
			session.addChatText("assistant", "✅ 音频生成完成！");
			
		} catch (error) {
			session.addChatText("assistant", `❌ 音频生成失败: ${error.message}`);
			throw error;
		}
		/*}#1J2KM3POV0Code*/
		return {seg:ShowAudio,result:(result),preSeg:"1J2KM3POV0",outlet:"1J2KM4A1L2"};
	};
	Generate.jaxId="1J2KM3POV0"
	Generate.url="Generate@"+agentURL
	
	segs["ShowAudio"]=ShowAudio=async function(input){//:1J2KM5N0R0
		let result=input
		/*#{1J2KM5N0R0Code*/
		// Display the generated audio
		try {
			const outputDir = globalContext.outputPath || pathLib.join(basePath, "MegaTTS3", "gen");
			
			// Look for generated audio files in the output directory
			const files = await fsp.readdir(outputDir);
			const audioFiles = files.filter(file => file.endsWith('.wav'));
			
			if (audioFiles.length > 0) {
				// Use the first audio file found (typically there should be only one)
				const audioFileName = audioFiles[0];
				const audioFilePath = pathLib.join(outputDir, audioFileName);
				
				// Read the generated audio file
				const audioData = await fsp.readFile(audioFilePath);
				const hubUrl = await session.saveHubFile(`generated_${audioFileName}`, audioData);
				
				// Display the audio in the chat interface
				session.addChatText("assistant", "🎉 音频生成成功！", {
					audio: "hub://" + hubUrl
				});
				
				// Show generation summary
				const summary = `
		📊 生成参数总结:
		• 输入文本: "${inputText}"
		• 时间步数: ${timeSteps}
		• 口音控制 (p_w): ${p_w}
		• 情绪控制 (t_w): ${t_w}
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
		/*}#1J2KM5N0R0Code*/
		return {result:result};
	};
	ShowAudio.jaxId="1J2KM5N0R0"
	ShowAudio.url="ShowAudio@"+agentURL
	
	segs["InitFile"]=InitFile=async function(input){//:1J2KPO2R50
		let result=input
		/*#{1J2KPO2R50Code*/
		try {
			// Initialize file system directories and required files
			session.addChatText("assistant", "🔧 正在初始化文件系统...");
			
			// Ensure filelib directory exists for Hub file system
			const filelibDir = pathLib.join(pathLib.dirname(pathLib.dirname(basePath)), "filelib");
			await fsp.mkdir(filelibDir, { recursive: true });
			
			// Initialize file ID counter if it doesn't exist
			const fileIdPath = pathLib.join(filelibDir, "_file_id.txt");
			if (!fs.existsSync(fileIdPath)) {
				await fsp.writeFile(fileIdPath, "0", "utf8");
			}
			
			// Ensure MegaTTS3 assets directory exists
			const assetsDir = pathLib.join(basePath, "MegaTTS3", "assets");
			await fsp.mkdir(assetsDir, { recursive: true });
			
			// Ensure MegaTTS3 gen directory exists
			const genDir = pathLib.join(basePath, "MegaTTS3", "gen");
			await fsp.mkdir(genDir, { recursive: true });
			
			// Check if default audio files exist
			const chineseAudio = pathLib.join(assetsDir, "Chinese_prompt.wav");
			const englishAudio = pathLib.join(assetsDir, "English_prompt.wav");
			const chineseNpy = pathLib.join(assetsDir, "Chinese_prompt.npy");
			const englishNpy = pathLib.join(assetsDir, "English_prompt.npy");
			
			let missingFiles = [];
			if (!fs.existsSync(chineseAudio)) missingFiles.push("Chinese_prompt.wav");
			if (!fs.existsSync(englishAudio)) missingFiles.push("English_prompt.wav");
			if (!fs.existsSync(chineseNpy)) missingFiles.push("Chinese_prompt.npy");
			if (!fs.existsSync(englishNpy)) missingFiles.push("English_prompt.npy");
			
			if (missingFiles.length > 0) {
				session.addChatText("assistant", `⚠️ 缺少默认音频文件: ${missingFiles.join(", ")}`);
				session.addChatText("assistant", "请确保在 MegaTTS3/assets/ 目录中放置了所需的默认音频文件");
			} else {
				session.addChatText("assistant", "✅ 所有默认音频文件已就绪");
			}
			
			session.addChatText("assistant", "✅ 文件系统初始化完成");
			
		} catch (error) {
			session.addChatText("assistant", `❌ 文件系统初始化失败: ${error.message}`);
		}
		/*}#1J2KPO2R50Code*/
		return {seg:AskDefault,result:(result),preSeg:"1J2KPO2R50",outlet:"1J2KPO79B2"};
	};
	InitFile.jaxId="1J2KPO2R50"
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
		execChat:async function(input){
			let result;
			parseAgentArgs(input);
			/*#{1HDBOSUN90PreEntry*/
			/*}#1HDBOSUN90PreEntry*/
			result={seg:UploadAudio,"input":input};
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
//			"jaxId": "1J2KM74AG0",
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
//					"jaxId": "1J2KKGJ1U0",
//					"attrs": {
//						"id": "UploadAudio",
//						"viewName": "",
//						"label": "",
//						"x": "-125",
//						"y": "290",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2KM74AG1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2KM74AG2",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"channel": "Chat",
//						"text": "欢迎使用 MegaTTS3 音频生成系统！请选择您的音频来源。",
//						"outlet": {
//							"jaxId": "1J2KKGJ1U1",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2KPO2R50"
//						}
//					},
//					"icon": "hudtxt.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "askConfirm",
//					"jaxId": "1J2KK70NK0",
//					"attrs": {
//						"id": "AskLanguage",
//						"viewName": "",
//						"label": "",
//						"x": "780",
//						"y": "405",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"prompt": "请选择默认音频语言",
//						"outlets": {
//							"attrs": [
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2KK70N30",
//									"attrs": {
//										"id": "Chinese",
//										"desc": "Outlet.",
//										"text": "中文",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2KM74AG3",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2KM74AG4",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2KLB1IN0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2KK70N31",
//									"attrs": {
//										"id": "English",
//										"desc": "Outlet.",
//										"text": "英文",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2KM74AG5",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2KM74AG6",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2KLB1IN0"
//								}
//							]
//						},
//						"silent": "false"
//					},
//					"icon": "help.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "askMenu",
//					"jaxId": "1J2KK893K0",
//					"attrs": {
//						"id": "AskDefault",
//						"viewName": "",
//						"label": "",
//						"x": "465",
//						"y": "290",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"prompt": "请选择音频来源",
//						"multi": "false",
//						"withChat": "false",
//						"outlet": {
//							"jaxId": "1J2KKGJ1V0",
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
//									"jaxId": "1J2KK89300",
//									"attrs": {
//										"id": "Own",
//										"desc": "Outlet.",
//										"text": "使用自己的音频",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1J2KM74AG7",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2KM74AG8",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2KKAS6I0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2KK89301",
//									"attrs": {
//										"id": "Default",
//										"desc": "Outlet.",
//										"text": "使用默认音频",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1J2KM74AG9",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2KM74AG10",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2KK70NK0"
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
//					"def": "askFile",
//					"jaxId": "1J2KKAS6I0",
//					"attrs": {
//						"id": "UploadWAV",
//						"viewName": "",
//						"label": "",
//						"x": "795",
//						"y": "175",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2KM74AG11",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2KM74AG12",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"prompt": "请上传 WAV 音频文件（小于24秒）",
//						"path": "",
//						"fileSys": "naive",
//						"filter": "*.wav",
//						"read": "No",
//						"outlet": {
//							"jaxId": "1J2KKGJ200",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2KKCO8S0"
//						}
//					},
//					"icon": "folder.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1J2KKCO8S0",
//					"attrs": {
//						"id": "CheckWAV",
//						"viewName": "",
//						"label": "",
//						"x": "1095",
//						"y": "175",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2KM74AG13",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2KM74AG14",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2KKGJ201",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2KL7GM60"
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
//					"def": "askFile",
//					"jaxId": "1J2KKE3P50",
//					"attrs": {
//						"id": "UploadNPY",
//						"viewName": "",
//						"label": "",
//						"x": "1930",
//						"y": "175",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2KKF07R0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2KKF07R1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"prompt": "请上传对应的 NPY 特征文件",
//						"path": "",
//						"fileSys": "naive",
//						"filter": "*.npy",
//						"read": "No",
//						"outlet": {
//							"jaxId": "1J2KKF07R2",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2KL9B650"
//						}
//					},
//					"icon": "folder.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1J2KL7GM60",
//					"attrs": {
//						"id": "ShowWAV",
//						"viewName": "",
//						"label": "",
//						"x": "1365",
//						"y": "175",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2KM74AG15",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2KM74AG16",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2KM74A80",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2KL83VD0"
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
//					"jaxId": "1J2KL83VD0",
//					"attrs": {
//						"id": "SaveWAV",
//						"viewName": "",
//						"label": "",
//						"x": "1645",
//						"y": "175",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2KM74AG17",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2KM74AG18",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2KM74A81",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2KKE3P50"
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
//					"jaxId": "1J2KL9B650",
//					"attrs": {
//						"id": "CheckNPY",
//						"viewName": "",
//						"label": "",
//						"x": "2235",
//						"y": "175",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2KM74AG19",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2KM74AG20",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2KM74A82",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2KL9UN20"
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
//					"jaxId": "1J2KL9UN20",
//					"attrs": {
//						"id": "SaveNPY",
//						"viewName": "",
//						"label": "",
//						"x": "2510",
//						"y": "175",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2KM74AG21",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2KM74AG22",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2KM74A83",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2KLJ97U0"
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
//					"jaxId": "1J2KLB1IN0",
//					"attrs": {
//						"id": "ShowDefault",
//						"viewName": "",
//						"label": "",
//						"x": "1165",
//						"y": "405",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2KM74AG23",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2KM74AG24",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2KM74A84",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2KLK1A30"
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
//					"def": "askChat",
//					"jaxId": "1J2KLJ97U0",
//					"attrs": {
//						"id": "InputText",
//						"viewName": "",
//						"label": "",
//						"x": "2805",
//						"y": "265",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2KM74AG25",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2KM74AG26",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"tip": "请输入要合成的文本内容（支持中英文）:",
//						"tipRole": "Assistant",
//						"placeholder": "例如：Hello, this is a test. 这是一个测试。",
//						"text": "",
//						"file": "false",
//						"showText": "true",
//						"askUpward": "false",
//						"outlet": {
//							"jaxId": "1J2KM74A85",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2KLMUDJ0"
//						}
//					},
//					"icon": "chat.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "jumper",
//					"jaxId": "1J2KLK1A30",
//					"attrs": {
//						"id": "goto",
//						"viewName": "",
//						"label": "",
//						"x": "1465",
//						"y": "405",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"seg": "1J2KLJ97U0",
//						"outlet": {
//							"jaxId": "1J2KM74A86",
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
//					"def": "askChat",
//					"jaxId": "1J2KLMUDJ0",
//					"attrs": {
//						"id": "TimeSteps",
//						"viewName": "",
//						"label": "",
//						"x": "3065",
//						"y": "265",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2KM74AG27",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2KM74AG28",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"tip": "请输入推理步数 (默认32，范围1-100):",
//						"tipRole": "Assistant",
//						"placeholder": "32",
//						"text": "32",
//						"file": "false",
//						"showText": "true",
//						"askUpward": "false",
//						"outlet": {
//							"jaxId": "1J2KM74A87",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2KLR1MQ0"
//						}
//					},
//					"icon": "chat.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "askConfirm",
//					"jaxId": "1J2KLR1MQ0",
//					"attrs": {
//						"id": "AskAccent",
//						"viewName": "",
//						"label": "",
//						"x": "3315",
//						"y": "265",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"prompt": "是否希望音频具有口音特征？",
//						"outlets": {
//							"attrs": [
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2KLR1M80",
//									"attrs": {
//										"id": "Button1",
//										"desc": "Outlet.",
//										"text": "是，需要口音",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2KM74AG29",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2KM74AG30",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2KLVIAC0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2KLR1M81",
//									"attrs": {
//										"id": "Button2",
//										"desc": "Outlet.",
//										"text": "否，标准发音",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2KM74AG31",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2KM74AG32",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2KLVIAC0"
//								}
//							]
//						},
//						"silent": "false"
//					},
//					"icon": "help.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "askConfirm",
//					"jaxId": "1J2KLVIAC0",
//					"attrs": {
//						"id": "AskEmotion",
//						"viewName": "",
//						"label": "",
//						"x": "3615",
//						"y": "265",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"prompt": "是否希望音频更加情绪化？",
//						"outlets": {
//							"attrs": [
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2KLVI9T0",
//									"attrs": {
//										"id": "Button1",
//										"desc": "Outlet.",
//										"text": "是，更情绪化",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2KM74AG33",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2KM74AG34",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2KM2F9O0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2KLVI9T1",
//									"attrs": {
//										"id": "Button2",
//										"desc": "Outlet.",
//										"text": "否，保持平淡",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2KM74AG35",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2KM74AG36",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2KM2F9O0"
//								}
//							]
//						},
//						"silent": "false"
//					},
//					"icon": "help.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1J2KM2F9O0",
//					"attrs": {
//						"id": "InitBash",
//						"viewName": "",
//						"label": "",
//						"x": "3900",
//						"y": "265",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2KM74AG37",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2KM74AG38",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2KM74A88",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2KM32P00"
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
//					"jaxId": "1J2KM32P00",
//					"attrs": {
//						"id": "InitConda",
//						"viewName": "",
//						"label": "",
//						"x": "4145",
//						"y": "265",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2KM3C0G0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2KM3C0G1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2KM3C0G2",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2KM3POV0"
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
//					"jaxId": "1J2KM3POV0",
//					"attrs": {
//						"id": "Generate",
//						"viewName": "",
//						"label": "",
//						"x": "4420",
//						"y": "265",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2KM4A1L0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2KM4A1L1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2KM4A1L2",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2KM5N0R0"
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
//					"jaxId": "1J2KM5N0R0",
//					"attrs": {
//						"id": "ShowAudio",
//						"viewName": "",
//						"label": "",
//						"x": "4685",
//						"y": "265",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2KM74AG39",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2KM74AG40",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2KM74A89",
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
//					"jaxId": "1J2KPO2R50",
//					"attrs": {
//						"id": "InitFile",
//						"viewName": "",
//						"label": "",
//						"x": "195",
//						"y": "290",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2KPO79B0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2KPO79B1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2KPO79B2",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2KK893K0"
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