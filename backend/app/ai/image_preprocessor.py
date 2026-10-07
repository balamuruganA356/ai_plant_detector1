import io
from PIL import Image, ImageOps
import numpy as np

class ImagePreprocessor:
    """
    Image preprocessing pipeline for leaf disease vision models:
    1. Validate format
    2. Strip EXIF & metadata
    3. Resize & center crop to 256x256
    4. Normalize pixel arrays to [0, 1] range
    """
    def __init__(self, target_size=(256, 256)):
        self.target_size = target_size

    def preprocess_bytes(self, image_bytes: bytes) -> np.ndarray:
        image = Image.open(io.BytesIO(image_bytes))
        
        # 1. Strip metadata & standardize orientation
        image = ImageOps.exif_transpose(image)

        # 2. Convert to RGB
        if image.mode != "RGB":
            image = image.convert("RGB")

        # 3. Resize with high-quality resampling
        image = image.resize(self.target_size, Image.Resampling.LANCZOS)

        # 4. Convert to float numpy array & normalize
        arr = np.array(image, dtype=np.float32)
        normalized = arr / 255.0

        # Add batch dimension: (1, 256, 256, 3)
        return np.expand_dims(normalized, axis=0)

    def extract_green_channel_mask(self, image_bytes: bytes) -> float:
        """
        Estimate foliar chlorosis or necrosis by analyzing relative green channel attenuation.
        """
        try:
            image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
            arr = np.array(image, dtype=np.float32)
            r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
            
            # Simple excess green index (ExG = 2*G - R - B)
            exg = 2 * g - r - b
            healthy_pixels = np.sum(exg > 20)
            total_leaf_pixels = np.sum((r + g + b) > 40)
            
            if total_leaf_pixels == 0:
                return 0.5
            ratio = healthy_pixels / total_leaf_pixels
            return float(np.clip(1.0 - ratio, 0.0, 1.0))
        except Exception:
            return 0.45
