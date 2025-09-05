//Auto genterated by Cody
import pathLib from "path";
import Base64 from "../../agenthub/base64.mjs";
import {trimJSON} from "../../agenthub/ChatSession.mjs";
import {URL} from "url";
/*#{1HDBOSUN90MoreImports*/
import fsp from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
/*}#1HDBOSUN90MoreImports*/
const agentURL=decodeURIComponent((new URL(import.meta.url)).pathname);
const baseURL=pathLib.dirname(agentURL);
const basePath=baseURL.startsWith("file://")?pathLib.fileURLToPath(baseURL):baseURL;
const VFACT=null;
/*#{1HDBOSUN90StartDoc*/
const execAsync = promisify(exec);
async function saveBase64Image(dataUri, outputFilePath) {
	try {
		// 分离数据URI的MIME类型和Base64数据
		const [header, base64Data] = dataUri.split(',');
		if (!base64Data) {
			throw new Error('无效的数据URI格式');
		}

		// 解码Base64字符串
		const imageBuffer = Buffer.from(base64Data, 'base64');

		// 确保目录存在
		const dir = pathLib.dirname(outputFilePath);
		try {
			await fsp.access(dir);
		} catch (error) {
			await fsp.mkdir(dir, { recursive: true });
		}

		// 写入文件
		await fsp.writeFile(outputFilePath, imageBuffer);
		console.log(`图像已保存至：${outputFilePath}`);
		return outputFilePath;
	} catch (error) {
		console.error('保存图像时出错：', error.message);
		throw error;
	}
}

