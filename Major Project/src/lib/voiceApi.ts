
// This is a mock implementation for demo purposes
// In a real app, you would connect to a translation API

// Mock translations for common phrases in Marathi
const marathiTranslations: Record<string, string> = {
  'Welcome to LeafCare': 'लीफकेअर मध्ये आपले स्वागत आहे',
  'Select crop type': 'पीक प्रकार निवडा',
  'Banana': 'केळी',
  'Papaya': 'पपई',
  'Capture image': 'छायाचित्र काढा',
  'Upload image': 'छायाचित्र अपलोड करा',
  'Analyzing': 'विश्लेषण करत आहे',
  'Disease detected': 'रोग आढळला',
  'Treatment': 'उपचार',
  'Prevention': 'प्रतिबंध'
};

/**
 * Translates English text to Marathi
 * 
 * In a real app, this would connect to a translation API like Google Translate
 * For demo purposes, we'll use a simple mapping for common phrases and return the original
 * text for phrases not in our dictionary
 */
export const translateToMarathi = async (text: string): Promise<string> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Check if we have a direct translation for this phrase
  if (marathiTranslations[text]) {
    return marathiTranslations[text];
  }
  
  // Check if we have translations for parts of the phrase
  let translatedText = text;
  Object.entries(marathiTranslations).forEach(([english, marathi]) => {
    if (text.includes(english)) {
      translatedText = translatedText.replace(english, marathi);
    }
  });
  
  // In a real app, you would call an actual translation API here
  // For demo, we'll just return what we have
  return translatedText;
};

/**
 * Speaks the given text in Marathi
 * 
 * In a real app, this would use a Text-to-Speech API that supports Marathi
 * For demo purposes, we'll use the browser's speech synthesis API
 */
export const speakMarathi = (text: string): void => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find a Hindi or Indian English voice as fallback
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang.includes('hi') || // Hindi voice
      voice.lang.includes('en-IN') // Indian English
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  }
};
