
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sprout, AlertTriangle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VoiceAssistant from '../components/VoiceAssistant';

const History = () => {
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('prediction-history');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const savedHistory = localStorage.getItem('prediction-history');
      setHistory(savedHistory ? JSON.parse(savedHistory) : []);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('prediction-history', JSON.stringify(history));
  }, [history]);

  const addPrediction = (newPrediction) => {
    setHistory((prevHistory) => [...prevHistory, newPrediction]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Your Diagnosis History</h1>
          <p className="text-muted-foreground mb-8">
            View and track your previous leaf disease diagnoses
          </p>
          {history.length > 0 ? (
            <div className="space-y-6">
              {history.map((item) => (
                <div key={item.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
                  {/* Display diagnosis details */}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p>No history yet</p>
              <p>You haven't done any leaf disease diagnoses yet. Start by analyzing your first leaf!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default History;
