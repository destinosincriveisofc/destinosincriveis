import os
import sys
from PIL import Image, ImageDraw, ImageFont

def generate_logo(size, path):
    # Baby-blue background (#A3E2F7)
    img = Image.new('RGB', (size, size), color='#A3E2F7')
    draw = ImageDraw.Draw(img)
    
    # Try to load a bold sans-serif font
    font_names = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/usr/share/fonts/truetype/freefont/FreeSansBold.ttf",
        "DejaVuSans-Bold.ttf",
        "arialbd.ttf"
    ]
    font = None
    font_size = int(size * 0.45)
    for font_path in font_names:
        try:
            font = ImageFont.truetype(font_path, font_size)
            print(f"Loaded font: {font_path}")
            break
        except Exception:
            continue
            
    if font is None:
        print("Using default font fallback")
        font = ImageFont.load_default()
        
    text = "DI"
    
    # Draw yellow text (#FFE600) centered
    try:
        bbox = draw.textbbox((0, 0), text, font=font)
        w = bbox[2] - bbox[0]
        h = bbox[3] - bbox[1]
        x = (size - w) / 2 - bbox[0]
        y = (size - h) / 2 - bbox[1]
    except AttributeError:
        # Fallback for older PIL versions
        w, h = draw.textsize(text, font=font)
        x = (size - w) / 2
        y = (size - h) / 2
        
    draw.text((x, y), text, fill='#FFE600', font=font)
    
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path)
    print(f"Saved logo size {size} to {path}")

if __name__ == '__main__':
    generate_logo(192, '/root/destinosincriveis/public/icon-192.png')
    generate_logo(512, '/root/destinosincriveis/public/icon-512.png')
