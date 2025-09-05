# Comprehensive Setup Guide
		
		This guide combines information from multiple project documentation files.
		
		---
		
		## 📖 Project Overview

### From README.md

*Source: `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/README.md`*

**Status:** Archive (code is provided as-is, no updates expected)

#### Jukebox
Code for "Jukebox: A Generative Model for Music"

[Paper](https://arxiv.org/abs/2005.00341) 
[Blog](https://openai.com/blog/jukebox) 
[Explorer](http://jukebox.openai.com/) 
[Colab](https://colab.research.google.com/github/openai/jukebox/blob/master/jukebox/Interacting_with_Jukebox.ipynb) 

#### Install
Install the conda package manager from https://docs.conda.io/en/latest/miniconda.html    
    
``` 
#### Required: Sampling
conda create --name jukebox python=3.7.5
conda activate jukebox
conda install mpi4py=3.0.3 # if this fails, try: pip install mpi4py==3.0.3
conda install pytorch=1.4 torchvision=0.5 cudatoolkit=10.0 -c pytorch
git clone https://github.com/openai/jukebox.git
cd jukebox
pip install -r requirements.txt
pip install -e .

#### Required: Training
conda install av=7.0.01 -c conda-forge 
pip install ./tensorboardX
 
#### Optional: Apex for faster training with fused_adam
conda install pytorch=1.1 torchvision=0.3 cudatoolkit=10.0 -c pytorch
pip install -v --no-cache-dir --global-option="--cpp_ext" --global-option="--cuda_ext" ./apex
```

#### Sampling
## Sampling from scratch
To sample normally, run the following command. Model can be `5b`, `5b_lyrics`, `1b_lyrics`
``` 
python jukebox/sample.py --model=5b_lyrics --name=sample_5b --levels=3 --sample_length_in_seconds=20 \
--total_sample_length_in_seconds=180 --sr=44100 --n_samples=6 --hop_fraction=0.5,0.5,0.125
```
``` 
python jukebox/sample.py --model=1b_lyrics --name=sample_1b --levels=3 --sample_length_in_seconds=20 \
--total_sample_length_in_seconds=180 --sr=44100 --n_samples=16 --hop_fraction=0.5,0.5,0.125
```
The above generates the first `sample_length_in_seconds` seconds of audio from a song of total length `total_sample_length_in_seconds`.
To use multiple GPU's, launch the above scripts as `mpiexec -n {ngpus} python jukebox/sample.py ...` so they use `{ngpus}`

The samples decoded from each level are stored in `{name}/level_{level}`. 
You can also view the samples as an html with the aligned lyrics under `{name}/level_{level}/index.html`. 
Run `python -m http.server` and open the html through the server to see the lyrics animate as the song plays.  
A summary of all sampling data including zs, x, labels and sampling_kwargs is stored in `{name}/level_{level}/data.pth.tar`.

The hps are for a V100 GPU with 16 GB GPU memory. The `1b_lyrics`, `5b`, and `5b_lyrics` top-level priors take up 
3.8 GB, 10.3 GB, and 11.5 GB, respectively. The peak memory usage to store transformer key, value cache is about 400 MB 
for `1b_lyrics` and 1 GB for `5b_lyrics` per sample. If you are having trouble with CUDA OOM issues, try `1b_lyrics` or 
decrease `max_batch_size` in sample.py, and `--n_samples` in the script call.

On a V100, it takes about 3 hrs to fully sample 20 seconds of music. Since this is a long time, it is recommended to use `n_samples > 1` so you can generate as many samples as possible in parallel. The 1B lyrics and upsamplers can process 16 samples at a time, while 5B can fit only up to 3. Since the vast majority of time is spent on upsampling, we recommend using a multiple of 3 less than 16 like `--n_samples 15` for `5b_lyrics`. This will make the top-level generate samples in groups of three while upsampling is done in one pass.

To continue sampling from already generated codes for a longer duration, you can run
```
python jukebox/sample.py --model=5b_lyrics --name=sample_5b --levels=3 --mode=continue \
--codes_file=sample_5b/level_0/data.pth.tar --sample_length_in_seconds=40 --total_sample_length_in_seconds=180 \
--sr=44100 --n_samples=6 --hop_fraction=0.5,0.5,0.125
```
Here, we take the 20 seconds samples saved from the first sampling run at `sample_5b/level_0/data.pth.tar` and continue by adding 20 more seconds. 

You could also continue directly from the level 2 saved outputs, just pass `--codes_file=sample_5b/level_2/data.pth.tar`.
 Note this will upsample the full 40 seconds song at the end.

If you stopped sampling at only the first level and want to upsample the saved codes, you can run
```
python jukebox/sample.py --model=5b_lyrics --name=sample_5b --levels=3 --mode=upsample \
--codes_file=sample_5b/level_2/data.pth.tar --sample_length_in_seconds=20 --total_sample_length_in_seconds=180 \
--sr=44100 --n_samples=6 --hop_fraction=0.5,0.5,0.125
```
Here, we take the 20 seconds samples saved from the first sampling run at `sample_5b/level_2/data.pth.tar` and upsample the lower two levels.

## Prompt with your own music
If you want to prompt the model with your own creative piece or any other music, first save them as wave files and run
```
python jukebox/sample.py --model=5b_lyrics --name=sample_5b_prompted --levels=3 --mode=primed \
--audio_file=path/to/recording.wav,awesome-mix.wav,fav-song.wav,etc.wav --prompt_length_in_seconds=12 \
--sample_length_in_seconds=20 --total_sample_length_in_seconds=180 --sr=44100 --n_samples=6 --hop_fraction=0.5,0.5,0.125
```
This will load the four files, tile them to fill up to `n_samples` batch size, and prime the model with the first `prompt_length_in_seconds` seconds.

#### Training
## VQVAE
To train a small vqvae, run
```
mpiexec -n {ngpus} python jukebox/train.py --hps=small_vqvae --name=small_vqvae --sample_length=262144 --bs=4 \
--audio_files_dir={audio_files_dir} --labels=False --train --aug_shift --aug_blend
```
Here, `{audio_files_dir}` is the directory in which you can put the audio files for your dataset, and `{ngpus}` is number of GPU's you want to use to train. 
The above trains a two-level VQ-VAE with `downs_t = (5,3)`, and `strides_t = (2, 2)` meaning we downsample the audio by `2**5 = 32` to get the first level of codes, and `2**8 = 256` to get the second level codes.  
Checkpoints are stored in the `logs` folder. You can monitor the training by running Tensorboard
```
tensorboard --logdir logs
```
    
## Prior
### Train prior or upsamplers
Once the VQ-VAE is trained, we can restore it from its saved checkpoint and train priors on the learnt codes. 
To train the top-level prior, we can run

```
mpiexec -n {ngpus} python jukebox/train.py --hps=small_vqvae,small_prior,all_fp16,cpu_ema --name=small_prior \
--sample_length=2097152 --bs=4 --audio_files_dir={audio_files_dir} --labels=False --train --test --aug_shift --aug_blend \
--restore_vqvae=logs/small_vqvae/checkpoint_latest.pth.tar --prior --levels=2 --level=1 --weight_decay=0.01 --save_iters=1000
```

To train the upsampler, we can run
```
mpiexec -n {ngpus} python jukebox/train.py --hps=small_vqvae,small_upsampler,all_fp16,cpu_ema --name=small_upsampler \
--sample_length=262144 --bs=4 --audio_files_dir={audio_files_dir} --labels=False --train --test --aug_shift --aug_blend \
--restore_vqvae=logs/small_vqvae/checkpoint_latest.pth.tar --prior --levels=2 --level=0 --weight_decay=0.01 --save_iters=1000
```
We pass `sample_length = n_ctx * downsample_of_level` so that after downsampling the tokens match the n_ctx of the prior hps. 
Here, `n_ctx = 8192` and `downsamples = (32, 256)`, giving `sample_lengths = (8192 * 32, 8192 * 256) = (65536, 2097152)` respectively for the bottom and top level. 

### Learning rate annealing
To get the best sample quality anneal the learning rate to 0 near the end of training. To do so, continue training from the latest 
checkpoint and run with
```
--restore_prior="path/to/checkpoint" --lr_use_linear_decay --lr_start_linear_decay={already_trained_steps} --lr_decay={decay_steps_as_needed}
```

### Reuse pre-trained VQ-VAE and train top-level prior on new dataset from scratch.
#### Train without labels
Our pre-trained VQ-VAE can produce compressed codes for a wide variety of genres of music, and the pre-trained upsamplers 
can upsample them back to audio that sound very similar to the original audio.
To re-use these for a new dataset of your choice, you can retrain just the top-level  

To train top-level on a new dataset, run
```
mpiexec -n {ngpus} python jukebox/train.py --hps=vqvae,small_prior,all_fp16,cpu_ema --name=pretrained_vqvae_small_prior \
--sample_length=1048576 --bs=4 --aug_shift --aug_blend --audio_files_dir={audio_files_dir} \
--labels=False --train --test --prior --levels=3 --level=2 --weight_decay=0.01 --save_iters=1000
```
Training the `small_prior` with a batch size of 2, 4, and 8 requires 6.7 GB, 9.3 GB, and 15.8 GB of GPU memory, respectively. A few days to a week of training typically yields reasonable samples when the dataset is homogeneous (e.g. all piano pieces, songs of the same style, etc).

Near the end of training, follow [this](#learning-rate-annealing) to anneal the learning rate to 0

#### Sample from new model
You can then run sample.py with the top-level of our models replaced by your new model. To do so,
- Add an entry `my_model=("vqvae", "upsampler_level_0", "upsampler_level_1", "small_prior")` in `MODELS` in `make_models.py`. 
- Update the `small_prior` dictionary in `hparams.py` to include `restore_prior='path/to/checkpoint'`. If you
you changed any hps directly in the command line script (eg:`heads`), make sure to update them in the dictionary too so 
that `make_models` restores our checkpoint correctly.
- Run sample.py as outlined in the sampling section, but now with `--model=my_model` 

For example, let's say we trained `small_vqvae`, `small_prior`, and `small_upsampler` under `/path/to/jukebox/logs`. In `make_models.py`, we are going to declare a tuple of the new models as `my_model`.
```
MODELS = {
    '5b': ("vqvae", "upsampler_level_0", "upsampler_level_1", "prior_5b"),
    '5b_lyrics': ("vqvae", "upsampler_level_0", "upsampler_level_1", "prior_5b_lyrics"),
    '1b_lyrics': ("vqvae", "upsampler_level_0", "upsampler_level_1", "prior_1b_lyrics"),
    'my_model': ("my_small_vqvae", "my_small_upsampler", "my_small_prior"),
}
```

Next, in `hparams.py`, we add them to the registry with the corresponding `restore_`paths and any other command line options used during training. Another important note is that for top-level priors with lyric conditioning, we have to locate a self-attention layer that shows alignment between the lyric and music tokens. Look for layers where `prior.prior.transformer._attn_mods[layer].attn_func` is either 6 or 7. If your model is starting to sing along lyrics, it means some layer, head pair has learned alignment. Congrats!
```
my_small_vqvae = Hyperparams(
    restore_vqvae='/path/to/jukebox/logs/small_vqvae/checkpoint_some_step.pth.tar',
)
my_small_vqvae.update(small_vqvae)
HPARAMS_REGISTRY["my_small_vqvae"] = my_small_vqvae

my_small_prior = Hyperparams(
    restore_prior='/path/to/jukebox/logs/small_prior/checkpoint_latest.pth.tar',
    level=1,
    labels=False,
    # TODO For the two lines below, if `--labels` was used and the model is
    # trained with lyrics, find and enter the layer, head pair that has learned
    # alignment.
    alignment_layer=47,
    alignment_head=0,
)
my_small_prior.update(small_prior)
HPARAMS_REGISTRY["my_small_prior"] = my_small_prior

my_small_upsampler = Hyperparams(
    restore_prior='/path/to/jukebox/logs/small_upsampler/checkpoint_latest.pth.tar',
    level=0,
    labels=False,
)
my_small_upsampler.update(small_upsampler)
HPARAMS_REGISTRY["my_small_upsampler"] = my_small_upsampler
```

#### Train with labels 
To train with you own metadata for your audio files, implement `get_metadata` in `data/files_dataset.py` to return the 
`artist`, `genre` and `lyrics` for a given audio file. For now, you can pass `''` for lyrics to not use any lyrics.

For training with labels, we'll use `small_labelled_prior` in `hparams.py`, and we set `labels=True,labels_v3=True`. 
We use 2 kinds of labels information:
- Artist/Genre: 
  - For each file, we return an artist_id and a list of genre_ids. The reason we have a list and not a single genre_id 
  is that in v2, we split genres like `blues_rock` into a bag of words `[blues, rock]`, and we pass atmost 
  `max_bow_genre_size` of those, in `v3` we consider it as a single word and just set `max_bow_genre_size=1`.
  - Update the `v3_artist_ids` and `v3_genre_ids` to use ids from your new dataset. 
  - In `small_labelled_prior`, set the hps `y_bins = (number_of_genres, number_of_artists)` and `max_bow_genre_size=1`. 
- Timing: 
  - For each chunk of audio, we return the `total_length` of the song, the `offset` the current audio chunk is at and 
  the `sample_length` of the audio chunk. We have three timing embeddings: total_length, our current position, and our 
  current position as a fraction of the total length, and we divide the range of these values into `t_bins` discrete bins. 
  - In `small_labelled_prior`, set the hps `min_duration` and `max_duration` to be the shortest/longest duration of audio 
  files you want for your dataset, and `t_bins` for how many bins you want to discretize timing information into. Note 
  `min_duration * sr` needs to be at least `sample_length` to have an audio chunk in it.

After these modifications, to train a top-level with labels, run
```
mpiexec -n {ngpus} python jukebox/train.py --hps=vqvae,small_labelled_prior,all_fp16,cpu_ema --name=pretrained_vqvae_small_prior_labels \
--sample_length=1048576 --bs=4 --aug_shift --aug_blend --audio_files_dir={audio_files_dir} \
--labels=True --train --test --prior --levels=3 --level=2 --weight_decay=0.01 --save_iters=1000
```

For sampling, follow same instructions as [above](#sample-from-new-model) but use `small_labelled_prior` instead of `small_prior`.  

#### Train with lyrics
To train in addition with lyrics, update `get_metadata` in `data/files_dataset.py` to return `lyrics` too.
For training with lyrics, we'll use `small_single_enc_dec_prior` in `hparams.py`. 
- Lyrics: 
  - For each file, we linearly align the lyric characters to the audio, find the position in lyric that corresponds to 
  the midpoint of our audio chunk, and pass a window of `n_tokens` lyric characters centred around that. 
  - In `small_single_enc_dec_prior`, set the hps `use_tokens=True` and `n_tokens` to be the number of lyric characters 
  to use for an audio chunk. Set it according to the `sample_length` you're training on so that its large enough that 
  the lyrics for an audio chunk are almost always found inside a window of that size.
  - If you use a non-English vocabulary, update `text_processor.py` with your new vocab and set
  `n_vocab = number of characters in vocabulary` accordingly in `small_single_enc_dec_prior`. In v2, we had a `n_vocab=80` 
  and in v3 we missed `+` and so `n_vocab=79` of characters. 

After these modifications, to train a top-level with labels and lyrics, run
```
mpiexec -n {ngpus} python jukebox/train.py --hps=vqvae,small_single_enc_dec_prior,all_fp16,cpu_ema --name=pretrained_vqvae_small_single_enc_dec_prior_labels \
--sample_length=786432 --bs=4 --aug_shift --aug_blend --audio_files_dir={audio_files_dir} \
--labels=True --train --test --prior --levels=3 --level=2 --weight_decay=0.01 --save_iters=1000
```
To simplify hps choices, here we used a `single_enc_dec` model like the `1b_lyrics` model that combines both encoder and 
decoder of the transformer into a single model. We do so by merging the lyric vocab and vq-vae vocab into a single 
larger vocab, and flattening the lyric tokens and the vq-vae codes into a single sequence of length `n_ctx + n_tokens`. 
This uses `attn_order=12` which includes `prime_attention` layers with keys/values from lyrics and queries from audio. 
If you instead want to use a model with the usual encoder-decoder style transformer, use `small_sep_enc_dec_prior`.

For sampling, follow same instructions as [above](#sample-from-new-model) but use `small_single_enc_dec_prior` instead of 
`small_prior`. To also get the alignment between lyrics and samples in the saved html, you'll need to set `alignment_layer` 
and `alignment_head` in `small_single_enc_dec_prior`. To find which layer/head is best to use, run a forward pass on a training example,
save the attention weight tensors for all prime_attention layers, and pick the (layer, head) which has the best linear alignment 
pattern between the lyrics keys and music queries. 

### Fine-tune pre-trained top-level prior to new style(s)
Previously, we showed how to train a small top-level prior from scratch. Assuming you have a GPU with at least 15 GB of memory and support for fp16, you could fine-tune from our pre-trained 1B top-level prior. Here are the steps:

- Support `--labels=True` by implementing `get_metadata` in `jukebox/data/files_dataset.py` for your dataset.
- Add new entries in `jukebox/data/ids`. We recommend replacing existing mappings (e.g. rename `"unknown"`, etc with styles of your choice). This uses the pre-trained style vectors as initialization and could potentially save some compute.

After these modifications, run 
```
mpiexec -n {ngpus} python jukebox/train.py --hps=vqvae,prior_1b_lyrics,all_fp16,cpu_ema --name=finetuned \
--sample_length=1048576 --bs=1 --aug_shift --aug_blend --audio_files_dir={audio_files_dir} \
--labels=True --train --test --prior --levels=3 --level=2 --weight_decay=0.01 --save_iters=1000
```
To get the best sample quality, it is recommended to anneal the learning rate in the end. Training the 5B top-level requires GPipe which is not supported in this release.

#### Citation

Please cite using the following bibtex entry:

```
@article{dhariwal2020jukebox,
  title={Jukebox: A Generative Model for Music},
  author={Dhariwal, Prafulla and Jun, Heewoo and Payne, Christine and Kim, Jong Wook and Radford, Alec and Sutskever, Ilya},
  journal={arXiv preprint arXiv:2005.00341},
  year={2020}
}
```

#### License 
[Noncommercial Use License](./LICENSE) 

It covers both released code and weights. 



---

### From README.md

*Source: `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/README.md`*

#### tensorboardX

[![Build Status](https://travis-ci.org/lanpa/tensorboardX.svg?branch=master)](https://travis-ci.org/lanpa/tensorboardX)
[![PyPI version](https://badge.fury.io/py/tensorboardX.svg)](https://badge.fury.io/py/tensorboardX)
[![Downloads](https://img.shields.io/badge/pip--downloads-5K+-brightgreen.svg)](https://bigquery.cloud.google.com/savedquery/966219917372:edb59a0d70c54eb687ab2a9417a778ee)
[![Documentation Status](https://readthedocs.org/projects/tensorboardx/badge/?version=latest)](https://tensorboardx.readthedocs.io/en/latest/?badge=latest)
[![Documentation Status](https://codecov.io/gh/lanpa/tensorboardX/branch/master/graph/badge.svg)](https://codecov.io/gh/lanpa/tensorboardX/)

Write TensorBoard events with simple function call.

* Support `scalar`, `image`, `figure`, `histogram`, `audio`, `text`, `graph`, `onnx_graph`, `embedding`, `pr_curve`, `mesh`, `hyper-parameters`
  and `video` summaries.

* requirement for `demo_graph.py` is tensorboardX>=1.6 and pytorch>=1.1

* [FAQ](https://github.com/lanpa/tensorboardX/wiki)

## Install

Tested on anaconda2 / anaconda3, with PyTorch 1.1.0 / torchvision 0.3 / tensorboard 1.13.0

`pip install tensorboardX`

or build from source:

`git clone https://github.com/lanpa/tensorboardX && cd tensorboardX && python setup.py install`

You can optionally install [`crc32c`](https://github.com/ICRAR/crc32c) to speed up saving a large amount of data.


## Example

* Run the demo script: `python examples/demo.py`
* Use TensorBoard with `tensorboard --logdir runs`  (needs to install TensorFlow)

```python
#### demo.py

import torch
import torchvision.utils as vutils
import numpy as np
import torchvision.models as models
from torchvision import datasets
from tensorboardX import SummaryWriter

resnet18 = models.resnet18(False)
writer = SummaryWriter()
sample_rate = 44100
freqs = [262, 294, 330, 349, 392, 440, 440, 440, 440, 440, 440]

for n_iter in range(100):

    dummy_s1 = torch.rand(1)
    dummy_s2 = torch.rand(1)
    # data grouping by `slash`
    writer.add_scalar('data/scalar1', dummy_s1[0], n_iter)
    writer.add_scalar('data/scalar2', dummy_s2[0], n_iter)

    writer.add_scalars('data/scalar_group', {'xsinx': n_iter * np.sin(n_iter),
                                             'xcosx': n_iter * np.cos(n_iter),
                                             'arctanx': np.arctan(n_iter)}, n_iter)

    dummy_img = torch.rand(32, 3, 64, 64)  # output from network
    if n_iter % 10 == 0:
        x = vutils.make_grid(dummy_img, normalize=True, scale_each=True)
        writer.add_image('Image', x, n_iter)

        dummy_audio = torch.zeros(sample_rate * 2)
        for i in range(x.size(0)):
            # amplitude of sound should in [-1, 1]
            dummy_audio[i] = np.cos(freqs[n_iter // 10] * np.pi * float(i) / float(sample_rate))
        writer.add_audio('myAudio', dummy_audio, n_iter, sample_rate=sample_rate)

        writer.add_text('Text', 'text logged at step:' + str(n_iter), n_iter)

        for name, param in resnet18.named_parameters():
            writer.add_histogram(name, param.clone().cpu().data.numpy(), n_iter)

        # needs tensorboard 0.4RC or later
        writer.add_pr_curve('xoxo', np.random.randint(2, size=100), np.random.rand(100), n_iter)

dataset = datasets.MNIST('mnist', train=False, download=True)
images = dataset.test_data[:100].float()
label = dataset.test_labels[:100]

features = images.view(100, 784)
writer.add_embedding(features, metadata=label, label_img=images.unsqueeze(1))

#### export scalar data to JSON for external processing
writer.export_scalars_to_json("./all_scalars.json")
writer.close()
```

## Screenshots

<img src="screenshots/Demo.gif">

## Tweaks

To add more ticks for the slider (show more image history), check https://github.com/lanpa/tensorboardX/issues/44 or 
https://github.com/tensorflow/tensorboard/pull/1138

## Reference

* [TeamHG-Memex/tensorboard_logger](https://github.com/TeamHG-Memex/tensorboard_logger)
* [dmlc/tensorboard](https://github.com/dmlc/tensorboard)


---

### From README.md

*Source: `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/apex/README.md`*

#### Introduction

This repository holds NVIDIA-maintained utilities to streamline 
mixed precision and distributed training in Pytorch. 
Some of the code here will be included in upstream Pytorch eventually.
The intention of Apex is to make up-to-date utilities available to 
users as quickly as possible.

## Full API Documentation: [https://nvidia.github.io/apex](https://nvidia.github.io/apex)

#### Contents

## 1. Amp:  Automatic Mixed Precision

`apex.amp` is a tool to enable mixed precision training by changing only 3 lines of your script.
Users can easily experiment with different pure and mixed precision training modes by supplying
different flags to `amp.initialize`.

[Webinar introducing Amp](https://info.nvidia.com/webinar-mixed-precision-with-pytorch-reg-page.html)
(The flag `cast_batchnorm` has been renamed to `keep_batchnorm_fp32`).

[API Documentation](https://nvidia.github.io/apex/amp.html)

[Comprehensive Imagenet example](https://github.com/NVIDIA/apex/tree/master/examples/imagenet)

[DCGAN example coming soon...](https://github.com/NVIDIA/apex/tree/master/examples/dcgan)

[Moving to the new Amp API](https://nvidia.github.io/apex/amp.html#transition-guide-for-old-api-users) (for users of the deprecated "Amp" and "FP16_Optimizer" APIs)

## 2. Distributed Training

`apex.parallel.DistributedDataParallel` is a module wrapper, similar to 
`torch.nn.parallel.DistributedDataParallel`.  It enables convenient multiprocess distributed training,
optimized for NVIDIA's NCCL communication library.

[API Documentation](https://nvidia.github.io/apex/parallel.html)

[Python Source](https://github.com/NVIDIA/apex/tree/master/apex/parallel)

[Example/Walkthrough](https://github.com/NVIDIA/apex/tree/master/examples/simple/distributed)

The [Imagenet example](https://github.com/NVIDIA/apex/tree/master/examples/imagenet)
shows use of `apex.parallel.DistributedDataParallel` along with `apex.amp`.

### Synchronized Batch Normalization

`apex.parallel.SyncBatchNorm` extends `torch.nn.modules.batchnorm._BatchNorm` to
support synchronized BN.
It allreduces stats across processes during multiprocess (DistributedDataParallel) training.
Synchronous BN has been used in cases where only a small
local minibatch can fit on each GPU.
Allreduced stats increase the effective batch size for the BN layer to the
global batch size across all processes (which, technically, is the correct
formulation).
Synchronous BN has been observed to improve converged accuracy in some of our research models.

#### Requirements

Python 3

CUDA 9 or newer

PyTorch 0.4 or newer.  The CUDA and C++ extensions require pytorch 1.0 or newer.

We recommend the latest stable release, obtainable from
[https://pytorch.org/](https://pytorch.org/).  We also test against the latest master branch, obtainable from [https://github.com/pytorch/pytorch](https://github.com/pytorch/pytorch).

It's often convenient to use Apex in Docker containers.  Compatible options include:
* [NVIDIA Pytorch containers from NGC](https://ngc.nvidia.com/catalog/containers/nvidia%2Fpytorch), which come with Apex preinstalled.  To use the latest Amp API, you may need to `pip uninstall apex` then reinstall Apex using the **Quick Start** commands below.
* [official Pytorch -devel Dockerfiles](https://hub.docker.com/r/pytorch/pytorch/tags), e.g. `docker pull pytorch/pytorch:nightly-devel-cuda10.0-cudnn7`, in which you can install Apex using the **Quick Start** commands.

See the [Docker example folder](https://github.com/NVIDIA/apex/tree/master/examples/docker) for details.

#### Quick Start

### Linux

For performance and full functionality, we recommend installing Apex with
CUDA and C++ extensions via
```
$ git clone https://github.com/NVIDIA/apex
$ cd apex
$ pip install -v --no-cache-dir --global-option="--cpp_ext" --global-option="--cuda_ext" .
```

Apex also supports a Python-only build (required with Pytorch 0.4) via
```
$ pip install -v --no-cache-dir .
```
A Python-only build omits:
- Fused kernels required to use `apex.optimizers.FusedAdam`.
- Fused kernels required to use `apex.normalization.FusedLayerNorm`.
- Fused kernels that improve the performance and numerical stability of `apex.parallel.SyncBatchNorm`.
- Fused kernels that improve the performance of `apex.parallel.DistributedDataParallel` and `apex.amp`.
`DistributedDataParallel`, `amp`, and `SyncBatchNorm` will still be usable, but they may be slower.

### Windows support
Windows support is experimental, and Linux is recommended.  `pip install -v --no-cache-dir --global-option="--cpp_ext" --global-option="--cuda_ext" .` may work if you were able to build Pytorch from source
on your system.  `pip install -v --no-cache-dir .` (without CUDA/C++ extensions) is more likely to work.  If you installed Pytorch in a Conda environment, make sure to install Apex in that same environment.


---

### From README.md

*Source: `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/apex/apex/RNN/README.md`*

Under construction...


---

### From README.md

*Source: `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/apex/apex/amp/README.md`*

#### amp: Automatic Mixed Precision

## Annotating User Functions

Nearly all PyTorch user code needs nothing more than the two steps
above to use amp. After all, custom layers are built out of simpler
PyTorch components, and amp already can see those.

However, any custom C++ or CUDA code is outside of amp's (default)
view of things. For example, suppose I implemented a new recurrent
cell called a "forgetful recurrent unit" that calls directly into a
CUDA backend:

```python
from backend import FRUBackend

def fru(input, hidden, weight, bias):
    # call to CUDA code
    FRUBackend(input, hidden, weight, bias)
```

In this case, it is possible to get a runtime type mismatch. For
example, you might have `input` in fp16, and `weight` in fp32, and amp
doesn't have the visibility to insert an appropriate cast.

amp exposes two ways to handle "invisible" backend code: function
annotations and explicit registration.

#### Function annotation

The first way to handle backend code is a set of function annotations:

- `@amp.half_function`
- `@amp.float_function`
- `@amp.promote_function`

These correspond to:

- Cast all arguments to fp16
- Cast all argumnets fo fp32
- If there are any type mismatches, cast everything to the widest type

In our example, we believe that the FRU unit is fp16-safe and will get
performance gains from casting its arguments to fp16, so we write:

```python
@amp.half_function
def fru(input, hidden, weight, bias):
    #...
```

#### Explicit registration

The other way to handle backend code is with explicit function
registration:

- `amp.register_half_function(module, function_name)`
- `amp.register_float_function(module, function_name)`
- `amp.register_promote_function(module, function_name)`

When using this API, `module` is the containing class or module for
the function, and `function_name` is the _string_ name of the
function. Note that the function must be registered before the call to
`amp.initalize()`.

For our FRU unit, we can register the backend function directly:

```python
import backend

amp.register_half_function(backend, 'FRUBackend')
```


---

### From README.md

*Source: `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/apex/apex/reparameterization/README.md`*

Under construction...


---

## ⚙️ Setup Configuration

### From setup.py

*Source: `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/setup.py`*

#!/usr/bin/env python
#### -*- coding: utf-8 -*-

import subprocess
import os
from setuptools import setup, find_packages
from setuptools.command.develop import develop
from setuptools.command.install import install

#### Dynamically compile protos
def compileProtoBuf():
    res = subprocess.call(['bash', './compile.sh'])
    assert res == 0, 'cannot compile protobuf'

class PostDevelopCommand(develop):
    """Post-installation for development mode."""
    def run(self):
        compileProtoBuf()
        develop.run(self)


class PostInstallCommand(install):
    """Post-installation for installation mode."""
    def run(self):
        compileProtoBuf()
        import os
        os.system("pip install protobuf numpy six")
        install.run(self)

with open('HISTORY.rst') as history_file:
    history = history_file.read()

preparing_PyPI_package = False
version_git = version = '1.8'

if not preparing_PyPI_package:
    if os.path.exists('.git'):
        sha = subprocess.check_output(['git', 'rev-parse', 'HEAD']).decode('ascii').strip()
        version_git = version_git + '+' + sha[:7]

    with open('tensorboardX/__init__.py', 'a') as f:
        f.write('\n__version__ = "{}"\n'.format(version_git))

requirements = [
    'numpy',
    'protobuf >= 3.6.1',
    'six',
]

test_requirements = [
    'pytest',
    'matplotlib',
    'crc32c',
]

setup(
    name='tensorboardX',
    version=version_git,
    description='TensorBoardX lets you watch Tensors Flow without Tensorflow',
    long_description=history,
    author='Tzu-Wei Huang',
    author_email='huang.dexter@gmail.com',
    url='https://github.com/lanpa/tensorboardX',
    packages=['tensorboardX'],
    include_package_data=True,
    install_requires=requirements,
    license='MIT license',
    zip_safe=False,
    classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Natural Language :: English',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
    ],
    cmdclass={
        'develop': PostDevelopCommand,
        'install': PostInstallCommand,
    },
    test_suite='tests',
    tests_require=test_requirements
)


#### checklist: update History.rst readme.md
#### change preparing_PyPI_package to True
#### remove __version__ = "1.old" in __init__.py
#### commit
#### add tag
#### python setup.py sdist bdist_wheel --universal
#### twine upload dist/*
#### push commit

---

### From setup.py

*Source: `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/setup.py`*

import os

import pkg_resources
from setuptools import setup, find_packages

setup(
    name="jukebox",
    py_modules=["jukebox"],
    version="1.0",
    description="",
    author="OpenAI",
    packages=find_packages(),
    install_requires=[
        str(r)
        for r in pkg_resources.parse_requirements(
            open(os.path.join(os.path.dirname(__file__), "requirements.txt"))
        )
    ],
    include_package_data=True
)


---

## 🔨 Build Instructions

### From requirements.txt

*Source: `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/requirements.txt`*

fire==0.1.3
tqdm==4.45.0
soundfile==0.10.3.post1
unidecode==1.1.1
numba==0.48.0
librosa==0.7.2
mpi4py>=3.0.0

---

### From compile.sh

*Source: `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/compile.sh`*

#!/bin/bash

#### Exit on error
#### set -e

DESIRED_PROTO_VERSION="3.6.1"

#### call protoc direclty, if version is not the desired one, download the desired vesrion.


if [ -f "protoc/bin/protoc" ]; then
  PROTOC_BIN="protoc/bin/protoc"
else
  PROTOC_BIN=`which protoc`
fi

echo "using" $PROTOC_BIN

CURRENT_PROTOC_VER=`${PROTOC_BIN} --version`
if [ -z ${PROTOC_BIN} ] || [[ "$CURRENT_PROTOC_VER" != "libprotoc "$DESIRED_PROTO_VERSION ]]; then
  # Download and use the latest version of protoc.
  if [ "$(uname)" == "Darwin" ]; then
    PROTOC_ZIP="protoc-"$DESIRED_PROTO_VERSION"-osx-x86_64.zip"
  else
    PROTOC_ZIP="protoc-"$DESIRED_PROTO_VERSION"-linux-x86_64.zip"
  fi
  WGET_BIN=`which wget`
  if [[ ! -z ${WGET_BIN} ]]; then
    ${WGET_BIN} https://github.com/protocolbuffers/protobuf/releases/download/v"$DESIRED_PROTO_VERSION"/${PROTOC_ZIP}
    rm -rf protoc
    python -c "import zipfile; zipfile.ZipFile('"${PROTOC_ZIP}"','r').extractall('protoc')"
    PROTOC_BIN=protoc/bin/protoc
    chmod +x ${PROTOC_BIN}
  fi
fi

#### Regenerate
if [[ ! -z ${PROTOC_BIN} ]]; then
  # Delete all existing Python protobuf (*_pb2.py) output
  rm -rf tensorboardX/proto/*pb2*.py
  ${PROTOC_BIN} tensorboardX/proto/*.proto --python_out=.

  echo "Done generating tensorboardX/proto/*pb2*.py"
else
  echo "protoc not installed so can't regenerate tensorboardX/proto/*pb2*.py, using precompiled version."
fi



---

### From RUN_AFTER_PIP_INSTALL

*Source: `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/examples/RUN_AFTER_PIP_INSTALL`*



---

### From setup.py

*Source: `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/apex/setup.py`*

import torch
from setuptools import setup, find_packages
import subprocess

import sys

if not torch.cuda.is_available():
    print("\nWarning: Torch did not find available GPUs on this system.\n",
          "If your intention is to cross-compile, this is not an error.\n")

print("torch.__version__  = ", torch.__version__)
TORCH_MAJOR = int(torch.__version__.split('.')[0])
TORCH_MINOR = int(torch.__version__.split('.')[1])

if TORCH_MAJOR == 0 and TORCH_MINOR < 4:
      raise RuntimeError("Apex requires Pytorch 0.4 or newer.\n" +
                         "The latest stable release can be obtained from https://pytorch.org/")

cmdclass = {}
ext_modules = []

if "--cpp_ext" in sys.argv or "--cuda_ext" in sys.argv:
    if TORCH_MAJOR == 0:
        raise RuntimeError("--cpp_ext requires Pytorch 1.0 or later, "
                           "found torch.__version__ = {}".format(torch.__version__))
    from torch.utils.cpp_extension import BuildExtension
    cmdclass['build_ext'] = BuildExtension

if "--cpp_ext" in sys.argv:
    from torch.utils.cpp_extension import CppExtension
    sys.argv.remove("--cpp_ext")
    ext_modules.append(
        CppExtension('apex_C',
                     ['csrc/flatten_unflatten.cpp',]))

def check_cuda_torch_binary_vs_bare_metal(cuda_dir):
    raw_output = subprocess.check_output([cuda_dir + "/bin/nvcc", "-V"], universal_newlines=True)
    output = raw_output.split()
    release_idx = output.index("release") + 1
    release = output[release_idx].split(".")
    bare_metal_major = release[0]
    bare_metal_minor = release[1][0]
    torch_binary_major = torch.version.cuda.split(".")[0]
    torch_binary_minor = torch.version.cuda.split(".")[1]

    print("\nCompiling cuda extensions with")
    print(raw_output + "from " + cuda_dir + "/bin\n")

    if (bare_metal_major != torch_binary_major) or (bare_metal_minor != torch_binary_minor):
        raise RuntimeError("Cuda extensions are being compiled with a version of Cuda that does " +
                           "not match the version used to compile Pytorch binaries.  " +
                           "Pytorch binaries were compiled with Cuda {}.\n".format(torch.version.cuda) +
                           "In some cases, a minor-version mismatch will not cause later errors:  " +
                           "https://github.com/NVIDIA/apex/pull/323#discussion_r287021798.  "
                           "You can try commenting out this check (at your own risk).")

if "--cuda_ext" in sys.argv:
    from torch.utils.cpp_extension import CUDAExtension
    sys.argv.remove("--cuda_ext")

    if torch.utils.cpp_extension.CUDA_HOME is None:
        raise RuntimeError("--cuda_ext was requested, but nvcc was not found.  Are you sure your environment has nvcc available?  If you're installing within a container from https://hub.docker.com/r/pytorch/pytorch, only images whose names contain 'devel' will provide nvcc.")
    else:
        check_cuda_torch_binary_vs_bare_metal(torch.utils.cpp_extension.CUDA_HOME)

        # Set up macros for forward/backward compatibility hack around
        # https://github.com/pytorch/pytorch/commit/4404762d7dd955383acee92e6f06b48144a0742e
        version_ge_1_1 = []
        if (TORCH_MAJOR > 1) or (TORCH_MAJOR == 1 and TORCH_MINOR > 0):
            version_ge_1_1 = ['-DVERSION_GE_1_1']

        ext_modules.append(
            CUDAExtension(name='amp_C',
                          sources=['csrc/amp_C_frontend.cpp',
                                   'csrc/multi_tensor_scale_kernel.cu',
                                   'csrc/multi_tensor_axpby_kernel.cu',
                                   'csrc/multi_tensor_l2norm_kernel.cu',
                                   'csrc/multi_tensor_lamb_stage_1.cu',
                                   'csrc/multi_tensor_lamb_stage_2.cu'],
                          extra_compile_args={'cxx': ['-O3'],
                                              'nvcc':['-lineinfo',
                                                      '-O3',
                                                      # '--resource-usage',
                                                      '--use_fast_math']}))
        ext_modules.append(
            CUDAExtension(name='fused_adam_cuda',
                          sources=['csrc/fused_adam_cuda.cpp',
                                   'csrc/fused_adam_cuda_kernel.cu'],
                          extra_compile_args={'cxx': ['-O3',],
                                              'nvcc':['-O3',
                                                      '--use_fast_math']}))
        ext_modules.append(
            CUDAExtension(name='syncbn',
                          sources=['csrc/syncbn.cpp',
                                   'csrc/welford.cu']))
        ext_modules.append(
            CUDAExtension(name='fused_layer_norm_cuda',
                          sources=['csrc/layer_norm_cuda.cpp',
                                   'csrc/layer_norm_cuda_kernel.cu'],
                          extra_compile_args={'cxx': ['-O3'] + version_ge_1_1,
                                              'nvcc':['-maxrregcount=50',
                                                      '-O3',
                                                      '--use_fast_math'] + version_ge_1_1}))

setup(
    name='apex',
    version='0.1',
    packages=find_packages(exclude=('build',
                                    'csrc',
                                    'include',
                                    'tests',
                                    'dist',
                                    'docs',
                                    'tests',
                                    'examples',
                                    'apex.egg-info',)),
    description='PyTorch Extensions written by NVIDIA',
    ext_modules=ext_modules,
    cmdclass=cmdclass,
)


---

### From setup.cfg

*Source: `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/setup.cfg`*

[metadata]
license_file = LICENSE

[bdist_wheel]
universal = 1


---

## 🚀 Deployment Guide

### From Dockerfile

*Source: `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/apex/examples/docker/Dockerfile`*

#### Base image must at least have pytorch and CUDA installed.
ARG BASE_IMAGE=nvcr.io/nvidia/pytorch:19.03-py3
FROM $BASE_IMAGE
ARG BASE_IMAGE
RUN echo "Installing Apex on top of ${BASE_IMAGE}"
#### make sure we don't overwrite some existing directory called "apex"
WORKDIR /tmp/unique_for_apex
#### uninstall Apex if present, twice to make absolutely sure :)
RUN pip uninstall -y apex || :
RUN pip uninstall -y apex || :
#### SHA is something the user can touch to force recreation of this Docker layer,
#### and therefore force cloning of the latest version of Apex
RUN SHA=ToUcHMe git clone https://github.com/NVIDIA/apex.git
WORKDIR /tmp/unique_for_apex/apex
RUN pip install -v --no-cache-dir --global-option="--cpp_ext" --global-option="--cuda_ext" .
WORKDIR /workspace


---

## 📚 Additional Documentation

### From Makefile

*Source: `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/docs/Makefile`*

#### Minimal makefile for Sphinx documentation
#### # You can set these variables from the command line.
SPHINXOPTS    =
SPHINXBUILD   = sphinx-build
SPHINXPROJ    = tensorboardX
SOURCEDIR     = .
BUILDDIR      = _build

#### Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: help Makefile

#### Catch-all target: route all unknown targets to Sphinx using the new
#### "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

---

### From conf.py

*Source: `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/docs/conf.py`*

#!/usr/bin/env python3
#### -*- coding: utf-8 -*-
#### # tensorboardX documentation build configuration file, created by
#### sphinx-quickstart on Wed Aug  9 01:38:01 2017.
#### # This file is execfile()d with the current directory set to its
#### containing dir.
#### # Note that not all possible configuration values are present in this
#### autogenerated file.
#### # All configuration values have a default; values that are commented out
#### serve to show the default.

#### If extensions (or modules to document with autodoc) are in another directory,
#### add these directories to sys.path here. If the directory is relative to the
#### documentation root, use os.path.abspath to make it absolute, like shown here.
#### import os
import sys
#### sys.path.insert(0, os.path.abspath('.'))
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
#import tensorboard #uncomment to shadow pip installation
#### -- General configuration ------------------------------------------------

#### If your documentation needs a minimal Sphinx version, state it here.
#### # needs_sphinx = '1.0'

#### Add any Sphinx extension module names here, as strings. They can be
#### extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
#### ones.
extensions = ['sphinx.ext.autodoc',
    'sphinx.ext.mathjax',
    'sphinx.ext.intersphinx',
    'sphinx.ext.napoleon',
    'sphinx.ext.viewcode',
    'sphinx.ext.githubpages']

#### Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

#### The suffix(es) of source filenames.
#### You can specify multiple suffix as a list of string:
#### # source_suffix = ['.rst', '.md']
source_suffix = '.rst'

#### The master toctree document.
master_doc = 'index'

#### General information about the project.
project = 'tensorboardX'
copyright = '2017, tensorboardX Contributors'
author = 'tensorboardX Contributors'

#### The version info for the project you're documenting, acts as replacement for
#### |version| and |release|, also used in various other places throughout the
#### built documents.
#### # The short X.Y version.
version = ''
#### The full version, including alpha/beta/rc tags.
release = ''

#### The language for content autogenerated by Sphinx. Refer to documentation
#### for a list of supported languages.
#### # This is also used if you do content translation via gettext catalogs.
#### Usually you set "language" from the command line for these cases.
language = None

#### List of patterns, relative to source directory, that match files and
#### directories to ignore when looking for source files.
#### This patterns also effect to html_static_path and html_extra_path
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

#### The name of the Pygments (syntax highlighting) style to use.
pygments_style = 'sphinx'

#### If true, `todo` and `todoList` produce output, else they produce nothing.
todo_include_todos = False


#### -- Options for HTML output ----------------------------------------------

#### The theme to use for HTML and HTML Help pages.  See the documentation for
#### a list of builtin themes.
#### html_theme = 'sphinx_rtd_theme'

#### Theme options are theme-specific and customize the look and feel of a theme
#### further.  For a list of options available for each theme, see the
#### documentation.
#### # html_theme_options = {}

#### Add any paths that contain custom static files (such as style sheets) here,
#### relative to this directory. They are copied after the builtin static files,
#### so a file named "default.css" will overwrite the builtin "default.css".
#### html_static_path = ['_static']


#### -- Options for HTMLHelp output ------------------------------------------

#### Output file base name for HTML help builder.
htmlhelp_basename = 'tensorboardXdoc'


#### -- Options for LaTeX output ---------------------------------------------

latex_elements = {
    # The paper size ('letterpaper' or 'a4paper').
    #
    # 'papersize': 'letterpaper',

    # The font size ('10pt', '11pt' or '12pt').
    #
    # 'pointsize': '10pt',

    # Additional stuff for the LaTeX preamble.
    #
    # 'preamble': '',

    # Latex figure (float) alignment
    #
    # 'figure_align': 'htbp',
}

#### Grouping the document tree into LaTeX files. List of tuples
#### (source start file, target name, title,
#### author, documentclass [howto, manual, or own class]).
latex_documents = [
    (master_doc, 'tensorboardX.tex', 'tensorboardX Documentation',
     'tensorboardX Contributors', 'manual'),
]


#### -- Options for manual page output ---------------------------------------

#### One entry per manual page. List of tuples
#### (source start file, name, description, authors, manual section).
man_pages = [
    (master_doc, 'tensorboardX', 'tensorboardX Documentation',
     [author], 1)
]


#### -- Options for Texinfo output -------------------------------------------

#### Grouping the document tree into Texinfo files. List of tuples
#### (source start file, target name, title, author,
#### dir menu entry, description, category)
texinfo_documents = [
    (master_doc, 'tensorboardX', 'tensorboardX Documentation',
     author, 'tensorboardX', 'One line description of project.',
     'Miscellaneous'),
]




#### Example configuration for intersphinx: refer to the Python standard library.
intersphinx_mapping = {
    'python':('https://docs.python.org/3', None),
    'numpy': ('http://docs.scipy.org/doc/numpy/', None),
    'torch': ('http://pytorch.org/docs/master', None),
    'matplotlib': ('http://matplotlib.sourceforge.net/', None),
    }


---

### From index.rst

*Source: `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/docs/index.rst`*

.. tensorboardX documentation master file, created by
   sphinx-quickstart on Wed Aug  9 01:38:01 2017.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to tensorboardX's documentation!
===============================================

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   tensorboard
   utils
   tutorial
   tutorial_zh

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`


---

### From tutorial.rst

*Source: `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/docs/tutorial.rst`*

Tutorials
*********

What is tensorboard X?
----------------------

At first, the package was named tensorboard, and soon there are issues about
name confliction. The first alternative name came to my mind is
tensorboard-pytorch, but in order to make it more general, I chose tensorboardX
which stands for tensorboard for X.

Google's tensorflow's tensorboard is a web server to serve visualizations of the
training progress of a neural network, it visualizes scalar values, images,
text, etc.; these information are saved as events in tensorflow. It's a pity
that other deep learning frameworks lack of such tool, so there are already
packages letting users to log the events without tensorflow; however they only
provides basic functionalities. The purpose of this package is to let
researchers use a simple interface to log events within PyTorch (and then show
visualization in tensorboard). This package currently supports logging scalar,
image, audio, histogram, text, embedding, and the route of back-propagation. The
following manual is tested on Ubuntu and Mac, and the environment are anaconda's
python2 and python3.


Create a summary writer
-----------------------
Before logging anything, we need to create a writer instance. This can be done with:

.. code-block:: python

    from tensorboardX import SummaryWriter
    #SummaryWriter encapsulates everything
    writer = SummaryWriter('runs/exp-1')
    #creates writer object. The log will be saved in 'runs/exp-1'
    writer2 = SummaryWriter()
    #creates writer2 object with auto generated file name, the dir will be something like 'runs/Aug20-17-20-33'
    writer3 = SummaryWriter(comment='3x learning rate')
    #creates writer3 object with auto generated file name, the comment will be appended to the filename. The dir will be something like 'runs/Aug20-17-20-33-3xlearning rate'

Each subfolder will be treated as different experiments in tensorboard. Each
time you re-run the experiment with different settings, you should change the
name of the sub folder such as ``runs/exp2``, ``runs/myexp`` so that you can
easily compare different experiment settings. Type ``tensorboard runs`` to compare
different runs in tensorboard.


General api format
------------------
.. code-block:: python

    add_something(tag name, object, iteration number)


Add scalar
-----------
Scalar value is the most simple data type to deal with. Mostly we save the loss
value of each training step, or the accuracy after each epoch. Sometimes I save
the corresponding learning rate as well. It's cheap to save scalar value. Just
log anything you think is important. To log a scalar value, use
``writer.add_scalar('myscalar', value, iteration)``. Note that the program complains
if you feed a PyTorch tensor. Remember to extract the scalar value by
``x.item()`` if ``x`` is a torch scalar tensor.


Add image
---------
An image is represented as 3-dimensional tensor. The simplest case is save one
image at a time. In this case, the image should be passed as a 3-dimension
tensor of size ``[3, H, W]``. The three dimensions correspond to R, G, B channel of
an image. After your image is computed, use ``writer.add_image('imresult', x,
iteration)`` to save the image. If you have a batch of images to show, use
``torchvision``'s ``make_grid`` function to prepare the image array and send the result
to ``add_image(...)`` (``make_grid`` takes a 4D tensor and returns tiled images in 3D tensor).

.. Note::
	Remember to normalize your image.


Add histogram
-------------
Saving histograms is expensive. Both in computation time and storage. If training
slows down after using this package, check this first. To save a histogram,
convert the array into numpy array and save with ``writer.add_histogram('hist',
array, iteration)``.


Add figure
----------
You can save a matplotlib figure to tensorboard with the add_figure function. ``figure`` input should be ``matplotlib.pyplot.figure`` or a list of ``matplotlib.pyplot.figure``.
Check `<https://tensorboardx.readthedocs.io/en/latest/tensorboard.html#tensorboardX.SummaryWriter.add_figure>`_ for the detailed usage.

Add graph
---------
To visualize a model, you need a model ``m`` and the input ``t``. ``t`` can be a tensor or a list of tensors
depending on your model. If error happens, make sure that ``m(t)`` runs without problem first. See
`The graph demo <https://github.com/lanpa/tensorboardX/blob/master/examples/demo_graph.py>`_ for
complete example.


Add audio
---------
To log a single channel audio, use ``add_audio(tag, audio, iteration, sample_rate)``, where ``audio`` is an one dimensional array, and each element in the array represents the consecutive amplitude samples.
For a 2 seconds audio with ``sample_rate`` 44100 Hz, the input ``x`` should have 88200 elements.
Each element should lie in [−1, 1].

Add embedding
-------------
Embeddings, high dimensional data, can be visualized and converted
into human perceptible 3D data by tensorboard, which provides PCA and
t-sne to project the data into low dimensional space. What you need to do is
provide a bunch of points and tensorboard will do the rest for you. The bunch of
points is passed as a tensor of size ``n x d``, where ``n`` is the number of points and
``d`` is the feature dimension. The feature representation can either be raw data
(*e.g.* the MNIST image) or a representation learned by your network (extracted
feature). This determines how the points distributes. To make the visualization
more informative, you can pass optional metadata or ``label_imgs`` for each data
points. In this way you can see that neighboring point have similar label and
distant points have very different label (semantically or visually). Here the
metadata is a list of labels, and the length of the list should equal to ``n``, the
number of the points. The ``label_imgs`` is a 4D tensor of size ``NCHW``. ``N`` should equal
to ``n`` as well. See
`The embedding demo <https://github.com/lanpa/tensorboardX/blob/master/examples/demo_embedding.py>`_ for
complete example.


Useful commands
---------------
Install
=======

Simply type ``pip install tensorboardX`` in a unix shell to install this package.
To use the newest version, you might need to build from source or ``pip install
tensorboardX —-no-cache-dir`` .  To run tensorboard web server, you need
to install it using ``pip install tensorboard``.
After that, type ``tensorboard --logdir=<your_log_dir>`` to start the server, where
``your_log_dir`` is the parameter of the object constructor. I think this command is
tedious, so I add a line alias ``tb='tensorboard --logdir '`` in ``~/.bashrc``. In
this way, the above command is simplified as ``tb <your_log_dir>``. Use your favorite
browser to load the tensorboard page, the address will be shown in the terminal
after starting the server.


Misc
----
Performance issue
=================
Logging is cheap, but display is expensive.
For my experience, if there are 3 or more experiments to show at a time and each
experiment have, say, 50k points, tensorboard might need a lot of time to
present the data.


Grouping plots
==============
Usually, there are many numbers to log in one experiment. For example, when
training GANs you should log the loss of the generator, discriminator. If the
loss is composed of two other loss functions, say L1 and MSE, you might want to
log the value of the other two losses as well. In this case, you can write the
tags as Gen/L1, Gen/MSE, Desc/L1, Desc/MSE. In this way, tensorboard will group
the plots into two sections (Gen, Desc). You can also use the regular expression
to filter data.


---

### From tutorial_zh.rst

*Source: `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/docs/tutorial_zh.rst`*

Tutorials_zh
*************

緣起
------
Google TensorFlow 附加的工具 Tensorboard 是一個很好用的視覺化工具。他可以記錄數字，影像或者是聲音資訊，對於觀察類神經網路訓練的過程非常有幫助。很可惜的是其他的訓練框架（PyTorch, Chainer, numpy）並沒有這麼好用的工具。網路上稍加搜尋可以發現已經有一些現成的套件可以讓不同的訓練框架使用 web 介面來觀察訓練情形，不過他們可以記錄的東西比較有限或是使用起來比較複雜 (tensorboard_logger, visdom)。tensorboardX 的目的就是讓其他 tensorboard 的功能都可以輕易的被非 TensorFlow 的框架使用。
目前這個套件除了 tensorboard beholder 之外支援所有 tensorboard 的紀錄型態。這個套件目前的標準測試環境為 Ubuntu 或是 Mac ，windows 則是有不定期手動測試；使用的 python 版本為 anaconda 的 python3。

安裝
-------
在命令列輸入 ``pip install tensorboardX`` 即可
或是最新版源碼安裝 ``pip install tensorboardX``

使用
-------
建立 event writer 實體
在紀錄任何東西之前，我們需要建立一個 event writer 實體。
from tensorboardX import SummaryWriter 
#SummaryWriter 是一個類別，包含這套件的所有功能。

``writer = SummaryWriter('runs/exp-1')``
#建立實體。資料存放在：``'runs/exp-1'``
#接下來要寫入任何資料都是呼叫 ``writer.add_某功能()``

``writer = SummaryWriter()``
#使用預設名稱建立實體。資料存放在：``'runs/現在時間-機器名字'`` ex. ``'runs/Aug20-obov01'``

``writer = SummaryWriter(comment='3xLR')``
#在預設資料夾後面加上註解 檔名變為：``'runs/Aug20-obov01-3xLR'``
上面的程式碼會在目前的工作目錄下建立一個叫 ``runs`` 的資料夾以及子目錄 ``exp1``。 每個子目錄都會被視為一個實驗。每次執行新的實驗時，比如說改了一些參數，這時請將資料夾重新命名，像是： ``runs/exp2``, ``runs/myexp`` 這樣可以便於比較實驗的結果。 建議：資料夾可以用時間命名或者是直接把參數當成資料夾的名稱。
建立 writer 實體之後就可以開始紀錄資料了
API 的長相大概是：``add_xxx(標籤，要記錄的東西，時間戳，其他參數)``

紀錄純量
-------------
純量是最好記錄的東西。通常我們會把每次訓練的損失記錄下來或者是測試的準確度都是值得記錄的東西。其他數據，像是學習率也值得紀錄。
紀錄純量的方法是 ``writer.add_scalar('myscalar', value, iteration)``
value 可以是 PyTorch tensor ， numpy或是 float，int 之類的python原生數字類別。

記錄影像
-------------
影像使用一個三維的矩陣來表示。這三個維度分別代表紅色，綠色，藍色的強度。一張寬200， 高100的影像其對應的矩陣大小為[3, 100, 200] （CHW）。最簡單情況是只有一張影像要存。這時候只需要注意一下是不是符合上述的規格然後將它傳到: ``writer.add_image('imresult', image, iteration)`` 即可。 
通常訓練的時候會採用批次處理，所以有一大堆影像要存。這時候請確定你的資料維度是 ``(NCHW)``, 其中 ``N`` 是batchsize。``add_image`` 會自動將他排列成適當大小。要注意的是，如果要記錄的影像是 OpenCV/numpy 格式，他們通常呈現 ``(HWC)`` 的排列，這時候要呼叫 ``numpy.transpose`` 將其轉為正確的維度，否則會報錯。另外就是注意影像的值的範圍要介於 [0, 1] 之間。 

紀錄直方圖（histogram）
-------------------------------
記錄直方圖很耗 CPU 資源，不要常用。如果你用了這個套件之後覺得速度變慢了請先檢查一下是不是這個原因。使用方法很簡單，呼叫 ``writer.add_histogram('hist', array, iteration)`` 即可紀錄。

紀錄聲音
-------------
``writer.add_audio('myaudio', audio, iteration, sample_rate)``
這功能只支援單聲道。 add_audio 要傳入的聲音資訊是個一維陣列，陣列的每一個元素代表在每一個取樣點的振幅大小。取樣頻率(sample_rate)為 44100 kHz 的情況下。一段2秒鐘的聲音應該要有88200個點；注意其中每個元素的值應該都介於正負1之間。

紀錄文字
-------------
``writer.add_text('mytext', 'this is a pen', iteration)``
除了一般字串之外，也支援簡單的 markdown 表格。

記錄網路架構。
--------------------------
(實驗性的功能，模型複雜的時候不確定對不對)
問題很多的功能。使用上比較複雜。需要準備兩個東西：網路模型 以及 你要餵給他的 tensor 
舉例來說，令模型為 m，輸入為 x，則使用方法為：
``add_graph(m, (x, ))`` 這裡使用 tuple 的原因是當網路有多個輸入時，可以把他擴充成
``add_graph(m, (x, y, z))`` ，如果只有單一輸入，寫成 ``add_graph(m, x)`` 也無妨。 
常會出錯的原因： 
- 較新的 operator pytorch本身不支援JIT
- 輸入是 cpu tensor，model 在 GPU 上。（或是反過來）
- 輸入的 tensor 大小錯誤，跑到後面幾層維度消失了
- model 寫錯，前後兩層 feature dimension 對不上
除錯方法

forward propagate 一次 ``m(x)`` 或是多個輸入時：``m((x, y, z))``
2. 用 ``torch.onnx.export`` 導出模型，觀察錯誤訊息。

高維度資料視覺化／降維 (embedding)
---------------------------------------------------
因為人類對物體的了解程度只有三維，所以當資料的維度超過三的時候我們沒辦法將他視覺化。這時候就需要降維來讓資料的維度小於等於三。降維運算由 tensorboard 以 Javascript 執行，演算法有 PCA 及 t-sne 兩種可選。這邊我們只需要負責提供每個點的高維度特徵即可。提供的格式是一個矩陣，一個 ``n x d`` 的矩陣 ``n`` 點的數量， ``d`` 是維度的多寡。 高維度特徵可以是原始資料。比如說影像，或是網路學到的壓縮結果。這原始資料決定了資料的分佈情形。如果要看得更清楚一點，你可以再傳 metadata / label_imgs 的參數進去（metadata是一個 python list 長度為 ``n``, ``label_imgs`` 是一個 4 維矩陣，大小是 ``nCHW``。這樣每個點就會有他對應的文字或圖在旁邊。不懂的話就看範例吧：https://github.com/lanpa/tensorboardX/blob/master/examples/demo_embedding.py

紀錄短片
---------------
類似於紀錄影像，不過傳入的物件維度是 ``[B, C, T ,H, W]``，其中 ``T`` 是影格的數量。所以一個 30 frame 的彩色影片 維度是 ``[B, 3, 30 ,H, W]``。

紀錄 pr curve
-------------------
根據預測的機率值以及其對應的標準答案計算 precision-recall 的結果並保存。
``add_pr_curve (tag, labels, predictions, step)``
labels是標準答案，predictions是程式對樣本的預測。 
假設有十筆資料 labels就會長得像 ``[0, 0, 1, 0, 0, 1, 0, 1, 0, 1]``，predictions則長的像 ``[0.1, 0.3, 0.8, 0.2, 0.4, 0.5, 0.1, 0.7, 0.9, 0.2]``。

pyplot 的圖表
------------------------------

用 matplotlib 畫了美美的圖表想紀錄？請用 ``add_figure`` 。傳入的物件是 matplotlib 的 figure。 
顯示結果 
Tensorboard 本質是個網頁伺服器，他讀取的資料來自於訓練網路的時候程式 (tensorboardX) 寫下的事件檔。因為 tensorboard 包含於 tensorflow，所以你需要另外安裝一份 tensorflow 在伺服器主機。我想大部分人都已經裝過了。沒裝過的話就在 unix shell 介面輸入 ``pip install tensorboard``。如果沒有使用 TensorFlow 訓練的需求，建議裝非 GPU 版本，啟動速度快得多。
接下來在命令列輸入 ``tensorboard --logdir=<your_log_dir>`` （以前面的例子來說：``tensorboard --logdir=runs``）伺服器就會啟動了。這個指令打起來很麻煩，所以我都在 ``~/.bashrc`` 加一行：``alias tb='tensorboard --logdir '`` 如此一來指令就簡化成 ``tb <your_log_dir>``。接下來就是照著終端機上的指示打開你的瀏覽器就可以看到畫面了。


---

### From .travis.yml

*Source: `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/.travis.yml`*

dist: xenial
language: python
python:
  # We don't actually use the Travis Python, but this keeps it organized.
  - "2.7"
  - "3.6"

env:
  - PYTORCH_VER="torch"
  - PYTORCH_VER="torch_nightly -f https://download.pytorch.org/whl/nightly/cpu/torch_nightly.html"

matrix:
  allow_failures:
    - env: PYTORCH_VER="torch_nightly -f https://download.pytorch.org/whl/nightly/cpu/torch_nightly.html"

install:
  - export MPLBACKEND=Agg
  - export CODECOV_TOKEN="26239910-fe4e-463d-aa3d-e662e9bf39ef"

  - sudo apt-get update
  # We do this conditionally because it saves us some downloading if the
  # version is the same.
  - if [[ "$TRAVIS_PYTHON_VERSION" == "2.7" ]]; then
      wget https://repo.continuum.io/miniconda/Miniconda2-latest-Linux-x86_64.sh -O miniconda.sh;
    else
      wget https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh -O miniconda.sh;
    fi
  - bash miniconda.sh -b -p $HOME/miniconda
  - export PATH="$HOME/miniconda/bin:$PATH"
  - export BOTO_CONFIG=/dev/null  # https://github.com/travis-ci/travis-ci/issues/7940
  - export PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION=python
  - hash -r
  - conda config --set always_yes yes --set changeps1 no
  - conda update -q conda
  # Useful for debugging any issues with conda
  - conda info -a

  # Replace dep1 dep2 ... with your dependencies
  - conda create -q -n test-environment python=$TRAVIS_PYTHON_VERSION
  - source activate test-environment
  - which python
  - pip install future
  - pip install chainer -q
  - pip install torchvision==0.2.1 -q
  - pip uninstall torch -y
  - pip install $PYTORCH_VER
  - pip install moviepy==0.2.3.2 -q
  - pip install matplotlib -q
  - pip install requests -q
  - pip install codecov
  - pip install onnx
  - pip install boto3
  - pip install moto
  - pip install visdom
  - pip install tb-nightly
  - pip install crc32c
  - pip install protobuf==3.8.0
  - conda install ffmpeg
  - conda list
  - python -c "import imageio; imageio.plugins.ffmpeg.download()"
  - pip install --upgrade pytest-cov flake8
  - python setup.py install

script:
  - visdom &
  - sleep 5
  - python -c "import visdom; v = visdom.Visdom()"
  - py.test --cov=tensorboardX tests/
  - python examples/demo.py
  - python examples/demo_graph.py
  - python examples/demo_embedding.py
  - python examples/demo_custom_scalars.py
  - python examples/demo_multiple_embedding.py
  - python examples/demo_purge.py
  - python examples/demo_matplotlib.py
  - pip uninstall -y tensorboardX
  - pip install tensorboardX
  - pytest

after_success:
  - codecov


---

### From .flake8

*Source: `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/.flake8`*

[flake8]
max-line-length = 120
ignore = E305,E402,E721,E741,F401,F403,F405,F821,F841,F999
exclude = tensorboardX/proto

---

### From .codecov.yml

*Source: `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/.codecov.yml`*

coverage:
  status:
    project:                   # measuring the overall project coverage
      default:                 # context, you can create multiple ones with custom titles
        enabled: yes 
    patch:
      default:
        enabled: no


---

## 📝 Summary
		
		This setup guide was automatically generated from 22 documentation file(s):
		
		- 📖 **README.md** (readme) - `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/README.md`
- 📖 **README.md** (readme) - `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/README.md`
- 🔨 **requirements.txt** (build) - `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/requirements.txt`
- 📚 **Makefile** (docs) - `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/docs/Makefile`
- 📚 **conf.py** (docs) - `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/docs/conf.py`
- 📚 **index.rst** (docs) - `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/docs/index.rst`
- 📚 **tutorial.rst** (docs) - `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/docs/tutorial.rst`
- 📚 **tutorial_zh.rst** (docs) - `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/docs/tutorial_zh.rst`
- ⚙️ **setup.py** (setup) - `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/setup.py`
- ⚙️ **setup.py** (setup) - `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/setup.py`
- 🔨 **compile.sh** (build) - `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/compile.sh`
- 🔨 **RUN_AFTER_PIP_INSTALL** (build) - `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/examples/RUN_AFTER_PIP_INSTALL`
- 📚 **.travis.yml** (docs) - `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/.travis.yml`
- 📚 **.flake8** (docs) - `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/.flake8`
- 📚 **.codecov.yml** (docs) - `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/.codecov.yml`
- 🚀 **Dockerfile** (deploy) - `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/apex/examples/docker/Dockerfile`
- 📖 **README.md** (readme) - `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/apex/README.md`
- 📖 **README.md** (readme) - `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/apex/apex/RNN/README.md`
- 📖 **README.md** (readme) - `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/apex/apex/amp/README.md`
- 📖 **README.md** (readme) - `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/apex/apex/reparameterization/README.md`
- 🔨 **setup.py** (build) - `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/apex/setup.py`
- 🔨 **setup.cfg** (build) - `/home/yitongli/ai2apps/agents/AutoDeploy/projects/jukebox/tensorboardX/setup.cfg`

*Generated on: 2025-08-19T03:21:45.189Z*
