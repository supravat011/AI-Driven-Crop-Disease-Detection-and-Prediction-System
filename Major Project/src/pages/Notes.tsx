
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NotesTaking from '../components/NotesTaking';

const Notes = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Your Crop Notes</h1>
            <p className="text-muted-foreground mb-8">
              Keep track of important observations and treatment records for your crops
            </p>
            
            <NotesTaking />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Notes;
