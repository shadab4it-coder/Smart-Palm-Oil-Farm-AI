import React, { useState } from 'react';
import { Plane, Map, Battery, Signal, Video, AlertTriangle, CheckCircle2, Play, Pause } from 'lucide-react';

export function DroneMonitoring() {
  const [isFlying, setIsFlying] = useState(false);
  const [battery, setBattery] = useState(85);
  const [signal, setSignal] = useState(98);

  const toggleFlight = () => {
    setIsFlying(!isFlying);
    if (!isFlying) {
      // Simulate battery drain and signal fluctuation
      const interval = setInterval(() => {
        setBattery(prev => Math.max(0, prev - 1));
        setSignal(prev => Math.max(0, Math.min(100, prev + (Math.random() * 10 - 5))));
      }, 5000);
      return () => clearInterval(interval);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-100 text-slate-700 rounded-xl">
            <Plane className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Drone Fleet Monitoring</h2>
            <p className="text-gray-500">Live telemetry and aerial surveillance for Sector 4.</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-slate-200">
            <Battery className={`w-5 h-5 ${battery > 20 ? 'text-emerald-500' : 'text-rose-500'}`} />
            <span className="font-semibold text-slate-700">{battery}%</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-slate-200">
            <Signal className={`w-5 h-5 ${signal > 50 ? 'text-emerald-500' : 'text-amber-500'}`} />
            <span className="font-semibold text-slate-700">{Math.round(signal)}%</span>
          </div>
          <button
            onClick={toggleFlight}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-white transition-all ${
              isFlying ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {isFlying ? (
              <>
                <Pause className="w-5 h-5" />
                Return to Base
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Launch Patrol
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Video Feed / Map Area */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl overflow-hidden relative aspect-video shadow-lg border border-slate-800">
          {/* Simulated Map/Video Background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-luminosity"></div>
          
          {/* Overlay Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          {/* HUD Elements */}
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-md text-sm font-mono flex items-center gap-2 border border-white/10">
              <span className={`w-2 h-2 rounded-full ${isFlying ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`}></span>
              {isFlying ? 'REC' : 'STDBY'}
            </div>
            <div className="bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-md text-sm font-mono border border-white/10">
              ALT: {isFlying ? '120m' : '0m'}
            </div>
            <div className="bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-md text-sm font-mono border border-white/10">
              SPD: {isFlying ? '15m/s' : '0m/s'}
            </div>
          </div>

          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-mono border border-white/10 flex flex-col items-end">
            <span>LAT: 1.4927° N</span>
            <span>LNG: 103.7414° E</span>
          </div>

          {/* Crosshair */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
            <div className="w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            </div>
            <div className="absolute w-full h-[1px] bg-white/10"></div>
            <div className="absolute h-full w-[1px] bg-white/10"></div>
          </div>
        </div>

        {/* Side Panel: Flight Plan & Alerts */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Map className="w-5 h-5 text-slate-500" />
              Flight Plan: Sector 4
            </h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              {[
                { id: 1, status: 'completed', label: 'Takeoff (Base A)' },
                { id: 2, status: 'current', label: 'Waypoint 1 (Block 4A)' },
                { id: 3, status: 'pending', label: 'Waypoint 2 (Block 4B)' },
                { id: 4, status: 'pending', label: 'Return to Base' },
              ].map((step, i) => (
                <div key={step.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : step.status === 'current' ? (
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                    ) : (
                      <span className="text-xs font-medium">{step.id}</span>
                    )}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className={`font-bold text-sm ${step.status === 'current' ? 'text-blue-600' : 'text-slate-700'}`}>
                        {step.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Video className="w-5 h-5 text-slate-500" />
              AI Detections (Live)
            </h3>
            <div className="space-y-3">
              {isFlying ? (
                <>
                  <div className="flex items-start gap-3 p-3 bg-rose-50 border border-rose-100 rounded-xl">
                    <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-rose-900">Potential Ganoderma</p>
                      <p className="text-xs text-rose-700 mt-1">Block 4A - Tree #142. Confidence: 87%</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-amber-900">Water Stress Detected</p>
                      <p className="text-xs text-amber-700 mt-1">Block 4A - Sector North. Confidence: 92%</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <Video className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Launch drone to start live AI analysis.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
