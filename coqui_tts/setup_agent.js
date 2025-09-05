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
			tip: "Create and activate an isolated Python 3.10 environment for Coqui TTS.",
			conda: "coqui-tts",
			pythonVersion: "3.10"
		},
		{
			action: "bash",
			tip: "Install TTS.",
			commands: [
				"pip install TTS"
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