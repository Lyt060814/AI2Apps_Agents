//Auto genterated by Cody
import pathLib from "path";
import Base64 from "../../agenthub/base64.mjs";
import {trimJSON} from "../../agenthub/ChatSession.mjs";
import {URL} from "url";
import {WebRpa,sleep} from "../../rpa/WebRpa.mjs";
/*#{1HDBOSUN90MoreImports*/
/*}#1HDBOSUN90MoreImports*/
const agentURL=(new URL(import.meta.url)).pathname;
const basePath=pathLib.dirname(agentURL);
const VFACT=null;
const argsTemplate={
	properties:{
		"task":{
			"name":"task","type":"string",
			"required":true,
			"defaultValue":"",
			"desc":"用户提到的任务",
		},
		"startURL":{
			"name":"startURL","type":"string",
			"defaultValue":"https://www.amazon.com/",
			"desc":"初始时刻要跳转过去的URL，该参数非必须",
		}
	},
	/*#{1HDBOSUN90ArgsView*/
	/*}#1HDBOSUN90ArgsView*/
};

/*#{1HDBOSUN90StartDoc*/
/*}#1HDBOSUN90StartDoc*/
//----------------------------------------------------------------------------
let agent=async function(session){
	let task,startURL;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let Start,OpenBrowser,OpenPage,Notify,DetectInteractiveElement,showNumber,selectElement,showReply,checkState,NoticeFinish,NoticeAbort,onAction,Input,Click,PressKey,Goto,GoBack,saveStep,showLen,pressEnterBranch,pressEnter,ReadAxtree,AskInfo,UserConfirm,ExitNotice,ActionException,ErrorNotice,DetectPageInfo,showNewPages,SwitchPage,pageBringToFront,PrivacyReplacement,SetSecret,FixArgs;
	let curStepVO=undefined;
	let history=undefined;
	let Axtree="";
	let ExtraInfo="";
	let ElementList=[
	];
	let PageInfo="";
	let ErrorMsg="";
	let UserSecretVariable=null;
	
	/*#{1HDBOSUN90LocalVals*/
	
	/*}#1HDBOSUN90LocalVals*/
	
	function parseAgentArgs(input){
		if(typeof(input)=='object'){
			task=input.task;
			startURL=input.startURL;
		}else{
			task=undefined;
			startURL=undefined;
		}
		/*#{1HDBOSUN90ParseArgs*/
		/*}#1HDBOSUN90ParseArgs*/
	}
	
	/*#{1HDBOSUN90PreContext*/
	/*}#1HDBOSUN90PreContext*/
	context={};
	/*#{1HDBOSUN90PostContext*/
	
	
	
	
	class PageManager{
		constructor(){
			this.pages = new Map(); // Map<number, page>
			this.pageToId = new WeakMap(); //
			this.nextId = 1; //自增 Id 从 1 开始
		}
		
		addPage(page){
			const id = this.nextId++;
			this.pages.set(id, page);
			this.pageToId.set(page, id);
			return id;	
		}
	
		getId(page){
			return this.pageToId.get(page);
		}
		
		getPage(id){
			return this.pages.get(id);
		}
		
		//检查页面是否存在，由于pageToId是 WeakMap, 如果页面不存在会自动从wearkmap中删去
		hasPage(page){
			return this.pageToId.has(page);
		}
		
		// 移除页面
		removePage(pageOrId) {
			const id = typeof pageOrId === 'number' ? pageOrId : this.getId(pageOrId);
			if (id && this.pages.has(id)) {
				const page = this.pages.get(id);
				this.pages.delete(id);
				this.pageToId.delete(page);
				return true;
			}
			return false;
		}
		
	}
	context.pageManager = new PageManager();
	
	/*}#1HDBOSUN90PostContext*/
	let $agent,agent,segs={};
	segs["Start"]=Start=async function(input){//:1IH28H5RP0
		let result=true;
		let aiQuery=true;
		try{
			context.webRpa=new WebRpa(session);
			aiQuery && (await context.webRpa.setupAIQuery(session,context,basePath,"1IH28H5RP0"));
		}catch(err){
			throw err;
		}
		return {seg:OpenBrowser,result:(result),preSeg:"1IH28H5RP0",outlet:"1IH28I25B0"};
	};
	Start.jaxId="1IH28H5RP0"
	Start.url="Start@"+agentURL
	
	segs["OpenBrowser"]=OpenBrowser=async function(input){//:1IH28HPRB0
		let result=true;
		let browser=null;
		let headless=false;
		let devtools=false;
		let dataDir=true;
		let alias="RPAWebAgent";
		let options={headless,devtools,autoDataDir:dataDir};
		/*#{1IH28HPRB0PreCodes*/
		options.args = ["--window-position=1280,0"];
		/*}#1IH28HPRB0PreCodes*/
		context.rpaBrowser=browser=await context.webRpa.openBrowser(alias,options);
		context.rpaHostPage=browser.hostPage;
		/*#{1IH28HPRB0PostCodes*/
		/*}#1IH28HPRB0PostCodes*/
		return {seg:OpenPage,result:(result),preSeg:"1IH28HPRB0",outlet:"1IH28I25B1"};
	};
	OpenBrowser.jaxId="1IH28HPRB0"
	OpenBrowser.url="OpenBrowser@"+agentURL
	
	segs["OpenPage"]=OpenPage=async function(input){//:1IH28P38Q0
		let pageVal="aaPage";
		let $url=startURL.length>0?startURL:"https://www.linkedin.com/";
		let $waitBefore=0;
		let $waitAfter=1000;
		let $width=1200;
		let $height=900;
		let $userAgent="";
		let $timeout=(undefined)||0;
		let page=null;
		let $openOpts={timeout:$timeout};
		$waitBefore && (await sleep($waitBefore));
		/*#{1IH28P38Q0PreCodes*/
		/*}#1IH28P38Q0PreCodes*/
		context[pageVal]=page=await context.rpaBrowser.newPage();
		($width && $height) && (await page.setViewport({width:$width,height:$height}));
		$userAgent && (await page.setUserAgent($userAgent));
		await page.goto($url,$openOpts);
		$waitAfter && (await sleep($waitAfter));
		/*#{1IH28P38Q0PostCodes*/
		
		context.pageManager.addPage(page);
		
		// 这里关掉第一个默认的空白页，避免被检测到 new page
		const pages = await context.rpaBrowser.pages();
		await pages[0].close();
		
		/*}#1IH28P38Q0PostCodes*/
		return {seg:SetSecret,result:(page),preSeg:"1IH28P38Q0",outlet:"1IH28P9TV0"};
	};
	OpenPage.jaxId="1IH28P38Q0"
	OpenPage.url="OpenPage@"+agentURL
	
	segs["Notify"]=Notify=async function(input){//:1IH28Q6DB0
		let result=input;
		let opts={txtHeader:($agent.showName||$agent.name||null)};
		let role="assistant";
		let content=task;
		session.addChatText(role,content,opts);
		return {seg:pageBringToFront,result:(result),preSeg:"1IH28Q6DB0",outlet:"1IH28R1BB0"};
	};
	Notify.jaxId="1IH28Q6DB0"
	Notify.url="Notify@"+agentURL
	
	segs["DetectInteractiveElement"]=DetectInteractiveElement=async function(input){//:1IOUB21C90
		let result=JSON.stringify(input)
		/*#{1IOUB21C90Code*/
		
		
		// function to assign aaeid into web elements
		async function assign_aaeid(){
			const aaeid_attr_name = "aaeid";
		
			
			function push_aaeid_to_attribute(aaeid, elem, attr){
				let original_content = "";
				if (elem.hasAttribute(attr)){
					original_content = elem.getAttribute(attr);
				}
				let new_content = `aaeid_${aaeid} ${original_content}`;
				elem.setAttribute(attr, new_content);
		
			}			
			
			
			let aae_first_visit = false;
			if( !("aae_elem_counter" in window) ){
				aae_first_visit = true;
				window.aae_elem_counter = 0;
			}
			
			let all_aaeids = new Set();
			
			// get all DOM elements in the current frame (does not include elements in shadowDOMs)
			let elements = Array.from(document.querySelectorAll('*'));
			let i = 0;
			while( i < elements.length){
				const elem = elements[i];
				// add shadowDOM elements in the elemetns array
				if (elem.shadowRoot !== null) {
					elements = new Array(
						...Array.prototype.slice.call(elements,0,i+1),
						...Array.from(elem.shadowRoot.querySelectorAll("*")),
						...Array.prototype.slice.call(elements,i+1)
					);
				}
				i++;
				
				// add the element global id (aaeid) to a custom HTML attribute
				
				let elem_global_aaeid = null;
				if (elem.hasAttribute(aaeid_attr_name)){
					if (aae_first_visit){
						throw new Error(`Attribute ${aaeid_attr_name} already used in element ${elem.outerHTML}`);
					}
					elem_global_aaeid = elem.getAttribute(aaeid_attr_name);
					// if the aaeid has already been encountered, then this is a duplicate and a new aeeid should be set
					if(all_aaeids.has(elem_global_aaeid)){
						console.log(`AAE: duplicate aaeid ${elem_global_aaeid} detected, generating a new one`);
						elem_global_aaeid = null;
					}
				}
				
				if (elem_global_aaeid === null){
					let elem_local_id = null;
					elem_local_id = `${window.aae_elem_counter++}`;
					// TODO: here should be some logic for iFrames
					
					elem_global_aaeid = `${elem_local_id}`;
					elem.setAttribute(aaeid_attr_name, `${elem_global_aaeid}`);
					//Hack: store aaeid inside ARIA attributes (so it will be available both DOM and AXTree)
					push_aaeid_to_attribute(elem_global_aaeid, elem, "aria-roledescription");
					push_aaeid_to_attribute(elem_global_aaeid, elem, "aria-description");					
					
				}
				
				all_aaeids.add(elem_global_aaeid);
				
				
		
				
		
				
				
			} // End of while
			
			
		
		}
		
		// function to detect interactive elements in page
		async function detectButtons() {
				var bodyRect = document.body.getBoundingClientRect();
				let labels = [];
		
				var items = Array.from(
					document.querySelectorAll('*')
				).map(function(element) {
					var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
					var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
		
					var rects = [...element.getClientRects()].filter(
						bb => {
							var center_x = bb.left + bb.width / 2;
							var center_y = bb.top + bb.height / 2;
							var elAtCenter = document.elementFromPoint(center_x, center_y);
		
							return elAtCenter === element || element.contains(elAtCenter) 
						}
					).map(bb => {
									const rect = {
										left: Math.max(0, bb.left),
										top: Math.max(0, bb.top),
										right: Math.min(vw, bb.right),
										bottom: Math.min(vh, bb.bottom)
									};
									return {
										...rect,
										width: rect.right - rect.left,
										height: rect.bottom - rect.top
									}
								}
					);
		
					var area = rects.reduce((acc, rect) => acc + rect.width * rect.height, 0);
		
					return {
					element: element,
					include: 
						(element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.tagName === "SELECT") ||
						(element.tagName === "BUTTON" || element.tagName === "A" || (element.onclick != null) || window.getComputedStyle(element).cursor == "pointer") ||
						(element.tagName === "IFRAME" || element.tagName === "VIDEO" || element.tagName === "LI" || element.tagName === "TD" || element.tagName === "OPTION")
					,
					area,
					rects,
					text: element.textContent.trim().replace(/\s{2,}/g, ' ')
					};
				}).filter(item =>
					item.include && (item.area >= 20)
				);
		
				// Only keep inner clickable items
				// first delete button inner clickable items
				const buttons = Array.from(document.querySelectorAll('button, a, input[type="button"], div[role="button"]'));
		
				//items = items.filter(x => !buttons.some(y => y.contains(x.element) && !(x.element === y) ));
				items = items.filter(x => !buttons.some(y => items.some(z => z.element === y) && y.contains(x.element) && !(x.element === y) ));
				items = items.filter(x => 
					!(x.element.parentNode && 
					x.element.parentNode.tagName === 'SPAN' && 
					x.element.parentNode.children.length === 1 && 
					x.element.parentNode.getAttribute('role') &&
					items.some(y => y.element === x.element.parentNode)));
		
				items = items.filter(x => !items.some(y => x.element.contains(y.element) && !(x == y)))
			
				// 生成description_list， 每一个元素都有自己的 description字符串，格式为 "[aaeid] <tagName> innerText role= aria-label"
				const description_list = items.map((item,idx) => {
					let element = item.element;
					let aaeid = element.getAttribute("aaeid");
					let description =`[${aaeid}] <${element.tagName}>`;
					if (element.innerText){
						description += " " + element.innerText;
					}
					const role = element.getAttribute("role");
					const aria_label = element.getAttribute("aria-label");
					if (role) {description += " role=" + role;}
					if (aria_label){description += " " + aria_label;}
					return description;
				});
				
				return description_list;
			}
		
		const pageVal = "aaPage";
		let page = context[pageVal];
		
		try{
		// assign aaeid to page then mark buttons
		await page.evaluate(assign_aaeid);
		let button_list = await page.evaluate(detectButtons);
		result = button_list;
		// save buttons in ElementList
		ElementList = button_list;
		}
		
		catch(error){
		console.error('Error occurred while detecting buttons:', error);
		// 你可以在这里处理错误，比如设置默认值或重试
		ElementList = []; // 设置默认值
		}
		/*}#1IOUB21C90Code*/
		return {seg:ReadAxtree,result:(result),preSeg:"1IOUB21C90",outlet:"1IOUB2AHP0"};
	};
	DetectInteractiveElement.jaxId="1IOUB21C90"
	DetectInteractiveElement.url="DetectInteractiveElement@"+agentURL
	
	segs["showNumber"]=showNumber=async function(input){//:1IOUTIVC60
		let result=input;
		let opts={txtHeader:($agent.showName||$agent.name||null)};
		let role="assistant";
		let content=`detected ${input.length} interactive elements`;
		/*#{1IOUTIVC60PreCodes*/
		/*}#1IOUTIVC60PreCodes*/
		session.addChatText(role,content,opts);
		/*#{1IOUTIVC60PostCodes*/
		/*}#1IOUTIVC60PostCodes*/
		return {result:result};
	};
	showNumber.jaxId="1IOUTIVC60"
	showNumber.url="showNumber@"+agentURL
	
	segs["selectElement"]=selectElement=async function(input){//:1IPBDPJGE0
		let prompt;
		let result=null;
		/*#{1IPBDPJGE0Input*/
		/*}#1IPBDPJGE0Input*/
		
		let opts={
			platform:"OpenAI",
			mode:"gpt-4.1-mini",
			maxToken:2000,
			temperature:0,
			topP:1,
			fqcP:0,
			prcP:0,
			secret:false,
			responseFormat:"json_object"
		};
		let chatMem=selectElement.messages
		let seed="";
		if(seed!==undefined){opts.seed=seed;}
		let messages=[
			{role:"system",content:`
### 角色
你是一个强大的网页分析，动作规划智能体。
- 你根据任务描述，以及当前任务的执行状态，通过网页截图以及网页的HTML代码分析并推导为了完成任务，下一步要进行的操作。


### 用户提供的隐私变量
- 隐私变量是指账号，密码，ID等用户隐私信息，下面将会以类似于环境变量的形式给出，例如 $UserName。当遇到了需要填写隐私信息的时候，可以直接在input操作中使用隐私变量的变量名，后期的执行程序会自动填写真实的变量值。
- 下面将列出隐私变量的变量名和对应的描述
${UserSecretVariable?Object.entries(UserSecretVariable).map(([key, config]) => `${key}: ${config.description}`).join('\n'):"暂无\n"}


### 用户提供的额外信息
如果遇到了某些情况要需要填写信息，同时在隐私变量里面和任务描述里面没有提供的话，可以选择AskUser来向用户询问对应的信息
${ExtraInfo}

---
### 当前要执行的任务：
${task}

---
###之前已经执行过的步骤
- 如果你发现有最近的几步几乎一直在重复的话，可能是任务没有完成，直接放弃任务
${history?history.map((item, idx)=>`Step ${idx}\n${JSON.stringify(item)}`).join('\n'):"No action yet"};

---
### 观察空间
- 你的观察空间包含：当前浏览器打开的所有页面的URL和Title,当前激活的页面的URL和accessibility tree。你根据任务目标和历史的执行状态生成下一步要进行的操作。
- 当前网页URL: ${context['aaPage'].url()}
- accessibility tree说明：每个元素都有一个aaeid，在axtree中放在元素前面用 [id] 的格式
    
- 可交互元素列表：列表中包含了当前页面用户可以见到的范围内的可交互元素。例如<button>, <input>, <a> 这样的元素, 每个元素前面用[id] 的格式来标出id
- 可交互元素列表如下：
{ElementList.join("\n")}

- 网页的accessibility Tree如下
${Axtree}

### 浏览器的页面信息
- 有的时候点击一个链接会触发一个新页面，你需要switch page到新页面才能看到对应的内容
${PageInfo}

${ErrorMsg.length>0? "###上一步action的错误信息如下\n"+ErrorMsg:""}


### 提示
记得做任务之前检查当前页面所在的URL，如果URL不对，用GOTO action 来前往正确的URL

- 请用JSON格式进行回复，例如：
\`\`\`
{
        "state":"Execute",
           "content":"Click the search button."
        "execute":{
                   "action":"Click",
            "queryHint":"Search button",
            "targetAAEId":"123",
            "waitEvent":null
    }
}
\`\`\`

---
### 回复JSON属性

- "state" {string}: 任务执行状态。
    - 如果继续执行任务: "Execute"，在属性"execute"中设定下一个步骤的具体执行内容。
    - 如果任务已完成: "Finish"，在"content"属性里总结任务结果
    - 如果任务被放弃执行: "Abort"，在"content"属性里说明放弃的原因
    - 如果遇到需要用户操作的步骤："UserHelp"，在"content"属性里面说明具体什么步骤需要用户来操作，常见情况例如用户扫码登陆，或者通过人机验证等等
    - 如果需要用户提供信息: "AskUser"，在"content" 属性里面说明需要用户提供什么类型的信息

- "content" {string}: 当前步骤/状态/结果描述。 
    - 如果是前步骤描述或执行结果。如果是步骤描述，说明步骤的目的以及执行该步骤的做法。
    - 如果是结束/失败/放弃，请详细说明执行结果或者失败/放弃的原因。

- "execute" {object}: 如果要执行一个操作步骤，这个对象是步骤的详细内容。下面是"execute"对象属性说明：
    - "action" {string}: 步骤动作类型，可以选择的动作类型有：
        - "Click": 点击一个网页元素
        - "Input": 输入文本
        - "PressKey": 按键
        - "Goto": 前往一个网址
        - "Back": 回退浏览
        - "SwitchPage": 切换标签页

    - "queryHint" {string}: 当要对具体某个元素操作（点击，输入等）时，对元素的说明，例如: "搜索输入框"，"注册新帐户按钮"等。
    - "targetAAEId" {string}: 当要对具体某个元素操作（点击，输入等）时，该目标元素的 aaeid 属性值，注意aaeid必须是数字，用来唯一确定目标元素。当action 为Click 或者Input的时候，这里必须要有值，不能填null。
    - "PageId" {string}: 当action为 SwitchPage时，这个属性表示要切换的标签页的 PageId
    - "text" {string}: 当"action"是"Input"时，这个属性是要输入的内容；当"action"为"Ask"或者"UserHelp"时，告知用户的内容；否则为null
    - "pressEnter" {bool}: 当"action"是"Input"时，这个属性表示输入完text之后，按下enter，一般用于搜索框。
    - "key" {string}: 当"action"是"PressKey"时，这个属性是要按的键，否则为null
    - "url" {string}: 当"action"是"Goto"时，这个属性是要前往的网址，否则为null
`},
		];
		/*#{1IPBDPJGE0PrePrompt*/
		input = null;
		/*}#1IPBDPJGE0PrePrompt*/
		prompt=input;
		if(prompt!==null){
			if(typeof(prompt)!=="string"){
				prompt=JSON.stringify(prompt,null,"	");
			}
			let msg={role:"user",content:prompt};
			/*#{1IPBDPJGE0FilterMessage*/
			/*}#1IPBDPJGE0FilterMessage*/
			messages.push(msg);
		}
		/*#{1IPBDPJGE0PreCall*/
		console.log(JSON.stringify(messages));
		/*}#1IPBDPJGE0PreCall*/
		result=(result===null)?(await session.callSegLLM("selectElement@"+agentURL,opts,messages,true)):result;
		result=trimJSON(result);
		/*#{1IPBDPJGE0PostCall*/
		/*}#1IPBDPJGE0PostCall*/
		return {seg:showReply,result:(result),preSeg:"1IPBDPJGE0",outlet:"1IPBDQHK30"};
	};
	selectElement.jaxId="1IPBDPJGE0"
	selectElement.url="selectElement@"+agentURL
	
	segs["showReply"]=showReply=async function(input){//:1IPBL2QQC0
		let result=input;
		let opts={txtHeader:($agent.showName||$agent.name||null)};
		let role="assistant";
		let content=input.content;
		session.addChatText(role,content,opts);
		return {seg:checkState,result:(result),preSeg:"1IPBL2QQC0",outlet:"1IPBL3SGM0"};
	};
	showReply.jaxId="1IPBL2QQC0"
	showReply.url="showReply@"+agentURL
	
	segs["checkState"]=checkState=async function(input){//:1IPBLBRM00
		let result=input;
		/*#{1IPBLBRM00Start*/
		
		curStepVO = input;
		/*}#1IPBLBRM00Start*/
		if(input.state === "Finish"){
			return {seg:NoticeFinish,result:(input),preSeg:"1IPBLBRM00",outlet:"1IPBMFETJ0"};
		}
		if(input.state === "Abort"){
			return {seg:NoticeAbort,result:(input),preSeg:"1IPBLBRM00",outlet:"1IPBMG4GR0"};
		}
		if(input.state === "UserHelp"){
			return {seg:UserConfirm,result:(input),preSeg:"1IPBLBRM00",outlet:"1IQKRFV6S0"};
		}
		if(input.state === "AskUser"){
			return {seg:AskInfo,result:(input),preSeg:"1IPBLBRM00",outlet:"1IQKRUN350"};
		}
		if(input.state === "Execute"){
			return {seg:ActionException,result:(input),preSeg:"1IPBLBRM00",outlet:"1IPBMHPVO0"};
		}
		/*#{1IPBLBRM00Post*/
		/*}#1IPBLBRM00Post*/
		return {result:result};
	};
	checkState.jaxId="1IPBLBRM00"
	checkState.url="checkState@"+agentURL
	
	segs["NoticeFinish"]=NoticeFinish=async function(input){//:1IPBMKG9V0
		let result=input;
		let opts={txtHeader:($agent.showName||$agent.name||null)};
		let role="assistant";
		let content="任务已经完成";
		session.addChatText(role,content,opts);
		return {result:result};
	};
	NoticeFinish.jaxId="1IPBMKG9V0"
	NoticeFinish.url="NoticeFinish@"+agentURL
	
	segs["NoticeAbort"]=NoticeAbort=async function(input){//:1IPBML8BQ0
		let result=input;
		let opts={txtHeader:($agent.showName||$agent.name||null)};
		let role="assistant";
		let content="任务放弃";
		session.addChatText(role,content,opts);
		return {result:result};
	};
	NoticeAbort.jaxId="1IPBML8BQ0"
	NoticeAbort.url="NoticeAbort@"+agentURL
	
	segs["onAction"]=onAction=async function(input){//:1IPBMUU5R0
		let result=input;
		if(curStepVO.execute.action === "Click"){
			return {seg:Click,result:(input),preSeg:"1IPBMUU5R0",outlet:"1IPBNLLHE0"};
		}
		if(curStepVO.execute.action === "Input"){
			return {seg:PrivacyReplacement,result:(input),preSeg:"1IPBMUU5R0",outlet:"1IPBMVKKK0"};
		}
		if(curStepVO.execute.action === "PressKey"){
			return {seg:PressKey,result:(input),preSeg:"1IPBMUU5R0",outlet:"1IPBMVNBC0"};
		}
		if(curStepVO.execute.action === "Goto"){
			return {seg:Goto,result:(input),preSeg:"1IPBMUU5R0",outlet:"1IPBNKH990"};
		}
		if(curStepVO.execute.action === "Back"){
			return {seg:GoBack,result:(input),preSeg:"1IPBMUU5R0",outlet:"1IPBNKJF70"};
		}
		if(curStepVO.execute.action === "SwitchPage"){
			return {seg:SwitchPage,result:(input),preSeg:"1IPBMUU5R0",outlet:"1IR1T1GL50"};
		}
		return {result:result};
	};
	onAction.jaxId="1IPBMUU5R0"
	onAction.url="onAction@"+agentURL
	
	segs["Input"]=Input=async function(input){//:1IPE22DGJ0
		let result=true;
		let pageVal="aaPage";
		let $action="Type";
		let $query=`(//*[@aaeid=${curStepVO.execute.targetAAEId}])`;
		let $queryHint="";
		let $key=input;
		let $options=undefined;
		let $waitBefore=0;
		let $waitAfter=1000;
		let page=context[pageVal];
		$waitBefore && (await sleep($waitBefore));
		/*#{1IPE22DGJ0PreCodes*/
		/*}#1IPE22DGJ0PreCodes*/
		if($query||$queryHint){
			$query=$queryHint?(await context.webRpa.confirmQuery(page,$query,$queryHint,"1IPE22DGJ0")):$query;
			if(!$query) throw Error("Missing query. Query hint: "+$queryHint);
			await page.type("::-p-xpath"+$query,$key,$options||{});
		}else{
			await page.keyboard.type($key,$options||{});
		}
		$waitAfter && (await sleep($waitAfter))
		/*#{1IPE22DGJ0PostCodes*/
		/*}#1IPE22DGJ0PostCodes*/
		return {seg:pressEnterBranch,result:(result),preSeg:"1IPE22DGJ0",outlet:"1IPE26IKL0"};
	};
	Input.jaxId="1IPE22DGJ0"
	Input.url="Input@"+agentURL
	
	segs["Click"]=Click=async function(input){//:1IPE2GODG0
		let result=true;
		let pageVal="aaPage";
		let $query=`(//*[@aaeid=${curStepVO.execute.targetAAEId}])`;
		let $queryHint="";
		let $x=0;
		let $y=0;
		let $options=undefined;
		let $waitBefore=0;
		let $waitAfter=1000;
		let page=context[pageVal];
		$waitBefore && (await sleep($waitBefore));
		/*#{1IPE2GODG0PreCodes*/
		
			//检测元素是否在视窗内
			async function isElementInViewport(page, aaeid){
				return await page.evaluate( (aaeid)=>{
					const element  = document.querySelector(`[aaeid='${aaeid}']`);
					if(!element) return false; 
					const rect = element.getBoundingClientRect();
					return (
						rect.top >= 0 &&
						rect.left >=0 &&
						rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
						rect.right <=  (window.innerWidth  || document.documentElement.clientWidth)
					); 
		
				});
			
			}
		
			async function scrollIntoView(page, aaeid){
				await page.evaluate((aaeid)=>{
					const element = document.querySelector(`[aaeid='${aaeid}']`);
					if(element){
						element.scrollIntoView({
							behavior: 'auto',
							block: 'center',
							inline: 'center'
						});
					}
				});
			}
			
			//不在视窗内的话就滚动到视窗内
		const isInViewport = await isElementInViewport(page,curStepVO.execute.targetAAEId);
		if(!isInViewport){
			await scrollIntoView(page,curStepVO.execute.targetAAEId);
			await sleep(500); // 等待0.5s 确保scroll完成
		}
		
		/*}#1IPE2GODG0PreCodes*/
		if($query||$queryHint){
			$query=$queryHint?(await context.webRpa.confirmQuery(page,$query,$queryHint,"1IPE2GODG0")):$query;
			if(!$query) throw Error("Missing query. Query hint: "+$queryHint);
			await page.click("::-p-xpath"+$query,{...$options,offset:((!!$x) || (!!$y))?{x:$x||0,y:$y||0}:undefined});
		}else{
			await page.mouse.click($x,$y,$options||{});
		}
		$waitAfter && (await sleep($waitAfter))
		/*#{1IPE2GODG0PostCodes*/
		/*}#1IPE2GODG0PostCodes*/
		return {seg:saveStep,result:(result),preSeg:"1IPE2GODG0",outlet:"1IPE2I3D10"};
	};
	Click.jaxId="1IPE2GODG0"
	Click.url="Click@"+agentURL
	
	segs["PressKey"]=PressKey=async function(input){//:1IPE47PNL0
		let result=true;
		let pageVal="aaPage";
		let $action="KeyPress";
		let $query="";
		let $queryHint="";
		let $key=curStepVO.execute.key;
		let $options=undefined;
		let $waitBefore=0;
		let $waitAfter=1000;
		let page=context[pageVal];
		$waitBefore && (await sleep($waitBefore));
		await page.keyboard.press($key,$options||{});
		$waitAfter && (await sleep($waitAfter))
		return {seg:saveStep,result:(result),preSeg:"1IPE47PNL0",outlet:"1IPE4868C0"};
	};
	PressKey.jaxId="1IPE47PNL0"
	PressKey.url="PressKey@"+agentURL
	
	segs["Goto"]=Goto=async function(input){//:1IPE4HGAL0
		let result=true;
		let pageVal="aaPage";
		let waitBefore=0;
		let waitAfter=1000;
		let timeout=(undefined)||0;
		let url=curStepVO.execute.url;
		let page=context[pageVal];
		let opts={timeout:timeout};
		waitBefore && (await sleep(waitBefore));
		await page.goto(url,opts);
		waitAfter && (await sleep(waitAfter))
		return {seg:saveStep,result:(result),preSeg:"1IPE4HGAL0",outlet:"1IPE4MGNA0"};
	};
	Goto.jaxId="1IPE4HGAL0"
	Goto.url="Goto@"+agentURL
	
	segs["GoBack"]=GoBack=async function(input){//:1IPE61C7N0
		let result=input
		/*#{1IPE61C7N0Code*/
		let pageVal = "aaPage";
		let page = context[pageVal];
		await page.goBack();
		
		/*}#1IPE61C7N0Code*/
		return {seg:saveStep,result:(result),preSeg:"1IPE61C7N0",outlet:"1IPE61GU10"};
	};
	GoBack.jaxId="1IPE61C7N0"
	GoBack.url="GoBack@"+agentURL
	
	segs["saveStep"]=saveStep=async function(input){//:1IPE6PAAA0
		let result=input
		/*#{1IPE6PAAA0Code*/
		
		if (!history){
			history = [];
		}
		
		if (curStepVO.state !== "UserHelp") history.push(curStepVO);
		
		
		result = history; // for tracelog
		/*}#1IPE6PAAA0Code*/
		return {seg:pageBringToFront,result:(result),preSeg:"1IPE6PAAA0",outlet:"1IPE6RGQ61"};
	};
	saveStep.jaxId="1IPE6PAAA0"
	saveStep.url="saveStep@"+agentURL
	
	segs["showLen"]=showLen=async function(input){//:1IPE95JD90
		let result=input;
		let opts={txtHeader:($agent.showName||$agent.name||null)};
		let role="assistant";
		let content=`Axtree length:${Axtree.length}`;
		session.addChatText(role,content,opts);
		return {result:result};
	};
	showLen.jaxId="1IPE95JD90"
	showLen.url="showLen@"+agentURL
	
	segs["pressEnterBranch"]=pressEnterBranch=async function(input){//:1IPJAULCR0
		let result=input;
		if(curStepVO.execute.pressEnter){
			return {seg:pressEnter,result:(input),preSeg:"1IPJAULCR0",outlet:"1IPJB17UB0"};
		}
		return {seg:saveStep,result:(result),preSeg:"1IPJAULCR0",outlet:"1IPJB17UB1"};
	};
	pressEnterBranch.jaxId="1IPJAULCR0"
	pressEnterBranch.url="pressEnterBranch@"+agentURL
	
	segs["pressEnter"]=pressEnter=async function(input){//:1IPJB1NQD0
		let result=true;
		let pageVal="aaPage";
		let $action="KeyPress";
		let $query="";
		let $queryHint="";
		let $key="Enter";
		let $options=undefined;
		let $waitBefore=0;
		let $waitAfter=1000;
		let page=context[pageVal];
		$waitBefore && (await sleep($waitBefore));
		/*#{1IPJB1NQD0PreCodes*/
		/*}#1IPJB1NQD0PreCodes*/
		await page.keyboard.press($key,$options||{});
		$waitAfter && (await sleep($waitAfter))
		/*#{1IPJB1NQD0PostCodes*/
		//await page.waitForNavigation({timeout: 10000});
		/*}#1IPJB1NQD0PostCodes*/
		return {seg:saveStep,result:(result),preSeg:"1IPJB1NQD0",outlet:"1IPJB2ISH0"};
	};
	pressEnter.jaxId="1IPJB1NQD0"
	pressEnter.url="pressEnter@"+agentURL
	
	segs["ReadAxtree"]=ReadAxtree=async function(input){//:1IQHTMJ9I0
		let result=input
		/*#{1IQHTMJ9I0Code*/
		
		
		const IGNORED_AXTREE_ROLES = ["LineBreak"];
		const IGNORED_AXTREE_PROPERTIES = ["editable","readonly","level", "settable", "multiline","invalid","focusable"];
		async function flatten_axtree_to_str(
			AX_tree,
			ignored_roles = IGNORED_AXTREE_ROLES,
			ignored_properties = IGNORED_AXTREE_PROPERTIES,
			skip_generic = true,
			remove_redundant_static_text = true
		){
		/*
		Formats the accessibility tree into a string text
		*/
		
			let node_id_to_idx = {};
			AX_tree.nodes.forEach((node,idx)=>{
				node_id_to_idx[node.nodeId] = idx;
			});
		
			function dfs(node_idx, depth, parent_node_name){
				let tree_str = "";
				let node = AX_tree.nodes[node_idx]
				const indent = "\t".repeat(depth);
				let skip_node = false; 
				let filter_node = false;
		
				const node_role = node.role.value;
				let node_name = "";
				let aaeid = null;
				let node_value = null;
		
				if (node_role in ignored_roles){
					skip_node = true;
				} else if (!("name" in node)){
					skip_node = true;
				} else {
					node_name = node.name.value;
					if ("value" in node && "value" in node.value){
						node_value = node.value.value;
					}
		
					// extract node attributes
					const attributes = [];
					const properties = node.properties || [];
					for (const property of properties){
						if(!property.value || !property.value.value){
							continue;
						}
						const propName = property.name;
						const propValue = property.value.value;
						if(ignored_properties.includes(propName)){
							continue;
						}else if (typeof propValue === 'string' && propValue.startsWith("aaeid")){
							continue;
						}
						else if(["required","focused","atomic"].includes(propName)){
							if(propValue){
								attributes.push(propName);
							}
						} else {
							attributes.push(`${propName}=${JSON.stringify(propValue)}`);
						}
		
					}
		
		
					if(skip_generic && node_role === "generic" && attributes.length === 0){
						skip_node = true;
					}
		
					if (node_role === "StaticText"){
						if(remove_redundant_static_text && parent_node_name.includes(node_name) ){
							skip_node = true;
						}
					}
		
		
				}
		
				// extract aaeid in description
				if ("description" in node && node.description.value.startsWith("aaeid_")){
					aaeid = node.description.value.split(" ")[0].replace("aaeid_", "")
				}
		
				// actually print the node string
				if(!skip_node){
					let node_str = "";
					if(node_role === "generic" && node_name.length === 0){
						node_str = node_role;
					}else{
						node_str = node_role + " " + node_name.trim();
					}
		
					if(aaeid){
						node_str = `[${aaeid}] ${node_str}`;
					}
		
					if(node_value){
						node_str += ` value=${node_value}`;
					}
		
					tree_str = `${indent}${node_str}`
		
				}
		
				for( const child_node_id of node.childIds){
					if( !child_node_id in node_id_to_idx || child_node_id === node.nodeId){
						continue;
					}
					let child_depth;
					if(skip_node){
						child_depth = depth;
					} else{
						child_depth = depth + 1;
					}
					let child_str = null;
					const child_node_idx = node_id_to_idx[child_node_id];
					child_str = dfs(child_node_idx,child_depth,node_name)
					if(child_str){
						if(tree_str.length > 0){
							tree_str += "\n"
						}
						tree_str += child_str;
					}
				}
		
				return tree_str;
		
		
		
			}
		
			const tree_str = dfs(0,0,"")
			return tree_str;
		}
		
		// first fetch axtree of the current page
		const pageVal = "aaPage";
		let page = context[pageVal];
		const client = await page.createCDPSession();
		const CDP_Axtree = await client.send('Accessibility.getFullAXTree');
		Axtree = await flatten_axtree_to_str(CDP_Axtree);
		result = Axtree;
		
		/*}#1IQHTMJ9I0Code*/
		return {seg:DetectPageInfo,result:(result),preSeg:"1IQHTMJ9I0",outlet:"1IQHTMUFO0"};
	};
	ReadAxtree.jaxId="1IQHTMJ9I0"
	ReadAxtree.url="ReadAxtree@"+agentURL
	
	segs["AskInfo"]=AskInfo=async function(input){//:1IQKRI6J80
		let tip=("");
		let tipRole=("assistant");
		let placeholder=("");
		let allowFile=(false)||false;
		let askUpward=(false);
		let text=("");
		let result="";
		/*#{1IQKRI6J80PreCodes*/
		/*}#1IQKRI6J80PreCodes*/
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
		/*#{1IQKRI6J80PostCodes*/
		ExtraInfo += `\n${result}`;
		/*}#1IQKRI6J80PostCodes*/
		return {seg:saveStep,result:(result),preSeg:"1IQKRI6J80",outlet:"1IQKS5PAD0"};
	};
	AskInfo.jaxId="1IQKRI6J80"
	AskInfo.url="AskInfo@"+agentURL
	
	segs["UserConfirm"]=UserConfirm=async function(input){//:1IQKS44P80
		let prompt=("智能体需要您手动完成上述操作，完成后请按OK。如果放弃本次任务，则按Cancel")||input;
		let silent=false;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let button1=("OK")||"OK";
		let button2=("Cancel")||"Cancel";
		let button3="";
		let result="";
		let value=0;
		if(silent){
			result="";
			return {seg:saveStep,result:(result),preSeg:"1IQKS44P80",outlet:"1IQKS44OP0"};
		}
		[result,value]=await session.askUserRaw({type:"confirm",prompt:prompt,button1:button1,button2:button2,button3:button3,countdown:countdown,withChat:undefined,placeholder:placeholder});
		if(value===1){
			result=("")||result;
			return {seg:saveStep,result:(result),preSeg:"1IQKS44P80",outlet:"1IQKS44OP0"};
		}
		result=("")||result;
		return {seg:ExitNotice,result:(result),preSeg:"1IQKS44P80",outlet:"1IQKS44OP1"};
	
	};
	UserConfirm.jaxId="1IQKS44P80"
	UserConfirm.url="UserConfirm@"+agentURL
	
	segs["ExitNotice"]=ExitNotice=async function(input){//:1IQKVG7OC0
		let result=input;
		let opts={txtHeader:($agent.showName||$agent.name||null)};
		let role="assistant";
		let content="已退出";
		session.addChatText(role,content,opts);
		return {result:result};
	};
	ExitNotice.jaxId="1IQKVG7OC0"
	ExitNotice.url="ExitNotice@"+agentURL
	
	segs["ActionException"]=ActionException=async function(input){//:1IQNJ1V0O0
		let result=input;
		/*#{1IQNJ1V0O0Code*/
		false
		/*}#1IQNJ1V0O0Code*/
		return {seg:onAction,result:(result),preSeg:"1IQNJ1V0O0",outlet:"1IQNJFBK40",catchSeg:ErrorNotice,catchlet:"1IQNJFBK41"};
	};
	ActionException.jaxId="1IQNJ1V0O0"
	ActionException.url="ActionException@"+agentURL
	
	segs["ErrorNotice"]=ErrorNotice=async function(input){//:1IQNJI5L80
		let result=input;
		let opts={txtHeader:($agent.showName||$agent.name||null)};
		let role="assistant";
		let content="出错了，即将为您重试";
		/*#{1IQNJI5L80PreCodes*/
		ErrorMsg = input;
		/*}#1IQNJI5L80PreCodes*/
		session.addChatText(role,content,opts);
		/*#{1IQNJI5L80PostCodes*/
		/*}#1IQNJI5L80PostCodes*/
		return {seg:pageBringToFront,result:(result),preSeg:"1IQNJI5L80",outlet:"1IQNJIT1I0"};
	};
	ErrorNotice.jaxId="1IQNJI5L80"
	ErrorNotice.url="ErrorNotice@"+agentURL
	
	segs["DetectPageInfo"]=DetectPageInfo=async function(input){//:1IR1L8TMR0
		let result=input
		/*#{1IR1L8TMR0Code*/
		
		const all_pages = await context.rpaBrowser.pages();
		
		// update new_pages
		let newPageInfo = "";
		let AllPageInfo = "";
		for (const page of all_pages) {
			if (!context.pageManager.hasPage(page)) {
				context.pageManager.addPage(page);
		
				const page_id = context.pageManager.getId(page);
				const title = await page.title();
				const url = page.url();
		
				newPageInfo += `pageId:${page_id} title:${title} url:${url}\n`;
			}
		
			const page_id = context.pageManager.getId(page);
			const title = await page.title();
			const url = page.url();
			AllPageInfo += `pageId:${page_id} title:${title} url:${url}\n`;
		}
		PageInfo = `###所有标签页的信息：\n${AllPageInfo}\n  ###新出现的标签页的信息：\n${newPageInfo}\n`		
		result = PageInfo;
		/*}#1IR1L8TMR0Code*/
		return {seg:selectElement,result:(result),preSeg:"1IR1L8TMR0",outlet:"1IR1LAFCI0"};
	};
	DetectPageInfo.jaxId="1IR1L8TMR0"
	DetectPageInfo.url="DetectPageInfo@"+agentURL
	
	segs["showNewPages"]=showNewPages=async function(input){//:1IR1M4RQ80
		let result=input;
		let opts={txtHeader:($agent.showName||$agent.name||null)};
		let role="assistant";
		let content=PageInfo;
		session.addChatText(role,content,opts);
		return {result:result};
	};
	showNewPages.jaxId="1IR1M4RQ80"
	showNewPages.url="showNewPages@"+agentURL
	
	segs["SwitchPage"]=SwitchPage=async function(input){//:1IR1TGR9M0
		let result=input
		/*#{1IR1TGR9M0Code*/
		let pageVal="aaPage";
		const pageId = Number(curStepVO.execute.PageId);
		const page = context.pageManager.getPage(pageId);
		await page.bringToFront();
		context[pageVal] = page;  
		
		/*}#1IR1TGR9M0Code*/
		return {seg:saveStep,result:(result),preSeg:"1IR1TGR9M0",outlet:"1IR1TGVSJ0"};
	};
	SwitchPage.jaxId="1IR1TGR9M0"
	SwitchPage.url="SwitchPage@"+agentURL
	
	segs["pageBringToFront"]=pageBringToFront=async function(input){//:1IR9GPVA10
		let result=input
		/*#{1IR9GPVA10Code*/
		
		// 确保当前的 context[pageVal] 是被激活的
		let pageVal="aaPage";
		const page = context[pageVal];
		await page.bringToFront();
		
		/*}#1IR9GPVA10Code*/
		return {seg:DetectInteractiveElement,result:(result),preSeg:"1IR9GPVA10",outlet:"1IR9GS89P0"};
	};
	pageBringToFront.jaxId="1IR9GPVA10"
	pageBringToFront.url="pageBringToFront@"+agentURL
	
	segs["PrivacyReplacement"]=PrivacyReplacement=async function(input){//:1IRJR12HO0
		let result=input
		/*#{1IRJR12HO0Code*/
		
		
		let type_content = curStepVO.execute.text;
		
		
		const lowerTypeContent = type_content.toLowerCase();
		
		// 替换所有隐私变量引用（大小写无关）
		
		if(UserSecretVariable){
			for (const [variable, { value }] of Object.entries(UserSecretVariable)) {
				const lowerVariable = variable.toLowerCase();
		
				if (lowerTypeContent.includes(lowerVariable)) {
					// 转义变量名中的特殊字符，创建不区分大小写的正则表达式
					const escapedVariable = variable.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
					const regex = new RegExp(escapedVariable, 'gi'); // g: 全局匹配, i: 忽略大小写
		
					// 替换所有匹配项（无论大小写）
					type_content = type_content.replace(regex, value);
				}
			}
		}
		
		
		result = type_content;
		
		/*}#1IRJR12HO0Code*/
		return {seg:Input,result:(result),preSeg:"1IRJR12HO0",outlet:"1IRJR2FC60"};
	};
	PrivacyReplacement.jaxId="1IRJR12HO0"
	PrivacyReplacement.url="PrivacyReplacement@"+agentURL
	
	segs["SetSecret"]=SetSecret=async function(input){//:1IRJTP6ND0
		let result=input
		/*#{1IRJTP6ND0Code*/
		
		/*			
		UserSecretVariable = {
			"$username":{
				value: "admin",
				description: "登陆使用的用户名"
			},
		
			"$password":{
				value: "123456",
				description:"登陆使用的密码"
			}
		
		}*/
		
		/*}#1IRJTP6ND0Code*/
		return {seg:Notify,result:(result),preSeg:"1IRJTP6ND0",outlet:"1IRJTPFRS0"};
	};
	SetSecret.jaxId="1IRJTP6ND0"
	SetSecret.url="SetSecret@"+agentURL
	
	segs["FixArgs"]=FixArgs=async function(input){//:1IRMERC3E0
		let result=input;
		let missing=false;
		let smartAsk=false;
		if(task===undefined || task==="") missing=true;
		if(startURL===undefined || startURL==="") missing=true;
		if(missing){
			result=await session.pipeChat("/@tabos/HubFixArgs.mjs",{"argsTemplate":argsTemplate,"command":input,smartAsk:smartAsk},false);
			parseAgentArgs(result);
		}
		return {seg:Start,result:(result),preSeg:"1IRMERC3E0",outlet:"1IRMEROTL0"};
	};
	FixArgs.jaxId="1IRMERC3E0"
	FixArgs.url="FixArgs@"+agentURL
	
	agent=$agent={
		isAIAgent:true,
		session:session,
		name:"agent",
		url:agentURL,
		autoStart:true,
		jaxId:"1HDBOSUN90",
		context:context,
		livingSeg:null,
		execChat:async function(input/*{task,startURL}*/){
			let result;
			parseAgentArgs(input);
			/*#{1HDBOSUN90PreEntry*/
			/*}#1HDBOSUN90PreEntry*/
			result={seg:FixArgs,"input":input};
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
let ChatAPI=[{
	def:{
		name: "agent",
		description: "这是一个控制浏览器的通用智能体，可以帮助你完成网页端的任务，例如信息查询，网上购物等等。",
		parameters:{
			type: "object",
			properties:{
				task:{type:"string",description:"用户提到的任务"},
				startURL:{type:"string",description:"初始时刻要跳转过去的URL，该参数非必须"}
			}
		}
	}
}];

//:Export Edit-AddOn:
const DocAIAgentExporter=VFACT?VFACT.classRegs.DocAIAgentExporter:null;
if(DocAIAgentExporter){
	const EditAttr=VFACT.classRegs.EditAttr;
	const EditAISeg=VFACT.classRegs.EditAISeg;
	const EditAISegOutlet=VFACT.classRegs.EditAISegOutlet;
	const SegObjShellAttr=EditAISeg.SegObjShellAttr;
	const SegOutletDef=EditAISegOutlet.SegOutletDef;
	const docAIAgentExporter=DocAIAgentExporter.prototype;
	const packExtraCodes=docAIAgentExporter.packExtraCodes;
	const packResult=docAIAgentExporter.packResult;
	const varNameRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
	
	EditAISeg.regDef({
		name:"agent",showName:"agent",icon:"agent.svg",catalog:["AI Call"],
		attrs:{
			...SegObjShellAttr,
			"task":{name:"task",showName:undefined,type:"string",key:1,fixed:1,initVal:""},
			"startURL":{name:"startURL",showName:undefined,type:"string",key:1,fixed:1,initVal:"https://www.amazon.com/"},
			"outlet":{name:"outlet",type:"aioutlet",def:SegOutletDef,key:1,fixed:1,edit:false,navi:"doc"}
		},
		listHint:["id","task","startURL","codes","desc"],
		desc:"这是一个控制浏览器的通用智能体，可以帮助你完成网页端的任务，例如信息查询，网上购物等等。"
	});
	
	DocAIAgentExporter.segTypeExporters["agent"]=
	function(seg){
		let coder=this.coder;
		let segName=seg.idVal.val;
		let exportDebug=this.isExportDebug();
		segName=(segName &&varNameRegex.test(segName))?segName:("SEG"+seg.jaxId);
		coder.packText(`segs["${segName}"]=${segName}=async function(input){//:${seg.jaxId}`);
		coder.indentMore();coder.newLine();
		{
			coder.packText(`let result,args={};`);coder.newLine();
			coder.packText("args['task']=");this.genAttrStatement(seg.getAttr("task"));coder.packText(";");coder.newLine();
			coder.packText("args['startURL']=");this.genAttrStatement(seg.getAttr("startURL"));coder.packText(";");coder.newLine();
			this.packExtraCodes(coder,seg,"PreCodes");
			coder.packText(`result= await session.pipeChat("/~/WebAgent/ai/agent.js",args,false);`);coder.newLine();
			this.packExtraCodes(coder,seg,"PostCodes");
			this.packUpdateContext(coder,seg);
			this.packUpdateGlobal(coder,seg);
			this.packResult(coder,seg,seg.outlet);
		}
		coder.indentLess();coder.maybeNewLine();
		coder.packText(`};`);coder.newLine();
		if(exportDebug){
			coder.packText(`${segName}.jaxId="${seg.jaxId}"`);coder.newLine();
		}
		coder.packText(`${segName}.url="${segName}@"+agentURL`);coder.newLine();
		coder.newLine();
	};
}
//#CodyExport<<<
/*#{1HDBOSUN90PostDoc*/
/*}#1HDBOSUN90PostDoc*/


export default agent;
export{agent,ChatAPI};
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
//		"entry": "FixArgs",
//		"autoStart": "true",
//		"inBrowser": "false",
//		"debug": "true",
//		"apiArgs": {
//			"jaxId": "1IH2869AD0",
//			"attrs": {
//				"task": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1IPBK9ELG0",
//					"attrs": {
//						"type": "String",
//						"mockup": "\"\"",
//						"desc": "用户提到的任务",
//						"required": "true"
//					}
//				},
//				"startURL": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1IQKQOQHR0",
//					"attrs": {
//						"type": "String",
//						"mockup": "\"https://www.amazon.com/\"",
//						"desc": "初始时刻要跳转过去的URL，该参数非必须"
//					}
//				}
//			}
//		},
//		"localVars": {
//			"jaxId": "1HDBOSUNA2",
//			"attrs": {
//				"curStepVO": {
//					"type": "auto",
//					"valText": ""
//				},
//				"history": {
//					"type": "auto",
//					"valText": ""
//				},
//				"Axtree": {
//					"type": "string",
//					"valText": ""
//				},
//				"ExtraInfo": {
//					"type": "string",
//					"valText": ""
//				},
//				"ElementList": {
//					"type": "array",
//					"def": "Array",
//					"attrs": []
//				},
//				"PageInfo": {
//					"type": "string",
//					"valText": ""
//				},
//				"ErrorMsg": {
//					"type": "string",
//					"valText": ""
//				},
//				"UserSecretVariable": {
//					"type": "auto",
//					"valText": "null"
//				}
//			}
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
//					"def": "WebRpaStart",
//					"jaxId": "1IH28H5RP0",
//					"attrs": {
//						"id": "Start",
//						"viewName": "",
//						"label": "",
//						"x": "-295",
//						"y": "240",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IH28I25C0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IH28I25C1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IH28I25B0",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IH28HPRB0"
//						},
//						"catchlet": {
//							"jaxId": "1IH28I25C2",
//							"attrs": {
//								"id": "NoAAE",
//								"desc": "输出节点。",
//								"output": "",
//								"codes": "false",
//								"context": {
//									"jaxId": "1IH28I25C3",
//									"attrs": {
//										"cast": ""
//									}
//								},
//								"global": {
//									"jaxId": "1IH28I25C4",
//									"attrs": {
//										"cast": ""
//									}
//								}
//							}
//						},
//						"aiQuery": "true"
//					},
//					"icon": "start.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "WebRpaOpenBrowser",
//					"jaxId": "1IH28HPRB0",
//					"attrs": {
//						"id": "OpenBrowser",
//						"viewName": "",
//						"label": "",
//						"x": "-95",
//						"y": "225",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IH28I25C5",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IH28I25C6",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"alias": "RPAWebAgent",
//						"headless": "false",
//						"devtools": "false",
//						"dataDir": "true",
//						"outlet": {
//							"jaxId": "1IH28I25B1",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IH28P38Q0"
//						},
//						"run": ""
//					},
//					"icon": "web.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "WebRpaOpenPage",
//					"jaxId": "1IH28P38Q0",
//					"attrs": {
//						"id": "OpenPage",
//						"viewName": "",
//						"label": "",
//						"x": "140",
//						"y": "225",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IH28P9U10",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IH28P9U11",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"valName": "aaPage",
//						"url": "#startURL.length>0?startURL:\"https://www.linkedin.com/\"",
//						"vpWidth": "1200",
//						"vpHeight": "900",
//						"userAgent": "",
//						"waitBefore": "0",
//						"waitAfter": "1000",
//						"outlet": {
//							"jaxId": "1IH28P9TV0",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IRJTP6ND0"
//						},
//						"run": ""
//					},
//					"icon": "/@aae/assets/tab_add.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "output",
//					"jaxId": "1IH28Q6DB0",
//					"attrs": {
//						"id": "Notify",
//						"viewName": "",
//						"label": "",
//						"x": "565",
//						"y": "225",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IH28R1BC0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IH28R1BC1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"text": "#task",
//						"outlet": {
//							"jaxId": "1IH28R1BB0",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IR9GPVA10"
//						}
//					},
//					"icon": "hudtxt.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1IOUB21C90",
//					"attrs": {
//						"id": "DetectInteractiveElement",
//						"viewName": "",
//						"label": "",
//						"x": "1000",
//						"y": "225",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IOUB2AHR0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IOUB2AHR1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IOUB2AHP0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IQHTMJ9I0"
//						},
//						"outlets": {
//							"attrs": []
//						},
//						"result": "#JSON.stringify(input)"
//					},
//					"icon": "tab_css.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "output",
//					"jaxId": "1IOUTIVC60",
//					"attrs": {
//						"id": "showNumber",
//						"viewName": "",
//						"label": "",
//						"x": "1145",
//						"y": "555",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IOUTLCOF0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IOUTLCOF1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"text": "#`detected ${input.length} interactive elements`",
//						"outlet": {
//							"jaxId": "1IOUTLCO90",
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
//					"def": "callLLM",
//					"jaxId": "1IPBDPJGE0",
//					"attrs": {
//						"id": "selectElement",
//						"viewName": "",
//						"label": "",
//						"x": "1760",
//						"y": "225",
//						"desc": "Excute a LLM call.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IPBDQHK60",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IPBDQHK61",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"platform": "\"OpenAI\"",
//						"mode": "gpt-4.1-mini",
//						"system": "#`\n### 角色\n你是一个强大的网页分析，动作规划智能体。\n- 你根据任务描述，以及当前任务的执行状态，通过网页截图以及网页的HTML代码分析并推导为了完成任务，下一步要进行的操作。\n\n\n### 用户提供的隐私变量\n- 隐私变量是指账号，密码，ID等用户隐私信息，下面将会以类似于环境变量的形式给出，例如 $UserName。当遇到了需要填写隐私信息的时候，可以直接在input操作中使用隐私变量的变量名，后期的执行程序会自动填写真实的变量值。\n- 下面将列出隐私变量的变量名和对应的描述\n${UserSecretVariable?Object.entries(UserSecretVariable).map(([key, config]) => `${key}: ${config.description}`).join('\\n'):\"暂无\\n\"}\n\n\n### 用户提供的额外信息\n如果遇到了某些情况要需要填写信息，同时在隐私变量里面和任务描述里面没有提供的话，可以选择AskUser来向用户询问对应的信息\n${ExtraInfo}\n\n---\n### 当前要执行的任务：\n${task}\n\n---\n###之前已经执行过的步骤\n- 如果你发现有最近的几步几乎一直在重复的话，可能是任务没有完成，直接放弃任务\n${history?history.map((item, idx)=>`Step ${idx}\\n${JSON.stringify(item)}`).join('\\n'):\"No action yet\"};\n\n---\n### 观察空间\n- 你的观察空间包含：当前浏览器打开的所有页面的URL和Title,当前激活的页面的URL和accessibility tree。你根据任务目标和历史的执行状态生成下一步要进行的操作。\n- 当前网页URL: ${context['aaPage'].url()}\n- accessibility tree说明：每个元素都有一个aaeid，在axtree中放在元素前面用 [id] 的格式\n    \n- 可交互元素列表：列表中包含了当前页面用户可以见到的范围内的可交互元素。例如<button>, <input>, <a> 这样的元素, 每个元素前面用[id] 的格式来标出id\n- 可交互元素列表如下：\n{ElementList.join(\"\\n\")}\n\n- 网页的accessibility Tree如下\n${Axtree}\n\n### 浏览器的页面信息\n- 有的时候点击一个链接会触发一个新页面，你需要switch page到新页面才能看到对应的内容\n${PageInfo}\n\n${ErrorMsg.length>0? \"###上一步action的错误信息如下\\n\"+ErrorMsg:\"\"}\n\n\n### 提示\n记得做任务之前检查当前页面所在的URL，如果URL不对，用GOTO action 来前往正确的URL\n\n- 请用JSON格式进行回复，例如：\n\\`\\`\\`\n{\n        \"state\":\"Execute\",\n           \"content\":\"Click the search button.\"\n        \"execute\":{\n                   \"action\":\"Click\",\n            \"queryHint\":\"Search button\",\n            \"targetAAEId\":\"123\",\n            \"waitEvent\":null\n    }\n}\n\\`\\`\\`\n\n---\n### 回复JSON属性\n\n- \"state\" {string}: 任务执行状态。\n    - 如果继续执行任务: \"Execute\"，在属性\"execute\"中设定下一个步骤的具体执行内容。\n    - 如果任务已完成: \"Finish\"，在\"content\"属性里总结任务结果\n    - 如果任务被放弃执行: \"Abort\"，在\"content\"属性里说明放弃的原因\n    - 如果遇到需要用户操作的步骤：\"UserHelp\"，在\"content\"属性里面说明具体什么步骤需要用户来操作，常见情况例如用户扫码登陆，或者通过人机验证等等\n    - 如果需要用户提供信息: \"AskUser\"，在\"content\" 属性里面说明需要用户提供什么类型的信息\n\n- \"content\" {string}: 当前步骤/状态/结果描述。 \n    - 如果是前步骤描述或执行结果。如果是步骤描述，说明步骤的目的以及执行该步骤的做法。\n    - 如果是结束/失败/放弃，请详细说明执行结果或者失败/放弃的原因。\n\n- \"execute\" {object}: 如果要执行一个操作步骤，这个对象是步骤的详细内容。下面是\"execute\"对象属性说明：\n    - \"action\" {string}: 步骤动作类型，可以选择的动作类型有：\n        - \"Click\": 点击一个网页元素\n        - \"Input\": 输入文本\n        - \"PressKey\": 按键\n        - \"Goto\": 前往一个网址\n        - \"Back\": 回退浏览\n        - \"SwitchPage\": 切换标签页\n\n    - \"queryHint\" {string}: 当要对具体某个元素操作（点击，输入等）时，对元素的说明，例如: \"搜索输入框\"，\"注册新帐户按钮\"等。\n    - \"targetAAEId\" {string}: 当要对具体某个元素操作（点击，输入等）时，该目标元素的 aaeid 属性值，注意aaeid必须是数字，用来唯一确定目标元素。当action 为Click 或者Input的时候，这里必须要有值，不能填null。\n    - \"PageId\" {string}: 当action为 SwitchPage时，这个属性表示要切换的标签页的 PageId\n    - \"text\" {string}: 当\"action\"是\"Input\"时，这个属性是要输入的内容；当\"action\"为\"Ask\"或者\"UserHelp\"时，告知用户的内容；否则为null\n    - \"pressEnter\" {bool}: 当\"action\"是\"Input\"时，这个属性表示输入完text之后，按下enter，一般用于搜索框。\n    - \"key\" {string}: 当\"action\"是\"PressKey\"时，这个属性是要按的键，否则为null\n    - \"url\" {string}: 当\"action\"是\"Goto\"时，这个属性是要前往的网址，否则为null\n`",
//						"temperature": "0",
//						"maxToken": "2000",
//						"topP": "1",
//						"fqcP": "0",
//						"prcP": "0",
//						"messages": {
//							"attrs": []
//						},
//						"prompt": "#input",
//						"seed": "",
//						"outlet": {
//							"jaxId": "1IPBDQHK30",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IPBL2QQC0"
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
//						"responseFormat": "json_object",
//						"formatDef": "null"
//					},
//					"icon": "llm.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "output",
//					"jaxId": "1IPBL2QQC0",
//					"attrs": {
//						"id": "showReply",
//						"viewName": "",
//						"label": "",
//						"x": "1990",
//						"y": "225",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IPBL3SGQ0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IPBL3SGQ1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"text": "#input.content",
//						"outlet": {
//							"jaxId": "1IPBL3SGM0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IPBLBRM00"
//						}
//					},
//					"icon": "hudtxt.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "brunch",
//					"jaxId": "1IPBLBRM00",
//					"attrs": {
//						"id": "checkState",
//						"viewName": "",
//						"label": "",
//						"x": "2185",
//						"y": "225",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IPBMHPVU0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IPBMHPVU1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IPBMHPVO1",
//							"attrs": {
//								"id": "Default",
//								"desc": "Outlet.",
//								"output": ""
//							}
//						},
//						"outlets": {
//							"attrs": [
//								{
//									"type": "aioutlet",
//									"def": "AIConditionOutlet",
//									"jaxId": "1IPBMFETJ0",
//									"attrs": {
//										"id": "Finish",
//										"desc": "Outlet.",
//										"output": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IPBMHPVU4",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IPBMHPVU5",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"condition": "#input.state === \"Finish\""
//									},
//									"linkedSeg": "1IPBMKG9V0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIConditionOutlet",
//									"jaxId": "1IPBMG4GR0",
//									"attrs": {
//										"id": "Abort",
//										"desc": "Outlet.",
//										"output": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IPBMHPVU6",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IPBMHPVU7",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"condition": "#input.state === \"Abort\""
//									},
//									"linkedSeg": "1IPBML8BQ0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIConditionOutlet",
//									"jaxId": "1IQKRFV6S0",
//									"attrs": {
//										"id": "UserHelp",
//										"desc": "Outlet.",
//										"output": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IQKRHC7O0",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IQKRHC7O1",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"condition": "#input.state === \"UserHelp\""
//									},
//									"linkedSeg": "1IQKS44P80"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIConditionOutlet",
//									"jaxId": "1IQKRUN350",
//									"attrs": {
//										"id": "AskUser",
//										"desc": "Outlet.",
//										"output": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IQKS5PAH0",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IQKS5PAH1",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"condition": "input.state === \"AskUser\""
//									},
//									"linkedSeg": "1IQKRI6J80"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIConditionOutlet",
//									"jaxId": "1IPBMHPVO0",
//									"attrs": {
//										"id": "Execute",
//										"desc": "Outlet.",
//										"output": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IPBMHPVU2",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IPBMHPVU3",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"condition": "#input.state === \"Execute\""
//									},
//									"linkedSeg": "1IQNJ1V0O0"
//								}
//							]
//						}
//					},
//					"icon": "condition.svg",
//					"reverseOutlets": true
//				},
//				{
//					"type": "aiseg",
//					"def": "output",
//					"jaxId": "1IPBMKG9V0",
//					"attrs": {
//						"id": "NoticeFinish",
//						"viewName": "",
//						"label": "",
//						"x": "2465",
//						"y": "-215",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IPBMKUP60",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IPBMKUP61",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"text": "任务已经完成",
//						"outlet": {
//							"jaxId": "1IPBMKUP40",
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
//					"def": "output",
//					"jaxId": "1IPBML8BQ0",
//					"attrs": {
//						"id": "NoticeAbort",
//						"viewName": "",
//						"label": "",
//						"x": "2465",
//						"y": "-145",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IPBMLFKD0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IPBMLFKD1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"text": "任务放弃",
//						"outlet": {
//							"jaxId": "1IPBMLFKA0",
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
//					"jaxId": "1IPBMUU5R0",
//					"attrs": {
//						"id": "onAction",
//						"viewName": "",
//						"label": "",
//						"x": "2730",
//						"y": "220",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IPBMV3M40",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IPBMV3M41",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IPBMV3M10",
//							"attrs": {
//								"id": "Default",
//								"desc": "Outlet.",
//								"output": ""
//							}
//						},
//						"outlets": {
//							"attrs": [
//								{
//									"type": "aioutlet",
//									"def": "AIConditionOutlet",
//									"jaxId": "1IPBNLLHE0",
//									"attrs": {
//										"id": "Click",
//										"desc": "Outlet.",
//										"output": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IPBNLLHK0",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IPBNLLHK1",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"condition": "curStepVO.execute.action === \"Click\""
//									},
//									"linkedSeg": "1IPE2GODG0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIConditionOutlet",
//									"jaxId": "1IPBMVKKK0",
//									"attrs": {
//										"id": "Input",
//										"desc": "Outlet.",
//										"output": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IPBNLLHK2",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IPBNLLHK3",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"condition": "curStepVO.execute.action === \"Input\""
//									},
//									"linkedSeg": "1IRJR12HO0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIConditionOutlet",
//									"jaxId": "1IPBMVNBC0",
//									"attrs": {
//										"id": "PressKey",
//										"desc": "Outlet.",
//										"output": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IPBNLLHK4",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IPBNLLHK5",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"condition": "curStepVO.execute.action === \"PressKey\""
//									},
//									"linkedSeg": "1IPE47PNL0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIConditionOutlet",
//									"jaxId": "1IPBNKH990",
//									"attrs": {
//										"id": "Goto",
//										"desc": "Outlet.",
//										"output": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IPBNLLHK6",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IPBNLLHK7",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"condition": "curStepVO.execute.action === \"Goto\""
//									},
//									"linkedSeg": "1IPE4HGAL0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIConditionOutlet",
//									"jaxId": "1IPBNKJF70",
//									"attrs": {
//										"id": "Back",
//										"desc": "Outlet.",
//										"output": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IPBNLLHK8",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IPBNLLHK9",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"condition": "curStepVO.execute.action === \"Back\""
//									},
//									"linkedSeg": "1IPE61C7N0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIConditionOutlet",
//									"jaxId": "1IR1T1GL50",
//									"attrs": {
//										"id": "SwitchPage",
//										"desc": "Outlet.",
//										"output": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IR1T1GLD0",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IR1T1GLD1",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"condition": "curStepVO.execute.action === \"SwitchPage\""
//									},
//									"linkedSeg": "1IR1TGR9M0"
//								}
//							]
//						}
//					},
//					"icon": "condition.svg",
//					"reverseOutlets": true
//				},
//				{
//					"type": "aiseg",
//					"def": "AAFKeyboardAction",
//					"jaxId": "1IPE22DGJ0",
//					"attrs": {
//						"id": "Input",
//						"viewName": "",
//						"label": "",
//						"x": "3180",
//						"y": "115",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IPE26IKR0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IPE26IKR1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"page": "aaPage",
//						"action": "Type",
//						"query": "#`(//*[@aaeid=${curStepVO.execute.targetAAEId}])`",
//						"queryHint": "",
//						"key": "#input",
//						"options": "",
//						"waitBefore": "0",
//						"waitAfter": "1000",
//						"outlet": {
//							"jaxId": "1IPE26IKL0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IPJAULCR0"
//						},
//						"run": ""
//					},
//					"icon": "keybtn.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "WebRpaMouseAction",
//					"jaxId": "1IPE2GODG0",
//					"attrs": {
//						"id": "Click",
//						"viewName": "",
//						"label": "",
//						"x": "3230",
//						"y": "0",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IPE2I3D40",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IPE2I3D41",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"page": "aaPage",
//						"action": "Click",
//						"query": "#`(//*[@aaeid=${curStepVO.execute.targetAAEId}])`",
//						"queryHint": "",
//						"dx": "0",
//						"dy": "0",
//						"options": "",
//						"waitBefore": "",
//						"waitAfter": "1000",
//						"outlet": {
//							"jaxId": "1IPE2I3D10",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IPE6PAAA0"
//						},
//						"run": ""
//					},
//					"icon": "mouse.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "AAFKeyboardAction",
//					"jaxId": "1IPE47PNL0",
//					"attrs": {
//						"id": "PressKey",
//						"viewName": "",
//						"label": "",
//						"x": "3230",
//						"y": "270",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IPE4868F0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IPE4868F1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"page": "aaPage",
//						"action": "Key Press",
//						"query": "",
//						"queryHint": "",
//						"key": "#curStepVO.execute.key",
//						"options": "",
//						"waitBefore": "0",
//						"waitAfter": "1000",
//						"outlet": {
//							"jaxId": "1IPE4868C0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IPE6PAAA0"
//						},
//						"run": ""
//					},
//					"icon": "keybtn.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "WebRpaPageGoto",
//					"jaxId": "1IPE4HGAL0",
//					"attrs": {
//						"id": "Goto",
//						"viewName": "",
//						"label": "",
//						"x": "3230",
//						"y": "360",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IPE4MGNE0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IPE4MGNE1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"page": "aaPage",
//						"url": "#curStepVO.execute.url",
//						"waitBefore": "0",
//						"waitAfter": "1000",
//						"outlet": {
//							"jaxId": "1IPE4MGNA0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IPE6PAAA0"
//						},
//						"run": ""
//					},
//					"icon": "/@aae/assets/wait_goto.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1IPE61C7N0",
//					"attrs": {
//						"id": "GoBack",
//						"viewName": "",
//						"label": "",
//						"x": "3230",
//						"y": "435",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IPE61GU90",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IPE61GU91",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IPE61GU10",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IPE6PAAA0"
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
//					"jaxId": "1IPE6PAAA0",
//					"attrs": {
//						"id": "saveStep",
//						"viewName": "",
//						"label": "",
//						"x": "4130",
//						"y": "-275",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IPE6RGQE2",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IPE6RGQE3",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IPE6RGQ61",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IPE76P7M0"
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
//					"jaxId": "1IPE76P7M0",
//					"attrs": {
//						"id": "",
//						"label": "New AI Seg",
//						"x": "4455",
//						"y": "700",
//						"outlet": {
//							"jaxId": "1IPE77J200",
//							"attrs": {
//								"id": "Outlet",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IPE7704V0"
//						},
//						"dir": "R2L"
//					},
//					"icon": "arrowright.svg",
//					"isConnector": true
//				},
//				{
//					"type": "aiseg",
//					"def": "connector",
//					"jaxId": "1IPE7704V0",
//					"attrs": {
//						"id": "",
//						"label": "New AI Seg",
//						"x": "760",
//						"y": "700",
//						"outlet": {
//							"jaxId": "1IPE77J201",
//							"attrs": {
//								"id": "Outlet",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IR9GPVA10"
//						},
//						"dir": "R2L"
//					},
//					"icon": "arrowright.svg",
//					"isConnector": true
//				},
//				{
//					"type": "aiseg",
//					"def": "output",
//					"jaxId": "1IPE95JD90",
//					"attrs": {
//						"id": "showLen",
//						"viewName": "",
//						"label": "",
//						"x": "1400",
//						"y": "555",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IPE95QPT0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IPE95QPT1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"text": "#`Axtree length:${Axtree.length}`",
//						"outlet": {
//							"jaxId": "1IPE95QPN0",
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
//					"jaxId": "1IPJAULCR0",
//					"attrs": {
//						"id": "pressEnterBranch",
//						"viewName": "",
//						"label": "",
//						"x": "3210",
//						"y": "185",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IPJB17UN0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IPJB17UN1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IPJB17UB1",
//							"attrs": {
//								"id": "Default",
//								"desc": "Outlet.",
//								"output": ""
//							},
//							"linkedSeg": "1IPE6PAAA0"
//						},
//						"outlets": {
//							"attrs": [
//								{
//									"type": "aioutlet",
//									"def": "AIConditionOutlet",
//									"jaxId": "1IPJB17UB0",
//									"attrs": {
//										"id": "pressEnter",
//										"desc": "Outlet.",
//										"output": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IPJB17UN2",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IPJB17UN3",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"condition": "curStepVO.execute.pressEnter"
//									},
//									"linkedSeg": "1IPJB1NQD0"
//								}
//							]
//						}
//					},
//					"icon": "condition.svg",
//					"reverseOutlets": true
//				},
//				{
//					"type": "aiseg",
//					"def": "AAFKeyboardAction",
//					"jaxId": "1IPJB1NQD0",
//					"attrs": {
//						"id": "pressEnter",
//						"viewName": "",
//						"label": "",
//						"x": "3385",
//						"y": "85",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IPJB2ISP0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IPJB2ISP1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"page": "aaPage",
//						"action": "Key Press",
//						"query": "",
//						"queryHint": "",
//						"key": "Enter",
//						"options": "",
//						"waitBefore": "0",
//						"waitAfter": "1000",
//						"outlet": {
//							"jaxId": "1IPJB2ISH0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IPE6PAAA0"
//						},
//						"run": ""
//					},
//					"icon": "keybtn.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1IQHTMJ9I0",
//					"attrs": {
//						"id": "ReadAxtree",
//						"viewName": "",
//						"label": "",
//						"x": "1260",
//						"y": "225",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IQHTMUFR0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IQHTMUFR1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IQHTMUFO0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IR1L8TMR0"
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
//					"jaxId": "1IQKRI6J80",
//					"attrs": {
//						"id": "AskInfo",
//						"viewName": "",
//						"label": "",
//						"x": "2465",
//						"y": "50",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IQKS5PAI0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IQKS5PAI1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"tip": "",
//						"tipRole": "Assistant",
//						"placeholder": "",
//						"text": "",
//						"file": "false",
//						"showText": "true",
//						"askUpward": "false",
//						"outlet": {
//							"jaxId": "1IQKS5PAD0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IPE6PAAA0"
//						}
//					},
//					"icon": "chat.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "askConfirm",
//					"jaxId": "1IQKS44P80",
//					"attrs": {
//						"id": "UserConfirm",
//						"viewName": "",
//						"label": "",
//						"x": "2465",
//						"y": "-55",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"prompt": "智能体需要您手动完成上述操作，完成后请按OK。如果放弃本次任务，则按Cancel",
//						"outlets": {
//							"attrs": [
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1IQKS44OP0",
//									"attrs": {
//										"id": "OK",
//										"desc": "Outlet.",
//										"text": "OK",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IQKS5PAI2",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IQKS5PAI3",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1IPE6PAAA0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1IQKS44OP1",
//									"attrs": {
//										"id": "Cancel",
//										"desc": "Outlet.",
//										"text": "Cancel",
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IQKS5PAI4",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IQKS5PAI5",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1IQKVG7OC0"
//								}
//							]
//						},
//						"silent": "false"
//					},
//					"icon": "help.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "output",
//					"jaxId": "1IQKVG7OC0",
//					"attrs": {
//						"id": "ExitNotice",
//						"viewName": "",
//						"label": "",
//						"x": "2685",
//						"y": "-40",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IQKVGLI20",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IQKVGLI21",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"text": "已退出",
//						"outlet": {
//							"jaxId": "1IQKVGLHU0",
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
//					"def": "tryCatch",
//					"jaxId": "1IQNJ1V0O0",
//					"attrs": {
//						"id": "ActionException",
//						"viewName": "",
//						"label": "",
//						"x": "2460",
//						"y": "375",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IQNJFBKR0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IQNJFBKR1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IQNJFBK40",
//							"attrs": {
//								"id": "Try",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IPBMUU5R0"
//						},
//						"catchlet": {
//							"jaxId": "1IQNJFBK41",
//							"attrs": {
//								"id": "Catch",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IQNJI5L80"
//						}
//					},
//					"icon": "trycatch.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "connector",
//					"jaxId": "1IQNJG5QE0",
//					"attrs": {
//						"id": "",
//						"label": "New AI Seg",
//						"x": "2900",
//						"y": "700",
//						"outlet": {
//							"jaxId": "1IQNJGQO60",
//							"attrs": {
//								"id": "Outlet",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IPE7704V0"
//						},
//						"dir": "R2L"
//					},
//					"icon": "arrowright.svg",
//					"isConnector": true
//				},
//				{
//					"type": "aiseg",
//					"def": "output",
//					"jaxId": "1IQNJI5L80",
//					"attrs": {
//						"id": "ErrorNotice",
//						"viewName": "",
//						"label": "",
//						"x": "2725",
//						"y": "390",
//						"desc": "This is an AISeg.",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IQNJIT1L0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IQNJIT1M0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"text": "出错了，即将为您重试",
//						"outlet": {
//							"jaxId": "1IQNJIT1I0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IQNJG5QE0"
//						}
//					},
//					"icon": "hudtxt.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1IR1L8TMR0",
//					"attrs": {
//						"id": "DetectPageInfo",
//						"viewName": "",
//						"label": "",
//						"x": "1510",
//						"y": "225",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IR1LAFCQ0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IR1LAFCQ1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IR1LAFCI0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IPBDPJGE0"
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
//					"jaxId": "1IR1M4RQ80",
//					"attrs": {
//						"id": "showNewPages",
//						"viewName": "",
//						"label": "",
//						"x": "1665",
//						"y": "555",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IR1M62SO0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IR1M62SO1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"text": "#PageInfo",
//						"outlet": {
//							"jaxId": "1IR1M62SE0",
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
//					"def": "code",
//					"jaxId": "1IR1TGR9M0",
//					"attrs": {
//						"id": "SwitchPage",
//						"viewName": "",
//						"label": "",
//						"x": "3230",
//						"y": "525",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IR1TGVSV0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IR1TGVSV1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IR1TGVSJ0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IPE6PAAA0"
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
//					"jaxId": "1IR9GPVA10",
//					"attrs": {
//						"id": "pageBringToFront",
//						"viewName": "",
//						"label": "",
//						"x": "745",
//						"y": "225",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IR9GS8A10",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IR9GS8A11",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IR9GS89P0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IOUB21C90"
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
//					"jaxId": "1IRJR12HO0",
//					"attrs": {
//						"id": "PrivacyReplacement",
//						"viewName": "",
//						"label": "",
//						"x": "2950",
//						"y": "160",
//						"desc": "This is an AISeg.",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IRJR2FCB0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IRJR2FCB1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IRJR2FC60",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IPE22DGJ0"
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
//					"jaxId": "1IRJTP6ND0",
//					"attrs": {
//						"id": "SetSecret",
//						"viewName": "",
//						"label": "",
//						"x": "340",
//						"y": "225",
//						"desc": "这里用来存放隐私变量UserSecretVariable。\n隐私变量的数据结构类似于下面这样子，会给LLM看 变量名和描述，让LLM用变量值来指代特定内容。\n然后在实际执行 action 的阶段，会检测input操作的输入内容中是否包含变量名，如果包含变量名就替换成真实值。\n这种机制可以确保用户隐私的真实内容不被发送给LLM\n\n\t\tUserSecretVariable = {\n\t\t\t\"$username\":{\n\t\t\t\tvalue: \"admin\",\n\t\t\t\tdescription: \"登陆使用的用户名\"\n\t\t\t},\n\t\t\n\t\t\t\"$password\":{\n\t\t\t\tvalue: \"123456\",\n\t\t\t\tdescription:\"登陆使用的密码\"\n\t\t\t}\n\t\t\n\t\t}",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IRJTPFS10",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IRJTPFS11",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IRJTPFRS0",
//							"attrs": {
//								"id": "Result",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IH28Q6DB0"
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
//					"def": "fixArgs",
//					"jaxId": "1IRMERC3E0",
//					"attrs": {
//						"id": "FixArgs",
//						"viewName": "",
//						"label": "",
//						"x": "-500",
//						"y": "240",
//						"desc": "This is an AISeg.",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"smartAsk": "false",
//						"outlet": {
//							"jaxId": "1IRMEROTL0",
//							"attrs": {
//								"id": "Next",
//								"desc": "Outlet."
//							},
//							"linkedSeg": "1IH28H5RP0"
//						}
//					},
//					"icon": "args.svg"
//				}
//			]
//		},
//		"desc": "这是一个控制浏览器的通用智能体，可以帮助你完成网页端的任务，例如信息查询，网上购物等等。",
//		"exportAPI": "true",
//		"exportAddOn": "true",
//		"addOnOpts": ""
//	}
//}