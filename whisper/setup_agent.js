import pathLib from "path";
		
		//----------------------------------------------------------------------------
		function install(env,project){
		let $ln=env.$ln||"EN";
		let steps=null;
		let dirPath,gitPath,gitURL;
		dirPath=project.dirPath;
		gitPath=pathLib.join(dirPath,"prj");
		gitURL=project.gitURL;
		steps = [
			{
				action: "conda",
				tip: "Create and activate an isolated Python 3.10 conda environment for Whisper, ensuring no conflicts and compatibility with torch.",
				conda: "whisper",
				pythonVersion: "3.10"
			},
			{
				action: "brew",
				tip: "Install ffmpeg, a required binary dependency for audio decoding and format support. Output should confirm ffmpeg is installed.",
				install: "ffmpeg"
			},
			{
				action: "bash",
				tip: "Install Whisper and its dependencies (torch, tiktoken, etc.) via pip. This is the official and most efficient method for install. If you see a tiktoken/rust build error, install rust and setuptools-rust as suggested.",
				commands: [
					"brew install rust",
					"pip install setuptools-rust",
					"pip install -U openai-whisper"
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