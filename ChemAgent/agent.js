//Auto genterated by Cody
import {$P,VFACT,callAfter,sleep} from "/@vfact";
import pathLib from "/@path";
import inherits from "/@inherits";
import Base64 from "/@tabos/utils/base64.js";
import {trimJSON} from "/@aichat/utils.js";
import {AATools,AAToolSet} from "/@tabos/AATools.js";
/*#{1HDBOSUN90MoreImports*/
/*}#1HDBOSUN90MoreImports*/
const agentURL=(new URL(import.meta.url)).pathname;
const baseURL=pathLib.dirname(agentURL);
const basePath=baseURL.startsWith("file://")?decodeURI(baseURL):baseURL;
const $ln=VFACT.lanCode||"EN";
/*#{1HDBOSUN90StartDoc*/
/*}#1HDBOSUN90StartDoc*/
//----------------------------------------------------------------------------
let agent=async function(session){
	let execInput;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let Start,ChooseTask,getAllTools,selectTools,askTools,getGithub,askGithub,checkGithub,goto,toolLoop,autodeploy1,urlLoop,autodeploy2,Stacking,startUse,useAgent,GetTools,ChooseMode,CallTool,ShowArg;
	/*#{1HDBOSUN90LocalVals*/
	let selectedTask;
	let selectedTools=[];
	let newTools=[];
	let toolList;
	let allTools;
	let availableTools;
	/*}#1HDBOSUN90LocalVals*/
	
	function parseAgentArgs(input){
		execInput=input;
		/*#{1HDBOSUN90ParseArgs*/
		/*}#1HDBOSUN90ParseArgs*/
	}
	
	/*#{1HDBOSUN90PreContext*/
	/*}#1HDBOSUN90PreContext*/
	context={
		curTool: -1,
	};
	context=VFACT.flexState(context);
	/*#{1HDBOSUN90PostContext*/
	/*}#1HDBOSUN90PostContext*/
	let $agent,agent,segs={};
	segs["Start"]=Start=async function(input){//:1J0TRO1J60
		let result=input;
		let opts={txtHeader:($agent.showName||$agent.name||null)};
		let role="assistant";
		let content="Hello! This is an agent that can automatically complete chemical research tasks. ";
		session.addChatText(role,content,opts);
		return {seg:ChooseTask,result:(result),preSeg:"1J0TRO1J60",outlet:"1J0TROC6J0"};
	};
	Start.jaxId="1J0TRO1J60"
	Start.url="Start@"+agentURL
	
	segs["ChooseTask"]=ChooseTask=async function(input){//:1J0TSHRDQ0
		let prompt=("Please choose a type of task")||input;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let withChat=false;
		let silent=false;
		let items=[
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"Molecular Property Prediction",code:0},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"Reaction Prediction",code:1},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"Text-Based Molecule Design ",code:2},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:"Molecule Captioning",code:3},
		];
		let result="";
		let item=null;
		
		/*#{1J0TSHRDQ0PreCodes*/
		/*}#1J0TSHRDQ0PreCodes*/
		if(silent){
			result="";
			/*#{1J0TSHRD80Silent*/
			/*}#1J0TSHRD80Silent*/
			return {seg:GetTools,result:(result),preSeg:"1J0TSHRDQ0",outlet:"1J0TSHRD80"};
		}
		[result,item]=await session.askUserRaw({type:"menu",prompt:prompt,multiSelect:false,items:items,withChat:withChat,countdown:countdown,placeholder:placeholder});
		/*#{1J0TSHRDQ0PostCodes*/
		selectedTask=item.text;
		result=item;
		/*}#1J0TSHRDQ0PostCodes*/
		if(typeof(item)==='string'){
			result=item;
			return {result:result};
		}else if(item.code===0){
			/*#{1J0TSHRD80*/
			/*}#1J0TSHRD80*/
			return {seg:GetTools,result:(result),preSeg:"1J0TSHRDQ0",outlet:"1J0TSHRD80"};
		}else if(item.code===1){
			/*#{1J0TSHRD90*/
			/*}#1J0TSHRD90*/
			return {seg:GetTools,result:(result),preSeg:"1J0TSHRDQ0",outlet:"1J0TSHRD90"};
		}else if(item.code===2){
			/*#{1J0TSHRD91*/
			/*}#1J0TSHRD91*/
			return {seg:GetTools,result:(result),preSeg:"1J0TSHRDQ0",outlet:"1J0TSHRD91"};
		}else if(item.code===3){
			/*#{1J0TT6F490*/
			/*}#1J0TT6F490*/
			return {seg:GetTools,result:(result),preSeg:"1J0TSHRDQ0",outlet:"1J0TT6F490"};
		}
		/*#{1J0TSHRDQ0FinCodes*/
		/*}#1J0TSHRDQ0FinCodes*/
		return {result:result};
	};
	ChooseTask.jaxId="1J0TSHRDQ0"
	ChooseTask.url="ChooseTask@"+agentURL
	
	// segs["getAllTools"]=getAllTools=async function(input){//:1J0TVNB790
	// 	let result=input
	// 	/*#{1J0TVNB790Code*/
	// 	let availableTools;
	// 	if(input && input.code !== undefined) {
	// 		switch(input.code) {
	// 			case 0: // Molecular Property Prediction
	// 				availableTools=["SMILES2Property","UniMol-v2"];
	// 				break;
	// 			case 1: // Reaction Prediction
	// 				availableTools=["SMILES2Property","Chemformer"];
	// 				break;
	// 			case 2: // Text-Based Molecule Design
	// 				availableTools=["Name2SMILES","ChemDFM"];
	// 				break;
	// 			case 3: // Molecule Captioning
	// 				availableTools=["SMILES2Description","Text+ChemT5"];
	// 				break;
	// 			default:
	// 				availableTools = [];
	// 		}
	// 	}
	// 	result=availableTools;
	// 	/*}#1J0TVNB790Code*/
	// 	return {seg:selectTools,result:(result),preSeg:"1J0TVNB790",outlet:"1J0TVNBJN2"};
	// };
	// getAllTools.jaxId="1J0TVNB790"
	// getAllTools.url="getAllTools@"+agentURL
	
	// segs["selectTools"]=selectTools=async function(input){//:1J0U7K19P0
	// 	let prompt=("Please choose the tools you want in the given set.")||input;
	// 	let countdown=undefined;
	// 	let placeholder=(undefined)||null;
	// 	let withChat=false;
	// 	let items=[
	// 	];
	// 	let result="";
	// 	let item=null;
		
	// 	/*#{1J0U7K19P0PreCodes*/
	// 	input.forEach(tool => {
	// 		items.push({ text: tool });
	// 	});
	// 	/*}#1J0U7K19P0PreCodes*/
	// 	[result,item]=await session.askUserRaw({type:"menu",prompt:prompt,multiSelect:true,items:items,withChat:withChat,countdown:countdown,placeholder:placeholder});
	// 	/*#{1J0U7K19P0PostCodes*/
	// 	selectedTools = result.split(',').map(item => item);
	// 	result = `Selected Task: ${selectedTask}\nSelected Tools: ${selectedTools.join(', ')}`;
	// 	return {seg:askTools,result:(result),preSeg:"1J0U7K19P0",outlet:"1J0U7K19P1"};
	// 	/*}#1J0U7K19P0PostCodes*/
	// };
	// selectTools.jaxId="1J0U7K19P0"
	// selectTools.url="selectTools@"+agentURL
	
	// segs["askTools"]=askTools=async function(input){//:1J0UO0H1R0
	// 	let prompt=("Do you have other tools to add?")||input;
	// 	let silent=false;
	// 	let countdown=undefined;
	// 	let placeholder=(undefined)||null;
	// 	let button1=("Yes")||"OK";
	// 	let button2=("No")||"Cancel";
	// 	let button3=("")||"";
	// 	let result="";
	// 	let value=0;
	// 	if(silent){
	// 		result="";
	// 		return {seg:askGithub,result:(result),preSeg:"1J0UO0H1R0",outlet:"1J0UO0H1B0"};
	// 	}
	// 	[result,value]=await session.askUserRaw({type:"confirm",prompt:prompt,button1:button1,button2:button2,button3:button3,countdown:countdown,withChat:undefined,placeholder:placeholder});
	// 	if(value===1){
	// 		result=("")||result;
	// 		return {seg:askGithub,result:(result),preSeg:"1J0UO0H1R0",outlet:"1J0UO0H1B0"};
	// 	}
	// 	if(value===2){
	// 		result=("")||result;
	// 		return {result:result};
	// 	}
	// 	result=("")||result;
	// 	return {seg:toolLoop,result:(result),preSeg:"1J0UO0H1R0",outlet:"1J0UO0H1B1"};
	
	// };
	// askTools.jaxId="1J0UO0H1R0"
	// askTools.url="askTools@"+agentURL
	
	// segs["getGithub"]=getGithub=async function(input){//:1J0UP2CQ60
	// 	let tip=("");
	// 	let tipRole=("assistant");
	// 	let placeholder=("");
	// 	let allowFile=(false)||false;
	// 	let askUpward=(false);
	// 	let text=("");
	// 	let result="";
	// 	if(askUpward && tip){
	// 		result=await session.askUpward($agent,tip);
	// 	}else{
	// 		if(tip){
	// 			session.addChatText(tipRole,tip);
	// 		}
	// 		result=await session.askChatInput({type:"input",placeholder:placeholder,text:text,allowFile:allowFile});
	// 	}
	// 	if(typeof(result)==="string"){
	// 		session.addChatText("user",result);
	// 	}else if(result.assets && result.prompt){
	// 		session.addChatText("user",`${result.prompt}\n- - -\n${result.assets.join("\n- - -\n")}`,{render:true});
	// 	}else{
	// 		session.addChatText("user",result.text||result.prompt||result);
	// 	}
	// 	return {seg:checkGithub,result:(result),preSeg:"1J0UP2CQ60",outlet:"1J0UP3UHA0"};
	// };
	// getGithub.jaxId="1J0UP2CQ60"
	// getGithub.url="getGithub@"+agentURL
	
	// segs["askGithub"]=askGithub=async function(input){//:1J0UPP9R60
	// 	let result=input;
	// 	let opts={txtHeader:($agent.showName||$agent.name||null)};
	// 	let role="assistant";
	// 	let content="Please input a Github Url";
	// 	session.addChatText(role,content,opts);
	// 	return {seg:getGithub,result:(result),preSeg:"1J0UPP9R60",outlet:"1J0UPQNL32"};
	// };
	// askGithub.jaxId="1J0UPP9R60"
	// askGithub.url="askGithub@"+agentURL
	
	// segs["checkGithub"]=checkGithub=async function(input){//:1J0UQ2RIA0
	// 	let result=input
	// 	/*#{1J0UQ2RIA0Code*/
	// 	if(input.startsWith("https://github.com/")){
	// 		newTools.push({text: input })
	// 	}
	// 	/*}#1J0UQ2RIA0Code*/
	// 	return {seg:goto,result:(result),preSeg:"1J0UQ2RIA0",outlet:"1J0UQ39KM0"};
	// };
	// checkGithub.jaxId="1J0UQ2RIA0"
	// checkGithub.url="checkGithub@"+agentURL
	
	// segs["goto"]=goto=async function(input){//:1J0UQD2CJ0
	// 	let result=input;
	// 	return {seg:askTools,result:result,preSeg:"1J0UO0H1R0",outlet:"1J0UQDOA90"};
	
	// };
	// goto.jaxId="1J0UO0H1R0"
	// goto.url="goto@"+agentURL
	
	// segs["toolLoop"]=toolLoop=async function(input){//:1J0UQJ4KN0
	// 	let result=input;
	// 	let list=selectedTools;
	// 	let i,n,item,loopR;
	// 	n=list.length;
	// 	for(i=0;i<n;i++){
	// 		item=list[i];
	// 		loopR=await session.runAISeg(agent,autodeploy1,item,"1J0UQJ4KN0","1J0UQSDT20")
	// 		if(loopR==="break"){
	// 			break;
	// 		}
	// 	}
	// 	return {seg:urlLoop,result:(result),preSeg:"1J0UQJ4KN0",outlet:"1J0UQK8500"};
	// };
	// toolLoop.jaxId="1J0UQJ4KN0"
	// toolLoop.url="toolLoop@"+agentURL
	
	// segs["autodeploy1"]=autodeploy1=async function(input){//:1J0UQR8DF0
	// 	let result;
	// 	let arg=input;
	// 	let agentNode=(undefined)||null;
	// 	let sourcePath=pathLib.joinTabOSURL(basePath,"");
	// 	let opts={secrect:false,fromAgent:$agent,askUpwardSeg:null};
	// 	result= await session.callAgent(agentNode,sourcePath,arg,opts);
	// 	return {result:result};
	// };
	// autodeploy1.jaxId="1J0UQR8DF0"
	// autodeploy1.url="autodeploy1@"+agentURL
	
	// segs["urlLoop"]=urlLoop=async function(input){//:1J0UQVTM20
	// 	let result=input;
	// 	let list=newTools;
	// 	let i,n,item,loopR;
	// 	n=list.length;
	// 	for(i=0;i<n;i++){
	// 		item=list[i];
	// 		loopR=await session.runAISeg(agent,autodeploy2,item,"1J0UQVTM20","1J0UR00BM2")
	// 		if(loopR==="break"){
	// 			break;
	// 		}
	// 	}
	// 	return {seg:Stacking,result:(result),preSeg:"1J0UQVTM20",outlet:"1J0UR00BM3"};
	// };
	// urlLoop.jaxId="1J0UQVTM20"
	// urlLoop.url="urlLoop@"+agentURL
	
	// segs["autodeploy2"]=autodeploy2=async function(input){//:1J0UR1LQ80
	// 	let result;
	// 	let arg=input;
	// 	let agentNode=(undefined)||null;
	// 	let sourcePath=pathLib.joinTabOSURL(basePath,"");
	// 	let opts={secrect:false,fromAgent:$agent,askUpwardSeg:null};
	// 	result= await session.callAgent(agentNode,sourcePath,arg,opts);
	// 	return {result:result};
	// };
	// autodeploy2.jaxId="1J0UR1LQ80"
	// autodeploy2.url="autodeploy2@"+agentURL
	
	// segs["Stacking"]=Stacking=async function(input){//:1J0URDQCG0
	// 	let result;
	// 	let arg=input;
	// 	let agentNode=(undefined)||null;
	// 	let sourcePath=pathLib.joinTabOSURL(basePath,"");
	// 	let opts={secrect:false,fromAgent:$agent,askUpwardSeg:null};
	// 	result= await session.callAgent(agentNode,sourcePath,arg,opts);
	// 	return {seg:startUse,result:(result),preSeg:"1J0URDQCG0",outlet:"1J105CUBS1"};
	// };
	// Stacking.jaxId="1J0URDQCG0"
	// Stacking.url="Stacking@"+agentURL
	
	// segs["startUse"]=startUse=async function(input){//:1J0URJNI00
	// 	let result=input;
	// 	let opts={txtHeader:($agent.showName||$agent.name||null)};
	// 	let role="assistant";
	// 	let content="Now, you can use the agent to complete a specific task!";
	// 	session.addChatText(role,content,opts);
	// 	return {seg:useAgent,result:(result),preSeg:"1J0URJNI00",outlet:"1J105CUBS3"};
	// };
	// startUse.jaxId="1J0URJNI00"
	// startUse.url="startUse@"+agentURL
	
	// segs["useAgent"]=useAgent=async function(input){//:1J0VP9V9J0
	// 	let result;
	// 	let arg=input;
	// 	let agentNode=(undefined)||null;
	// 	let sourcePath=pathLib.joinTabOSURL(basePath,"");
	// 	let opts={secrect:false,fromAgent:$agent,askUpwardSeg:null};
	// 	result= await session.callAgent(agentNode,sourcePath,arg,opts);
	// 	return {result:result};
	// };
	// useAgent.jaxId="1J0VP9V9J0"
	// useAgent.url="useAgent@"+agentURL
	
	segs["GetTools"]=GetTools=async function(input){//:1J1GJU7HN0
		let result=input
		/*#{1J1GJU7HN0Code*/
		const taskToolMap = {
			"Molecular Property Prediction": ["SparkTTS"],
			"Reaction Prediction": [],
			"Text-Based Molecule Design": [],
			"Molecule Captioning": [],
		};

		const requiredTools = taskToolMap[selectedTask];

		const allTools = new AATools();
		await allTools.load();
		context.allTools = allTools; 

		const downloadedTools = allTools.getTools();
		let availableTools;

		if (requiredTools && requiredTools.length > 0) {
			availableTools = downloadedTools.filter(tool => requiredTools.includes(tool.getNameText()));
		} else {
			availableTools = downloadedTools;
		}
		
		context.availableTools = availableTools;
		result = {
			task: selectedTask,
			availableTools: availableTools.map(t => t.getNameText())
		};
		/*}#1J1GJU7HN0Code*/
		return {seg:ChooseMode,result:(result),preSeg:"1J1GJU7HN0",outlet:"1J1GK1PRE0"};
	};
	GetTools.jaxId="1J1GJU7HN0"
	GetTools.url="GetTools@"+agentURL
	
	segs["ChooseMode"]=ChooseMode=async function(input){//:1J1GK0FVT0
		let prompt=("Please select a tool to run, or choose MoE mode")||input;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let withChat=true;
		let silent=false;
		let items=[
		];
		let result="";
		let item=null;
		
		/*#{1J1GK0FVT0PreCodes*/
		context.availableTools.forEach((tool, index) => {
			items.push({
				icon: tool.icon || "/~/-tabos/shared/assets/agent.svg",
				text: tool.getNameText() || 'Untitled Tool',
				code: `Tool-${index}`
			});
		});

		items.push({
			icon:"/~/-tabos/shared/assets/dot.svg",
			text:"Choose the MoE Mode",
			code: "MoE"
		});
		/*}#1J1GKVDPN0PreCodes*/
		if(silent){
			result="";
			/*#{1J1GK0FUU0Silent*/
			/*}#1J1GK0FUU0Silent*/
			return {seg:ShowArg,result:(result),preSeg:"1J1GK0FVT0",outlet:"1J1GK0FUU0"};
		}
		[result,item]=await session.askUserRaw({type:"menu",prompt:prompt,multiSelect:false,items:items,withChat:withChat,countdown:countdown,placeholder:placeholder});
		/*#{1J1GK0FVT0PostCodes*/
		/*}#1J1GK0FVT0PostCodes*/
		if(typeof(item)==='string'){
			result=item;
			return {seg:CallTool,result:(result),preSeg:"1J1GKVDPN0",outlet:"1J1GKVDP10"};
		}else if(item.code==="MoE"){
			/*#{1J1GK0FUU0*/
			/*}#1J1GK0FUU0*/
			return {seg:ShowArg,result:(input),preSeg:"1J1GK0FVT0",outlet:"1J1GK0FUU0"};
		}
		/*#{1J1GK0FVT0FinCodes*/
		context.curTool = item.code;
		/*}#1J1GK0FVT0FinCodes*/
		return {seg:CallTool,result:(result),preSeg:"1J1GK0FVT0",outlet:"1J1GKVDP10"};
	};
	ChooseMode.jaxId="1J1GK0FVT0"
	ChooseMode.url="ChooseMode@"+agentURL
	
	segs["CallTool"]=CallTool=async function(input){//:1J1GK98U90
		let result=input
		/*#{1J1GK98U90Code*/
		const toolId = context.curTool; // e.g., "Tool-0"
	
		if (!toolId || !toolId.startsWith('Tool-')) {
			session.addChatText("assistant", "No valid tool selected.");
			return {result: "No valid tool selected"};
		}
	
		const toolIndex = parseInt(toolId.split('-')[1], 10);
		const tool = context.availableTools[toolIndex];
	
		if (!tool) {
			session.addChatText("assistant", `Tool with id ${toolId} not found.`);
			return {result: "Tool not found"};
		}
	
		const aaTools = context.allTools;
		const prompt = input || " ";
	
		let opts={txtHeader:($agent.showName||$agent.name||null)};
		let role="assistant";
		let content=`### Calling agent: \n- Agent: ${tool.getNameText()} \n- Task: ${prompt}`;
		opts.icon="/~/-tabos/shared/assets/gas_e.svg";
		session.addChatText(role,content,opts);
	
		try {
			session.indentMore();
			session.debugLog({type:"CallTool",tool:tool.filePath,prompt:prompt});
			
			const callOpts={secrect:false,upperAgent:$agent,askUpwardSeg:null};
			result = await aaTools.execTool(VFACT.app, tool, prompt, session, callOpts);
			
			session.debugLog({type:"ToolResult",tool:tool.filePath,result:result});
			
			let resultOpts={txtHeader:tool.getNameText() + " result:"};
			resultOpts.icon="/~/-tabos/shared/assets/arrowleft.svg";
			session.addChatText("assistant", result.content || result, resultOpts);
			
		} catch(error) {
			session.debugLog({type:"ToolError",tool:tool.getNameText(),error:error});
			result = `Agent execution error: ${error}`;
			session.addChatText("assistant", result);
		} finally {
			session.indentLess();
		}
		/*}#1J1GK98U90Code*/
		return {result:result};
	};
	CallTool.jaxId="1J1GK98U90"
	CallTool.url="CallTool@"+agentURL
	
	segs["ShowArg"]=ShowArg=async function(input){//:1J1GKA8S40
		let result=input;
		let opts={txtHeader:($agent.showName||$agent.name||null)};
		let role="assistant";
		let content=`### Arguments\n\`\`\`json\n${JSON.stringify(input, null, 2)}\n\`\`\``;
		session.addChatText(role,content,opts);
		return {result:result};
	};
	ShowArg.jaxId="1J1GKA8S40"
	ShowArg.url="ShowArg@"+agentURL
	
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
export const ChatAPI=[{
	def:{
		name: "agent",
		description: "这是一个AI代理。",
		parameters:{
			type: "object",
			properties:{
			}
		}
	},
	agent: agent
}];
//#CodyExport<<<
/*#{1HDBOSUN90PostDoc*/
/*}#1HDBOSUN90PostDoc*/


export default agent;
export{agent};