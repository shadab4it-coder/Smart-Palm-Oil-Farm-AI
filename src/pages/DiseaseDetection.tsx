import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, AlertCircle, CheckCircle2, Loader2, Leaf } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Extract base64 data
      const base64Data = selectedImage.split(',')[1];
      const mimeType = selectedImage.split(';')[0].split(':')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data: base64Data,
              },
            },
            {
              text: "You are an expert agronomist specializing in Malaysian palm oil plantations. Analyze this image of a palm oil tree/leaf/fruit. Identify any visible diseases (like Ganoderma Basal Stem Rot, Bud Rot, or nutrient deficiencies). Provide a structured response with: 1. Diagnosis (or 'Healthy' if no issues), 2. Confidence Level, 3. Recommended Actions. Keep it concise and professional.",
            },
          ],
        },
      });

      setResult(response.text || 'Could not analyze the image.');
    } catch (error) {
      console.error('Error analyzing image:', error);
      setResult('An error occurred during analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
            <Leaf className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">AI Disease Detection</h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            Upload a clear photo of palm fronds, fruit bunches, or trunks. Our AI will analyze it for common diseases like Ganoderma or nutrient deficiencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-4">
            <div 
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
                selectedImage ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400 bg-gray-50'
              }`}
            >
              {selectedImage ? (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-black/5">
                  <img src={selectedImage} alt="Selected" className="w-full h-full object-contain" />
                  <button 
                    onClick={() => {
                      setSelectedImage(null);
                      setResult(null);
                    }}
                    className="absolute top-2 right-2 bg-white/90 text-gray-700 p-1.5 rounded-md text-sm font-medium shadow-sm hover:bg-white"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div className="py-12">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-6 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
                  >
                    Select File
                  </button>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>

            <button
              onClick={analyzeImage}
              disabled={!selectedImage || isAnalyzing}
              className={`w-full py-3 px-4 rounded-xl font-medium text-white flex items-center justify-center gap-2 transition-all ${
                !selectedImage || isAnalyzing 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Image...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Analyze with AI
                </>
              )}
            </button>
          </div>

          {/* Results Section */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Analysis Results
            </h3>
            
            <div className="flex-1 bg-white rounded-xl border border-gray-200 p-4 overflow-y-auto">
              {result ? (
                <div className="prose prose-sm prose-emerald max-w-none">
                  {/* Simple markdown rendering for the result */}
                  {result.split('\n').map((line, i) => {
                    if (line.startsWith('**') || line.match(/^[0-9]\./)) {
                      return <p key={i} className="font-semibold text-gray-900 mt-4 mb-2">{line.replace(/\*\*/g, '')}</p>;
                    }
                    if (line.trim() === '') return null;
                    return <p key={i} className="text-gray-600 mb-2">{line}</p>;
                  })}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-3">
                  <AlertCircle className="w-8 h-8 opacity-50" />
                  <p className="text-sm text-center">Upload an image and click analyze to see results here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
