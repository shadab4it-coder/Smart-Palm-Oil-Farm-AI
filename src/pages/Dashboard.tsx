import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  Droplets, 
  ThermometerSun, 
  Wind, 
  CloudRain,
  Activity,
  Plane
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const yieldData = [
  { month: 'Jan', yield: 4000, expected: 4200 },
  { month: 'Feb', yield: 3800, expected: 4000 },
  { month: 'Mar', yield: 4500, expected: 4300 },
  { month: 'Apr', yield: 4800, expected: 4600 },
  { month: 'May', yield: 5100, expected: 4900 },
  { month: 'Jun', yield: 5400, expected: 5200 },
];

const weatherData = [
  { time: '08:00', temp: 24, humidity: 85 },
  { time: '12:00', temp: 32, humidity: 65 },
  { time: '16:00', temp: 30, humidity: 70 },
  { time: '20:00', temp: 26, humidity: 80 },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Yield (YTD)', value: '27.6k tons', icon: TrendingUp, trend: '+5.2%', color: 'text-emerald-600', bg: 'bg-emerald-100' },
          { label: 'Active Alerts', value: '3 Critical', icon: AlertTriangle, trend: '-2', color: 'text-rose-600', bg: 'bg-rose-100' },
          { label: 'Soil Moisture', value: '68%', icon: Droplets, trend: 'Optimal', color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'Farm Health Score', value: '92/100', icon: Activity, trend: '+1.5', color: 'text-indigo-600', bg: 'bg-indigo-100' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className={`text-sm font-medium mt-2 ${stat.trend.startsWith('+') || stat.trend === 'Optimal' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.trend} from last month
              </p>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Yield Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Yield Forecast vs Actual</h2>
            <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yieldData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="yield" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorYield)" name="Actual Yield" />
                <Line type="monotone" dataKey="expected" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Expected" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weather Widget */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-sm text-white flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-medium opacity-90">Current Weather</h2>
                <p className="text-sm opacity-75">Johor Bahru Estate</p>
              </div>
              <ThermometerSun className="w-8 h-8 opacity-90" />
            </div>
            <div className="mt-4">
              <span className="text-5xl font-bold tracking-tighter">32°C</span>
              <span className="text-xl ml-2 opacity-80">Partly Cloudy</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-2 text-sm opacity-80 mb-1">
                <Wind className="w-4 h-4" /> Wind
              </div>
              <p className="font-semibold">12 km/h NE</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-2 text-sm opacity-80 mb-1">
                <CloudRain className="w-4 h-4" /> Humidity
              </div>
              <p className="font-semibold">65%</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex justify-between items-center text-sm">
              {weatherData.map((w, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <span className="opacity-80">{w.time}</span>
                  <span className="font-semibold">{w.temp}°</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Alerts</h2>
        <div className="space-y-4">
          {[
            { title: 'Ganoderma detected in Block A4', time: '2 hours ago', type: 'critical', icon: AlertTriangle },
            { title: 'Low soil moisture in Block C2', time: '5 hours ago', type: 'warning', icon: Droplets },
            { title: 'Drone survey completed for Sector 3', time: '1 day ago', type: 'info', icon: Plane },
          ].map((alert, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className={`p-2 rounded-lg ${
                alert.type === 'critical' ? 'bg-rose-100 text-rose-600' :
                alert.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                <alert.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900">{alert.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
              </div>
              <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
