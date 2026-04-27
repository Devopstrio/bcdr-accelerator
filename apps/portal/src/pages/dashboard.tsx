import React, { useState } from 'react';
import Head from 'next/head';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

export default function CrisisDashboard() {
    const [resilienceScore, setResilienceScore] = useState(94);
    const [activeDrills, setActiveDrills] = useState(3);

    return (
        <div className="min-h-screen bg-[#020617] text-white flex">
            {/* Sidebar */}
            <aside className="w-80 bg-[#0f172a]/40 border-r border-white/5 backdrop-blur-2xl flex flex-col">
                <div className="p-10 flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-rose-600/30">R</div>
                    <span className="font-bold text-xl tracking-tighter">RESILIENCE OPS</span>
                </div>

                <nav className="flex-1 px-6 space-y-2">
                    {['Crisis Command', 'Recovery Plans', 'Asset Topology', 'Testing Drills', 'Reports', 'Settings'].map((item) => (
                        <div key={item} className={`px-6 py-4 rounded-2xl cursor-pointer transition-all ${item === 'Crisis Command' ? 'bg-rose-600 shadow-2xl shadow-rose-600/20' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
                            <span className="text-sm font-bold">{item}</span>
                        </div>
                    ))}
                </nav>

                <div className="p-8">
                    <div className="p-6 bg-rose-600/10 border border-rose-600/20 rounded-[32px]">
                        <p className="text-[10px] text-rose-400 font-black uppercase tracking-widest mb-3">System Health</p>
                        <div className="text-4xl font-black mb-2">{resilienceScore}%</div>
                        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                            <div className="bg-rose-500 h-full" style={{ width: `${resilienceScore}%` }} />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-16 overflow-y-auto">
                <header className="flex justify-between items-start mb-16">
                    <div>
                        <h1 className={`${outfit.className} text-5xl font-black mb-4 tracking-tighter`}>Global Crisis Command</h1>
                        <p className="text-slate-500 text-lg">Monitoring 1,450 critical services across UK, US, and APAC regions.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all text-sm">Download BCDR Pack</button>
                        <button className="px-8 py-4 bg-rose-600 rounded-2xl font-bold hover:bg-rose-500 transition-all shadow-2xl shadow-rose-600/30 text-sm">Trigger Failover Drill</button>
                    </div>
                </header>

                {/* Global Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                    <StatCard label="Avg. Recovery Time" value="44m" sub="12% faster than Q4" trend="up" />
                    <StatCard label="RPO Adherence" value="99.2%" sub="Target: 99.0%" trend="up" />
                    <StatCard label="Protected Assets" value="12.4K" sub="Across 14 Clouds" trend="neutral" />
                    <StatCard label="Active Alerts" value="4" danger sub="Non-Critical" trend="down" />
                </div>

                <section className="bg-white/5 border border-white/5 rounded-[48px] p-12">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl font-black tracking-tight">Deployment & Failover Queue</h2>
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Real-time Sync Active</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <QueueItem app="Retail Banking API" source="US East" target="US West" status="FAILOVER_READY" time="Scheduled 2m" />
                        <QueueItem app="SAP Global Core" source="UK West" target="Europe North" status="TEST_IN_PROGRESS" time="Step 4/12" warning />
                        <QueueItem app="Identity Hub (AD)" source="Global" target="Standby Vault" status="COMPLIANT" time="Last Sync 1h" success />
                    </div>
                </section>
            </main>
        </div>
    );
}

const StatCard = ({ label, value, sub, trend, danger }: any) => (
    <div className="p-8 bg-[#0f172a]/50 border border-white/5 rounded-[32px] group hover:border-rose-500/20 transition-all">
        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4 group-hover:text-rose-400 transition-colors">{label}</p>
        <div className={`text-4xl font-black mb-2 ${danger ? 'text-rose-500' : 'text-white'}`}>{value}</div>
        <p className="text-xs text-slate-500 font-bold">{sub}</p>
    </div>
);

const QueueItem = ({ app, source, target, status, time, warning, success }: any) => (
    <div className="flex justify-between items-center p-8 bg-[#020617] border border-white/5 rounded-3xl hover:bg-white/5 transition-all cursor-pointer group">
        <div className="flex items-center gap-10">
            <div className={`w-3 h-3 rounded-full ${warning ? 'bg-amber-500 animate-pulse' : success ? 'bg-emerald-500' : 'bg-rose-600'}`} />
            <div>
                <p className="font-bold text-xl group-hover:text-rose-400 transition-colors">{app}</p>
                <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">{source}</span>
                    <span className="text-slate-700 text-xs text-bold">→</span>
                    <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">{target}</span>
                </div>
            </div>
        </div>
        <div className="text-right">
            <div className={`text-xs font-black mb-1 ${warning ? 'text-amber-400' : success ? 'text-emerald-400' : 'text-rose-400'}`}>{status}</div>
            <div className="text-[10px] text-slate-700 font-bold tracking-tight">{time}</div>
        </div>
    </div>
);