async function imageFileToBase64(filePath) {
try {
const imageBuffer = await fsp.readFile(filePath);
const mimeType = 'image/png'; // The script generates png
return `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
} catch (error) {
console.error('Error converting image to Base64:', error);
return null;
}
}
/*}#1HDBOSUN90StartDoc*/
//----------------------------------------------------------------------------
let agent=async function(session){
	let execInput;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let UploadImage,ShowImage,CheckImage,Exit,Branch,SaveImage,SelectPrompt,AskMultiple,AskLabel,InputX,InputY,CheckX,CheckY,AskNumber,LoopPoints,GetPoints,CheckInLoop,PointsEnd,PromptImage,InitBash,InitConda,ShowPrompted,AskMultiMask,SegmentImage,ShowSegmented,InputX1,CheckX1,InputX2,CheckX2,InputY1,CheckY1,InputY2,CheckY2,CheckCombined,goto,GetPoint,GetBox,ReturnBox,ReturnPoint;
	/*#{1HDBOSUN90LocalVals*/
	/*}#1HDBOSUN90LocalVals*/
	
	function parseAgentArgs(input){
		execInput=input;
		/*#{1HDBOSUN90ParseArgs*/
		/*}#1HDBOSUN90ParseArgs*/
	}
	
	/*#{1HDBOSUN90PreContext*/
	/*}#1HDBOSUN90PreContext*/
	context={
		imageInfo: null,
		checkResult: null,
		currentPoint: null,
		currentBox: null,
		lastSelectedLabel: 1,
		boxCoords: null,
		points: [],
		combinedBoxCompleted: false,
		pointsCompleted: false,
		/*#{1HDBOSUNA3ExCtxAttrs*/
		multiPointMode: {
			isActive: false,
			totalPoints: 0,
			currentIndex: 0,
			points: []
		},
		workflowState: {
			currentStep: 'upload', // upload, prompt_select, point_input, processing, complete
			promptType: null, // point, box, combined
			pointMode: null, // single, multiple
			startTime: new Date().toISOString()
		}
		/*}#1HDBOSUNA3ExCtxAttrs*/
	};
	/*#{1HDBOSUN90PostContext*/
	/*}#1HDBOSUN90PostContext*/
	let $agent,agent,segs={};
	segs["UploadImage"]=UploadImage=async function(input){//:1J2IB8VQQ0
		let prompt=("请选择要进行分割的图像文件\n支持格式：JPG, JPEG, PNG, BMP, TIFF\n建议文件大小不超过10MB")||input;
		let resultText="";
		let fileData=null;
		let enc=null;
		let ext=null;
		let fileSys="native";
		let result="";
		let path=("");
		let filter=("image/*,.jpg,.jpeg,.png,.bmp,.tiff");
		/*#{1J2IB8VQQ0PreCodes*/
		/*}#1J2IB8VQQ0PreCodes*/
		[resultText,result]=await session.askUserRaw({type:"input",prompt:prompt,text:"",path:path,file:fileSys,filter:filter,});
		if(!result && resultText){
			result=resultText;
		}else if(resultText && result){
			result=session.arrayBufferToDataURL(resultText,result);
		}
		/*#{1J2IB8VQQ0PostCodes*/
		// 验证图像文件
		if(result){
			try{
				// 检查是否为有效的data URL
				if(!result.startsWith('data:image/')){
					throw new Error("不是有效的图像文件");
				}
				
				// 获取文件信息
				const mimeMatch = result.match(/data:([^;]+)/);
				const mimeType = mimeMatch ? mimeMatch[1] : 'unknown';
				
				// 计算文件大小 (base64编码后的大小)
				const base64Data = result.split(',')[1];
				const fileSizeBytes = Math.round(base64Data.length * 0.75); // base64解码后的大小
				const fileSizeMB = (fileSizeBytes / (1024 * 1024)).toFixed(2);
				
				// 存储图像信息到context
				context.imageInfo = {
					mimeType: mimeType,
					fileSizeBytes: fileSizeBytes,
					fileSizeMB: fileSizeMB,
					dataURL: result,
					uploadTime: new Date().toISOString()
				};
				
			}catch(error){
				session.addChatText("assistant", `❌ 图像验证失败：${error.message}\n请重新选择有效的图像文件。`);
				return {seg:UploadImage,result:null,preSeg:"1J2IB8VQQ0",outlet:"1J2IB9GL80"};
			}
		}else{
			session.addChatText("assistant", "❌ 未选择图像文件，请重新上传。");
			return {seg:UploadImage,result:null,preSeg:"1J2IB8VQQ0",outlet:"1J2IB9GL80"};
		}
		/*}#1J2IB8VQQ0PostCodes*/
		return {seg:CheckImage,result:(result),preSeg:"1J2IB8VQQ0",outlet:"1J2IB9GL80"};
	};
	UploadImage.jaxId="1J2IB8VQQ0"
	UploadImage.url="UploadImage@"+agentURL
	
	segs["ShowImage"]=ShowImage=async function(input){//:1J2IBCU4L0
		let result=input;
		let role="assistant";
		let content="📸 图像预览与信息";
		/*#{1J2IBCU4L0PreCodes*/
		/*}#1J2IBCU4L0PreCodes*/
		let vo={image:input};
		/*#{1J2IBCU4L0Options*/
		// 获取图像详细信息
		if(context.imageInfo && input){
			try{
				// 在Node.js环境中，我们从已验证的图像信息中获取数据
				// 由于无法直接获取图像尺寸，我们基于文件大小进行估算
				const fileSizeBytes = context.imageInfo.fileSizeBytes;
				const fileSizeMB = parseFloat(context.imageInfo.fileSizeMB);
				
				// 基于文件大小估算图像尺寸（粗略估算）
				let estimatedPixels;
				if (context.imageInfo.mimeType.includes('jpeg') || context.imageInfo.mimeType.includes('jpg')) {
					// JPEG压缩比较高
					estimatedPixels = fileSizeBytes * 8; // 粗略估算
				} else if (context.imageInfo.mimeType.includes('png')) {
					// PNG通常较大
					estimatedPixels = fileSizeBytes * 4;
				} else {
					// 其他格式
					estimatedPixels = fileSizeBytes * 6;
				}
				
				// 估算图像尺寸（假设正方形）
				const estimatedDimension = Math.sqrt(estimatedPixels);
				const estimatedWidth = Math.round(estimatedDimension);
				const estimatedHeight = Math.round(estimatedDimension);
				
				// 推荐模型基于文件大小
				let recommendedModel = "tiny";
				if (fileSizeMB > 5) {
					recommendedModel = "large";
				} else if (fileSizeMB > 2) {
					recommendedModel = "base_plus";
				} else if (fileSizeMB > 0.5) {
					recommendedModel = "small";
				}
				
				// 估算处理时间
				const estimatedTime = Math.max(Math.round(fileSizeMB * 2), 3);
				
				// 更新图像信息
				context.imageInfo.estimatedWidth = estimatedWidth;
				context.imageInfo.estimatedHeight = estimatedHeight;
				context.imageInfo.estimatedPixels = estimatedPixels;
				context.imageInfo.recommendedModel = recommendedModel;
				context.imageInfo.estimatedProcessTime = estimatedTime;
				
				// 显示详细信息
				let infoText = `
		📊 **图像信息分析**
		
		🖼️ **基本信息：**
		• 估算尺寸：约 ${estimatedWidth} × ${estimatedHeight} 像素
		• 估算像素数：${Math.round(estimatedPixels).toLocaleString()}
		• 文件格式：${context.imageInfo.mimeType}
		• 文件大小：${context.imageInfo.fileSizeMB} MB
		• 文件名：${context.imageInfo.fileName}
		
		✅ **图像状态：** 已验证，可以进行分割处理
		
		💡 **提示：** 由于运行在服务器环境，图像尺寸为基于文件大小的估算值
				`;
				
				session.addChatText("assistant", infoText);
				
			}catch(error){
				session.addChatText("assistant", `⚠️ 获取图像详细信息时出错：${error.message}`);
			}
		}
		/*}#1J2IBCU4L0Options*/
		session.addChatText(role,content,vo);
		/*#{1J2IBCU4L0PostCodes*/
		/*}#1J2IBCU4L0PostCodes*/
		return {seg:SaveImage,result:(result),preSeg:"1J2IBCU4L0",outlet:"1J2IBCVOO0"};
	};
	ShowImage.jaxId="1J2IBCU4L0"
	ShowImage.url="ShowImage@"+agentURL
	
	segs["CheckImage"]=CheckImage=async function(input){//:1J2J5NB5U0
		let result=input
		/*#{1J2J5NB5U0Code*/
		// 图像验证逻辑
		try {
			if (!input) {
				context.checkResult = {
					success: false,
					error: "❌ 没有接收到图像数据"
				};
				return {seg:Branch,result:"Failed",preSeg:"1J2J5NB5U0",outlet:"1J2J5PIQQ0"};
			}
		
			// 验证是否为有效的data URL
			if (!input.startsWith('data:image/')) {
				context.checkResult = {
					success: false,
					error: "❌ 不是有效的图像格式"
				};
				return {seg:Branch,result:"Failed",preSeg:"1J2J5NB5U0",outlet:"1J2J5PIQQ0"};
			}
		
			// 获取MIME类型和base64数据
			const mimeMatch = input.match(/data:([^;]+)/);
			const mimeType = mimeMatch ? mimeMatch[1] : 'unknown';
			const base64Data = input.split(',')[1];
			
			if (!base64Data) {
				context.checkResult = {
					success: false,
					error: "❌ 图像数据格式错误"
				};
				return {seg:Branch,result:"Failed",preSeg:"1J2J5NB5U0",outlet:"1J2J5PIQQ0"};
			}
		
			// 计算文件大小 (base64解码后的大小)
			const fileSizeBytes = Math.round(base64Data.length * 0.75);
			const fileSizeMB = fileSizeBytes / (1024 * 1024);
		
			// 检查支持的图像格式
			const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp', 'image/tiff', 'image/webp'];
			if (!supportedFormats.includes(mimeType.toLowerCase())) {
				context.checkResult = {
					success: false,
					error: `❌ 不支持的图像格式: ${mimeType}\n支持的格式: JPG, PNG, BMP, TIFF, WebP`
				};
				return {seg:Branch,result:"Failed",preSeg:"1J2J5NB5U0",outlet:"1J2J5PIQQ0"};
			}
		
			// 检查文件大小 (限制10MB)
			if (fileSizeMB > 10) {
				context.checkResult = {
					success: false,
					error: `❌ 文件过大: ${fileSizeMB.toFixed(2)} MB\n最大允许大小: 10 MB`
				};
				return {seg:Branch,result:"Failed",preSeg:"1J2J5NB5U0",outlet:"1J2J5PIQQ0"};
			}
		
			// 检查文件大小下限 (至少1KB)
			if (fileSizeBytes < 1024) {
				context.checkResult = {
					success: false,
					error: "❌ 文件过小，可能不是有效的图像文件"
				};
				return {seg:Branch,result:"Failed",preSeg:"1J2J5NB5U0",outlet:"1J2J5PIQQ0"};
			}
		
			// 所有检查通过，保存图像信息
			context.imageInfo = {
				mimeType: mimeType,
				fileSizeBytes: fileSizeBytes,
				fileSizeMB: fileSizeMB.toFixed(2),
				dataURL: input,
				uploadTime: new Date().toISOString(),
				fileName: `image_${Date.now()}.${mimeType.split('/')[1]}`
			};
		
			context.checkResult = {
				success: true,
				message: `✅ 图像验证通过\n📁 格式: ${mimeType}\n📏 大小: ${fileSizeMB.toFixed(2)} MB`
			};
		
			session.addChatText("assistant", context.checkResult.message);
			
			return {seg:Branch,result:"Success",preSeg:"1J2J5NB5U0",outlet:"1J2J5PIQQ0"};
		
		} catch (error) {
			context.checkResult = {
				success: false,
				error: `❌ 图像验证过程中发生错误: ${error.message}`
			};
			return {seg:Branch,result:"Failed",preSeg:"1J2J5NB5U0",outlet:"1J2J5PIQQ0"};
		}
		/*}#1J2J5NB5U0Code*/
		return {seg:Branch,result:(result),preSeg:"1J2J5NB5U0",outlet:"1J2J5PIQQ0"};
	};
	CheckImage.jaxId="1J2J5NB5U0"
	CheckImage.url="CheckImage@"+agentURL
	
	segs["Exit"]=Exit=async function(input){//:1J2J5Q1LQ0
		let result=input;
		let channel="Chat";
		let opts={txtHeader:($agent.showName||$agent.name||null),channel:channel};
		let role="assistant";
		let content=input;
		session.addChatText(role,content,opts);
		return {result:result};
	};
	Exit.jaxId="1J2J5Q1LQ0"
	Exit.url="Exit@"+agentURL
	
	segs["Branch"]=Branch=async function(input){//:1J2J5RA5C0
		let result=input;
		/*#{1J2J5RA5C0Start*/
		/*}#1J2J5RA5C0Start*/
		if(input==="Success"){
			let output=context.imageInfo.dataURL;
			return {seg:ShowImage,result:(output),preSeg:"1J2J5RA5C0",outlet:"1J2J5T8HV1"};
		}
		/*#{1J2J5RA5C0Post*/
		let errorMessage = context.checkResult ? context.checkResult.error : "❌ 图像验证失败";
		errorMessage += "\n\n🔄 请重新上传符合要求的图像文件。";
		result=errorMessage;
		/*}#1J2J5RA5C0Post*/
		return {seg:Exit,result:(result),preSeg:"1J2J5RA5C0",outlet:"1J2J5SFFB1"};
	};
	Branch.jaxId="1J2J5RA5C0"
	Branch.url="Branch@"+agentURL
	
	segs["SaveImage"]=SaveImage=async function(input){//:1J2J601I50
		let result=input
		/*#{1J2J601I50Code*/
		try {
			// 确保有图像信息
			if (!context.imageInfo || !context.imageInfo.dataURL) {
				session.addChatText("assistant", "❌ 没有图像数据可保存");
				return {result:result};
			}
		
			// 生成文件名和路径
			const fileName = context.imageInfo.fileName;
			const imagesDir = pathLib.join(basePath, "sam2/images");
			const fullPath = pathLib.join(imagesDir, fileName);
			const relativePath = `sam2/images/${fileName}`;
			
			// 使用saveBase64Image函数保存文件
			const savedPath = await saveBase64Image(context.imageInfo.dataURL, fullPath);
			
			// 更新context中的文件路径信息
			context.imageInfo.savedPath = savedPath;
			context.imageInfo.relativePath = relativePath;
			context.imageInfo.fullPath = fullPath;
			
			// 显示保存成功信息
			session.addChatText("assistant", `
		💾 图像已成功保存！
		📁 保存位置: ${relativePath}
		📝 文件名: ${fileName}
		📏 文件大小: ${context.imageInfo.fileSizeMB} MB
		🗂️ 完整路径: ${fullPath}
		✅ 图像已准备好进行SAM2分割处理！`);
			
		} catch (error) {
			session.addChatText("assistant", `❌ 保存图像时发生错误: ${error.message}`);
		}
		
		/*}#1J2J601I50Code*/
		return {seg:SelectPrompt,result:(result),preSeg:"1J2J601I50",outlet:"1J2J60PVN0"};
	};
	SaveImage.jaxId="1J2J601I50"
	SaveImage.url="SaveImage@"+agentURL
	
	segs["SelectPrompt"]=SelectPrompt=async function(input){//:1J2J9MSMG0
		let prompt=("请选择SAM2分割的提示类型：")||input;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let withChat=false;
		let silent=false;
		let items=[
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"点提示 (Point Prompt)",code:0},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"框提示 (Box Prompt)",code:1},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"组合提示 (Combined Prompt)",code:2},
		];
		let result="";
		let item=null;
		
		/*#{1J2J9MSMG0PreCodes*/
		/*}#1J2J9MSMG0PreCodes*/
		if(silent){
			result="";
			/*#{1J2J9MSLR0Silent*/
			/*}#1J2J9MSLR0Silent*/
			return {seg:AskMultiple,result:(result),preSeg:"1J2J9MSMG0",outlet:"1J2J9MSLR0"};
		}
		[result,item]=await session.askUserRaw({type:"menu",prompt:prompt,multiSelect:false,items:items,withChat:withChat,countdown:countdown,placeholder:placeholder});
		/*#{1J2J9MSMG0PostCodes*/
		context.workflowState.currentStep = 'prompt_select';
		/*}#1J2J9MSMG0PostCodes*/
		if(typeof(item)==='string'){
			result=item;
			return {result:result};
		}else if(item.code===0){
			/*#{1J2J9MSLR0*/
			// 选择了点提示
			context.workflowState.promptType = 'point';
			session.addChatText("assistant", "✅ 已选择点提示模式，将通过点击指定分割区域。");
			/*}#1J2J9MSLR0*/
			return {seg:AskMultiple,result:(result),preSeg:"1J2J9MSMG0",outlet:"1J2J9MSLR0"};
		}else if(item.code===1){
			/*#{1J2J9MSLR1*/
			context.workflowState.promptType = 'box';
			session.addChatText("assistant", "✅ 已选择边界框提示模式，将输入边界框的四个坐标。");
			/*}#1J2J9MSLR1*/
			return {seg:InputX1,result:(result),preSeg:"1J2J9MSMG0",outlet:"1J2J9MSLR1"};
		}else if(item.code===2){
			/*#{1J2J9MSLR2*/
			context.workflowState.promptType = 'combined';
			/*}#1J2J9MSLR2*/
			return {seg:GetBox,result:(result),preSeg:"1J2J9MSMG0",outlet:"1J2J9MSLR2"};
		}
		/*#{1J2J9MSMG0FinCodes*/
		/*}#1J2J9MSMG0FinCodes*/
		return {result:result};
	};
	SelectPrompt.jaxId="1J2J9MSMG0"
	SelectPrompt.url="SelectPrompt@"+agentURL
	
	segs["AskMultiple"]=AskMultiple=async function(input){//:1J2JA1A9N0
		let prompt=("选择点提示模式：")||input;
		let silent=false;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let button1=("单个点")||"OK";
		let button2=("多个点")||"Cancel";
		let button3="";
		let result="";
		let value=0;
		/*#{1J2JA1A9N0PreCodes*/
		/*}#1J2JA1A9N0PreCodes*/
		if(silent){
			result="";
			/*#{1J2JA1A980Silent*/
			/*}#1J2JA1A980Silent*/
			return {seg:AskLabel,result:(result),preSeg:"1J2JA1A9N0",outlet:"1J2JA1A980"};
		}
		[result,value]=await session.askUserRaw({type:"confirm",prompt:prompt,button1:button1,button2:button2,button3:button3,countdown:countdown,withChat:undefined,placeholder:placeholder});
		/*#{1J2JA1A9N0PostCodes*/
		/*}#1J2JA1A9N0PostCodes*/
		if(value===1){
			result=("")||result;
			/*#{1J2JA1A980Btn1*/
			// 选择单个点
			context.workflowState.pointMode = 'single';
			context.workflowState.currentStep = 'point_input';
			session.addChatText("assistant", "✅ 已选择单点模式，将输入一个点的坐标。");
			/*}#1J2JA1A980Btn1*/
			return {seg:AskLabel,result:(result),preSeg:"1J2JA1A9N0",outlet:"1J2JA1A980"};
		}
		result=("")||result;
		/*#{1J2JA1A981Btn2*/
		context.workflowState.pointMode = 'multiple';
		context.workflowState.currentStep = 'point_input';
		session.addChatText("assistant", "✅ 已选择多点模式，将输入多个点的坐标。");
		/*}#1J2JA1A981Btn2*/
		return {seg:AskNumber,result:(result),preSeg:"1J2JA1A9N0",outlet:"1J2JA1A981"};
	
	};
	AskMultiple.jaxId="1J2JA1A9N0"
	AskMultiple.url="AskMultiple@"+agentURL
	
	segs["AskLabel"]=AskLabel=async function(input){//:1J2JA5D890
		let prompt=("选择点的标签类型：")||input;
		let silent=false;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let button1=("前景（Foreground）")||"OK";
		let button2=("背景（Background）")||"Cancel";
		let button3="";
		let result="";
		let value=0;
		if(silent){
			result="";
			/*#{1J2JA5D7T0Silent*/
			/*}#1J2JA5D7T0Silent*/
			return {seg:InputX,result:(result),preSeg:"1J2JA5D890",outlet:"1J2JA5D7T0"};
		}
		[result,value]=await session.askUserRaw({type:"confirm",prompt:prompt,button1:button1,button2:button2,button3:button3,countdown:countdown,withChat:undefined,placeholder:placeholder});
		if(value===1){
			result=("")||result;
			/*#{1J2JA5D7T0Btn1*/
			context.lastSelectedLabel = 1;
			session.addChatText("assistant", "✅ 已选择：前景点 (Foreground)");
			/*}#1J2JA5D7T0Btn1*/
			return {seg:InputX,result:(result),preSeg:"1J2JA5D890",outlet:"1J2JA5D7T0"};
		}
		result=("")||result;
		/*#{1J2JA5D7T1Btn2*/
		context.lastSelectedLabel = 0;
		session.addChatText("assistant", "✅ 已选择：背景点 (Background)");
		/*}#1J2JA5D7T1Btn2*/
		return {seg:InputX,result:(result),preSeg:"1J2JA5D890",outlet:"1J2JA5D7T1"};
	
	};
	AskLabel.jaxId="1J2JA5D890"
	AskLabel.url="AskLabel@"+agentURL
	
	segs["InputX"]=InputX=async function(input){//:1J2JA99OI0
		let tip=("请输入点的X坐标（横坐标）：");
		let tipRole=("assistant");
		let placeholder=("例如：150");
		let allowFile=(false)||false;
		let askUpward=(false);
		let text=("");
		let result="";
		/*#{1J2JA99OI0PreCodes*/
		/*}#1J2JA99OI0PreCodes*/
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
		/*#{1J2JA99OI0PostCodes*/
		/*}#1J2JA99OI0PostCodes*/
		return {seg:CheckX,result:(result),preSeg:"1J2JA99OI0",outlet:"1J2JAOSRI0"};
	};
	InputX.jaxId="1J2JA99OI0"
	InputX.url="InputX@"+agentURL
	
	segs["InputY"]=InputY=async function(input){//:1J2JAA4C90
		let tip=("请输入点的Y坐标（纵坐标）：");
		let tipRole=("assistant");
		let placeholder=("例如：200");
		let allowFile=(false)||false;
		let askUpward=(false);
		let text=("");
		let result="";
		/*#{1J2JAA4C90PreCodes*/
		/*}#1J2JAA4C90PreCodes*/
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
		/*#{1J2JAA4C90PostCodes*/
		/*}#1J2JAA4C90PostCodes*/
		return {seg:CheckY,result:(result),preSeg:"1J2JAA4C90",outlet:"1J2JAA4T62"};
	};
	InputY.jaxId="1J2JAA4C90"
	InputY.url="InputY@"+agentURL
	
	segs["CheckX"]=CheckX=async function(input){//:1J2JACB4A0
		let result=input
		/*#{1J2JACB4A0Code*/
		try {
			// 验证X坐标输入
			let xValue;
			if (typeof input === 'string') {
				xValue = parseFloat(input.trim());
			} else if (input && (input.text || input.prompt)) {
				xValue = parseFloat((input.text || input.prompt).trim());
			} else {
				xValue = parseFloat(input);
			}
			
			// 检查是否为有效数字
			if (isNaN(xValue)) {
				session.addChatText("assistant", "❌ X坐标必须是有效的数字，请重新输入。");
				return {seg:InputX,result:null,preSeg:"1J2JACB4A0",outlet:"1J2JACDHG2"};
			}
			
			// 获取图像尺寸信息进行范围检查
			if (context.imageInfo && context.imageInfo.estimatedWidth) {
				const imageWidth = context.imageInfo.estimatedWidth;
				if (xValue < 0 || xValue >= imageWidth) {
					session.addChatText("assistant", `❌ X坐标 ${xValue} 超出图像范围 [0, ${imageWidth-1}]，请重新输入。`);
					return {seg:InputX,result:null,preSeg:"1J2JACB4A0",outlet:"1J2JACDHG2"};
				}
			} else {
				// 如果没有图像尺寸信息，进行基本范围检查
				if (xValue < 0 || xValue > 4096) { // 假设最大图像尺寸4096
					session.addChatText("assistant", `❌ X坐标 ${xValue} 超出合理范围 [0, 4096]，请重新输入。`);
					return {seg:InputX,result:null,preSeg:"1J2JACB4A0",outlet:"1J2JACDHG2"};
				}
			}
			
			// 保存验证通过的X坐标
			if (!context.currentPoint) {
				context.currentPoint = {};
			}
			context.currentPoint.x = Math.round(xValue);
			
			session.addChatText("assistant", `✅ X坐标验证通过: ${context.currentPoint.x}`);
			result = context.currentPoint.x;
			
		} catch (error) {
			session.addChatText("assistant", `❌ X坐标验证失败: ${error.message}，请重新输入。`);
			return {seg:InputX,result:null,preSeg:"1J2JACB4A0",outlet:"1J2JACDHG2"};
		}
		/*}#1J2JACB4A0Code*/
		return {seg:InputY,result:(result),preSeg:"1J2JACB4A0",outlet:"1J2JACDHG2"};
	};
	CheckX.jaxId="1J2JACB4A0"
	CheckX.url="CheckX@"+agentURL
	
	segs["CheckY"]=CheckY=async function(input){//:1J2JAI5770
		let result=input
		/*#{1J2JAI5770Code*/
		try {
			// 验证Y坐标输入
			let yValue;
			if (typeof input === 'string') {
				yValue = parseFloat(input.trim());
			} else if (input && (input.text || input.prompt)) {
				yValue = parseFloat((input.text || input.prompt).trim());
			} else {
				yValue = parseFloat(input);
			}
			
			// 检查是否为有效数字
			if (isNaN(yValue)) {
				session.addChatText("assistant", "❌ Y坐标必须是有效的数字，请重新输入。");
				return {seg:InputY,result:null,preSeg:"1J2JAI5770",outlet:"1J2JAOSRI1"};
			}
			
			// 获取图像尺寸信息进行范围检查
			if (context.imageInfo && context.imageInfo.estimatedHeight) {
				const imageHeight = context.imageInfo.estimatedHeight;
				if (yValue < 0 || yValue >= imageHeight) {
					session.addChatText("assistant", `❌ Y坐标 ${yValue} 超出图像范围 [0, ${imageHeight-1}]，请重新输入。`);
					return {seg:InputY,result:null,preSeg:"1J2JAI5770",outlet:"1J2JAOSRI1"};
				}
			} else {
				// 如果没有图像尺寸信息，进行基本范围检查
				if (yValue < 0 || yValue > 4096) { // 假设最大图像尺寸4096
					session.addChatText("assistant", `❌ Y坐标 ${yValue} 超出合理范围 [0, 4096]，请重新输入。`);
					return {seg:InputY,result:null,preSeg:"1J2JAI5770",outlet:"1J2JAOSRI1"};
				}
			}
			
			// 保存验证通过的Y坐标
			if (!context.currentPoint) {
				context.currentPoint = {};
			}
			context.currentPoint.y = Math.round(yValue);
			
			// 确定标签（前景或背景）
			if (!context.currentPoint.label) {
				context.currentPoint.label = context.lastSelectedLabel || 1; // 默认为前景
			}
			
			session.addChatText("assistant", `✅ Y坐标验证通过: ${context.currentPoint.y}`);
			session.addChatText("assistant", `📍 当前点: (${context.currentPoint.x}, ${context.currentPoint.y}) - ${context.currentPoint.label === 1 ? '前景' : '背景'}`);
			
			result = context.currentPoint;
			
		} catch (error) {
			session.addChatText("assistant", `❌ Y坐标验证失败: ${error.message}，请重新输入。`);
			return {seg:InputY,result:null,preSeg:"1J2JAI5770",outlet:"1J2JAOSRI1"};
		}
		/*}#1J2JAI5770Code*/
		return {seg:CheckInLoop,result:(result),preSeg:"1J2JAI5770",outlet:"1J2JAOSRI1"};
	};
	CheckY.jaxId="1J2JAI5770"
	CheckY.url="CheckY@"+agentURL
	
	segs["AskNumber"]=AskNumber=async function(input){//:1J2JAER9F0
		let tip=("请输入要添加的点的数量（1-5）：");
		let tipRole=("assistant");
		let placeholder=("例如：3");
		let allowFile=(false)||false;
		let askUpward=(false);
		let text=("");
		let result="";
		/*#{1J2JAER9F0PreCodes*/
		if (!context.multiPointMode) {
			context.multiPointMode = {
				isActive: true,
				totalPoints: 0,
				currentIndex: 0,
				points: []
			};
		}
		/*}#1J2JAER9F0PreCodes*/
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
		/*#{1J2JAER9F0PostCodes*/
		// 解析和验证数量输入
		let pointCount;
		try {
			if (typeof result === 'string') {
				pointCount = parseInt(result.trim());
			} else if (result && (result.text || result.prompt)) {
				pointCount = parseInt((result.text || result.prompt).trim());
			} else {
				pointCount = parseInt(result);
			}
			
			// 验证数量范围
			if (isNaN(pointCount) || pointCount < 1 || pointCount > 5) {
				session.addChatText("assistant", "❌ 请输入1到5之间的有效数字。");
				// 重新询问数量
				return {seg:AskNumber,result:null,preSeg:"1J2JAER9F0",outlet:"1J2JAOSRI2"};
			}
			
			// 设置多点模式参数
			context.multiPointMode.totalPoints = pointCount;
			context.multiPointMode.currentIndex = 0;
			context.multiPointMode.points = [];
			context.multiPointMode.isActive = true;
			
			session.addChatText("assistant", `✅ 将添加 ${pointCount} 个点进行分割。`);
			session.addChatText("assistant", `📋 开始收集点坐标 (1/${pointCount})...`);
			
			// 创建包含点数量信息的数组，用于启动收集流程
			result = [pointCount];
			
		} catch (error) {
			session.addChatText("assistant", `❌ 输入解析失败: ${error.message}，请重新输入。`);
			return {seg:AskNumber,result:null,preSeg:"1J2JAER9F0",outlet:"1J2JAOSRI2"};
		}
		/*}#1J2JAER9F0PostCodes*/
		return {seg:LoopPoints,result:(result),preSeg:"1J2JAER9F0",outlet:"1J2JAOSRI2"};
	};
	AskNumber.jaxId="1J2JAER9F0"
	AskNumber.url="AskNumber@"+agentURL
	
	segs["LoopPoints"]=LoopPoints=async function(input){//:1J2JAFKSU0
		let result=input;
		let list=input;
		let i,n,item,loopR;
		/*#{1J2JAFKSU0PreLoop*/
		// 对于多点模式，持续收集点直到完成
		if(context.multiPointMode && context.multiPointMode.isActive){
			// 持续循环直到收集完所有点
			while(context.multiPointMode.isActive){
				loopR = await session.runAISeg(agent,GetPoints,1,"1J2JAFKSU0","1J2JAOSRI3");
				if(loopR === "break" || !context.multiPointMode.isActive){
					break;
				}
			}
			result = context.multiPointMode.points;
		} else {
		/*}#1J2JAFKSU0PreLoop*/
		n=list.length;
		for(i=0;i<n;i++){
			item=list[i];
			/*#{1J2JAFKSU0InLoopPre*/
			/*}#1J2JAFKSU0InLoopPre*/
			loopR=await session.runAISeg(agent,GetPoints,item,"1J2JAFKSU0","1J2JAOSRI3")
			if(loopR==="break"){
				break;
			}
			/*#{1J2JAFKSU0InLoopPost*/
			/*}#1J2JAFKSU0InLoopPost*/
		}
		/*#{1J2JAFKSU0PostCodes*/
		}
		/*}#1J2JAFKSU0PostCodes*/
		return {seg:PointsEnd,result:(result),preSeg:"1J2JAFKSU0",outlet:"1J2JAOSRI4"};
	};
	LoopPoints.jaxId="1J2JAFKSU0"
	LoopPoints.url="LoopPoints@"+agentURL
	
	segs["GetPoints"]=GetPoints=async function(input){//:1J2JAH50G0
		let result=input;
		/*#{1J2JAH50G0PreCodes*/
		/*}#1J2JAH50G0PreCodes*/
		return {seg:AskLabel,result:result,preSeg:"1J2JA5D890",outlet:"1J2JAOSRI5"};
	
	};
	GetPoints.jaxId="1J2JA5D890"
	GetPoints.url="GetPoints@"+agentURL
	
	segs["CheckInLoop"]=CheckInLoop=async function(input){//:1J2JAKITR0
		let result=input
		/*#{1J2JAKITR0Code*/
		try {
			// 检查是否在多点循环模式中
			if (context.multiPointMode && context.multiPointMode.isActive) {
				// 在多点循环中，保存当前点并继续下一个点
				if (input && typeof input === 'object' && input.x !== undefined && input.y !== undefined) {
					// 保存当前点到数组
					const pointInfo = {
						x: input.x,
						y: input.y,
						label: input.label,
						index: context.multiPointMode.currentIndex + 1
					};
					context.multiPointMode.points.push(pointInfo);
					context.multiPointMode.currentIndex++;
					
					session.addChatText("assistant", `✅ 第 ${pointInfo.index} 个点已记录: (${pointInfo.x}, ${pointInfo.y}) - ${pointInfo.label === 1 ? '前景' : '背景'}`);
					
					// 检查是否还有更多点需要收集
					if (context.multiPointMode.currentIndex < context.multiPointMode.totalPoints) {
						session.addChatText("assistant", `📋 继续收集点坐标 (${context.multiPointMode.currentIndex + 1}/${context.multiPointMode.totalPoints})...`);
						result = "continue";
					} else {
						// 所有点都收集完毕
						session.addChatText("assistant", `🎯 所有 ${context.multiPointMode.totalPoints} 个点已收集完毕！`);
						session.addChatText("assistant", `📊 点列表:`);
						context.multiPointMode.points.forEach((point, index) => {
							session.addChatText("assistant", `  ${index + 1}. (${point.x}, ${point.y}) - ${point.label === 1 ? '前景' : '背景'}`);
						});
						
						// 结束多点模式
						context.multiPointMode.isActive = false;
						result = context.multiPointMode.points;
					}
					return {result:result};
				} else {
					session.addChatText("assistant", "❌ 无效的点数据，跳过此点。");
					return {result:result};
				}
			} else {
				// 不在多点循环中，直接结束单点流程
				if (input && typeof input === 'object' && input.x !== undefined && input.y !== undefined) {
					session.addChatText("assistant", `✅ 单点模式完成: (${input.x}, ${input.y}) - ${input.label === 1 ? '前景' : '背景'}`);
					result = [input]; // 包装成数组格式，保持一致性
				} else {
					session.addChatText("assistant", "✅ 单点输入完成。");
					result = input;
				}
				return {seg:PointsEnd,result:(result),preSeg:"1J2JAKITR0",outlet:"1J2JAOSRI6"};
			}
		} catch (error) {
			session.addChatText("assistant", `❌ 处理点数据时出错: ${error.message}`);
			// 出错时也要检查是否需要继续循环
			if (context.multiPointMode && context.multiPointMode.isActive) {
				return {result:"continue"};
			} else {
				return {seg:PointsEnd,result:(input),preSeg:"1J2JAKITR0",outlet:"1J2JAOSRI6"};
			}
		}
		/*}#1J2JAKITR0Code*/
		return {seg:PointsEnd,result:(result),preSeg:"1J2JAKITR0",outlet:"1J2JAOSRI6"};
	};
	CheckInLoop.jaxId="1J2JAKITR0"
	CheckInLoop.url="CheckInLoop@"+agentURL
	
	segs["PointsEnd"]=PointsEnd=async function(input){//:1J2JB4C9G0
		let result=input;
		let channel="Chat";
		let opts={txtHeader:($agent.showName||$agent.name||null),channel:channel};
		let role="assistant";
		let content=input;
		/*#{1J2JB4C9G0PreCodes*/
		// 更新工作流状态为完成
		context.workflowState.currentStep = 'complete';
		const endTime = new Date().toISOString();
		const startTime = new Date(context.workflowState.startTime);
		const duration = Math.round((new Date(endTime) - startTime) / 1000);
		
		// 生成完成报告
		if (Array.isArray(input) && input.length > 0) {
			content = `🎉 SAM2 点提示收集完成！`;
			context.points = input;
		}
		
		/*}#1J2JB4C9G0PreCodes*/
		session.addChatText(role,content,opts);
		/*#{1J2JB4C9G0PostCodes*/
		/*}#1J2JB4C9G0PostCodes*/
		return {seg:CheckCombined,result:(result),preSeg:"1J2JB4C9G0",outlet:"1J2JB4C9G1"};
	};
	PointsEnd.jaxId="1J2JB4C9G0"
	PointsEnd.url="PointsEnd@"+agentURL
	
	segs["PromptImage"]=PromptImage=async function(input){//:1J2JL7JJE0
		let result=input
		/*#{1J2JL7JJE0Code*/
		try {
			if (!context.imageInfo || !context.imageInfo.fullPath) {
				throw new Error("图像信息或路径未找到。");
			}
		
			const imagePath = context.imageInfo.fullPath;
			const outputDir = pathLib.join(basePath, 'sam2', 'results', `prompt_example_${Date.now()}`);
			await fsp.mkdir(outputDir, { recursive: true });
		
			const scriptName = 'sam2_prompt.py';
			const CWD = pathLib.join(basePath, 'sam2');
			const imageRelativePath = pathLib.relative(CWD, imagePath);
			
			let command = `python3 "${scriptName}" --image "${imageRelativePath}" --output_dir "${outputDir}" --save_visualization`;
			
			// 检查提示类型并添加相应参数
			if (context.workflowState.promptType === 'point') {
				// 点提示模式
				if (!Array.isArray(input) || input.length === 0) {
					throw new Error("未提供有效的点坐标。");
				}
				const points = input.map(p => `${p.x},${p.y}`).join(';');
				const labels = input.map(p => p.label).join(';');
				command += ` --points "${points}" --labels "${labels}"`;
			} else if (context.workflowState.promptType === 'box') {
				// 边界框提示模式
				if (!Array.isArray(input) || input.length !== 4) {
					throw new Error("未提供有效的边界框坐标。");
				}
				const boxCoords = input.join(',');
				command += ` --box "${boxCoords}"`;
			} else if (context.workflowState.promptType === 'combined') {
				// Combined模式：同时使用box和point提示
				if (!context.boxCoords || context.boxCoords.length !== 4) {
					throw new Error("Combined模式缺少有效的边界框坐标。");
				}
				if (!context.points || context.points.length === 0) {
					throw new Error("Combined模式缺少有效的点坐标。");
				}
				
				// 添加边界框参数
				const boxCoords = context.boxCoords.join(',');
				command += ` --box "${boxCoords}"`;
				
				// 添加点提示参数
				const points = context.points.map(p => `${p.x},${p.y}`).join(';');
				const labels = context.points.map(p => p.label).join(';');
				command += ` --points "${points}" --labels "${labels}"`;
			} else {
				throw new Error("未知的提示类型。");
			}
		
			session.addChatText("assistant", `⏳ 正在生成提示可视化图像...\n\`\`\`bash\n${command}\n\`\`\``);
			
			let args={
				bashId:globalContext.bash,
				action:"Command",
				commands:[command],
				options:"",
			};
			let pipeResult = await session.pipeChat("/@AgentBuilder/Bash.js",args,false);
		
			const stdout = pipeResult.stdout || "";
			const stderr = pipeResult.stderr || "";
		
			if (stderr) {
				console.error(`Error executing script: ${stderr}`);
				if (stderr.includes("ModuleNotFoundError")) {
					session.addChatText("assistant", `❌ 脚本执行失败: 似乎缺少必要的 Python 模块。\n\`\`\`\n${stderr}\n\`\`\``);
				} else {
					session.addChatText("assistant", `❌ 生成提示图像失败: ${stderr}`);
				}
				return { result: null };
			}
			
			console.log(`Script output: ${stdout}`);
			session.addChatText("assistant", `✅ 可视化脚本执行成功。\n${stdout}`);
		
			const visualizationPath = pathLib.join(outputDir, 'prompt_visualization.png');
			result = visualizationPath;
			
			context.visualizationPath = visualizationPath;
		
		} catch (error) {
			session.addChatText("assistant", `❌ 生成提示图像失败: ${error.message}`);
			console.error(error);
			return { result: null };
		}
		/*}#1J2JL7JJE0Code*/
		return {seg:ShowPrompted,result:(result),preSeg:"1J2JL7JJE0",outlet:"1J2JL7JJE1"};
	};
	PromptImage.jaxId="1J2JL7JJE0"
	PromptImage.url="PromptImage@"+agentURL
	
	segs["InitBash"]=InitBash=async function(input){//:1J2JM6E6Q0
		let result=input
		/*#{1J2JM6E6Q0Code*/
		let args={};
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
		result=input;
		/*}#1J2JM6E6Q0Code*/
		return {seg:InitConda,result:(result),preSeg:"1J2JM6E6Q0",outlet:"1J2JM6R4T2"};
	};
	InitBash.jaxId="1J2JM6E6Q0"
	InitBash.url="InitBash@"+agentURL
	
	segs["InitConda"]=InitConda=async function(input){//:1J2JM7OI40
		let result=input
		/*#{1J2JM7OI40Code*/
		let args={};
		args['bashId']=globalContext.bash;
		args['action']="Command";
		args['commands']=[`conda activate sam2`,`cd "${decodeURIComponent(basePath)}/sam2"`];
		args['options']="";
		result= await session.pipeChat("/@AgentBuilder/Bash.js",args,false);
		result=input;
		/*}#1J2JM7OI40Code*/
		return {seg:PromptImage,result:(result),preSeg:"1J2JM7OI40",outlet:"1J2JM98D00"};
	};
	InitConda.jaxId="1J2JM7OI40"
	InitConda.url="InitConda@"+agentURL
	
	segs["ShowPrompted"]=ShowPrompted=async function(input){//:1J2JQO76S0
		let result=input
		/*#{1J2JQO76S0Code*/
		let role="assistant";
		/*#{1J2JL6ICE0PreCodes*/
		try {
			if (!input) {
				throw new Error("No image path provided for visualization.");
			}
			
			const dataUri = await imageFileToBase64(input);
			if (!dataUri) {
				throw new Error("Failed to convert visualized image to data URI.");
			}
			
			const content = "🖼️ **Prompt 可视化结果**";
			let vo = { image: dataUri };
			session.addChatText(role, content, vo);	
		} catch(error) {
			session.addChatText("assistant", `❌ 显示可视化图像失败: ${error.message}`);
			console.error(error);
		}
		/*}#1J2JL6ICE0PreCodes*/
		/*}#1J2JQO76S0Code*/
		return {seg:AskMultiMask,result:(result),preSeg:"1J2JQO76S0",outlet:"1J2JQP9HI0"};
	};
	ShowPrompted.jaxId="1J2JQO76S0"
	ShowPrompted.url="ShowPrompted@"+agentURL
	
	segs["AskMultiMask"]=AskMultiMask=async function(input){//:1J2JR84TJ0
		let prompt=("是否启用多掩码输出（Multimask Output）？\n启用后会针对模糊提示生成多个候选分割结果。")||input;
		let silent=false;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let button1=("是")||"OK";
		let button2=("否")||"Cancel";
		let button3="";
		let result="";
		let value=0;
		/*#{1J2JR84TJ0PreCodes*/
		/*}#1J2JR84TJ0PreCodes*/
		if(silent){
			result="";
			/*#{1J2JR84T50Silent*/
			context.multimask_output = true;
			/*}#1J2JR84T50Silent*/
			return {seg:SegmentImage,result:(result),preSeg:"1J2JR84TJ0",outlet:"1J2JR84T50"};
		}
		[result,value]=await session.askUserRaw({type:"confirm",prompt:prompt,button1:button1,button2:button2,button3:button3,countdown:countdown,withChat:undefined,placeholder:placeholder});
		/*#{1J2JR84TJ0PostCodes*/
		/*}#1J2JR84TJ0PostCodes*/
		if(value===1){
			result=("")||result;
			/*#{1J2JR84T50Btn1*/
			context.multimask_output = true;
			session.addChatText("assistant", "✅ 已启用多掩码输出。");
			/*}#1J2JR84T50Btn1*/
			return {seg:SegmentImage,result:(result),preSeg:"1J2JR84TJ0",outlet:"1J2JR84T50"};
		}
		result=("")||result;
		/*#{1J2JR84T51Btn2*/
		context.multimask_output = false;
		session.addChatText("assistant", "✅ 已禁用多掩码输出。");
		/*}#1J2JR84T51Btn2*/
		return {seg:SegmentImage,result:(result),preSeg:"1J2JR84TJ0",outlet:"1J2JR84T51"};
	
	};
	AskMultiMask.jaxId="1J2JR84TJ0"
	AskMultiMask.url="AskMultiMask@"+agentURL
	
	segs["SegmentImage"]=SegmentImage=async function(input){//:1J2JRDVRH0
		let result=input
		/*#{1J2JRDVRH0Code*/
		try {
			if (!context.imageInfo || !context.imageInfo.fullPath) {
				throw new Error("图像信息或路径未找到。");
			}
		
			const imagePath = context.imageInfo.fullPath;
			const outputDir = pathLib.join(basePath, 'sam2', 'results', `segment_result_${Date.now()}`);
			await fsp.mkdir(outputDir, { recursive: true });
			
			const scriptName = 'sam2_segment.py';
			const CWD = pathLib.join(basePath, 'sam2');
			const imageRelativePath = pathLib.relative(CWD, imagePath);
			
			let command = `python3 "${scriptName}" --image "${imageRelativePath}" --output_dir "${outputDir}" --save_masks --save_visualization`;
			
			// 检查提示类型并添加相应参数
			if (context.workflowState.promptType === 'point') {
				// 点提示模式
				if (!context.points || context.points.length === 0) {
					throw new Error("未提供有效的点坐标。");
				}
				const points = context.points.map(p => `${p.x},${p.y}`).join(';');
				const labels = context.points.map(p => p.label).join(';');
				command += ` --points "${points}" --labels "${labels}"`;
			} else if (context.workflowState.promptType === 'box') {
				// 边界框提示模式
				if (!context.boxCoords || context.boxCoords.length !== 4) {
					throw new Error("未提供有效的边界框坐标。");
				}
				const boxCoords = context.boxCoords.join(',');
				command += ` --box "${boxCoords}"`;
			} else if (context.workflowState.promptType === 'combined') {
				// Combined模式：同时使用box和point提示
				if (!context.boxCoords || context.boxCoords.length !== 4) {
					throw new Error("Combined模式缺少有效的边界框坐标。");
				}
				if (!context.points || context.points.length === 0) {
					throw new Error("Combined模式缺少有效的点坐标。");
				}
				
				// 添加边界框参数
				const boxCoords = context.boxCoords.join(',');
				command += ` --box "${boxCoords}"`;
				
				// 添加点提示参数
				const points = context.points.map(p => `${p.x},${p.y}`).join(';');
				const labels = context.points.map(p => p.label).join(';');
				command += ` --points "${points}" --labels "${labels}"`;
			} else {
				throw new Error("未知的提示类型。");
			}
			
			if (context.multimask_output) {
				command += ` --multimask_output`;
			}
			
			session.addChatText("assistant", `⏳ 正在执行图像分割...\n\`\`\`bash\n${command}\n\`\`\``);
			
			let args = {
				bashId: globalContext.bash,
				action: "Command",
				commands: [command],
				options: "",
			};
			let pipeResult = await session.pipeChat("/@AgentBuilder/Bash.js", args, false);
			
			const stdout = pipeResult.stdout || "";
			const stderr = pipeResult.stderr || "";
			
			if (stderr) {
				console.error(`Error executing script: ${stderr}`);
				session.addChatText("assistant", `❌ 图像分割失败: ${stderr}`);
				return { result: null };
			}
			
			console.log(`Script output: ${stdout}`);
			session.addChatText("assistant", `✅ 分割脚本执行成功。\n${stdout}`);
			
			// 将输出目录和JSON信息文件路径传递给下一步
			result = {
				outputDir: outputDir,
				infoPath: pathLib.join(outputDir, 'visualization_info.json')
			};
		
		} catch (error) {
			session.addChatText("assistant", `❌ 执行图像分割时失败: ${error.message}`);
			console.error(error);
			return { result: null };
		}
		/*}#1J2JRDVRH0Code*/
		return {seg:ShowSegmented,result:(result),preSeg:"1J2JRDVRH0",outlet:"1J2JRHA710"};
	};
	SegmentImage.jaxId="1J2JRDVRH0"
	SegmentImage.url="SegmentImage@"+agentURL
	
	segs["ShowSegmented"]=ShowSegmented=async function(input){//:1J2JRGMBF0
		let result=input
		/*#{1J2JRGMBF0Code*/
		try {
			if (!input || !input.infoPath) {
				throw new Error("分割结果信息未找到。");
			}
		
			const visInfoContent = await fsp.readFile(input.infoPath, 'utf-8');
			let visInfo = JSON.parse(visInfoContent);
		
			if (context.multimask_output && visInfo.length > 1) {
				visInfo.sort((a, b) => b.score - a.score);
				session.addChatText("assistant", "🎨 **多掩码分割结果 (按分数高低排序)**");
			} else {
				session.addChatText("assistant", "🎨 **分割结果**");
			}
			
			for (const vis of visInfo) {
				const dataUri = await imageFileToBase64(vis.path);
				if (dataUri) {
					const content = `**Mask ID:** ${vis.mask_id}, **Score:** ${vis.score.toFixed(3)}`;
					let vo = { image: dataUri };
					session.addChatText("assistant", content, vo);
				}
			}
		
		} catch (error) {
			session.addChatText("assistant", `❌ 显示分割结果失败: ${error.message}`);
			console.error(error);
		}
		/*}#1J2JRGMBF0Code*/
		return {result:result};
	};
	ShowSegmented.jaxId="1J2JRGMBF0"
	ShowSegmented.url="ShowSegmented@"+agentURL
	
	segs["InputX1"]=InputX1=async function(input){//:1J2JVKO1L0
		let tip=("请输入边界框左上角的X坐标（横坐标）：");
		let tipRole=("assistant");
		let placeholder=("例如：500");
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
		return {seg:CheckX1,result:(result),preSeg:"1J2JVKO1L0",outlet:"1J2K7J2N10"};
	};
	InputX1.jaxId="1J2JVKO1L0"
	InputX1.url="InputX1@"+agentURL
	
	segs["CheckX1"]=CheckX1=async function(input){//:1J2JVL9CG0
		let result=input
		/*#{1J2JVL9CG0Code*/
		try {
			// 验证X1坐标输入
			let x1Value;
			if (typeof input === 'string') {
				x1Value = parseFloat(input.trim());
			} else if (input && (input.text || input.prompt)) {
				x1Value = parseFloat((input.text || input.prompt).trim());
			} else {
				x1Value = parseFloat(input);
			}
			
			// 检查是否为有效数字
			if (isNaN(x1Value)) {
				session.addChatText("assistant", "❌ X1坐标必须是有效的数字，请重新输入。");
				return {seg:InputX1,result:null,preSeg:"1J2JVL9CG0",outlet:"1J2K7J2N11"};
			}
			
			// 获取图像尺寸信息进行范围检查
			if (context.imageInfo && context.imageInfo.estimatedWidth) {
				const imageWidth = context.imageInfo.estimatedWidth;
				if (x1Value < 0 || x1Value >= imageWidth) {
					session.addChatText("assistant", `❌ X1坐标 ${x1Value} 超出图像范围 [0, ${imageWidth-1}]，请重新输入。`);
					return {seg:InputX1,result:null,preSeg:"1J2JVL9CG0",outlet:"1J2K7J2N11"};
				}
			} else {
				// 如果没有图像尺寸信息，进行基本范围检查
				if (x1Value < 0 || x1Value > 4096) { // 假设最大图像尺寸4096
					session.addChatText("assistant", `❌ X1坐标 ${x1Value} 超出合理范围 [0, 4096]，请重新输入。`);
					return {seg:InputX1,result:null,preSeg:"1J2JVL9CG0",outlet:"1J2K7J2N11"};
				}
			}
			
			// 保存验证通过的X1坐标
			if (!context.currentBox) {
				context.currentBox = {};
			}
			context.currentBox.x1 = Math.round(x1Value);
			
			session.addChatText("assistant", `✅ X1坐标验证通过: ${context.currentBox.x1}`);
			result = context.currentBox.x1;
			
		} catch (error) {
			session.addChatText("assistant", `❌ X1坐标验证失败: ${error.message}，请重新输入。`);
			return {seg:InputX1,result:null,preSeg:"1J2JVL9CG0",outlet:"1J2K7J2N11"};
		}
		/*}#1J2JVL9CG0Code*/
		return {seg:InputX2,result:(result),preSeg:"1J2JVL9CG0",outlet:"1J2K7J2N11"};
	};
	CheckX1.jaxId="1J2JVL9CG0"
	CheckX1.url="CheckX1@"+agentURL
	
	segs["InputX2"]=InputX2=async function(input){//:1J2JVLO9P0
		let tip=("请输入边界框右下角的X坐标（横坐标）：");
		let tipRole=("assistant");
		let placeholder=("例如：800");
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
		return {seg:CheckX2,result:(result),preSeg:"1J2JVLO9P0",outlet:"1J2JVM15A2"};
	};
	InputX2.jaxId="1J2JVLO9P0"
	InputX2.url="InputX2@"+agentURL
	
	segs["CheckX2"]=CheckX2=async function(input){//:1J2JVM95M0
		let result=input
		/*#{1J2JVM95M0Code*/
		try {
			// 验证X2坐标输入
			let x2Value;
			if (typeof input === 'string') {
				x2Value = parseFloat(input.trim());
			} else if (input && (input.text || input.prompt)) {
				x2Value = parseFloat((input.text || input.prompt).trim());
			} else {
				x2Value = parseFloat(input);
			}
			
			// 检查是否为有效数字
			if (isNaN(x2Value)) {
				session.addChatText("assistant", "❌ X2坐标必须是有效的数字，请重新输入。");
				return {seg:InputX2,result:null,preSeg:"1J2JVM95M0",outlet:"1J2K7J2N12"};
			}
			
			// 获取图像尺寸信息进行范围检查
			if (context.imageInfo && context.imageInfo.estimatedWidth) {
				const imageWidth = context.imageInfo.estimatedWidth;
				if (x2Value < 0 || x2Value >= imageWidth) {
					session.addChatText("assistant", `❌ X2坐标 ${x2Value} 超出图像范围 [0, ${imageWidth-1}]，请重新输入。`);
					return {seg:InputX2,result:null,preSeg:"1J2JVM95M0",outlet:"1J2K7J2N12"};
				}
			} else {
				// 如果没有图像尺寸信息，进行基本范围检查
				if (x2Value < 0 || x2Value > 4096) { // 假设最大图像尺寸4096
					session.addChatText("assistant", `❌ X2坐标 ${x2Value} 超出合理范围 [0, 4096]，请重新输入。`);
					return {seg:InputX2,result:null,preSeg:"1J2JVM95M0",outlet:"1J2K7J2N12"};
				}
			}
			
			// 检查X2必须大于X1
			if (!context.currentBox || context.currentBox.x1 === undefined) {
				session.addChatText("assistant", "❌ 缺少X1坐标信息，请重新开始。");
				return {seg:InputX1,result:null,preSeg:"1J2JVM95M0",outlet:"1J2K7J2N12"};
			}
			
			if (x2Value <= context.currentBox.x1) {
				session.addChatText("assistant", `❌ X2坐标 ${x2Value} 必须大于X1坐标 ${context.currentBox.x1}，请重新输入。`);
				return {seg:InputX2,result:null,preSeg:"1J2JVM95M0",outlet:"1J2K7J2N12"};
			}
			
			// 保存验证通过的X2坐标
			context.currentBox.x2 = Math.round(x2Value);
			
			session.addChatText("assistant", `✅ X2坐标验证通过: ${context.currentBox.x2}`);
			session.addChatText("assistant", `📏 边界框宽度: ${context.currentBox.x2 - context.currentBox.x1} 像素`);
			result = context.currentBox.x2;
			
		} catch (error) {
			session.addChatText("assistant", `❌ X2坐标验证失败: ${error.message}，请重新输入。`);
			return {seg:InputX2,result:null,preSeg:"1J2JVM95M0",outlet:"1J2K7J2N12"};
		}
		/*}#1J2JVM95M0Code*/
		return {seg:InputY1,result:(result),preSeg:"1J2JVM95M0",outlet:"1J2K7J2N12"};
	};
	CheckX2.jaxId="1J2JVM95M0"
	CheckX2.url="CheckX2@"+agentURL
	
	segs["InputY1"]=InputY1=async function(input){//:1J2JVMTAO0
		let tip=("请输入边界框左上角的Y坐标（纵坐标）：");
		let tipRole=("assistant");
		let placeholder=("例如：500");
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
		return {seg:CheckY1,result:(result),preSeg:"1J2JVMTAO0",outlet:"1J2K7J2N13"};
	};
	InputY1.jaxId="1J2JVMTAO0"
	InputY1.url="InputY1@"+agentURL
	
	segs["CheckY1"]=CheckY1=async function(input){//:1J2JVNMFV0
		let result=input
		/*#{1J2JVNMFV0Code*/
		try {
			// 验证Y1坐标输入
			let y1Value;
			if (typeof input === 'string') {
				y1Value = parseFloat(input.trim());
			} else if (input && (input.text || input.prompt)) {
				y1Value = parseFloat((input.text || input.prompt).trim());
			} else {
				y1Value = parseFloat(input);
			}
			
			// 检查是否为有效数字
			if (isNaN(y1Value)) {
				session.addChatText("assistant", "❌ Y1坐标必须是有效的数字，请重新输入。");
				return {seg:InputY1,result:null,preSeg:"1J2JVNMFV0",outlet:"1J2K7J2N14"};
			}
			
			// 获取图像尺寸信息进行范围检查
			if (context.imageInfo && context.imageInfo.estimatedHeight) {
				const imageHeight = context.imageInfo.estimatedHeight;
				if (y1Value < 0 || y1Value >= imageHeight) {
					session.addChatText("assistant", `❌ Y1坐标 ${y1Value} 超出图像范围 [0, ${imageHeight-1}]，请重新输入。`);
					return {seg:InputY1,result:null,preSeg:"1J2JVNMFV0",outlet:"1J2K7J2N14"};
				}
			} else {
				// 如果没有图像尺寸信息，进行基本范围检查
				if (y1Value < 0 || y1Value > 4096) { // 假设最大图像尺寸4096
					session.addChatText("assistant", `❌ Y1坐标 ${y1Value} 超出合理范围 [0, 4096]，请重新输入。`);
					return {seg:InputY1,result:null,preSeg:"1J2JVNMFV0",outlet:"1J2K7J2N14"};
				}
			}
			
			// 保存验证通过的Y1坐标
			if (!context.currentBox) {
				context.currentBox = {};
			}
			context.currentBox.y1 = Math.round(y1Value);
			
			session.addChatText("assistant", `✅ Y1坐标验证通过: ${context.currentBox.y1}`);
			result = context.currentBox.y1;
			
		} catch (error) {
			session.addChatText("assistant", `❌ Y1坐标验证失败: ${error.message}，请重新输入。`);
			return {seg:InputY1,result:null,preSeg:"1J2JVNMFV0",outlet:"1J2K7J2N14"};
		}
		/*}#1J2JVNMFV0Code*/
		return {seg:InputY2,result:(result),preSeg:"1J2JVNMFV0",outlet:"1J2K7J2N14"};
	};
	CheckY1.jaxId="1J2JVNMFV0"
	CheckY1.url="CheckY1@"+agentURL
	
	segs["InputY2"]=InputY2=async function(input){//:1J2JVOEA90
		let tip=("请输入边界框右下角的Y坐标（纵坐标）：");
		let tipRole=("assistant");
		let placeholder=("例如：800");
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
		return {seg:CheckY2,result:(result),preSeg:"1J2JVOEA90",outlet:"1J2K7J2N15"};
	};
	InputY2.jaxId="1J2JVOEA90"
	InputY2.url="InputY2@"+agentURL
	
	segs["CheckY2"]=CheckY2=async function(input){//:1J2JVP5RF0
		let result=input
		/*#{1J2JVP5RF0Code*/
		try {
			// 验证Y2坐标输入
			let y2Value;
			if (typeof input === 'string') {
				y2Value = parseFloat(input.trim());
			} else if (input && (input.text || input.prompt)) {
				y2Value = parseFloat((input.text || input.prompt).trim());
			} else {
				y2Value = parseFloat(input);
			}
			
			// 检查是否为有效数字
			if (isNaN(y2Value)) {
				session.addChatText("assistant", "❌ Y2坐标必须是有效的数字，请重新输入。");
				return {seg:InputY2,result:null,preSeg:"1J2JVP5RF0",outlet:"1J2K7J2N16"};
			}
			
			// 获取图像尺寸信息进行范围检查
			if (context.imageInfo && context.imageInfo.estimatedHeight) {
				const imageHeight = context.imageInfo.estimatedHeight;
				if (y2Value < 0 || y2Value >= imageHeight) {
					session.addChatText("assistant", `❌ Y2坐标 ${y2Value} 超出图像范围 [0, ${imageHeight-1}]，请重新输入。`);
					return {seg:InputY2,result:null,preSeg:"1J2JVP5RF0",outlet:"1J2K7J2N16"};
				}
			} else {
				// 如果没有图像尺寸信息，进行基本范围检查
				if (y2Value < 0 || y2Value > 4096) { // 假设最大图像尺寸4096
					session.addChatText("assistant", `❌ Y2坐标 ${y2Value} 超出合理范围 [0, 4096]，请重新输入。`);
					return {seg:InputY2,result:null,preSeg:"1J2JVP5RF0",outlet:"1J2K7J2N16"};
				}
			}
			
			// 检查Y2必须大于Y1
			if (!context.currentBox || context.currentBox.y1 === undefined) {
				session.addChatText("assistant", "❌ 缺少Y1坐标信息，请重新开始。");
				return {seg:InputY1,result:null,preSeg:"1J2JVP5RF0",outlet:"1J2K7J2N16"};
			}
			
			if (y2Value <= context.currentBox.y1) {
				session.addChatText("assistant", `❌ Y2坐标 ${y2Value} 必须大于Y1坐标 ${context.currentBox.y1}，请重新输入。`);
				return {seg:InputY2,result:null,preSeg:"1J2JVP5RF0",outlet:"1J2K7J2N16"};
			}
			
			// 保存验证通过的Y2坐标
			context.currentBox.y2 = Math.round(y2Value);
			
			session.addChatText("assistant", `✅ Y2坐标验证通过: ${context.currentBox.y2}`);
			session.addChatText("assistant", `📏 边界框高度: ${context.currentBox.y2 - context.currentBox.y1} 像素`);
			session.addChatText("assistant", `🎯 边界框完成: (${context.currentBox.x1}, ${context.currentBox.y1}) 到 (${context.currentBox.x2}, ${context.currentBox.y2})`);
			
			// 将边界框数据转换为数组格式，供后续处理使用
			result = [context.currentBox.x1, context.currentBox.y1, context.currentBox.x2, context.currentBox.y2];
			context.boxCoords = result;
			
		} catch (error) {
			session.addChatText("assistant", `❌ Y2坐标验证失败: ${error.message}，请重新输入。`);
			return {seg:InputY2,result:null,preSeg:"1J2JVP5RF0",outlet:"1J2K7J2N16"};
		}
		/*}#1J2JVP5RF0Code*/
		return {seg:CheckCombined,result:(result),preSeg:"1J2JVP5RF0",outlet:"1J2K7J2N16"};
	};
	CheckY2.jaxId="1J2JVP5RF0"
	CheckY2.url="CheckY2@"+agentURL
	
	segs["CheckCombined"]=CheckCombined=async function(input){//:1J2K93GDP0
		let result=input
		/*#{1J2K93GDP0Code*/
		// 检查当前是否为combined模式
		if (context.workflowState.promptType === 'combined') {
			// 检查是否已经完成了box prompt阶段但points还未完成
			if (context.boxCoords && !context.combinedBoxCompleted) {
				// box prompt已完成，返回box结果并准备进行point prompt
				context.combinedBoxCompleted = true;
				return {seg:ReturnBox,result:(result),preSeg:"1J2K93GDP0",outlet:"1J2K9JANN1"};
			} else if (context.points && context.points.length > 0 && context.combinedBoxCompleted && !context.pointsCompleted) {
				// point prompt也已完成，返回point结果并结束combined流程
				context.pointsCompleted = true;
				return {seg:ReturnPoint,result:(result),preSeg:"1J2K93GDP0",outlet:"1J2K9JANN2"};
			}
		}
		/*}#1J2K93GDP0Code*/
		return {seg:InitBash,result:(result),preSeg:"1J2K93GDP0",outlet:"1J2K9JANN0"};
	};
	CheckCombined.jaxId="1J2K93GDP0"
	CheckCombined.url="CheckCombined@"+agentURL
	
	segs["goto"]=goto=async function(input){//:1J2K9DU610
		let result=input;
		/*#{1J2K9DU610PreCodes*/
		/*}#1J2K9DU610PreCodes*/
		return {seg:InitBash,result:result,preSeg:"1J2JM6E6Q0",outlet:"1J2K9JANN3"};
	
	};
	goto.jaxId="1J2JM6E6Q0"
	goto.url="goto@"+agentURL
	
	segs["GetPoint"]=GetPoint=async function(input){//:1J2K9P3JM0
		let result=input;
		return {seg:AskMultiple,result:result,preSeg:"1J2JA1A9N0",outlet:"1J2K9PQGC1"};
	
	};
	GetPoint.jaxId="1J2JA1A9N0"
	GetPoint.url="GetPoint@"+agentURL
	
	segs["GetBox"]=GetBox=async function(input){//:1J2K9R5EE0
		let result=input;
		/*#{1J2K9R5EE0PreCodes*/
		// 在combined模式下，显示box prompt开始的提示信息
		if (context.workflowState.promptType === 'combined') {
			session.addChatText("assistant", "🔲 开始Combined模式 - 第一步：边界框提示\n\n请输入边界框的坐标，首先输入左上角X坐标：");
		}
		/*}#1J2K9R5EE0PreCodes*/
		return {seg:InputX1,result:result,preSeg:"1J2JVKO1L0",outlet:"1J2K9RA3E0"};
	
	};
	GetBox.jaxId="1J2JVKO1L0"
	GetBox.url="GetBox@"+agentURL
	
	segs["ReturnBox"]=ReturnBox=async function(input){//:1J2K9V17J0
		let result=input;
		let channel="Chat";
		let opts={txtHeader:($agent.showName||$agent.name||null),channel:channel};
		let role="assistant";
		let content=input;
		/*#{1J2K9V17J0PreCodes*/
		// 在combined模式下，显示box结果并提示用户进行point prompt
		if (context.workflowState.promptType === 'combined') {
			content = `✅ Box prompt已完成！边界框坐标：[${context.boxCoords.join(', ')}]\n\n现在请进行点提示，点击图像中的目标点。`;
		}
		/*}#1J2K9V17J0PreCodes*/
		session.addChatText(role,content,opts);
		/*#{1J2K9V17J0PostCodes*/
		/*}#1J2K9V17J0PostCodes*/
		return {seg:GetPoint,result:(result),preSeg:"1J2K9V17J0",outlet:"1J2K9VB0I0"};
	};
	ReturnBox.jaxId="1J2K9V17J0"
	ReturnBox.url="ReturnBox@"+agentURL
	
	segs["ReturnPoint"]=ReturnPoint=async function(input){//:1J2KA2HOG0
		let result=input;
		let channel="Chat";
		let opts={txtHeader:($agent.showName||$agent.name||null),channel:channel};
		let role="assistant";
		let content=input;
		/*#{1J2KA2HOG0PreCodes*/
		if (context.workflowState.promptType === 'combined') {
			content = `🎉 Combined prompt已全部完成！\n\n✅ Box坐标：[${context.boxCoords.join(', ')}]\n✅ Point坐标：${JSON.stringify(context.points)}\n\n准备进行分割处理...`;
		}
		/*}#1J2KA2HOG0PreCodes*/
		session.addChatText(role,content,opts);
		/*#{1J2KA2HOG0PostCodes*/
		/*}#1J2KA2HOG0PostCodes*/
		return {seg:goto,result:(result),preSeg:"1J2KA2HOG0",outlet:"1J2KA2NG02"};
	};
	ReturnPoint.jaxId="1J2KA2HOG0"
	ReturnPoint.url="ReturnPoint@"+agentURL
	
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
			result={seg:UploadImage,"input":input};
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
//			"jaxId": "1J2HSO8T60",
//			"attrs": {}
//		},
//		"localVars": {
//			"jaxId": "1HDBOSUNA2",
//			"attrs": {}
//		},
//		"context": {
//			"jaxId": "1HDBOSUNA3",
//			"attrs": {
//				"imageInfo": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1J2JGC5NR0",
//					"attrs": {
//						"type": "Auto",
//						"mockup": "null",
//						"desc": "",
//						"required": "false"
//					}
//				},
//				"checkResult": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1J2JGC5NR1",
//					"attrs": {
//						"type": "Auto",
//						"mockup": "null",
//						"desc": ""
//					}
//				},
//				"currentPoint": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1J2JGC5NR2",
//					"attrs": {
//						"type": "Auto",
//						"mockup": "null",
//						"desc": ""
//					}
//				},
//				"currentBox": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1J2K8MU160",
//					"attrs": {
//						"type": "Auto",
//						"mockup": "null",
//						"desc": ""
//					}
//				},
//				"lastSelectedLabel": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1J2JGC5NR3",
//					"attrs": {
//						"type": "Auto",
//						"mockup": "1",
//						"desc": ""
//					}
//				},
//				"boxCoords": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1J2KATMCR0",
//					"attrs": {
//						"type": "Auto",
//						"mockup": "null",
//						"desc": ""
//					}
//				},
//				"points": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1J2KATMCR1",
//					"attrs": {
//						"type": "Auto",
//						"mockup": "[]",
//						"desc": ""
//					}
//				},
//				"combinedBoxCompleted": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1J2KATMCR2",
//					"attrs": {
//						"type": "Boolean",
//						"mockup": "false",
//						"desc": ""
//					}
//				},
//				"pointsCompleted": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1J2KATMCR3",
//					"attrs": {
//						"type": "Boolean",
//						"mockup": "false",
//						"desc": ""
//					}
//				}
//			}
//		},
//		"globalMockup": {
//			"jaxId": "1HDIJB7SK6",
//			"attrs": {}
//		},
//		"segs": {
//			"attrs": [
//				{
//					"type": "aiseg",
//					"def": "askFile",
//					"jaxId": "1J2IB8VQQ0",
//					"attrs": {
//						"id": "UploadImage",
//						"viewName": "",
//						"label": "",
//						"x": "125",
//						"y": "300",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2IBEJMI0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2IBEJMI1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"prompt": "请选择要进行分割的图像文件\n支持格式：JPG, JPEG, PNG, BMP, TIFF\n建议文件大小不超过10MB",
//						"path": "",
//						"fileSys": "naive",
//						"filter": "image/*,.jpg,.jpeg,.png,.bmp,.tiff",
//						"read": "No",
//						"outlet": {
//							"jaxId": "1J2IB9GL80",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2J5NB5U0"
//						}
//					},
//					"icon": "folder.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "image",
//					"jaxId": "1J2IBCU4L0",
//					"attrs": {
//						"id": "ShowImage",
//						"viewName": "",
//						"label": "",
//						"x": "980",
//						"y": "280",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2IBEJMI2",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2IBEJMI3",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"text": "📸 图像预览与信息",
//						"image": "#input",
//						"role": "Assistant",
//						"sizeLimit": "",
//						"format": "JEPG",
//						"outlet": {
//							"jaxId": "1J2IBCVOO0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2J601I50"
//						}
//					},
//					"icon": "hudimg.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1J2J5NB5U0",
//					"attrs": {
//						"id": "CheckImage",
//						"viewName": "",
//						"label": "",
//						"x": "415",
//						"y": "300",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2J60PVT0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2J60PVT1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2J5PIQQ0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2J5RA5C0"
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
//					"jaxId": "1J2J5Q1LQ0",
//					"attrs": {
//						"id": "Exit",
//						"viewName": "",
//						"label": "",
//						"x": "985",
//						"y": "405",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2J60PVT2",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2J60PVT3",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"channel": "Chat",
//						"text": "#input",
//						"outlet": {
//							"jaxId": "1J2J5T8HV0",
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
//					"def": "brunch",
//					"jaxId": "1J2J5RA5C0",
//					"attrs": {
//						"id": "Branch",
//						"viewName": "",
//						"label": "",
//						"x": "685",
//						"y": "300",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2J5SFFA0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2J5SFFB0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2J5SFFB1",
//							"attrs": {
//								"id": "Fail",
//								"desc": "Outlet.",
//								"output": ""
//							},
//							"linkedSeg": "1J2J5Q1LQ0"
//						},
//						"outlets": {
//							"attrs": [
//								{
//									"type": "aioutlet",
//									"def": "AIConditionOutlet",
//									"jaxId": "1J2J5T8HV1",
//									"attrs": {
//										"id": "Success",
//										"desc": "Outlet.",
//										"output": "#context.imageInfo.dataURL",
//										"codes": "false",
//										"context": {
//											"jaxId": "1J2J60PVT4",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2J60PVT5",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"condition": ""
//									},
//									"linkedSeg": "1J2IBCU4L0"
//								}
//							]
//						}
//					},
//					"icon": "condition.svg",
//					"reverseOutlets": true
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1J2J601I50",
//					"attrs": {
//						"id": "SaveImage",
//						"viewName": "",
//						"label": "",
//						"x": "1275",
//						"y": "270",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2J60PVT6",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2J60PVT7",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2J60PVN0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2J9MSMG0"
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
//					"jaxId": "1J2J9MSMG0",
//					"attrs": {
//						"id": "SelectPrompt",
//						"viewName": "",
//						"label": "",
//						"x": "1565",
//						"y": "270",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"prompt": "请选择SAM2分割的提示类型：",
//						"multi": "false",
//						"withChat": "false",
//						"outlet": {
//							"jaxId": "1J2J9S2RN0",
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
//									"jaxId": "1J2J9MSLR0",
//									"attrs": {
//										"id": "Point Prompt",
//										"desc": "Outlet.",
//										"text": "点提示 (Point Prompt)",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2JAOSRP0",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2JAOSRP1",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2JA1A9N0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2J9MSLR1",
//									"attrs": {
//										"id": "Box Prompt",
//										"desc": "Outlet.",
//										"text": "框提示 (Box Prompt)",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2JAOSRP2",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2JAOSRP3",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2JVKO1L0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2J9MSLR2",
//									"attrs": {
//										"id": "Combined prompt",
//										"desc": "Outlet.",
//										"text": "组合提示 (Combined Prompt)",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2JAOSRP4",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2JAOSRP5",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2K9R5EE0"
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
//					"def": "askConfirm",
//					"jaxId": "1J2JA1A9N0",
//					"attrs": {
//						"id": "AskMultiple",
//						"viewName": "",
//						"label": "",
//						"x": "1950",
//						"y": "130",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"prompt": "选择点提示模式：",
//						"outlets": {
//							"attrs": [
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2JA1A980",
//									"attrs": {
//										"id": "Single",
//										"desc": "Outlet.",
//										"text": "单个点",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2JAOSRP6",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2JAOSRP7",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2JA5D890"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2JA1A981",
//									"attrs": {
//										"id": "Multiple",
//										"desc": "Outlet.",
//										"text": "多个点",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2JAOSRP8",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2JAOSRP9",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2JAER9F0"
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
//					"jaxId": "1J2JA5D890",
//					"attrs": {
//						"id": "AskLabel",
//						"viewName": "",
//						"label": "",
//						"x": "2300",
//						"y": "50",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"prompt": "选择点的标签类型：",
//						"outlets": {
//							"attrs": [
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2JA5D7T0",
//									"attrs": {
//										"id": "Foreground",
//										"desc": "Outlet.",
//										"text": "前景（Foreground）",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2JAOSRP12",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2JAOSRP13",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2JA99OI0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2JA5D7T1",
//									"attrs": {
//										"id": "Background",
//										"desc": "Outlet.",
//										"text": "背景（Background）",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2JAOSRP14",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2JAOSRP15",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2JA99OI0"
//								}
//							]
//						},
//						"silent": "false"
//					},
//					"icon": "help.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "askChat",
//					"jaxId": "1J2JA99OI0",
//					"attrs": {
//						"id": "InputX",
//						"viewName": "",
//						"label": "",
//						"x": "2635",
//						"y": "45",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2JAOSRP18",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2JAOSRP19",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"tip": "请输入点的X坐标（横坐标）：",
//						"tipRole": "Assistant",
//						"placeholder": "例如：150",
//						"text": "",
//						"file": "false",
//						"showText": "true",
//						"askUpward": "false",
//						"outlet": {
//							"jaxId": "1J2JAOSRI0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2JACB4A0"
//						}
//					},
//					"icon": "chat.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "askChat",
//					"jaxId": "1J2JAA4C90",
//					"attrs": {
//						"id": "InputY",
//						"viewName": "",
//						"label": "",
//						"x": "3065",
//						"y": "45",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2JAA4T60",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2JAA4T61",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"tip": "请输入点的Y坐标（纵坐标）：",
//						"tipRole": "Assistant",
//						"placeholder": "例如：200",
//						"text": "",
//						"file": "false",
//						"showText": "true",
//						"askUpward": "false",
//						"outlet": {
//							"jaxId": "1J2JAA4T62",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2JAI5770"
//						}
//					},
//					"icon": "chat.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1J2JACB4A0",
//					"attrs": {
//						"id": "CheckX",
//						"viewName": "",
//						"label": "",
//						"x": "2855",
//						"y": "45",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2JACDHG0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2JACDHG1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2JACDHG2",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2JAA4C90"
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
//					"jaxId": "1J2JAI5770",
//					"attrs": {
//						"id": "CheckY",
//						"viewName": "",
//						"label": "",
//						"x": "3265",
//						"y": "45",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2JAOSRP20",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2JAOSRP21",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2JAOSRI1",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2JAKITR0"
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
//					"jaxId": "1J2JAER9F0",
//					"attrs": {
//						"id": "AskNumber",
//						"viewName": "",
//						"label": "",
//						"x": "2290",
//						"y": "215",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2JAOSRP22",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2JAOSRP23",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"tip": "请输入要添加的点的数量（1-5）：",
//						"tipRole": "Assistant",
//						"placeholder": "例如：3",
//						"text": "",
//						"file": "false",
//						"showText": "true",
//						"askUpward": "false",
//						"outlet": {
//							"jaxId": "1J2JAOSRI2",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2JAFKSU0"
//						}
//					},
//					"icon": "chat.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "loopArray",
//					"jaxId": "1J2JAFKSU0",
//					"attrs": {
//						"id": "LoopPoints",
//						"viewName": "",
//						"label": "",
//						"x": "2565",
//						"y": "215",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2JAOSRQ0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2JAOSRQ1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"loopArray": "#input",
//						"method": "forEach",
//						"outlet": {
//							"jaxId": "1J2JAOSRI3",
//							"attrs": {
//								"id": "Looper",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2JAH50G0"
//						},
//						"catchlet": {
//							"jaxId": "1J2JAOSRI4",
//							"attrs": {
//								"id": "Next",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2JB4C9G0"
//						}
//					},
//					"icon": "loop_array.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "jumper",
//					"jaxId": "1J2JAH50G0",
//					"attrs": {
//						"id": "GetPoints",
//						"viewName": "",
//						"label": "",
//						"x": "2845",
//						"y": "160",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"seg": "1J2JA5D890",
//						"outlet": {
//							"jaxId": "1J2JAOSRI5",
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
//					"jaxId": "1J2JAKITR0",
//					"attrs": {
//						"id": "CheckInLoop",
//						"viewName": "",
//						"label": "",
//						"x": "3510",
//						"y": "45",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2JAOSRQ2",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2JAOSRQ3",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2JAOSRI6",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2JB4C9G0"
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
//					"jaxId": "1J2JB4C9G0",
//					"attrs": {
//						"id": "PointsEnd",
//						"viewName": "",
//						"label": "",
//						"x": "3695",
//						"y": "230",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2JB4C9M0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2JB4C9M1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"channel": "Chat",
//						"text": "#input",
//						"outlet": {
//							"jaxId": "1J2JB4C9G1",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2K95HTK0"
//						}
//					},
//					"icon": "hudtxt.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1J2JL7JJE0",
//					"attrs": {
//						"id": "PromptImage",
//						"viewName": "",
//						"label": "",
//						"x": "4475",
//						"y": "340",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2JL7JJK0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2JL7JJK1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2JL7JJE1",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2JQO76S0"
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
//					"jaxId": "1J2JM6E6Q0",
//					"attrs": {
//						"id": "InitBash",
//						"viewName": "",
//						"label": "",
//						"x": "3935",
//						"y": "340",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2JM6R4T0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2JM6R4T1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2JM6R4T2",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2JM7OI40"
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
//					"jaxId": "1J2JM7OI40",
//					"attrs": {
//						"id": "InitConda",
//						"viewName": "",
//						"label": "",
//						"x": "4190",
//						"y": "340",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2JMCVR50",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2JMCVR51",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2JM98D00",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2JL7JJE0"
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
//					"jaxId": "1J2JQO76S0",
//					"attrs": {
//						"id": "ShowPrompted",
//						"viewName": "",
//						"label": "",
//						"x": "4760",
//						"y": "340",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2JQPM8L0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2JQPM8L1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2JQP9HI0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2JR84TJ0"
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
//					"def": "askConfirm",
//					"jaxId": "1J2JR84TJ0",
//					"attrs": {
//						"id": "AskMultiMask",
//						"viewName": "",
//						"label": "",
//						"x": "5120",
//						"y": "340",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"prompt": "是否启用多掩码输出（Multimask Output）？\n启用后会针对模糊提示生成多个候选分割结果。",
//						"outlets": {
//							"attrs": [
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2JR84T50",
//									"attrs": {
//										"id": "yes",
//										"desc": "Outlet.",
//										"text": "是",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2JR8RNE0",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2JR8RNE1",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2JRDVRH0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1J2JR84T51",
//									"attrs": {
//										"id": "no",
//										"desc": "Outlet.",
//										"text": "否",
//										"result": "",
//										"codes": "true",
//										"context": {
//											"jaxId": "1J2JR8RNE2",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1J2JR8RNE3",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1J2JRDVRH0"
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
//					"jaxId": "1J2JRDVRH0",
//					"attrs": {
//						"id": "SegmentImage",
//						"viewName": "",
//						"label": "",
//						"x": "5455",
//						"y": "340",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2JRHA7A0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2JRHA7A1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2JRHA710",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2JRGMBF0"
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
//					"jaxId": "1J2JRGMBF0",
//					"attrs": {
//						"id": "ShowSegmented",
//						"viewName": "",
//						"label": "",
//						"x": "5745",
//						"y": "340",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2JRHA7A2",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2JRHA7A3",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2JRHA711",
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
//					"def": "askChat",
//					"jaxId": "1J2JVKO1L0",
//					"attrs": {
//						"id": "InputX1",
//						"viewName": "",
//						"label": "",
//						"x": "1925",
//						"y": "425",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2K7J2OP0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2K7J2OP1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"tip": "请输入边界框左上角的X坐标（横坐标）：",
//						"tipRole": "Assistant",
//						"placeholder": "例如：500",
//						"text": "",
//						"file": "false",
//						"showText": "true",
//						"askUpward": "false",
//						"outlet": {
//							"jaxId": "1J2K7J2N10",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2JVL9CG0"
//						}
//					},
//					"icon": "chat.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1J2JVL9CG0",
//					"attrs": {
//						"id": "CheckX1",
//						"viewName": "",
//						"label": "",
//						"x": "2180",
//						"y": "425",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2K7J2OP2",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2K7J2OP3",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2K7J2N11",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2JVLO9P0"
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
//					"jaxId": "1J2JVLO9P0",
//					"attrs": {
//						"id": "InputX2",
//						"viewName": "",
//						"label": "",
//						"x": "2415",
//						"y": "425",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2JVM15A0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2JVM15A1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"tip": "请输入边界框右下角的X坐标（横坐标）：",
//						"tipRole": "Assistant",
//						"placeholder": "例如：800",
//						"text": "",
//						"file": "false",
//						"showText": "true",
//						"askUpward": "false",
//						"outlet": {
//							"jaxId": "1J2JVM15A2",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2JVM95M0"
//						}
//					},
//					"icon": "chat.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1J2JVM95M0",
//					"attrs": {
//						"id": "CheckX2",
//						"viewName": "",
//						"label": "",
//						"x": "2665",
//						"y": "425",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2K7J2OP4",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2K7J2OP5",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2K7J2N12",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2JVMTAO0"
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
//					"jaxId": "1J2JVMTAO0",
//					"attrs": {
//						"id": "InputY1",
//						"viewName": "",
//						"label": "",
//						"x": "2915",
//						"y": "425",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2K7J2OP6",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2K7J2OP7",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"tip": "请输入边界框左上角的Y坐标（纵坐标）：",
//						"tipRole": "Assistant",
//						"placeholder": "例如：500",
//						"text": "",
//						"file": "false",
//						"showText": "true",
//						"askUpward": "false",
//						"outlet": {
//							"jaxId": "1J2K7J2N13",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2JVNMFV0"
//						}
//					},
//					"icon": "chat.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1J2JVNMFV0",
//					"attrs": {
//						"id": "CheckY1",
//						"viewName": "",
//						"label": "",
//						"x": "3155",
//						"y": "425",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2K7J2OP8",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2K7J2OP9",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2K7J2N14",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2JVOEA90"
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
//					"jaxId": "1J2JVOEA90",
//					"attrs": {
//						"id": "InputY2",
//						"viewName": "",
//						"label": "",
//						"x": "3420",
//						"y": "425",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2K7J2OP10",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2K7J2OP11",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"tip": "请输入边界框右下角的Y坐标（纵坐标）：",
//						"tipRole": "Assistant",
//						"placeholder": "例如：800",
//						"text": "",
//						"file": "false",
//						"showText": "true",
//						"askUpward": "false",
//						"outlet": {
//							"jaxId": "1J2K7J2N15",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2JVP5RF0"
//						}
//					},
//					"icon": "chat.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1J2JVP5RF0",
//					"attrs": {
//						"id": "CheckY2",
//						"viewName": "",
//						"label": "",
//						"x": "3680",
//						"y": "425",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2K7J2OP12",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2K7J2OP13",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2K7J2N16",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2K95HTK0"
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
//					"jaxId": "1J2K93GDP0",
//					"attrs": {
//						"id": "CheckCombined",
//						"viewName": "",
//						"label": "",
//						"x": "3645",
//						"y": "580",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2K9JAO80",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2K9JAO81",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1J2K9JANN0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2JM6E6Q0"
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
//					"def": "connector",
//					"jaxId": "1J2K95HTK0",
//					"attrs": {
//						"id": "",
//						"label": "New AI Seg",
//						"x": "3810",
//						"y": "325",
//						"outlet": {
//							"jaxId": "1J2K9JAO82",
//							"attrs": {
//								"id": "Outlet",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2K96VS40"
//						},
//						"dir": "R2L"
//					},
//					"icon": "arrowright.svg",
//					"isConnector": true
//				},
//				{
//					"type": "aiseg",
//					"def": "connector",
//					"jaxId": "1J2K96VS40",
//					"attrs": {
//						"id": "",
//						"label": "New AI Seg",
//						"x": "3675",
//						"y": "325",
//						"outlet": {
//							"jaxId": "1J2K9765R0",
//							"attrs": {
//								"id": "Outlet",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2K93GDP0"
//						},
//						"dir": "R2L"
//					},
//					"icon": "arrowright.svg",
//					"isConnector": true
//				},
//				{
//					"type": "aiseg",
//					"def": "jumper",
//					"jaxId": "1J2K9DU610",
//					"attrs": {
//						"id": "goto",
//						"viewName": "",
//						"label": "",
//						"x": "3065",
//						"y": "615",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"seg": "1J2JM6E6Q0",
//						"outlet": {
//							"jaxId": "1J2K9JANN3",
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
//					"jaxId": "1J2K9P3JM0",
//					"attrs": {
//						"id": "GetPoint",
//						"viewName": "",
//						"label": "",
//						"x": "2480",
//						"y": "615",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"seg": "1J2JA1A9N0",
//						"outlet": {
//							"jaxId": "1J2K9PQGC1",
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
//					"jaxId": "1J2K9R5EE0",
//					"attrs": {
//						"id": "GetBox",
//						"viewName": "",
//						"label": "",
//						"x": "1925",
//						"y": "615",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"seg": "1J2JVKO1L0",
//						"outlet": {
//							"jaxId": "1J2K9RA3E0",
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
//					"def": "output",
//					"jaxId": "1J2K9V17J0",
//					"attrs": {
//						"id": "ReturnBox",
//						"viewName": "",
//						"label": "",
//						"x": "2185",
//						"y": "615",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2K9VB0H0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2K9VB0H1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"channel": "Chat",
//						"text": "#input",
//						"outlet": {
//							"jaxId": "1J2K9VB0I0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2K9P3JM0"
//						}
//					},
//					"icon": "hudtxt.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "output",
//					"jaxId": "1J2KA2HOG0",
//					"attrs": {
//						"id": "ReturnPoint",
//						"viewName": "",
//						"label": "",
//						"x": "2755",
//						"y": "615",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1J2KA2NG00",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1J2KA2NG01",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"channel": "Chat",
//						"text": "#input",
//						"outlet": {
//							"jaxId": "1J2KA2NG02",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1J2K9DU610"
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