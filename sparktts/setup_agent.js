
import pathLib from "path";
		
		//----------------------------------------------------------------------------
		function install(env,project){
		let $ln=env.$ln||"EN";
		let steps=null;
		let dirPath,gitPath,gitURL;
		dirPath=project.dirPath;
		gitPath=pathLib.join(dirPath,"prj");
		gitURL=project.gitURL;
		steps=[{"action":"bash","commands":[`cd ${decodeURIComponent(dirPath)}`]},{"action":"bash","tip":"Clone the Spark-TTS repository","commands":["cd Spark-TTS"]},{"action":"conda","tip":"Set up a conda environment for Spark-TTS","conda":"sparktts","pythonVersion":"3.11"},{"action":"bash","tip":"Install dependencies from requirements.txt","commands":["pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple"]},{"action":"bash","tip":"Install torch and torchvision","commands":["pip install torch torchvision torchaudio --upgrade -i https://pypi.tuna.tsinghua.edu.cn/simple"]},{"action":"hf-model","tip":"Download the Spark-TTS model from Hugging Face","model":"SparkAudio/Spark-TTS-0.5B","localPath":"/tmp/Spark-TTS-0.5B"}];
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