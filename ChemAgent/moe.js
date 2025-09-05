//Auto genterated by Cody
import {$P,VFACT,callAfter,sleep} from "/@vfact";
import pathLib from "/@path";
import inherits from "/@inherits";
import Base64 from "/@tabos/utils/base64.js";
import {trimJSON} from "/@aichat/utils.js";
/*#{1J18RKO1H0MoreImports*/
import {AATools,AAToolSet} from "/@tabos/AATools.js";
/*}#1J18RKO1H0MoreImports*/
const agentURL=(new URL(import.meta.url)).pathname;
const baseURL=pathLib.dirname(agentURL);
const basePath=baseURL.startsWith("file://")?decodeURI(baseURL):baseURL;
const $ln=VFACT.lanCode||"EN";
/*#{1J18RKO1H0StartDoc*/
/*}#1J18RKO1H0StartDoc*/
//----------------------------------------------------------------------------
let moe=async function(session){
	let execInput;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let Start,UserInput,Router,LoadTools,ShowArg;
	/*#{1J18RKO1H0LocalVals*/
	/*}#1J18RKO1H0LocalVals*/
	
	function parseAgentArgs(input){
		execInput=input;
		/*#{1J18RKO1H0ParseArgs*/
		/*}#1J18RKO1H0ParseArgs*/
	}
	
	/*#{1J18RKO1H0PreContext*/
	/*}#1J18RKO1H0PreContext*/
	context={};
	context=VFACT.flexState(context);
	/*#{1J18RKO1H0PostContext*/
	/*}#1J18RKO1H0PostContext*/
	let $agent,agent,segs={};
	segs["Start"]=Start=async function(input){//:1J18RMGKL0
		let result=input;
		let opts={txtHeader:($agent.showName||$agent.name||null)};
		let role="assistant";
		let content="Welcome to use the MoE Mode! ";
		/*#{1J18RMGKL0PreCodes*/
		/*}#1J18RMGKL0PreCodes*/
		session.addChatText(role,content,opts);
		/*#{1J18RMGKL0PostCodes*/
		/*}#1J18RMGKL0PostCodes*/
		return {seg:UserInput,result:(result),preSeg:"1J18RMGKL0",outlet:"1J18S5L4U0"};
	};
	Start.jaxId="1J18RMGKL0"
	Start.url="Start@"+agentURL
	
	segs["UserInput"]=UserInput=async function(input){//:1J18ROHBS0
		let tip=("Please input your task");
		let tipRole=("assistant");
		let placeholder=("");
		let allowFile=(false)||false;
		let askUpward=(false);
		let text=("");
		let result="";
		/*#{1J18ROHBS0PreCodes*/
		/*}#1J18ROHBS0PreCodes*/
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
		/*#{1J18ROHBS0PostCodes*/
		/*}#1J18ROHBS0PostCodes*/
		return {seg:Router,result:(result),preSeg:"1J18ROHBS0",outlet:"1J18S5L4U1"};
	};
	UserInput.jaxId="1J18ROHBS0"
	UserInput.url="UserInput@"+agentURL
	
	segs["Router"]=Router=async function(input){//:1J18S0U8M0
		let prompt;
		let result=null;
		/*#{1J18S0U8M0Input*/
		/*}#1J18S0U8M0Input*/
		
		let opts={
			platform:"OpenAI",
			mode:"gpt-3.5-turbo",
			maxToken:2000,
			temperature:0,
			topP:1,
			fqcP:0,
			prcP:0,
			secret:false,
			responseFormat:"json_object"
		};
		let chatMem=Router.messages
		let seed="";
		if(seed!==undefined){opts.seed=seed;}
		let messages=[
			{role:"system",content:`You are an expert in chemistry and material science. Your task is to classify a user's request into one of the following categories:
- "Molecular Property Prediction"
- "Reaction Prediction"
- "Text-Based Molecule Design"
- "Molecule Captioning"

Please respond with a JSON object containing the category. The JSON object should have a single key "category".
If the task does not fall into any of these categories, the value of "category" should be "Other".

For example:
User request: "Predict the boiling point of ethanol."
Your response:
{
  "category": "Molecular Property Prediction"
}`},
		];
		/*#{1J18S0U8M0PrePrompt*/
		/*}#1J18S0U8M0PrePrompt*/
		prompt=input;
		if(prompt!==null){
			if(typeof(prompt)!=="string"){
				prompt=JSON.stringify(prompt,null,"	");
			}
			let msg={role:"user",content:prompt};
			/*#{1J18S0U8M0FilterMessage*/
			/*}#1J18S0U8M0FilterMessage*/
			messages.push(msg);
		}
		/*#{1J18S0U8M0PreCall*/
		/*}#1J18S0U8M0PreCall*/
		result=(result===null)?(await session.callSegLLM("Router@"+agentURL,opts,messages,true)):result;
		/*#{1J18S0U8M0PostCall*/
		let classification = result;
		
		if (!classification.category || classification.category === "Other") {
			session.addChatText("assistant", "任务无法完成");
			return {result: "Task cannot be completed"};
		}
		
		result = {
			task: prompt,
			category: classification.category
		};
		/*}#1J18S0U8M0PostCall*/
		return {seg:LoadTools,result:(result),preSeg:"1J18S0U8M0",outlet:"1J18S5L4V0"};
	};
	Router.jaxId="1J18S0U8M0"
	Router.url="Router@"+agentURL
	
	segs["LoadTools"]=LoadTools=async function(input){//:1J18S4EP10
		let result=input
		/*#{1J18S4EP10Code*/
		const aaTools = new AATools();
		await aaTools.load();
		const tools = aaTools.getTools();
		
		let toolInfo = [];
		if (tools && tools.length > 0) {
			toolInfo = tools.map(tool => ({
				name: tool.getNameText() || 'Untitled Tool',
				description: tool.description || ''
			}));
		}
		
		result = {
			...input,
			available_tools: toolInfo
		};
		
		/*}#1J18S4EP10Code*/
		return {seg:ShowArg,result:(result),preSeg:"1J18S4EP10",outlet:"1J18S5L4V1"};
	};
	LoadTools.jaxId="1J18S4EP10"
	LoadTools.url="LoadTools@"+agentURL
	
	segs["ShowArg"]=ShowArg=async function(input){//:1J18S585C0
		let result=input;
		let opts={txtHeader:($agent.showName||$agent.name||null)};
		let role="assistant";
		let content=`### Arguments\n\`\`\`json\n${JSON.stringify(input, null, 2)}\n\`\`\``;
		session.addChatText(role,content,opts);
		return {result:result};
	};
	ShowArg.jaxId="1J18S585C0"
	ShowArg.url="ShowArg@"+agentURL
	
	agent=$agent={
		isAIAgent:true,
		session:session,
		name:"moe",
		url:agentURL,
		autoStart:true,
		jaxId:"1J18RKO1H0",
		context:context,
		livingSeg:null,
		execChat:async function(input){
			let result;
			parseAgentArgs(input);
			/*#{1J18RKO1H0PreEntry*/
			/*}#1J18RKO1H0PreEntry*/
			result={seg:Start,"input":input};
			/*#{1J18RKO1H0PostEntry*/
			/*}#1J18RKO1H0PostEntry*/
			return result;
		},
		/*#{1J18RKO1H0MoreAgentAttrs*/
		/*}#1J18RKO1H0MoreAgentAttrs*/
	};
	/*#{1J18RKO1H0PostAgent*/
	/*}#1J18RKO1H0PostAgent*/
	return agent;
};
/*#{1J18RKO1H0ExCodes*/
/*}#1J18RKO1H0ExCodes*/

//#CodyExport>>>
//#CodyExport<<<
/*#{1J18RKO1H0PostDoc*/
/*}#1J18RKO1H0PostDoc*/


export default moe;
export{moe};