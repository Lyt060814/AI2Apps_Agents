import torch
from sam2.build_sam import build_sam2
from sam2.sam2_image_predictor import SAM2ImagePredictor

# 初始化预测器
predictor = SAM2ImagePredictor(build_sam2("configs/sam2.1/sam2.1_hiera_t.yaml", "./checkpoints/sam2.1_hiera_tiny.pt"))

# 加载图像并进行分割
# 详细用法请参考 README 和 notebooks 目录
