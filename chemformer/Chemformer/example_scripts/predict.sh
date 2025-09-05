#!/bin/bash

python -m molbart.predict \
  data_path=reactants.txt \
  vocabulary_path=bart_vocab_downstream.json \
  model_path=/tmp/combined-pretrained-chemformer/pretrained_v2.ckpt \
  task=forward_prediction \
  output_sampled_smiles=predicted_products.csv \
  batch_size=64 \
  n_beams=1 \
  n_gpus=0 \
  data_device=cpu