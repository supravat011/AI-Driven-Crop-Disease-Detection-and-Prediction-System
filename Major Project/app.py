from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import base64
import io
import os

app = Flask(__name__)
CORS(app)


model_path = os.path.join(os.path.dirname(__file__), 'public/model/full_mobilenet_model.keras')

try:
    # Load the Keras model
    model = tf.keras.models.load_model(model_path)
    print("✅ Model loaded successfully")
except Exception as e:
    print(f"❌ Error loading model: {str(e)}")
    model = None

def preprocess_image(image_data):
    try:
        # Decode base64 image
        img_data = base64.b64decode(image_data.split(',')[1])
        img = Image.open(io.BytesIO(img_data))
        
        # Resize and preprocess
        img = img.resize((224, 224))  # Adjust size according to your model's requirements
        img_array = tf.keras.preprocessing.image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0  # Normalize
        
        return img_array
    except Exception as e:
        print(f"Error preprocessing image: {str(e)}")
        raise

@app.route('/api/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
        
    try:
        data = request.json
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
            
        image_data = data['image']
        crop_type = data.get('cropType', 'unknown')
        
        # Preprocess the image
        processed_image = preprocess_image(image_data)
        
        # Make prediction
        predictions = model.predict(processed_image)
        
        # Convert predictions to list and ensure it's JSON serializable
        predictions_list = predictions.tolist()
        
        print(f"✅ Prediction successful: {predictions_list}")
        
        return jsonify({
            'predictions': predictions_list,
            'cropType': crop_type
        })
    
    except Exception as e:
        print(f"❌ Prediction error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("🚀 Starting Flask server on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)