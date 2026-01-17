
import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, CloudSnow, CloudLightning, Cloudy, Sun, Moon, Wind, Thermometer, Droplets, MapPin } from 'lucide-react';
import { getWeatherData } from '../lib/weatherApi';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
  timeOfDay: 'day' | 'night';
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const data = await getWeatherData();
        setWeather(data);
        setError(null);
      } catch (err) {
        setError('Failed to load weather data');
        console.error('Error fetching weather:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = () => {
    if (!weather) return <Cloud className="w-8 h-8" />;
    
    const { condition, timeOfDay } = weather;
    
    switch (condition.toLowerCase()) {
      case 'clear':
        return timeOfDay === 'day' ? 
          <Sun className="w-8 h-8 text-amber-500" /> : 
          <Moon className="w-8 h-8 text-indigo-300" />;
      case 'rain':
        return <CloudRain className="w-8 h-8 text-blue-400" />;
      case 'snow':
        return <CloudSnow className="w-8 h-8 text-blue-200" />;
      case 'thunderstorm':
        return <CloudLightning className="w-8 h-8 text-purple-500" />;
      case 'cloudy':
      case 'overcast':
        return <Cloudy className="w-8 h-8 text-gray-400" />;
      case 'partly cloudy':
        return timeOfDay === 'day' ? 
          <Cloudy className="w-8 h-8 text-gray-400" /> : 
          <Cloudy className="w-8 h-8 text-gray-400" />;
      default:
        return <Cloud className="w-8 h-8" />;
    }
  };

  if (loading) {
    return (
      <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-border/50 shadow-sm animate-pulse">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-muted h-10 w-10"></div>
          <div className="flex-1">
            <div className="h-4 bg-muted rounded w-24 mb-2"></div>
            <div className="h-3 bg-muted rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-sm">
        {error}
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-border/50 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-primary/10">
          {getWeatherIcon()}
        </div>
        
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-medium">{weather.temperature}°C</span>
            <span className="text-sm text-muted-foreground">{weather.condition}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-3 h-3 mr-1" />
            {weather.location}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Droplets className="w-3 h-3" />
          <span>Humidity: {weather.humidity}%</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Wind className="w-3 h-3" />
          <span>Wind: {weather.windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
