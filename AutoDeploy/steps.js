
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
				"tip": "Clone the SAM 2 repository into the current directory",
				"commands": [
					`cd ${decodeURIComponent(dirPath)}`,
					"rm -rf sam2",
					"git clone https://github.com/facebookresearch/sam2",
					"cd sam2"
				]
			},
			{
				"action": "conda",
				"tip": "Create and activate an isolated Python 3.10 environment for the SAM 2 backend (enables MPS acceleration).",
				"conda": "sam2-demo",
				"pythonVersion": "3.10"
			},
			{
				"action": "bash",
				"tip": "Upgrade pip, install ffmpeg (via conda-forge), and ensure wheel/setuptools are up to date for building dependencies.",
				"commands": [
					"conda activate sam2-demo",
					"conda install -c conda-forge ffmpeg --yes",
					"pip install --upgrade pip setuptools wheel"
				]
			},
			{
				"action": "bash",
				"tip": "Install PyTorch (with MPS support for Apple Silicon), torchvision, and all project requirements for backend/demo, tools, and evaluation. Use editable install for full development support.",
				"commands": [
					"pip install torch==2.5.1 torchvision==0.20.1",
					"pip install -e '.[interactive-demo,notebooks,dev]'",
					"pip install -r sav_dataset/requirements.txt"
				]
			},
			{
				"action": "bash",
				"tip": "Download model checkpoints required for VOS inference and backend demo. The script downloads all necessary .pt files into ./checkpoints.",
				"commands": [
					"cd checkpoints",
					"bash download_ckpts.sh",
					"cd .."
				]
			},
			{
				"action": "bash",
				"tip": "Validate backend server launches successfully with MPS fallback for 2 minutes. This ensures that the Flask/GraphQL backend is properly installed and can start (will auto-terminate after 2 minutes).",
				"commands": [
					"cd demo/backend/server",
					"timeout 120 PYTORCH_ENABLE_MPS_FALLBACK=1 APP_ROOT='$(pwd)/../../../' API_URL=http://localhost:7263 MODEL_SIZE=base_plus DATA_PATH='$(pwd)/../../data' DEFAULT_VIDEO_PATH=gallery/05_default_juggle.mp4 gunicorn --worker-class gthread app:app --workers 1 --threads 2 --bind 0.0.0.0:7263 --timeout 60 || true",
					"cd ../../../"
				]
			},
			{
				"action": "bash",
				"tip": "Validate that vos_inference.py can be imported and run help message (ensures core research functionality is working).",
				"commands": [
					"python tools/vos_inference.py --help || true"
				]
			},
			{
				"action": "bash",
				"tip": "Validate import of core library, verify CUDA extension warning is handled gracefully, and show version.",
				"commands": [
					"python -c \"import sam2; print('sam2 import successful, version:', getattr(sam2, '__version__', 'unknown'))\""
				]
			},
			{
				"action": "bash",
				"tip": "Install Node.js dependencies for the frontend in demo/frontend, and build the frontend for development.",
				"commands": [
					"cd demo/frontend",
					"yarn install",
					"yarn build",
					"cd ../../.."
				]
			},
			{
				"action": "bash",
				"tip": "Launch the frontend dev server on port 7262 for 2 minutes as a validation of React/Vite setup (auto-terminate).",
				"commands": [
					"cd demo/frontend",
					"timeout 120 yarn dev --port 7262 || true",
					"cd ../../.."
				]
			},
			{
				"action": "bash",
				"tip": "Display usage instructions for running backend and frontend, as well as for VOS inference and evaluation scripts.",
				"commands": [
					"echo 'SAM 2 Setup Complete!'",
					"echo 'To run the backend server with MPS support: '",
					"echo '  cd demo/backend/server'",
					"echo '  PYTORCH_ENABLE_MPS_FALLBACK=1 APP_ROOT=\"$(pwd)/../../../\" API_URL=http://localhost:7263 MODEL_SIZE=base_plus DATA_PATH=\"$(pwd)/../../data\" DEFAULT_VIDEO_PATH=gallery/05_default_juggle.mp4 gunicorn --worker-class gthread app:app --workers 1 --threads 2 --bind 0.0.0.0:7263 --timeout 60'",
					"echo 'To run the frontend dev server:'",
					"echo '  cd demo/frontend'",
					"echo '  yarn dev --port 7262'",
					"echo 'To run VOS inference:'",
					"echo '  python tools/vos_inference.py --help '",
					"echo 'To evaluate predictions on SA-V:'",
					"echo '  python sav_dataset/sav_evaluator.py --help'",
					"echo 'For training, see training/README.md and use: python training/train.py -h'",
					"echo 'Check README.md and INSTALL.md for advanced options (e.g., Docker, CUDA extension, dataset details)'"
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
			}
		];
		}
		return steps;
		};
		
		export default install;
		export {install}