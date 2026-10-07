"""
Leaf Image Preprocessing and Dataset Augmentation Pipeline
"""
import numpy as np
from PIL import Image, ImageEnhance

def preprocess_leaf(image: Image.Image, target_size=(256, 256)):
    # Standardize orientation and convert to RGB
    img = image.convert("RGB").resize(target_size, Image.Resampling.LANCZOS)
    arr = np.array(img, dtype=np.float32) / 255.0
    return arr

def augment_leaf(image: Image.Image):
    # Random brightness and contrast augmentation to simulate outdoor sun/cloud conditions
    enhancer = ImageEnhance.Brightness(image)
    return enhancer.enhance(1.1)
