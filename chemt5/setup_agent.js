
import pathLib from "path";
		
		//----------------------------------------------------------------------------
		function install(env,project){
		let $ln=env.$ln||"EN";
		let steps=null;
		let dirPath,gitPath,gitURL;
		dirPath=project.dirPath;
		gitPath=pathLib.join(dirPath,"prj");
		gitURL=project.gitURL;
		steps=[
			{
				"action":"bash",
				"commands":[
					`cd ${decodeURIComponent(dirPath)}`
				]
			},
			{
				"action":"conda",
				"tip":"Set up a conda environment for ChemT5",
				"conda":"chemt5",
				"pythonVersion":"3.9"
			},
			{
				"action":"bash",
				"tip":"Install torch and torchvision",
				"commands":[
					"pip install torch torchvision torchaudio --upgrade -i https://pypi.tuna.tsinghua.edu.cn/simple"
				]
			},
			{
				"action":"bash",
				"tip":"Install transformers, sentencepiece and protobuf",
				"commands":[
					"pip install transformers sentencepiece protobuf --upgrade -i https://pypi.tuna.tsinghua.edu.cn/simple"
				]
			},
			{
				"action":"hf-model",
				"tip":"Download the ChemT5 model from Hugging Face",
				"model":"GT4SD/multitask-text-and-chemistry-t5-base-augm",
				"localPath":"/tmp/multitask-text-and-chemistry-t5-base-augm"
			}
		];
		return steps;
		}
		
		//----------------------------------------------------------------------------
		function uninstall(env,project){
		let $ln=env.$ln||"EN";
		let steps;
		let dirPath,gitPath,gitURL;
		dirPath=project.dirPath;
		gitPath=pathLib.join(dirPath,"prj");
		gitURL=project.gitURL;
		if(env.platform==="darwin" && env.arch==="arm64"){
		steps=[
			{
				action:"bash",
				tip:(($ln==="CN")?("删除GitHub项目内容。"):/*EN*/("Delete GitHub project.")),
				commands:[
					`cd ${dirPath}`,
					`rm -r prj`,
				]
			},
		];
		}
		return steps;
		};
		
		export default install;
		export {install}