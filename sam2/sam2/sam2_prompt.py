#!/usr/bin/env python3
"""
SAM2 Image Prompt Visualization Script
Based on the SAM2 image predictor example notebook.
Supports command-line interface for visualizing prompts on an image.
"""

import os
import argparse
import numpy as np
import torch
import matplotlib.pyplot as plt
from PIL import Image
import cv2
import json

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


def visualize_prompts(image, point_coords=None, box_coords=None, 
                     input_labels=None, output_path=None, show_plot=True):
    """Create and save visualization of prompts on the image."""
    plt.figure(figsize=(10, 10))
    plt.imshow(image)
    
    if point_coords is not None and input_labels is not None:
        show_points(point_coords, input_labels, plt.gca())
    
    if box_coords is not None:
        show_box(box_coords, plt.gca())
    
    plt.axis('off')
    plt.tight_layout()
    
    if output_path:
        plt.savefig(output_path, dpi=150, bbox_inches='tight')
        print(f"Visualization saved to {output_path}")
    
    if show_plot:
        plt.show()
    else:
        plt.close()


def parse_coordinates(coord_str):
    """Parse coordinate string into numpy array for prompts."""
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
    """Parse label string into numpy array for prompts."""
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
        description="SAM2 Image Prompt Visualization Script",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Point prompt
  python sam2_prompt.py --image truck.jpg --points "500,375" --labels "1"

  # Multiple points prompt
  python sam2_prompt.py --image truck.jpg --points "500,375;1125,625" --labels "1;1"
  
  # Box prompt
  python sam2_prompt.py --image truck.jpg --box "425,600,700,875"

  # Combined point and box prompt
  python sam2_prompt.py --image truck.jpg --points "575,750" --labels "0" --box "425,600,700,875"
        """
    )
    
    # Required arguments
    parser.add_argument('--image', type=str, required=True,
                       help='Path to input image')
    
    # Prompt arguments
    parser.add_argument('--points', type=str,
                       help='Point coordinates in format "x1,y1;x2,y2;..." for multiple points or "x,y" for single point')
    parser.add_argument('--labels', type=str,
                       help='Point labels in format "1;0;1;..." (1=foreground, 0=background)')
    parser.add_argument('--box', type=str,
                       help='Bounding box in format "x1,y1,x2,y2"')
    
    # Output arguments
    parser.add_argument('--output_dir', type=str, default='./sam2_output',
                       help='Directory to save output visualizations')
    parser.add_argument('--save_visualization', action='store_true', default=True,
                       help='Save visualization image')
    parser.add_argument('--show_plot', action='store_true',
                       help='Display plot interactively')
    
    # Other arguments
    parser.add_argument('--random_seed', type=int, default=3,
                       help='Random seed for reproducibility')
    
    args = parser.parse_args()
    
    # Parse prompts
    point_coords = parse_coordinates(args.points) if args.points else None
    input_labels = parse_labels(args.labels) if args.labels else None
    box_coords = parse_coordinates(args.box) if args.box else None
    
    # Validate arguments
    if point_coords is None and box_coords is None:
        parser.error("Either --points or --box must be specified")
    
    if point_coords is not None and input_labels is None:
        parser.error("--labels must be specified when using --points")
    
    # Set random seed
    np.random.seed(args.random_seed)
    torch.manual_seed(args.random_seed)
    
    # Load image
    print(f"Loading image: {args.image}")
    try:
        image = Image.open(args.image)
        image = np.array(image.convert("RGB"))
        print(f"Image shape: {image.shape}")
    except Exception as e:
        print(f"Error loading image: {e}")
        return 1
    
    print("Prompt information:")
    if point_coords is not None:
        print(f"  Points: {point_coords.tolist()}")
        print(f"  Labels: {input_labels.tolist()}")
    if box_coords is not None:
        print(f"  Box: {box_coords.tolist()}")
    
    # Create output directory
    os.makedirs(args.output_dir, exist_ok=True)
    
    # Create and save visualization
    if args.save_visualization:
        vis_path = os.path.join(args.output_dir, "prompt_visualization.png")
        print("Creating visualization...")
        visualize_prompts(
            image,
            point_coords=point_coords,
            box_coords=box_coords,
            input_labels=input_labels,
            output_path=vis_path,
            show_plot=args.show_plot
        )
    elif args.show_plot:
        visualize_prompts(
            image,
            point_coords=point_coords,
            box_coords=box_coords,
            input_labels=input_labels,
            show_plot=True
        )
    
    print(f"Visualization completed successfully!")
    print(f"Result saved to: {args.output_dir}")
    
    return 0


if __name__ == "__main__":
    main()
