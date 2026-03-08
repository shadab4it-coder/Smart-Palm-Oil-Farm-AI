import React, { useState } from 'react';
import { Droplets, Calculator, Leaf, Loader2, ArrowRight } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export function FertilizerOptimization() {
  const [formData, setFormData] = useState({
    soilType: 'peat',
    phLevel: 5.5,
    nitrogen: 40,
    phosphorus: 20,
    potassium: 30,
    treeAge: 8,
    lastYield: 25,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateRecommendation = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `You are an expert agronomist specializing in Malaysian palm oil plantations. Based on the following soil and farm data, provide a customized fertilizer recommendation plan.
      
      Data:
      - Soil Type: ${formData.soilType}
      - pH Level: ${formData.phLevel}
      - Nitrogen (N) Level: ${formData.nitrogen} ppm
      - Phosphorus (P) Level: ${formData.phosphorus} ppm
      - Potassium (K) Level: ${formData.potassium} ppm
      - Tree Age: ${formData.treeAge} years
      - Last Year's Yield: ${formData.lastYield} tons/ha
      
      Provide a structured response with:
      1. Immediate Actions (e.g., pH correction if needed)
      2. Recommended NPK Ratio and Dosage per palm
      3. Application Schedule (months/frequency)
      4. Expected Yield Improvement
      Keep it practical and specific to Malaysian conditions.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setRecommendation(response.text || 'Could not generate recommendation.');
    } catch (error) {
      console.error('Error generating recommendation:', error);
      setRecommendation('An error occurred. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <Droplets className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Fertilizer Optimizer</h2>
            <p className="text-gray-500">Input soil test results to get AI-driven NPK recommendations.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Form */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
                <select 
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3"
                >
                  <option value="peat">Peat Soil</option>
                  <option value="mineral">Mineral Soil</option>
                  <option value="coastal">Coastal Clay</option>
                  <option value="sandy">Sandy Soil</option>
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">pH Level</label>
                <input 
                  type="number" 
                  name="phLevel"
                  value={formData.phLevel}
                  onChange={handleChange}
                  step="0.1"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3"
                />
              </div>
              
              <div className="col-span-2">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 border-b pb-2">Nutrient Levels (ppm)</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Nitrogen (N)</label>
                    <input type="number" name="nitrogen" value={formData.nitrogen} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Phosphorus (P)</label>
                    <input type="number" name="phosphorus" value={formData.phosphorus} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Potassium (K)</label>
                    <input type="number" name="potassium" value={formData.potassium} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm" />
                  </div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tree Age (Years)</label>
                <input type="number" name="treeAge" value={formData.treeAge} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Yield (tons/ha)</label>
                <input type="number" name="lastYield" value={formData.lastYield} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm" />
              </div>
            </div>

            <button
              onClick={generateRecommendation}
              disabled={isGenerating}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all ${
                isGenerating 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Calculating Optimal Mix...
                </>
              ) : (
                <>
                  <Calculator className="w-5 h-5" />
                  Generate Recommendation
                </>
              )}
            </button>
          </div>

          {/* Output / Recommendation */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 h-full min-h-[400px] flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-blue-600" />
              AI Recommendation Plan
            </h3>
            
            <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6 overflow-y-auto">
              {recommendation ? (
                <div className="prose prose-sm prose-blue max-w-none">
                  {recommendation.split('\n').map((line, i) => {
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
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-sm text-center max-w-xs">Fill in the soil data and click generate to get a customized fertilizer plan.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
