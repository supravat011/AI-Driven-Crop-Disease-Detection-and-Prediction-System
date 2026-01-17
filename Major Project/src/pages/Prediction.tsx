
import React, { useState } from 'react';
import { Banana, ArrowRight, Palmtree } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageUpload from '../components/ImageUpload';
import DiseasePredictor from '../components/DiseasePredictor';
import WeatherWidget from '../components/WeatherWidget';

const Prediction = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [cropType, setCropType] = useState<'banana' | 'papaya' | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  
  const handleCropSelection = (type: 'banana' | 'papaya') => {
    setCropType(type);
    setStep(2);
  };
  
  const handleImageCaptured = (data: string) => {
    setImageData(data);
  };
  
  const handleBack = () => {
    if (step === 2) {
      setImageData(null);
      setStep(1);
    }
  };
  
  const handlePredictionComplete = (result) => {
    const newPrediction = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      cropType: cropType,
      disease: result.disease,
      severity: result.severity,
      imageUrl: imageData
    };
    
    // Save to local storage
    const savedHistory = localStorage.getItem('prediction-history');
    const history = savedHistory ? JSON.parse(savedHistory) : [];
    history.unshift(newPrediction);
    localStorage.setItem('prediction-history', JSON.stringify(history));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Leaf Disease Detection</h1>
              <p className="text-muted-foreground">
                Diagnose diseases in your banana and papaya leaves with our AI-powered tool.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              {/* Step indicator */}
              <div className="flex items-center mb-6">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step === 1 ? 'bg-primary text-primary-foreground' : 'bg-primary/20 text-primary'
                }`}>
                  1
                </div>
                <div className={`flex-1 h-1 mx-2 ${
                  step === 2 ? 'bg-primary' : 'bg-primary/20'
                }`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step === 2 ? 'bg-primary text-primary-foreground' : 'bg-primary/20 text-primary'
                }`}>
                  2
                </div>
              </div>
              
              {step === 1 ? (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-medium mb-4">Select Crop Type</h2>
                  <p className="text-muted-foreground mb-6">
                    Choose which type of leaf you want to analyze.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      onClick={() => handleCropSelection('banana')}
                      className="p-6 border border-border rounded-xl hover:bg-secondary/10 hover:border-secondary transition-colors flex items-center gap-4 group"
                    >
                      <div className="bg-banana/20 rounded-full p-3 text-banana-dark group-hover:bg-banana/30 transition-colors">
                        <Banana className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium">Banana</h3>
                        <p className="text-sm text-muted-foreground">
                          Detect Black Sigatoka, Panama Disease & more
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                    </button>
                    
                    <button
                      onClick={() => handleCropSelection('papaya')}
                      className="p-6 border border-border rounded-xl hover:bg-accent/10 hover:border-accent transition-colors flex items-center gap-4 group"
                    >
                      <div className="bg-papaya/20 rounded-full p-3 text-papaya-dark group-hover:bg-papaya/30 transition-colors">
                        <Palmtree className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium">Papaya</h3>
                        <p className="text-sm text-muted-foreground">
                          Detect Ringspot Virus, Powdery Mildew & more
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-medium">
                      Upload {cropType === 'banana' ? 'Banana' : 'Papaya'} Leaf Image
                    </h2>
                    <button
                      onClick={handleBack}
                      className="text-sm text-primary hover:underline"
                    >
                      Change Crop Type
                    </button>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    Take a clear photo of the leaf or upload an existing image.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <ImageUpload onImageCaptured={handleImageCaptured} />
                    </div>
                    
                    <div>
                      <DiseasePredictor 
                        imageData={imageData} 
                        cropType={cropType as 'banana' | 'papaya'} 
                      />
                      
                      <div className="mt-6">
                        <div className="text-sm text-muted-foreground mb-2">
                          Current Weather Conditions
                        </div>
                        <WeatherWidget />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-8 bg-muted rounded-lg p-4 border border-border text-sm">
              <p className="font-medium mb-1">Tip:</p>
              <p className="text-muted-foreground">
                For the most accurate results, make sure the leaf is well-lit and the affected area is clearly visible.
                Remove any debris from the leaf surface before taking the photo.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Prediction;
