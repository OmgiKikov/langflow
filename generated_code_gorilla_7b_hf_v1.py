
from transformers import DetrFeatureExtractor, DetrForObjectDetection
import torch
from PIL import Image

def load_model():
    feature_extractor = DetrFeatureExtractor.from_pretrained('facebook/detr-resnet-50')
    model = DetrForObjectDetection.from_pretrained('facebook/detr-resnet-50')
    return feature_extractor, model

def process_data(image_path, feature_extractor, model):
    image = Image.open(image_path)
    inputs = feature_extractor(images=image, return_tensors='pt')
    outputs = model(inputs['pixel_values'])

    scores = outputs[0]['scores']
    bboxes = outputs[0]['boxes']

    # Add person label
    labels = outputs[0]['class_labels']
    persons = []
    for label in labels:
        if label == "person":
            persons.append(label)

    response = [{"box": box.tolist(), "score": score.item(), "label": label} for label, (score, box) in zip(labels, zip(scores, bboxes)) if label in persons]
    return response

image_path = 'your/image/path.jpg'