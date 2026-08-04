from PIL import Image
import sys
from pathlib import Path

def ensure_dir(p: Path):
    p.parent.mkdir(parents=True, exist_ok=True)

def optimize(infile, out_base_name, widths=(720,1600), quality=85):
    img = Image.open(infile)
    for w in widths:
        ratio = w / img.width
        new_size = (w, max(1, int(img.height * ratio)))
        resized = img.resize(new_size, Image.LANCZOS)
        # save webp
        out_webp = out_base_name + f"-{w}.webp"
        ensure_dir(Path(out_webp))
        resized.save(out_webp, format="WEBP", quality=quality, method=6)
        # save jpeg fallback for largest width only
        if w == max(widths):
            out_jpg = out_base_name + f"-{w}.jpg"
            resized.convert("RGB").save(out_jpg, format="JPEG", quality=quality, optimize=True)

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python optimize_image.py <input-file> <output-base-path-without-extension>")
        print("Example: python optimize_image.py \"assets/photos-new/cachoeiro-2010-soprano.JPG\" \"assets/optimized/cachoeiro\"")
        sys.exit(1)
    infile = sys.argv[1]
    outbase = sys.argv[2]
    optimize(infile, outbase)
