import React, { useState } from 'react';
import { 
  TrendingDown, 
  TrendingUp, 
  Filter, 
  PieChart,
  ArrowRight,
  Database,
  CalendarDays,
  Activity
} from 'lucide-react';

// --- Rebel Style Constants ---
const COLORS = {
  primary: '#4F46E5', // Indigo 600
  background: '#F8FAFC', // Slate 50
  text: '#0F172A', // Slate 900
  muted: '#64748B', // Slate 500
  positive: '#10B981', // Emerald 500
  negative: '#F43F5E', // Rose 500
};

// --- Mock Data representing the PDF structure ---
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const SEGMENTS = ["Transient", "Group", "Contract", "Other"];

const DAILY_DATA = [
  { dow: "Mon", date: "09-01", bar: 319, eventsCy: null, eventsPy: null, occ: 3, rooms: 3, adr: 231.53, rev: 695, revpar: 6.95, trans: 70, group: 20, other: 10, pu1: 0, pu3: 0, pu7: 0, pu14: 2, pu21: 3, pu30: 3, pu60: 5, pu90: 5 },
  { dow: "Tue", date: "09-02", bar: 329, eventsCy: null, eventsPy: null, occ: 1, rooms: 1, adr: 225.83, rev: 226, revpar: 2.26, trans: 100, group: 0, other: 0, pu1: 0, pu3: 0, pu7: 0, pu14: 0, pu21: 0, pu30: 1, pu60: 1, pu90: 1 },
  { dow: "Wed", date: "09-03", bar: 369, eventsCy: "Green Day at Co...", eventsPy: null, occ: 11, rooms: 11, adr: 292.35, rev: 3216, revpar: 32.16, trans: 50, group: 40, other: 10, pu1: 0, pu3: 0, pu7: 0, pu14: 0, pu21: 10, pu30: 11, pu60: 11, pu90: 11 },
  { dow: "Thu", date: "09-04", bar: 379, eventsCy: null, eventsPy: null, occ: 14, rooms: 14, adr: 409.50, rev: 5733, revpar: 57.33, trans: 60, group: 30, other: 10, pu1: 0, pu3: 0, pu7: 4, pu14: 4, pu21: 14, pu30: 14, pu60: 14, pu90: 14 },
  { dow: "Fri", date: "09-05", bar: 439, eventsCy: null, eventsPy: null, occ: 13, rooms: 13, adr: 330.86, rev: 4301, revpar: 43.01, trans: 80, group: 10, other: 10, pu1: 0, pu3: 0, pu7: 0, pu14: 2, pu21: 12, pu30: 12, pu60: 12, pu90: 12 },
  { dow: "Sat", date: "09-06", bar: 459, eventsCy: null, eventsPy: null, occ: 42, rooms: 42, adr: 461.46, rev: 19381, revpar: 193.81, trans: 40, group: 50, other: 10, pu1: 1, pu3: 2, pu7: 5, pu14: 8, pu21: 15, pu30: 20, pu60: 25, pu90: 30 },
  { dow: "Sun", date: "09-07", bar: 329, eventsCy: "Lions non-impact...", eventsPy: null, occ: 21, rooms: 21, adr: 298.19, rev: 6262, revpar: 62.62, trans: 90, group: 5, other: 5, pu1: 0, pu3: 0, pu7: 0, pu14: 2, pu21: 3, pu30: 3, pu60: 3, pu90: 3 },
  { dow: "Mon", date: "09-08", bar: 349, eventsCy: null, eventsPy: null, occ: 18, rooms: 18, adr: 309.00, rev: 5562, revpar: 55.62, trans: 70, group: 20, other: 10, pu1: 0, pu3: 0, pu7: 0, pu14: 0, pu21: 0, pu30: 0, pu60: 0, pu90: 0 },
  { dow: "Tue", date: "09-09", bar: 419, eventsCy: "Tigers Game Col...", eventsPy: null, occ: 52, rooms: 52, adr: 358.62, rev: 18648, revpar: 186.48, trans: 30, group: 60, other: 10, pu1: 0, pu3: 0, pu7: 0, pu14: 0, pu21: -2, pu30: 29, pu60: 40, pu90: 50 },
  { dow: "Wed", date: "09-10", bar: 419, eventsCy: "Tigers Game Col...", eventsPy: null, occ: 39, rooms: 39, adr: 382.85, rev: 14931, revpar: 149.31, trans: 40, group: 50, other: 10, pu1: 0, pu3: 0, pu7: 0, pu14: 5, pu21: 3, pu30: 34, pu60: 40, pu90: 45 },
];

// --- Sub-components (Rebel Styled) ---

const SummaryCard = ({ title, value, subValue, isNegative }) => (
  <div className="bg-white p-5 border-r border-slate-100 last:border-r-0 min-w-[190px] group transition-all duration-200 hover:bg-slate-50">
    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{title}</span>
    <div className="mt-2 flex flex-col">
      <div className="text-2xl font-black text-slate-900 tracking-tight">{value}</div>
      <div className={`text-[12px] flex items-center mt-1 font-bold ${isNegative ? 'text-rose-500' : 'text-emerald-500'}`}>
        {isNegative ? <TrendingDown size={14} className="mr-1" /> : <TrendingUp size={14} className="mr-1" />}
        {subValue}
        <span className="text-slate-300 ml-1.5 font-normal uppercase text-[10px]">vs STLY</span>
      </div>
    </div>
  </div>
);

