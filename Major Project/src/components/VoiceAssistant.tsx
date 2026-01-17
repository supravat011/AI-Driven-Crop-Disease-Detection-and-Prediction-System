
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Volume1, VolumeX } from 'lucide-react';
import { toast } from 'sonner';
import { translateToMarathi } from '../lib/voiceApi';

interface VoiceAssistantProps {
  onInstructionComplete?: () => void;
  instructions?: string[];
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  onInstructionComplete,
  instructions = [
    "Welcome to LeafCare! I'll guide you through the disease prediction process.",
    "First, select whether you want to diagnose a banana or papaya leaf.",
    "Then, capture a photo or upload an image of the leaf.",
    "I'll analyze the image and provide disease diagnosis and treatment recommendations."
  ]
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentInstruction, setCurrentInstruction] = useState(0);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthesisRef.current = new SpeechSynthesisUtterance();
      
      synthesisRef.current.onend = () => {
        setIsSpeaking(false);
        if (currentInstruction < instructions.length - 1) {
          setCurrentInstruction(prev => prev + 1);
        } else if (onInstructionComplete) {
          onInstructionComplete();
        }
      };
      
      synthesisRef.current.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsSpeaking(false);
        toast.error('Error with voice guidance');
      };
      
      // Select a voice (prefer female voice if available)
      window.speechSynthesis.onvoiceschanged = () => {
        if (synthesisRef.current) {
          const voices = window.speechSynthesis.getVoices();
          const preferredVoice = voices.find(voice => 
            voice.lang.includes('hi') || // Hindi voice as fallback
            voice.lang.includes('en-IN') || // Indian English
            voice.name.includes('Female')
          ) || voices[0];
          
          if (preferredVoice) {
            synthesisRef.current.voice = preferredVoice;
          }
        }
      };
      
      return () => {
        if (synthesisRef.current && window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, [onInstructionComplete, instructions]);
  
  // Speak the current instruction
  useEffect(() => {
    if (!isMuted && instructions[currentInstruction] && synthesisRef.current) {
      const speak = async () => {
        try {
          // Translate the instruction to Marathi (in a real app)
          // For demo, we'll use English but in production would use the API call
          const marathiText = await translateToMarathi(instructions[currentInstruction]);
          
          synthesisRef.current!.text = marathiText;
          setIsSpeaking(true);
          window.speechSynthesis.speak(synthesisRef.current!);
        } catch (error) {
          console.error('Translation error:', error);
          // Fallback to English
          synthesisRef.current!.text = instructions[currentInstruction];
          setIsSpeaking(true);
          window.speechSynthesis.speak(synthesisRef.current!);
        }
      };
      
      speak();
    }
  }, [currentInstruction, isMuted, instructions]);

  const toggleMute = () => {
    if (isSpeaking && !isMuted) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setIsMuted(!isMuted);
    toast.success(isMuted ? 'Voice guidance enabled' : 'Voice guidance disabled');
  };

  const repeatInstruction = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
    }
    
    if (synthesisRef.current && !isMuted) {
      synthesisRef.current.text = instructions[currentInstruction];
      setIsSpeaking(true);
      window.speechSynthesis.speak(synthesisRef.current);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`relative ${isSpeaking ? 'animate-pulse-gentle' : ''}`}>
        <button
          onClick={toggleMute}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
          aria-label={isMuted ? 'Enable voice guidance' : 'Disable voice guidance'}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : isSpeaking ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <Volume1 className="w-5 h-5" />
          )}
        </button>
        
        {isSpeaking && (
          <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-accent animate-ping"></div>
        )}
      </div>
    </div>
  );
};

export default VoiceAssistant;
