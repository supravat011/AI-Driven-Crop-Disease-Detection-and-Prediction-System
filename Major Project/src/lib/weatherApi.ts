
// This is a mock implementation for demo purposes
// In a real app, you would connect to a real weather API like OpenWeatherMap

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
  timeOfDay: 'day' | 'night';
}

export const getWeatherData = async (): Promise<WeatherData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real implementation, you would make a fetch request to a weather API
  // For demo purposes, we'll return mock data
  
  // Get random weather data for demonstration
  const conditions = ['clear', 'cloudy', 'partly cloudy', 'rain', 'thunderstorm'];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  
  const randomTemp = Math.floor(Math.random() * 15) + 20; // 20-35°C
  const randomHumidity = Math.floor(Math.random() * 30) + 50; // 50-80%
  const randomWind = Math.floor(Math.random() * 20) + 5; // 5-25 km/h
  
  // Check if it's day or night based on current time
  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 18;
  
  return {
    temperature: randomTemp,
    condition: randomCondition,
    humidity: randomHumidity,
    windSpeed: randomWind,
    location: 'Current Location',
    timeOfDay: isDay ? 'day' : 'night'
  };
};

// In a real app, you would also implement functions to get the user's location
export const getUserLocation = async (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        error => {
          console.error('Error getting location:', error);
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser'));
    }
  });
};
