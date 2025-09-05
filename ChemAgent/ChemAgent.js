//Auto genterated by Cody
import {$P,VFACT,callAfter,sleep} from "/@vfact";
import pathLib from "/@path";
import inherits from "/@inherits";
import Base64 from "/@tabos/utils/base64.js";
import {trimJSON} from "/@aichat/utils.js";
/*#{1J1060BQH0MoreImports*/
/*}#1J1060BQH0MoreImports*/
const agentURL=(new URL(import.meta.url)).pathname;
const baseURL=pathLib.dirname(agentURL);
const basePath=baseURL.startsWith("file://")?decodeURI(baseURL):baseURL;
const $ln=VFACT.lanCode||"EN";
/*#{1J1060BQH0StartDoc*/
/*}#1J1060BQH0StartDoc*/
//----------------------------------------------------------------------------
let ChemAgent=async function(session){
	let execInput;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let Start,chooseMode,callMode2,callMode1;
	/*#{1J1060BQH0LocalVals*/
	/*}#1J1060BQH0LocalVals*/
	
	function parseAgentArgs(input){
		execInput=input;
		/*#{1J1060BQH0ParseArgs*/
		/*}#1J1060BQH0ParseArgs*/
	}
	
	/*#{1J1060BQH0PreContext*/
	/*}#1J1060BQH0PreContext*/
	context={};
	context=VFACT.flexState(context);
	/*#{1J1060BQH0PostContext*/
	/*}#1J1060BQH0PostContext*/
	let $agent,agent,segs={};
	segs["Start"]=Start=async function(input){//:1J1069CUK0
		let result=input;
		let opts={txtHeader:($agent.showName||$agent.name||null)};
		let role="assistant";
		let content="Welcome to use our ChemAgent, there are 2 modes you can choose:\n1. Speed Mode: directly use the deployed tools \n2. MoE Mode: achieve the highest performance on a specific task";
		session.addChatText(role,content,opts);
		return {seg:chooseMode,result:(result),preSeg:"1J1069CUK0",outlet:"1J106CA810"};
	};
	Start.jaxId="1J1069CUK0"
	Start.url="Start@"+agentURL
	
	segs["chooseMode"]=chooseMode=async function(input){//:1J106KDMJ0
		let prompt=("Please confirm")||input;
		let silent=false;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let button1=("Speed Mode")||"OK";
		let button2=("MoE Mode")||"Cancel";
		let button3=("")||"";
		let result="";
		let value=0;
		if(silent){
			result="";
			return {seg:callMode1,result:(result),preSeg:"1J106KDMJ0",outlet:"1J106KDM00"};
		}
		[result,value]=await session.askUserRaw({type:"confirm",prompt:prompt,button1:button1,button2:button2,button3:button3,countdown:countdown,withChat:undefined,placeholder:placeholder});
		if(value===1){
			result=("")||result;
			return {seg:callMode1,result:(result),preSeg:"1J106KDMJ0",outlet:"1J106KDM00"};
		}
		if(value===2){
			result=("")||result;
			return {result:result};
		}
		result=("")||result;
		return {seg:callMode2,result:(result),preSeg:"1J106KDMJ0",outlet:"1J106KDM01"};
	
	};
	chooseMode.jaxId="1J106KDMJ0"
	chooseMode.url="chooseMode@"+agentURL
	
	segs["callMode2"]=callMode2=async function(input){//:1J106LEU00
		let result;
		let arg=input;
		let agentNode=("")||null;
		let sourcePath=pathLib.joinTabOSURL(basePath,"./agent.js");
		let opts={secrect:false,fromAgent:$agent,askUpwardSeg:null};
		result= await session.callAgent(agentNode,sourcePath,arg,opts);
		return {result:result};
	};
	callMode2.jaxId="1J106LEU00"
	callMode2.url="callMode2@"+agentURL
	
	segs["callMode1"]=callMode1=async function(input){//:1J106PDCF0
		let result;
		let arg=input;
		let agentNode=(undefined)||null;
		let sourcePath=pathLib.joinTabOSURL(basePath,"./speed.js");
		let opts={secrect:false,fromAgent:$agent,askUpwardSeg:null};
		result= await session.callAgent(agentNode,sourcePath,arg,opts);
		return {result:result};
	};
	callMode1.jaxId="1J106PDCF0"
	callMode1.url="callMode1@"+agentURL
	
	agent=$agent={
		isAIAgent:true,
		session:session,
		name:"ChemAgent",
		url:agentURL,
		autoStart:true,
		jaxId:"1J1060BQH0",
		context:context,
		livingSeg:null,
		execChat:async function(input){
			let result;
			parseAgentArgs(input);
			/*#{1J1060BQH0PreEntry*/
			/*}#1J1060BQH0PreEntry*/
			result={seg:Start,"input":input};
			/*#{1J1060BQH0PostEntry*/
			/*}#1J1060BQH0PostEntry*/
			return result;
		},
		/*#{1J1060BQH0MoreAgentAttrs*/
		/*}#1J1060BQH0MoreAgentAttrs*/
	};
	/*#{1J1060BQH0PostAgent*/
	/*}#1J1060BQH0PostAgent*/
	return agent;
};
/*#{1J1060BQH0ExCodes*/
/*}#1J1060BQH0ExCodes*/

//#CodyExport>>>
//#CodyExport<<<
/*#{1J1060BQH0PostDoc*/
/*}#1J1060BQH0PostDoc*/


export default ChemAgent;
export{ChemAgent};