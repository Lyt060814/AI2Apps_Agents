//Auto genterated by Cody
import {$P,VFACT,callAfter,sleep} from "/@vfact";
import pathLib from "/@path";
import inherits from "/@inherits";
import Base64 from "/@tabos/utils/base64.js";
import {trimJSON} from "/@aichat/utils.js";
/*#{1J10663TE0MoreImports*/
import {AATools,AAToolSet} from "/@tabos/AATools.js";
/*}#1J10663TE0MoreImports*/
const agentURL=(new URL(import.meta.url)).pathname;
const baseURL=pathLib.dirname(agentURL);
const basePath=baseURL.startsWith("file://")?decodeURI(baseURL):baseURL;
const $ln=VFACT.lanCode||"EN";
/*#{1J10663TE0StartDoc*/
/*}#1J10663TE0StartDoc*/
//----------------------------------------------------------------------------
let gernalist=async function(session){
	let execInput;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let Start,InitTools,showTools,callSelectedTools;
	/*#{1J10663TE0LocalVals*/
	/*}#1J10663TE0LocalVals*/
	
	function parseAgentArgs(input){
		execInput=input;
		/*#{1J10663TE0ParseArgs*/
		/*}#1J10663TE0ParseArgs*/
	}
	
	/*#{1J10663TE0PreContext*/
	/*}#1J10663TE0PreContext*/
	context={
		aaTools: "",
		toolList: [],
		selectedTool: null,
		userPrompt: "",
		/*#{1J10663TE5ExCtxAttrs*/
		/*}#1J10663TE5ExCtxAttrs*/
	};
	context=VFACT.flexState(context);
	/*#{1J10663TE0PostContext*/
	/*}#1J10663TE0PostContext*/
	let $agent,agent,segs={};
	segs["Start"]=Start=async function(input){//:1J106OF190
		let result=input;
		let opts={txtHeader:($agent.showName||$agent.name||null)};
		let role="assistant";
		let content="Welcome to use the speed mode! Loading your downloaded tools...";
		session.addChatText(role,content,opts);
		return {seg:InitTools,result:(result),preSeg:"1J106OF190",outlet:"1J106Q4JB0"};
	};
	Start.jaxId="1J106OF190"
	Start.url="Start@"+agentURL
	
	segs["InitTools"]=InitTools=async function(input){//:1J17GML2L0
		let result=input
		/*#{1J17GML2L0Code*/
		let tools;
		try {
			// 初始化AATools，加载用户下载的工具
			session.debugLog("Initializing AATools with session and basePath...");
			tools=context.aaTools=new AATools(session,basePath);
			session.debugLog("AATools created, loading tools...");
			await tools.load();
			session.debugLog("Tools loaded, checking results...");
			
			if(tools && tools.tools && tools.tools.length > 0){
				// 获取工具列表
				context.toolList = tools.tools.map((tool, index) => {
					return {
						index: index,
						name: tool.getNameText($ln),
						description: tool.getDescText($ln),
						icon: tool.icon || "/~/-tabos/shared/assets/gas_e.svg",
						tool: tool
					};
				});
				session.debugLog("Available tools:");
				session.debugLog(context.toolList);
				console.log("Available tools count:", context.toolList.length);
			}else{
				context.toolList = [];
				session.debugLog("No tools found or tools.tools is empty");
				console.log("No tools found. tools:", tools, "tools.tools:", tools ? tools.tools : "undefined");
			}
		} catch(error) {
			session.debugLog("Error in InitTools:", error);
			console.error("Error in InitTools:", error);
			context.toolList = [];
		}
		
		/*}#1J17GML2L0Code*/
		return {seg:showTools,result:(result),preSeg:"1J17GML2L0",outlet:"1J17GNF7B0"};
	};
	InitTools.jaxId="1J17GML2L0"
	InitTools.url="InitTools@"+agentURL
	
	segs["showTools"]=showTools=async function(input){//:1J17GRG6Q0
		let prompt=("Please select a tool to use")||input;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let withChat=false;
		let items=[
		];
		let result="";
		let item=null;
		
		/*#{1J17GRG6Q0PreCodes*/
		session.debugLog("showTools called, toolList length:", context.toolList.length);
		console.log("showTools called, toolList:", context.toolList);
		
		// 检查工具列表是否为空
		if(!context.toolList || context.toolList.length === 0){
			let opts={txtHeader:($agent.showName||$agent.name||null)};
			let role="assistant";
			let content="Sorry, no downloaded tools found. Please download some tools from AA Store first.";
			session.addChatText(role,content,opts);
			return {result:"No tools available"};
		}
		
		// 构建菜单项
		for(let toolInfo of context.toolList){
			items.push({
				icon: toolInfo.icon,
				text: `${toolInfo.name} - ${toolInfo.description}`,
				code: toolInfo.index
			});
		}
		
		session.debugLog("Menu items created:", items.length);
		console.log("Menu items:", items);
		/*}#1J17GRG6Q0PreCodes*/
		[result,item]=await session.askUserRaw({type:"menu",prompt:prompt,multiSelect:false,items:items,withChat:withChat,countdown:countdown,placeholder:placeholder});
		/*#{1J17GRG6Q0PostCodes*/
		session.debugLog("User selection result:", result, "item:", item);
		/*}#1J17GRG6Q0PostCodes*/
		if(typeof(item)==='string'){
			result=item;
			return {seg:callSelectedTools,result:(result),preSeg:"1J17GRG6Q0",outlet:"1J17GSG7K0"};
		}
		/*#{1J17GRG6Q0FinCodes*/
		let selectedIndex = item.code;
		context.selectedTool = context.toolList[selectedIndex].tool;
		context.userPrompt = "Please use this tool to complete the task";
		result = context.userPrompt;
		/*}#1J17GRG6Q0FinCodes*/
		return {seg:callSelectedTools,result:(result),preSeg:"1J17GRG6Q0",outlet:"1J17GSG7K0"};
	};
	showTools.jaxId="1J17GRG6Q0"
	showTools.url="showTools@"+agentURL
	
	segs["callSelectedTools"]=callSelectedTools=async function(input){//:1J17HB85B0
		let result=input
		/*#{1J17HB85B0Code*/
		if(!context.selectedTool){
			let opts={txtHeader:($agent.showName||$agent.name||null)};
			let role="assistant";
			let content="No tool selected, cannot execute task.";
			session.addChatText(role,content,opts);
			return {result:result};
		}
		
		// 显示调用工具的信息
		let opts={txtHeader:($agent.showName||$agent.name||null)};
		let role="assistant";
		let content=`### Calling tool: \n- Tool: ${context.selectedTool.getNameText($ln)} \n- Task: ${context.userPrompt || input}`;
		opts.icon="/~/-tabos/shared/assets/gas_e.svg";
		session.addChatText(role,content,opts);
		
		let tools=context.aaTools;
		let tool=context.selectedTool;
		let prompt=context.userPrompt || input;
		let toolResult;
		
		try {
			// 调用选中的工具
			session.debugLog({type:"CallTool",tool:tool.filePath,prompt:prompt});
			toolResult = await session.pipeChat(tool.filePath, prompt, false);
			session.debugLog({type:"ToolResult",tool:tool.filePath,result:toolResult});
			result = toolResult;
			
			// 显示结果
			let resultOpts={txtHeader:tool.getNameText($ln) + " result:"};
			resultOpts.icon="/~/-tabos/shared/assets/arrowleft.svg";
			session.addChatText("assistant", result, resultOpts);
			
		} catch(error) {
			session.debugLog({type:"ToolError",tool:tool.filePath,error:error});
			result = `Tool execution error: ${error}`;
			session.addChatText("assistant", result);
		}

		/*}#1J17HB85B0Code*/
		return {result:result};
	};
	callSelectedTools.jaxId="1J17HB85B0"
	callSelectedTools.url="callSelectedTools@"+agentURL
	
	agent=$agent={
		isAIAgent:true,
		session:session,
		name:"gernalist",
		url:agentURL,
		autoStart:true,
		jaxId:"1J10663TE0",
		context:context,
		livingSeg:null,
		execChat:async function(input){
			let result;
			parseAgentArgs(input);
			/*#{1J10663TE0PreEntry*/
			/*}#1J10663TE0PreEntry*/
			result={seg:Start,"input":input};
			/*#{1J10663TE0PostEntry*/
			/*}#1J10663TE0PostEntry*/
			return result;
		},
		/*#{1J10663TE0MoreAgentAttrs*/
		/*}#1J10663TE0MoreAgentAttrs*/
	};
	/*#{1J10663TE0PostAgent*/
	/*}#1J10663TE0PostAgent*/
	return agent;
};
/*#{1J10663TE0ExCodes*/
/*}#1J10663TE0ExCodes*/

//#CodyExport>>>
export const ChatAPI=[{
	def:{
		name: "gernalist",
		description: "This is an AI agent.",
		parameters:{
			type: "object",
			properties:{
			}
		}
	},
	agent: gernalist
}];
//#CodyExport<<<
/*#{1J10663TE0PostDoc*/
/*}#1J10663TE0PostDoc*/


export default gernalist;
export{gernalist};