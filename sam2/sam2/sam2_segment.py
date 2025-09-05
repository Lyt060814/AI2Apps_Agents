#!/usr/bin/env python3
"""
SAM2 Image Segmentation Script
Based on the SAM2 image predictor example notebook.
Supports command-line interface for image segmentation tasks.
"""

import os
import argparse
import numpy as np
import torch
import matplotlib.pyplot as plt
from PIL import Image
import cv2
import json

# SAM2 imports
from sam2.build_sam import build_sam2
from sam2.sam2_image_predictor import SAM2ImagePredictor


def setup_device():
    """Setup computation device with appropriate settings."""
    # if using Apple MPS, fall back to CPU for unsupported ops
    os.environ["PYTORCH_ENABLE_MPS_FALLBACK"] = "1"
    
    # select the device for computation
    if torch.cuda.is_available():
        device = torch.device("cuda")
    elif torch.backends.mps.is_available():
        # Due to MPS compatibility issues with certain operations, use CPU instead
        print("MPS is available but using CPU due to compatibility issues with bicubic interpolation.")
        device = torch.device("cpu")
    else:
        device = torch.device("cpu")
    print(f"Using device: {device}")

    if device.type == "cuda":
        # use bfloat16 for the entire script
        torch.autocast("cuda", dtype=torch.bfloat16).__enter__()
        # turn on tfloat32 for Ampere GPUs
        if torch.cuda.get_device_properties(0).major >= 8:
            torch.backends.cuda.matmul.allow_tf32 = True
            torch.backends.cudnn.allow_tf32 = True
    
    return device


def show_mask(mask, ax, random_color=False, borders=True):
    """Display a mask on the given axis."""
    if random_color:
        color = np.concatenate([np.random.random(3), np.array([0.6])], axis=0)
    else:
        color = np.array([30/255, 144/255, 255/255, 0.6])
    h, w = mask.shape[-2:]
    mask = mask.astype(np.uint8)
    mask_image = mask.reshape(h, w, 1) * color.reshape(1, 1, -1)
    if borders:
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
        # Try to smooth contours
        contours = [cv2.approxPolyDP(contour, epsilon=0.01, closed=True) for contour in contours]
        mask_image = cv2.drawContours(mask_image, contours, -1, (1, 1, 1, 0.5), thickness=2)
    ax.imshow(mask_image)


def save_individual_visualizations(image, masks, scores, output_dir, point_coords, box_coords, input_labels, prefix="visualization"):
    """Save each mask as a separate visualization image."""
    os.makedirs(output_dir, exist_ok=True)
    vis_info = []

    for i, (mask, score) in enumerate(zip(masks, scores)):
        fig, ax = plt.subplots(figsize=(10, 10))
        ax.imshow(image)
        show_mask(mask, ax, borders=True)
        
        if point_coords is not None and input_labels is not None:
            show_points(point_coords, input_labels, ax)
        if box_coords is not None:
            show_box(box_coords, ax)
            
        ax.set_title(f"Score: {score:.3f}", fontsize=14)
        ax.axis('off')
        plt.tight_layout()
        
        vis_path = os.path.join(output_dir, f"{prefix}_{i:03d}_score_{score:.3f}.png")
        plt.savefig(vis_path, bbox_inches='tight', pad_inches=0)
        plt.close(fig)

        vis_info.append({
            "mask_id": i,
            "score": float(score),
            "path": vis_path
        })
        print(f"Saved visualization {i} to {vis_path}")

    info_path = os.path.join(output_dir, f"visualization_info.json")
    with open(info_path, 'w') as f:
        json.dump(vis_info, f, indent=2)
    
    return vis_info


def show_points(coords, labels, ax, marker_size=375):
    """Display points on the given axis."""
    pos_points = coords[labels == 1]
    neg_points = coords[labels == 0]
    ax.scatter(pos_points[:, 0], pos_points[:, 1], color='green', marker='*', 
               s=marker_size, edgecolor='white', linewidth=1.25)
    ax.scatter(neg_points[:, 0], neg_points[:, 1], color='red', marker='*', 
               s=marker_size, edgecolor='white', linewidth=1.25)


def show_box(box, ax):
    """Display a bounding box on the given axis."""
    x0, y0 = box[0], box[1]
    w, h = box[2] - box[0], box[3] - box[1]
    ax.add_patch(plt.Rectangle((x0, y0), w, h, edgecolor='green', 
                              facecolor=(0, 0, 0, 0), lw=2))


