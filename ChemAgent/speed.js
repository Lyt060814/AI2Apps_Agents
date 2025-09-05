//Auto genterated by Cody
import {$P,VFACT,callAfter,sleep} from "/@vfact";
import pathLib from "/@path";
import inherits from "/@inherits";
import Base64 from "/@tabos/utils/base64.js";
import {trimJSON} from "/@aichat/utils.js";
/*#{1J17IPLB90MoreImports*/
import {AATools,AAToolSet} from "/@tabos/AATools.js";
/*}#1J17IPLB90MoreImports*/
const agentURL=(new URL(import.meta.url)).pathname;
const baseURL=pathLib.dirname(agentURL);
const basePath=baseURL.startsWith("file://")?decodeURI(baseURL):baseURL;
const $ln=VFACT.lanCode||"EN";
/*#{1J17IPLB90StartDoc*/
/*}#1J17IPLB90StartDoc*/
//----------------------------------------------------------------------------
let speed=async function(session){
	let execInput;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let Start,showTools,callSelectedTools,InitTool;
	/*#{1J17IPLB90LocalVals*/
	/*}#1J17IPLB90LocalVals*/
	
	function parseAgentArgs(input){
		execInput=input;
		/*#{1J17IPLB90ParseArgs*/
		/*}#1J17IPLB90ParseArgs*/
	}
	
	/*#{1J17IPLB90PreContext*/
	/*}#1J17IPLB90PreContext*/
	context={
		toolList: "",
		curTool: -1,
		toolIndex: "",
		/*#{1J17IPLB95ExCtxAttrs*/
		/*}#1J17IPLB95ExCtxAttrs*/
	};
	context=VFACT.flexState(context);
	/*#{1J17IPLB90PostContext*/
	/*}#1J17IPLB90PostContext*/
	let $agent,agent,segs={};
	segs["Start"]=Start=async function(input){//:1J17ITN4P0
		let result=input;
		let opts={txtHeader:($agent.showName||$agent.name||null)};
		let role="assistant";
		let content="Welcome to use the speed mode! Loading your downloaded tools...";
		session.addChatText(role,content,opts);
		return {seg:InitTool,result:(result),preSeg:"1J17ITN4P0",outlet:"1J17IU4DR0"};
	};
	Start.jaxId="1J17ITN4P0"
	Start.url="Start@"+agentURL
	
	segs["showTools"]=showTools=async function(input){//:1J17J3FOB0
		let prompt=("Please select a tool to run")||input;
		let countdown=undefined;
		let placeholder=("You can enter a prompt for the tool here.")||null;
		let withChat=true;
		let items=[
		];
		let result="";
		let item=null;
		
		/*#{1J17J3FOB0PreCodes*/
		session.debugLog("showTools called");
		const aaTools = context.toolList; // context.toolList is AATools instance from InitTool

		if (!aaTools || typeof aaTools.getTools !== 'function') {
			session.addChatText("assistant", "Tool list not initialized correctly.");
			return { result: "Error: Tool list not available" };
		}
		const tools = aaTools.getTools();
		
		if(!tools || tools.length === 0){
			let opts={txtHeader:($agent.showName||$agent.name||null)};
			let role="assistant";
			let content="Sorry, no downloaded tools found. Please download some tools from AA Store first.";
			session.addChatText(role,content,opts);
			return {result:"No tools available"};
		}
		
		// 构建菜单项
		for(let i = 0; i < tools.length; i++) {
			const tool = tools[i];
			items.push({
				icon: tool.icon || "/~/-tabos/shared/assets/agent.svg",
				text: tool.getNameText() || 'Untitled Tool',
				code: `Tool-${i}`
			});
		}
		
		session.debugLog("Menu items created:", items);
		/*}#1J17J3FOB0PreCodes*/
		[result,item]=await session.askUserRaw({type:"menu",prompt:prompt,multiSelect:false,items:items,withChat:withChat,countdown:countdown,placeholder:placeholder});
		/*#{1J17J3FOB0PostCodes*/
		session.debugLog("User selection result:", result, "item:", item);
		/*}#1J17J3FOB0PostCodes*/
		if(!item || !item.code){
			result="Canceled";
			return {result:result};
		}
		/*#{1J17J3FOB0FinCodes*/
		context.curTool = item.code;
		/*}#1J17J3FOB0FinCodes*/
		return {seg:callSelectedTools,result:(result),preSeg:"1J17J3FOB0",outlet:"1J17J41500"};
	};
	showTools.jaxId="1J17J3FOB0"
	showTools.url="showTools@"+agentURL
	
	segs["callSelectedTools"]=callSelectedTools=async function(input){//:1J17J73JL0
		let result=input
		/*#{1J17J73JL0Code*/
		const aaTools = context.toolList;
		const toolId = context.curTool;

		if (!toolId) {
			session.addChatText("assistant", "No tool selected, cannot execute task.");
			return {result: "No tool selected"};
		}
		
		const tool = aaTools.getTool(toolId);
		if (!tool) {
			session.addChatText("assistant", `Tool with id ${toolId} not found.`);
			return {result: "Tool not found"};
		}

		const prompt = input || " ";
		
		// 显示调用工具的信息
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
			
			// 显示结果
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
		/*}#1J17J73JL0Code*/
		return {result:result};
	};
	callSelectedTools.jaxId="1J17J73JL0"
	callSelectedTools.url="callSelectedTools@"+agentURL
	
	segs["InitTool"]=InitTool=async function(input){//:1J18FHFSJ0
		let result=input
		/*#{1J18FHFSJ0Code*/
		let tools;
		tools=context.toolList=new AATools();
		await tools.load();
		if(tools){
			context.toolIndex=tools.getToolScope();
			context.toolIndex = Object.entries(context.toolIndex).slice(6);
			session.debugLog("Tools index:");
			session.debugLog(context.toolIndex);
			console.log("Tools index:");
			console.log(context.toolIndex);
		}
		/*}#1J18FHFSJ0Code*/
		return {seg:showTools,result:(result),preSeg:"1J18FHFSJ0",outlet:"1J18FI1SK0"};
	};
	InitTool.jaxId="1J18FHFSJ0"
	InitTool.url="InitTool@"+agentURL
	
	agent=$agent={
		isAIAgent:true,
		session:session,
		name:"speed",
		url:agentURL,
		autoStart:true,
		jaxId:"1J17IPLB90",
		context:context,
		livingSeg:null,
		execChat:async function(input){
			let result;
			parseAgentArgs(input);
			/*#{1J17IPLB90PreEntry*/
			/*}#1J17IPLB90PreEntry*/
			result={seg:Start,"input":input};
			/*#{1J17IPLB90PostEntry*/
			/*}#1J17IPLB90PostEntry*/
			return result;
		},
		/*#{1J17IPLB90MoreAgentAttrs*/
		/*}#1J17IPLB90MoreAgentAttrs*/
	};
	/*#{1J17IPLB90PostAgent*/
	/*}#1J17IPLB90PostAgent*/
	return agent;
};
/*#{1J17IPLB90ExCodes*/
/*}#1J17IPLB90ExCodes*/

//#CodyExport>>>
//#CodyExport<<<
/*#{1J17IPLB90PostDoc*/
/*}#1J17IPLB90PostDoc*/


export default speed;
export{speed};