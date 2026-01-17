
import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, FileText, History, ArrowRight, Leaf, Sun, CloudRain } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WeatherWidget from '../components/WeatherWidget';


const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-leaf-light/30 to-papaya-light/30 -z-10"></div>
          
          <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6 animate-fade-in">
                <Leaf className="w-4 h-4" />
                <span>FarmCare</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in animate-delay-100">
                <span className="text-gradient">FarmCare</span> - Protecting Your 
                <span className="relative mx-2">
                  {/* <span className="absolute top-0 left-0 animate-fade-in animate-delay-100 opacity-0">Papaya</span>
                  <span className="absolute top-0 left-0 animate-fade-in animate-delay-00 opacity-0">Banana</span> */}
                  <span>Crops</span>
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in animate-delay-200">
                Advanced AI-driven disease detection for banana and papaya leaves. Upload photos, get instant diagnoses, 
                and receive treatment recommendations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-300">
                <Link to="/prediction" className="btn-primary group">
                  <Camera className="w-5 h-5" />
                  Diagnose Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <Link to="/notes" className="btn-outline">
                  <FileText className="w-5 h-5" />
                  Take Notes
                </Link>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
        </section>
        
        {/* Features Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Key Features</h2>
              <p className="text-muted-foreground">
                Designed specifically for banana and papaya farmers to identify and treat leaf diseases effectively.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="feature-card">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Disease Detection</h3>
                <p className="text-muted-foreground mb-4">
                  Upload or capture leaf images and get instant AI-powered disease diagnosis with high accuracy.
                </p>
                <Link to="/prediction" className="text-primary hover:underline flex items-center gap-1 text-sm font-medium">
                  Try it now
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              
              <div className="feature-card">
                <div className="bg-secondary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <CloudRain className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">Weather Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  Get real-time weather data relevant to crop conditions and disease risk in your location.
                </p>
                <div className="mt-6">
                  <WeatherWidget />
                </div>
              </div>
              
              <div className="feature-card">
                <div className="bg-accent/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">Notes & Records</h3>
                <p className="text-muted-foreground mb-4">
                  Keep track of your observations, treatments applied, and results over time.
                </p>
                <Link to="/notes" className="text-primary hover:underline flex items-center gap-1 text-sm font-medium">
                  Take notes
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              
              <div className="feature-card">
                <div className="bg-leaf/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Sun className="w-6 h-6 text-leaf" />
                </div>
                <h3 className="text-xl font-medium mb-2">Treatment Guidance</h3>
                <p className="text-muted-foreground">
                  Receive expert recommendations for treating detected diseases and preventing future outbreaks.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="bg-banana/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-banana-dark" />
                </div>
                <h3 className="text-xl font-medium mb-2">Banana Specialist</h3>
                <p className="text-muted-foreground">
                  Specialized in identifying common banana leaf diseases like Black Sigatoka, Panama Disease, and more.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="bg-papaya/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-papaya-dark" />
                </div>
                <h3 className="text-xl font-medium mb-2">Papaya Specialist</h3>
                <p className="text-muted-foreground">
                  Focused on papaya-specific diseases like Papaya Ringspot Virus, Powdery Mildew, and Anthracnose.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Crops?</h2>
              <p className="text-muted-foreground mb-6">
                Start diagnosing plant diseases and improving your crop health today.
              </p>
              <Link to="/prediction" className="btn-primary inline-flex">
                <Camera className="w-5 h-5" />
                Start Disease Detection
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
