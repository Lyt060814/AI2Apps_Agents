import argparse
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import os
import json

def get_ChemT5(task: str, query: str) -> str:
	"""
	Generates a chemical description, reaction prediction, or molecule design
	based on the specified task and input.

	Args:
		task: The task to perform. One of "Reaction Prediction", 
		      "Text-Based Molecule Design", or "Molecule Captioning".
		query: The input string for the task.

	Returns:
		A string containing the generated output.
	"""
	max_length = 512
	num_beams = 10

	model_path = "/tmp/multitask-text-and-chemistry-t5-base-augm"
	
	try:
		tokenizer = AutoTokenizer.from_pretrained(model_path)
		model = AutoModelForSeq2SeqLM.from_pretrained(model_path)
	except OSError:
		print(f"Error: Model not found at path '{model_path}'.")
		print("Please ensure you are running the script from the project root directory and the model is present.")
		exit(1)


	task_prefixes = {
		"Reaction Prediction": "Predict the product of the following reaction: ",
		"Text-Based Molecule Design": "Write in SMILES the described molecule: ",
		"Molecule Captioning": "Caption the following SMILES: "
	}

	if task not in task_prefixes:
		print(f"Error: Invalid task: {task}. Must be one of {list(task_prefixes.keys())}")
		exit(1)
	
	input_text = task_prefixes[task] + query

	# Tokenize and generate
	inputs = tokenizer(input_text, return_tensors="pt")
	output_ids = model.generate(input_ids=inputs["input_ids"], max_length=max_length, num_beams=num_beams)
	
	# Decode and clean the output
	output = tokenizer.decode(output_ids[0], skip_special_tokens=True)
	
	return output.strip()

if __name__ == "__main__":
	tasks = ["Reaction Prediction", "Text-Based Molecule Design", "Molecule Captioning"]
	parser = argparse.ArgumentParser(
		description="Perform various chemistry tasks using the ChemT5 model.",
		formatter_class=argparse.RawTextHelpFormatter
	)
	parser.add_argument(
		"--task",
		type=str,
		required=True,
		choices=tasks,
		help="The task to perform. Choose from: 'Reaction Prediction', 'Text-Based Molecule Design', 'Molecule Captioning'"
	)
	parser.add_argument(
		"--input",
		type=str,
		required=True,
		help="The input string for the task.\nExample: --input \"CCO\" for Molecule Captioning."
	)
	
	args = parser.parse_args()
	
	output = get_ChemT5(args.task, args.input)
	
	print("---OUTPUT_START---")
	print(output)
	print("---OUTPUT_END---")

	# Log the result to result.json
	result_file_path = os.path.join(os.path.dirname(__file__), 'result.json')

	# Load existing data
	if os.path.exists(result_file_path) and os.path.getsize(result_file_path) > 0:
		with open(result_file_path, 'r') as f:
			try:
				results_data = json.load(f)
				if not isinstance(results_data, list):
					results_data = []
			except json.JSONDecodeError:
				results_data = []
	else:
		results_data = []

	# Prepare new entry based on task
	info_dict = None

	if args.task == 'Molecule Captioning':
		info_dict = {"SMILES": args.input, "description": output}
	elif args.task == 'Text-Based Molecule Design':
		info_dict = {"description": args.input, "SMILES": output}
	elif args.task == 'Reaction Prediction':
		info_dict = {"reaction": args.input, "SMILES": output}

	if info_dict:
		new_entry = {"task": args.task, "info": info_dict}
		results_data.append(new_entry)

		# Save updated data
		with open(result_file_path, 'w') as f:
			json.dump(results_data, f, indent=4)
