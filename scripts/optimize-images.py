"""Rebuild responsive photos from originals; requires Pillow with WebP support."""
from pathlib import Path
from PIL import Image, ImageOps

assets = Path(__file__).resolve().parents[1] / 'assets'
for name in ('litoral-sul', 'areia-vermelha', 'por-do-sol-jacare',
             'equipe-passeio', 'equipe-por-do-sol', 'equipe-buggy'):
    with Image.open(assets / f'{name}.jpg') as source:
        original = ImageOps.exif_transpose(source).convert('RGB')
        for width in (400, 800):
            height = round(original.height * width / original.width)
            resized = original.resize((width, height), Image.Resampling.LANCZOS)
            resized.save(assets / f'{name}-{width}.webp', 'WEBP', quality=94, method=6)
