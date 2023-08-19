import os
import json
import pathlib
from pathlib import Path
import sys

from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')


THRESHOLD_PIXELS = 1_500_000

# Function to get dimensions for image or video
def get_media_dimensions(media_path):
    if media_path.lower().endswith(('.png', '.jpeg', '.jpg', '.gif', '.webp')):
        with Image.open(media_path) as img:
            return img.width, img.height
    else:
        import cv2
        cap = cv2.VideoCapture(media_path)
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        cap.release()
        return width, height
def generate_thumbnail(image_path, filename, width, height):
    folder_path = Path(image_path).parent

    pixel_count = width * height

    if pixel_count > THRESHOLD_PIXELS:
        thumbnail_path = str(folder_path) + '/_thumb_' + os.path.splitext(filename)[0] + '.jpg'
        if not Path(thumbnail_path).exists():
            ratio = THRESHOLD_PIXELS / pixel_count
            img = Image.open(image_path)
            img = img.convert('RGB')
            # print("w/h " + str(width) + " " + str(height))
            # print("pixel count " + str(pixel_count))
            # print("ratio " + str(ratio))
            img.thumbnail((width * ratio, height * ratio))
            img.save(thumbnail_path, format='JPEG')
        else:
            print("--------------- THUMB ALREADY EXISTS")
        return thumbnail_path
    else:
        return None


# Function to generate JSON file with media sizes object
def generate_json_file(folder_path, media_sizes):
    data = {'media_sizes': media_sizes}
    json_path = os.path.join(folder_path, 'image_sizes.json')
    with open(json_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)

# Supported media formats
supported_formats = ['.webp', '.png', '.jpeg', '.jpg', '.gif', '.mp4', '.webm']

# Function to process folders recursively
def process_folders(root_folder):
    for root, dirs, files in os.walk(root_folder):
        media_sizes = {}
        for file in files:
            if file.startswith('_thumb_'):
                continue
            print(file)
            if any(file.lower().endswith(format) for format in supported_formats):
                media_path = os.path.join(root, file)
                width, height = get_media_dimensions(media_path)
                has_thumbnail = False
                if file.lower().endswith('.png'):
                    if generate_thumbnail(media_path, file, width, height):
                        has_thumbnail = True
                media_sizes[file] = {'width': width, 'height': height, 'has_thumb': has_thumbnail}

        if media_sizes:
            generate_json_file(root, media_sizes)

# Get the directory where the script is located
script_dir = Path(__file__).resolve().parent
# script_dir = os.getcwd()
print(script_dir)

# Set the root folder to the script directory
root_folder = script_dir
process_folders(root_folder)