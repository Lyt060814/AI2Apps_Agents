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
			tip: "Create and activate an isolated Python 3.10 environment for MegaTTS3.",
			conda: "megatts3-env",
			pythonVersion: "3.10"
		},
		{
			action: "bash",
			tip: "Install all Python dependencies as specified in requirements.txt. This step ensures all required libraries, including torch 2.3.0, are installed.",
			commands: [
				"pip install -r requirements.txt"
			]
		},
		{
			action: "bash",
			tip: "Install ffmpeg for audio processing. Using conda-forge ensures compatibility and avoids apt issues in WSL2.",
			commands: [
				"conda install -y -c conda-forge ffmpeg"
			]
		},
		{
			action: "hf-model",
			tip: "Download the official MegaTTS3 pretrained model checkpoint from HuggingFace to the checkpoints folder. This is required for inference. If model is large, ensure sufficient disk space.",
			model: "ByteDance/MegaTTS3",
			localPath: "/tmp/MegaTTS3"
		},
		{
			action: "bash",
			tip: "Set PYTHONPATH to the project root for correct module resolution. This is required for running CLI and API scripts.",
			commands: [
				"export PYTHONPATH=\"$(pwd):$PYTHONPATH\""
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
		steps = [
			{
				action: "bash",
				tip: (($ln==="CN") ? ("删除GitHub项目内容。") : /*EN*/("Delete GitHub project.")),
				commands: [
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