def save_masks(masks, scores, output_dir, prefix="mask"):
    """Save masks as individual PNG files."""
    os.makedirs(output_dir, exist_ok=True)
    mask_info = []
    
    for i, (mask, score) in enumerate(zip(masks, scores)):
        # Convert mask to uint8 format
        mask_uint8 = (mask * 255).astype(np.uint8)
        
        # Save mask as PNG
        mask_path = os.path.join(output_dir, f"{prefix}_{i:03d}_score_{score:.3f}.png")
        Image.fromarray(mask_uint8).save(mask_path)
        
        mask_info.append({
            "mask_id": i,
            "score": float(score),
            "path": mask_path
        })
        
        print(f"Saved mask {i} with score {score:.3f} to {mask_path}")
    
    # Save mask information as JSON
    info_path = os.path.join(output_dir, f"{prefix}_info.json")
    with open(info_path, 'w') as f:
        json.dump(mask_info, f, indent=2)
    
    return mask_info


def visualize_results(image, masks, scores, point_coords=None, box_coords=None, 
                     input_labels=None, output_path=None, show_plot=True):
    """Create and save visualization of segmentation results."""
    fig, axes = plt.subplots(1, len(masks), figsize=(5 * len(masks), 5))
    if len(masks) == 1:
        axes = [axes]
    
    for i, (mask, score) in enumerate(zip(masks, scores)):
        axes[i].imshow(image)
        show_mask(mask, axes[i], borders=True)
        
        if point_coords is not None and input_labels is not None:
            show_points(point_coords, input_labels, axes[i])
        
        if box_coords is not None:
            show_box(box_coords, axes[i])
        
        axes[i].set_title(f"Mask {i+1}, Score: {score:.3f}", fontsize=14)
        axes[i].axis('off')
    
    plt.tight_layout()
    
    if output_path:
        plt.savefig(output_path, dpi=150, bbox_inches='tight')
        print(f"Visualization saved to {output_path}")
    
    if show_plot:
        plt.show()
    else:
        plt.close()


def parse_coordinates(coord_str):
    """Parse coordinate string into numpy array."""
    if not coord_str:
        return None
    
    try:
        # Parse format like "500,375;1125,625" for multiple points
        # or "425,600,700,875" for a single box
        if ';' in coord_str:
            # Multiple points
            points = []
            for point_str in coord_str.split(';'):
                x, y = map(int, point_str.split(','))
                points.append([x, y])
            return np.array(points)
        else:
            # Single box or point
            coords = list(map(int, coord_str.split(',')))
            if len(coords) == 2:
                # Single point
                return np.array([coords])
            elif len(coords) == 4:
                # Single box
                return np.array(coords)
            else:
                raise ValueError("Invalid coordinate format")
    except Exception as e:
        raise ValueError(f"Error parsing coordinates '{coord_str}': {e}")


def parse_labels(label_str):
    """Parse label string into numpy array."""
    if not label_str:
        return None
    
    try:
        # Parse format like "1;1;0" for multiple labels
        labels = list(map(int, label_str.split(';')))
        return np.array(labels)
    except Exception as e:
        raise ValueError(f"Error parsing labels '{label_str}': {e}")


