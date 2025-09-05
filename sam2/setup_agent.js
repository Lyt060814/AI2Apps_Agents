
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
				"action": "bash",
				"tip": "Navigate to the SAM 2 directory",
				"commands": [
					`cd ${decodeURIComponent(dirPath)}`,
					"cd sam2"
				]
			},
			{
				"action": "conda",
				"tip": "Create and activate an isolated Python 3.10 environment for the SAM 2 backend (enables MPS acceleration).",
				"conda": "sam2",
				"pythonVersion": "3.10"
			},
			{
				"action": "bash",
				"tip": "Upgrade pip and install essential build tools",
				"commands": [
					"conda activate sam2",
					"pip install --upgrade pip setuptools wheel"
				]
			},
			{
				"action": "bash",
				"tip": "Install minimal PyTorch, torchvision, and required dependencies for image segmentation only",
				"commands": [
					"pip install torch==2.5.1 torchvision==0.20.1",
					"pip install pillow opencv-python matplotlib numpy",
					"pip install -e ."
				]
			},
			{
				"action": "bash",
				"tip": "Download only the tiny model checkpoint for lightweight segmentation",
				"commands": [
					"mkdir -p checkpoints",
					"cd checkpoints",
					"wget -O /tmp/sam2.1_hiera_tiny.pt https://dl.fbaipublicfiles.com/segment_anything_2/092824/sam2.1_hiera_tiny.pt",
					"cd .."
				]
			},
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
			}
		];
		}
		return steps;
		};
		
		export default install;
		export {install}