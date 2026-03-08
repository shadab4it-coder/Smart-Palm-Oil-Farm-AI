import React, { useState } from 'react';
import { TrendingUp, Calendar, CloudRain, Sun, Loader2, BarChart3 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

const mockHistoricalData = [
  { month: 'Jan', yield: 4000, rainfall: 250 },
  { month: 'Feb', yield: 3800, rainfall: 200 },
  { month: 'Mar', yield: 4500, rainfall: 180 },
  { month: 'Apr', yield: 4800, rainfall: 150 },
  { month: 'May', yield: 5100, rainfall: 120 },
  { month: 'Jun', yield: 5400, rainfall: 100 },
];

export function HarvestPrediction() {
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [forecastData, setForecastData] = useState<any[]>([]);

  const generatePrediction = async () => {
    setIsPredicting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `You are an expert agronomist specializing in Malaysian palm oil plantations. Based on the following historical yield and weather data, predict the harvest for the next 3 months (July, August, September).
      
      Historical Data (Jan-Jun):
      - Average Monthly Yield: 4600 tons
      - Average Monthly Rainfall: 166 mm
      - Current Weather Forecast: El Niño developing (drier than usual)
      - Tree Age: 8 years (Peak production phase)
      
      Provide a structured response with:
      1. Estimated Yield for Jul, Aug, Sep (in tons)
      2. Key factors influencing this prediction (e.g., El Niño impact, tree age)
      3. Recommended preparations for harvest (labor, logistics)
      Keep it practical and specific to Malaysian conditions.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setPrediction(response.text || 'Could not generate prediction.');
      
      // Mock forecast data for chart based on prediction
      setForecastData([
        { month: 'Jul', predicted: 5200, confidence: [4900, 5500] },
        { month: 'Aug', predicted: 4800, confidence: [4500, 5100] },
        { month: 'Sep', predicted: 4500, confidence: [4100, 4900] },
      ]);
      
    } catch (error) {
      console.error('Error generating prediction:', error);
      setPrediction('An error occurred. Please try again.');
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Harvest Prediction</h2>
              <p className="text-gray-500">AI-driven yield forecasting based on historical data and weather patterns.</p>
            </div>
          </div>
          <button
            onClick={generatePrediction}
            disabled={isPredicting}
            className={`py-3 px-6 rounded-xl font-semibold text-white flex items-center gap-2 transition-all ${
              isPredicting 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'
            }`}
          >
            {isPredicting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing Data...
              </>
            ) : (
              <>
                <BarChart3 className="w-5 h-5" />
                Generate Forecast
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Historical Data Chart */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Historical Yield vs Rainfall (Jan - Jun)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockHistoricalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                    <YAxis yAxisId="left" orientation="left" stroke="#10b981" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar yAxisId="left" dataKey="yield" name="Yield (tons)" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
                    <Bar yAxisId="right" dataKey="rainfall" name="Rainfall (mm)" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Forecast Chart (Visible after prediction) */}
            {forecastData.length > 0 && (
              <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                <h3 className="text-lg font-semibold text-indigo-900 mb-6">Predicted Yield (Jul - Sep)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e7ff" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#4f46e5', fontSize: 12 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#4f46e5', fontSize: 12 }} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="predicted" name="Predicted Yield (tons)" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>

          {/* AI Insights Panel */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm h-full flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              AI Insights & Planning
            </h3>
            
            <div className="flex-1 bg-gray-50 rounded-xl border border-gray-100 p-6 overflow-y-auto">
              {prediction ? (
                <div className="prose prose-sm prose-indigo max-w-none">
                  {prediction.split('\n').map((line, i) => {
                    if (line.startsWith('**') || line.match(/^[0-9]\./)) {
                      return <h4 key={i} className="font-bold text-gray-900 mt-6 mb-2 text-base">{line.replace(/\*\*/g, '')}</h4>;
                    }
                    if (line.trim() === '') return null;
                    if (line.startsWith('-')) {
                      return <li key={i} className="text-gray-600 ml-4 mb-1">{line.substring(1).trim()}</li>;
                    }
                    return <p key={i} className="text-gray-600 mb-3 leading-relaxed">{line}</p>;
                  })}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 text-center">
                  <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center">
                    <CloudRain className="w-8 h-8 text-indigo-300" />
                  </div>
                  <p className="text-sm max-w-[200px]">Click "Generate Forecast" to analyze historical data and weather patterns.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