def main():
    parser = argparse.ArgumentParser(
        description="SAM2 Image Segmentation Script",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Segment with point prompts
  python sam2_segment.py --image truck.jpg --points "500,375" --labels "1"
  
  # Segment with multiple points
  python sam2_segment.py --image truck.jpg --points "500,375;1125,625" --labels "1;1"
  
  # Segment with box prompt
  python sam2_segment.py --image truck.jpg --box "425,600,700,875"
  
  # Segment with points and box
  python sam2_segment.py --image truck.jpg --points "575,750" --labels "0" --box "425,600,700,875"
  
  # Custom model and output
  python sam2_segment.py --image truck.jpg --points "500,375" --labels "1" \\
                        --model_config configs/sam2.1/sam2.1_hiera_l.yaml \\
                        --checkpoint checkpoints/sam2.1_hiera_large.pt \\
                        --output_dir ./results
        """
    )
    
    # Required arguments
    parser.add_argument('--image', type=str, required=True,
                       help='Path to input image')
    
    # Model arguments
    parser.add_argument('--model_config', type=str, 
                       default='configs/sam2.1/sam2.1_hiera_t.yaml',
                       help='Path to model config file')
    parser.add_argument('--checkpoint', type=str,
                       default='/tmp/sam2.1_hiera_tiny.pt',
                       help='Path to model checkpoint')
    
    # Prompt arguments
    parser.add_argument('--points', type=str,
                       help='Point coordinates in format "x1,y1;x2,y2;..." for multiple points or "x,y" for single point')
    parser.add_argument('--labels', type=str,
                       help='Point labels in format "1;0;1;..." (1=foreground, 0=background)')
    parser.add_argument('--box', type=str,
                       help='Bounding box in format "x1,y1,x2,y2"')
    
    # Output arguments
    parser.add_argument('--output_dir', type=str, default='./sam2_output',
                       help='Directory to save output masks and visualizations')
    parser.add_argument('--save_masks', action='store_true',
                       help='Save individual mask files')
    parser.add_argument('--save_visualization', action='store_true', default=True,
                       help='Save visualization image')
    parser.add_argument('--show_plot', action='store_true',
                       help='Display plot interactively')
    
    # Segmentation arguments
    parser.add_argument('--multimask_output', action='store_true', default=True,
                       help='Output multiple masks for ambiguous prompts')
    parser.add_argument('--random_seed', type=int, default=3,
                       help='Random seed for reproducibility')
    
    args = parser.parse_args()
    
    # Validate arguments
    if not args.points and not args.box:
        parser.error("Either --points or --box must be specified")
    
    if args.points and not args.labels:
        parser.error("--labels must be specified when using --points")
    
    # Set random seed
    np.random.seed(args.random_seed)
    torch.manual_seed(args.random_seed)
    
    # Setup device
    device = setup_device()
    
    # Load image
    print(f"Loading image: {args.image}")
    try:
        image = Image.open(args.image)
        image = np.array(image.convert("RGB"))
        print(f"Image shape: {image.shape}")
    except Exception as e:
        print(f"Error loading image: {e}")
        return 1
    
    # Load SAM2 model
    print(f"Loading SAM2 model...")
    print(f"Config: {args.model_config}")
    print(f"Checkpoint: {args.checkpoint}")
    
    try:
        sam2_model = build_sam2(args.model_config, args.checkpoint, device=device)
        predictor = SAM2ImagePredictor(sam2_model)
    except Exception as e:
        print(f"Error loading model: {e}")
        return 1
    
    # Set image for prediction
    print("Processing image...")
    predictor.set_image(image)
    
    # Parse prompts
    point_coords = parse_coordinates(args.points) if args.points else None
    input_labels = parse_labels(args.labels) if args.labels else None
    box_coords = parse_coordinates(args.box) if args.box else None
    
    print("Prompt information:")
    if point_coords is not None:
        print(f"  Points: {point_coords.tolist()}")
        print(f"  Labels: {input_labels.tolist()}")
    if box_coords is not None:
        print(f"  Box: {box_coords.tolist()}")
    
    # Predict masks
    print("Predicting masks...")
    try:
        masks, scores, logits = predictor.predict(
            point_coords=point_coords,
            point_labels=input_labels,
            box=box_coords[None, :] if box_coords is not None else None,
            multimask_output=args.multimask_output,
        )
        
        # Sort by scores (best first)
        if len(scores) > 1:
            sorted_ind = np.argsort(scores)[::-1]
            masks = masks[sorted_ind]
            scores = scores[sorted_ind]
            logits = logits[sorted_ind]
        
        print(f"Generated {len(masks)} masks")
        for i, score in enumerate(scores):
            print(f"  Mask {i+1}: score = {score:.3f}")
            
    except Exception as e:
        print(f"Error during prediction: {e}")
        return 1
    
    # Create output directory
    os.makedirs(args.output_dir, exist_ok=True)
    
    # Save masks if requested
    if args.save_masks:
        print("Saving individual visualizations...")
        save_individual_visualizations(
            image, masks, scores, args.output_dir,
            point_coords=point_coords,
            box_coords=box_coords,
            input_labels=input_labels
        )
        args.save_visualization = False
    
    # Create and save visualization
    if args.save_visualization:
        vis_path = os.path.join(args.output_dir, "segmentation_result.png")
        print("Creating visualization...")
        visualize_results(
            image, masks, scores,
            point_coords=point_coords,
            box_coords=box_coords,
            input_labels=input_labels,
            output_path=vis_path,
            show_plot=args.show_plot
        )
    elif args.show_plot:
        visualize_results(
            image, masks, scores,
            point_coords=point_coords,
            box_coords=box_coords,
            input_labels=input_labels,
            show_plot=True
        )
    
    print(f"Segmentation completed successfully!")
    print(f"Results saved to: {args.output_dir}")
    
    return 0


if __name__ == "__main__":
    main()