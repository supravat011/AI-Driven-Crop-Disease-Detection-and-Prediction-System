import React, { useState, useEffect } from 'react';
import { Leaf, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { analyzeImage } from '../lib/modelLoader';
import { getWeatherData } from '../lib/weatherApi';

interface DiseasePredictorProps {
  imageData: string | null;
  cropType: 'banana' | 'papaya';
}

interface PredictionResult {
  disease: string;
  confidence: number;
  description: string;
  treatment: string;
  prevention: string;
}

const diseaseClasses = {
  0: {
    name: 'Black Sigatoka',
    description: 'Black Sigatoka is a leaf spot disease caused by the fungus Mycosphaerella fijiensis. It is one of the most destructive diseases of banana and plantain.',
    treatment: 'Apply fungicides like propiconazole or azoxystrobin. Remove infected leaves and maintain good drainage.',
    prevention: 'Plant resistant varieties, ensure proper spacing between plants, and maintain good field sanitation practices.'
  },
  1: {
    name: 'Healthy',
    description: 'The leaf appears to be healthy with no signs of disease.',
    treatment: 'No treatment needed.',
    prevention: 'Continue regular care and monitoring.'
  },
  2: {
    name: 'Panama Disease',
    description: 'A fungal disease that affects the vascular system of banana plants, causing wilting and yellowing of leaves.',
    treatment: 'There is no effective treatment once a plant is infected. Remove and destroy infected plants.',
    prevention: 'Use disease-free planting material, implement quarantine measures, and practice crop rotation.'
  },
  3: {
    name: 'Potassium Deficiency',
    description: 'A nutrient deficiency that causes yellowing and necrosis at the leaf margins, progressing inward.',
    treatment: 'Apply potassium-rich fertilizers such as potassium sulfate or potassium chloride.',
    prevention: 'Regular soil testing and balanced fertilization program.'
  },
  4: {
    name: 'Yellow Sigatoka',
    description: 'A fungal disease causing yellow spots on leaves that eventually turn brown with a yellow halo.',
    treatment: 'Apply fungicides and remove infected leaves.',
    prevention: 'Ensure good air circulation, avoid overhead irrigation, and maintain field sanitation.'
  }
};

const DiseasePredictor: React.FC<DiseasePredictorProps> = ({ imageData, cropType }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeatherData();
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        toast.error('Failed to fetch weather data');
      }
    };

    fetchWeather();
  }, []);

  const handleAnalyzeImage = async () => {
    if (!imageData) {
      console.warn("❌ Cannot analyze: Missing image");
      return;
    }

    console.log("🔍 Starting analysis...");
    setIsAnalyzing(true);

    try {
      const response = await analyzeImage(imageData, cropType);
      console.log("📊 Prediction response:", response);

      const maxIdx = response.predictions[0].indexOf(Math.max(...response.predictions[0]));
      const confidence = response.predictions[0][maxIdx];
      const diseaseInfo = diseaseClasses[maxIdx];

      console.log(`🧪 Prediction result: ${diseaseInfo.name} (${(confidence * 100).toFixed(2)}%)`);

      setResult({
        disease: diseaseInfo.name,
        confidence,
        description: diseaseInfo.description,
        treatment: diseaseInfo.treatment,
        prevention: diseaseInfo.prevention
      });
    } catch (error) {
      console.error("❌ Prediction failed:", error);
      toast.error('Prediction failed.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {!result ? (
        <div className="flex justify-center">
          <button
            onClick={handleAnalyzeImage}
            disabled={!imageData || isAnalyzing}
            className={`btn-primary ${!imageData || isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing Leaf...
              </>
            ) : (
              <>
                <Leaf className="w-5 h-5" />
                Analyze Leaf Image
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className={`p-4 rounded-lg mb-4 ${
            result.confidence > 0.8 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-amber-50 border border-amber-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {result.confidence > 0.8 ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              )}
              <h3 className="font-medium text-lg">
                {result.disease}
              </h3>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
              <span>Confidence:</span>
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    result.confidence > 0.8 ? 'bg-green-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${result.confidence * 100}%` }}
                ></div>
              </div>
              <span>{Math.round(result.confidence * 100)}%</span>
            </div>
            
            <p className="text-sm">{result.description}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium mb-2">Treatment Recommendations</h4>
              <p className="text-muted-foreground text-sm">{result.treatment}</p>
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium mb-2">Prevention Measures</h4>
              <p className="text-muted-foreground text-sm">{result.prevention}</p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setResult(null)}
              className="btn-outline"
            >
              Analyze Another Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseasePredictor;