const HeatmapCell = ({ value, max, type = 'occ' }) => {
  const intensity = Math.min(Math.floor((value / max) * 100), 100);
  // Rebel Theme Color Scaling
  const bgColor = type === 'occ' 
    ? `rgba(79, 70, 229, ${intensity / 100 * 0.2})` 
    : `rgba(15, 23, 42, ${intensity / 100 * 0.08})`; 
  
  return (
    <td className="p-3 border-r border-slate-100 text-center font-bold tabular-nums text-slate-800" style={{ backgroundColor: bgColor }}>
      {type === 'occ' ? `${value}%` : `$${value.toFixed(2)}`}
    </td>
  );
};

const MarketMixBar = ({ transient, group, other }) => (
  <td className="p-3 border-r border-slate-100 min-w-[110px]">
    <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-slate-100 border border-slate-200/50">
      <div className="bg-indigo-600" style={{ width: `${transient}%` }} />
      <div className="bg-indigo-300" style={{ width: `${group}%` }} />
      <div className="bg-slate-300" style={{ width: `${other}%` }} />
    </div>
  </td>
);

// --- Main App Component ---

export default function App() {
  const [activeSegment, setActiveSegment] = useState("Transient");
  const [selectedMonth, setSelectedMonth] = useState("Sep");

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 p-8 antialiased">
      <div className="max-w-[1700px] mx-auto space-y-8">
        
        {/* --- Branded Header --- */}
        <header className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-200 overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between px-8 py-6 border-b border-slate-100">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-200">
                  <Activity size={20} className="text-white" />
                </div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">
                  Daily Pickup <span className="text-indigo-600">Metric</span>
                </h1>
              </div>
              <p className="text-[10px] text-slate-400 font-black tracking-[0.2em] uppercase">
                Property: <span className="text-slate-900">DTWDFH</span> • DETROIT FOUNDATION HOTEL
              </p>
            </div>
            
            {/* Month Picker Toggle */}
            <div className="flex bg-slate-50 rounded-xl p-1 border border-slate-200 shadow-inner mt-4 md:mt-0 overflow-x-auto no-scrollbar">
              {MONTHS.map(m => (
                <button 
                  key={m}
                  onClick={() => setSelectedMonth(m)}
                  className={`px-4 py-2 text-[11px] font-black uppercase rounded-lg transition-all duration-200 ${selectedMonth === m ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Key Performance Row */}
          <div className="flex overflow-x-auto no-scrollbar bg-white">
            <div className="bg-slate-900 p-6 min-w-[200px] flex flex-col justify-center border-r border-slate-800">
               <span className="text-[20px] font-black text-white italic tracking-tighter uppercase">{selectedMonth} 2025</span>
               <div className="flex items-center gap-2 mt-1">
                 <CalendarDays size={14} className="text-indigo-400" />
                 <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">OTB Summary</span>
               </div>
            </div>
            <SummaryCard title="Occupancy" value="29.2%" subValue="-11.60%" isNegative={true} />
            <SummaryCard title="Rooms OTB" value="876" subValue="-348" isNegative={true} />
            <SummaryCard title="Avg Daily Rate" value="$362.47" subValue="-$10.30" isNegative={true} />
            <SummaryCard title="Total Revenue" value="$317,520" subValue="-$138,742" isNegative={true} />
            <SummaryCard title="RevPAR" value="$105.84" subValue="-$46.25" isNegative={true} />
            
            <div className="flex-1 flex items-center justify-end px-12 gap-8 border-l border-slate-50">
              <div className="text-right">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] block mb-2">Market Mix OTB</span>
                <div className="flex gap-4 text-[10px] font-black text-slate-600">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> TRN</span>
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-indigo-300" /> GRP</span>
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> OTH</span>
                </div>
              </div>
              <div className="w-16 h-16 relative flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-16 h-16 transform -rotate-90">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#F1F5F9" strokeWidth="3.5" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#4F46E5" strokeWidth="3.5" strokeDasharray="60 100" strokeLinecap="round" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#A5B4FC" strokeWidth="3.5" strokeDasharray="25 100" strokeDashoffset="-60" strokeLinecap="round" />
                </svg>
                <PieChart size={18} className="absolute text-slate-300" />
              </div>
            </div>
          </div>
        </header>

        {/* --- Filters & Controls --- */}
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Segment Filter:</span>
            <div className="flex bg-slate-50 rounded-lg p-1 border border-slate-100">
              {SEGMENTS.map(s => (
                <button 
                  key={s}
                  onClick={() => setActiveSegment(s)}
                  className={`px-6 py-2 text-[11px] font-bold rounded-md transition-all ${activeSegment === s ? 'bg-white shadow-sm text-indigo-600 border border-slate-200' : 'text-slate-400 hover:text-slate-900'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <Activity size={14} className="text-emerald-500" />
              <span className="text-slate-900 uppercase tracking-tighter">Live Status</span>
            </div>
          </div>
        </div>

        {/* --- High Density Report Table --- */}
        <div className="bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.04)] border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1600px]">
              <thead>
                {/* Visual Groups Header */}
                <tr className="bg-slate-900 text-[10px] font-black text-indigo-400 uppercase tracking-[0.25em] border-b border-slate-800">
                  <th colSpan={5} className="px-6 py-4 border-r border-slate-800">Operational Log</th>
                  <th colSpan={6} className="px-6 py-4 border-r border-slate-800 text-center text-white">Daily Performance Metrics (OTB)</th>
                  <th colSpan={8} className="px-6 py-4 text-center text-emerald-400 bg-emerald-950/20">Velocity Delta (Pickup)</th>
                </tr>
                {/* Individual Column Header */}
                <tr className="bg-white text-[11px] font-black text-slate-900 uppercase border-b border-slate-200 sticky top-0 z-20">
                  <th className="p-4 border-r border-slate-100">DOW</th>
                  <th className="p-4 border-r border-slate-100">Date</th>
                  <th className="p-4 border-r border-slate-100">BAR Rate</th>
                  <th className="p-4 border-r border-slate-100">Event CY</th>
                  <th className="p-4 border-r border-slate-100">Event PY</th>
                  <th className="p-4 border-r border-slate-100 text-center bg-indigo-50/20">Occ OTB</th>
                  <th className="p-4 border-r border-slate-100 text-center bg-indigo-50/20">Rooms</th>
                  <th className="p-4 border-r border-slate-100 text-center bg-indigo-50/20">Mix</th>
                  <th className="p-4 border-r border-slate-100 text-right">ADR</th>
                  <th className="p-4 border-r border-slate-100 text-right">Revenue</th>
                  <th className="p-4 border-r border-slate-100 text-right">RevPAR</th>
                  
                  {/* Pickup Delta Headers */}
                  {["01d", "03d", "07d", "14d", "21d", "30d", "60d", "90d"].map(pu => (
                    <th key={pu} className="p-4 border-r border-slate-100 text-center bg-emerald-50/10 text-emerald-800">
                      {pu}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[12px] font-bold text-slate-600">
                {DAILY_DATA.map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-100 group hover:bg-slate-50/50 transition-colors">
                    <td className={`p-3.5 border-r border-slate-100 font-black ${row.dow === 'Sat' || row.dow === 'Sun' ? 'text-indigo-600 bg-indigo-50/20' : 'text-slate-400'}`}>
                      {row.dow}
                    </td>
                    <td className="p-3.5 border-r border-slate-100 tabular-nums text-slate-900">{row.date}</td>
                    <td className="p-3.5 border-r border-slate-100 tabular-nums font-black text-slate-900 bg-slate-50/30">
                      <div className="flex items-center justify-between">
                        ${row.bar}
                        <ArrowRight size={12} className="text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </td>
                    <td className="p-3.5 border-r border-slate-100 text-[11px] font-semibold text-slate-800 italic truncate max-w-[130px]" title={row.eventsCy}>
                      {row.eventsCy || "—"}
                    </td>
                    <td className="p-3.5 border-r border-slate-100 text-[11px] text-slate-300 truncate max-w-[130px]">
                      {row.eventsPy || "—"}
                    </td>
                    
                    {/* Performance Metrics Blocks */}
                    <HeatmapCell value={row.occ} max={100} type="occ" />
                    <td className="p-3.5 border-r border-slate-100 text-center tabular-nums font-black text-slate-900">{row.rooms}</td>
                    <MarketMixBar transient={row.trans} group={row.group} other={row.other} />
                    <td className="p-3.5 border-r border-slate-100 text-right tabular-nums text-slate-400 font-medium tracking-tight">${row.adr.toFixed(2)}</td>
                    <td className="p-3.5 border-r border-slate-100 text-right tabular-nums text-slate-900 font-black tracking-tight">${row.rev.toLocaleString()}</td>
                    <HeatmapCell value={row.revpar} max={350} type="revpar" />

                    {/* Pickup Delta Block */}
                    {[row.pu1, row.pu3, row.pu7, row.pu14, row.pu21, row.pu30, row.pu60, row.pu90].map((val, pIdx) => (
                      <td key={pIdx} className={`p-3.5 border-r border-slate-100 text-center tabular-nums font-black ${val > 0 ? 'text-emerald-500 bg-emerald-50/5' : val < 0 ? 'text-rose-500 bg-rose-50/5' : 'text-slate-200'}`}>
                        {val === 0 ? "—" : val > 0 ? `+${val}` : val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Report Footer Meta --- */}
        <footer className="flex flex-col md:flex-row justify-between items-center px-6 py-4 bg-white rounded-xl border border-slate-200 shadow-sm gap-4">
          <div className="flex items-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2.5 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
              Live Feed Connection Active
            </span>
            <span>Query Sync: 06:17 AM</span>
            <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">ID: DTW-DFH-2026</span>
          </div>
        </footer>
      </div>
    </div>
  );
}