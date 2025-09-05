
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
				"tip":"Set up a conda environment for Chemformer",
				"conda":"chemformer",
				"pythonVersion":"3.9.23"
			},
			{
				"action":"bash",
				"tip":"Install dependencies in pyproject.toml",
				"commands":[
					"pip install -e . -i https://pypi.tuna.tsinghua.edu.cn/simple"
				]
			},
			{
				"action":"bash",
				"tip":"Install Deepspeed",
				"commands":[
					"pip install deepspeed -i https://pypi.tuna.tsinghua.edu.cn/simple"
				]
			},
			{
				"action":"hf-model",
				"tip":"Download the combined pretrained Chemformer model from Hugging Face",
				"model":"Lytttttt/combined-pretrained-chemformer",
				"localPath":"/tmp/combined-pretrained-chemformer"
			},
			{
				"action":"bash",
				"tip":"Update model to the latest version",
				"commands":[
					`python -c "
import torch
model = torch.load('/tmp/combined-pretrained-chemformer/pretrained.ckpt', map_location='cpu', weights_only=False)
model['hyper_parameters']['vocabulary_size'] = model['hyper_parameters'].pop('vocab_size')
torch.save(model, '/tmp/combined-pretrained-chemformer/pretrained_v2.ckpt')
print('Checkpoint修复完成')
"`
				]
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