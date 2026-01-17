import * as tf from '@tensorflow/tfjs';
import { toast } from 'sonner';

export const loadModel = async () => {
  try {
    console.log("🧠 Attempting to load model from /model/model.json");
    const model = await tf.loadLayersModel('/model/model.json');
    console.log("✅ Model successfully loaded");
    return model;
  } catch (error) {
    console.error("❌ Error loading model:", error);
    throw error;
  }
};

export const preprocessImage = async (imageData: string) => {
  console.log("🖼️ Starting image preprocessing");
  const img = new window.Image();
  img.src = imageData;

  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = (err) => {
      console.error("❌ Error loading image from base64:", err);
      reject(err);
    };
  });

  console.log("✅ Image loaded for preprocessing");

  const tensor = tf.browser.fromPixels(img)
    .resizeBilinear([224, 224])
    .toFloat()
    .div(255.0)
    .expandDims(0);

  console.log("📐 Preprocessed tensor shape:", tensor.shape);

  return tensor;
};

export const analyzeImage = async (imageData: string, cropType: string) => {
  try {
    const response = await fetch('http://localhost:5000/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageData,
        cropType: cropType
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get prediction from server');
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error analyzing image:", error);
    throw error;
  }
};
