import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const outfit = Outfit({ subsets: ['latin'] });

export default function BCDRHome() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className={`min-h-screen bg-[#020617] text-white ${inter.className}`}>
            <Head>
                <title>BCDR Accelerator | Global Resilience</title>
                <meta name="description" content="Institutional Disaster Recovery & Resilience Orchestration" />
            </Head>

            {/* Glassmorphic Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-rose-600 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-600/20">
                            <span className="font-black text-2xl">R</span>
                        </div>
                        <div>
                            <span className={`${outfit.className} text-xl font-bold tracking-tight`}>BCDR Accelerator</span>
                        </div>
                    </div>
                    <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-400">
                        <a href="#orchestration" className="hover:text-rose-400 transition-colors">Orchestration</a>
                        <a href="#failover" className="hover:text-rose-400 transition-colors">Failover</a>
                        <a href="#dr-testing" className="hover:text-rose-400 transition-colors">DR Testing</a>
                        <button
                            onClick={() => window.location.href = '/dashboard'}
                            className="bg-rose-600 hover:bg-rose-500 text-white px-6 py-2.5 rounded-full transition-all shadow-xl shadow-rose-600/30 font-bold"
                        >
                            Crisis Command Center
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative pt-40 pb-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-rose-600/10 to-transparent blur-[120px] rounded-full" />

                <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-black text-rose-300 uppercase tracking-[0.2em] mb-10 translate-y-0 opacity-0 animate-fade-in-down">
                        <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_#f43f5e]" />
                        Enterprise Resilience Core
                    </div>
                    <h1 className={`${outfit.className} text-7xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter`}>
                        Survive the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-400 to-rose-400">Unthinkable.</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed">
                        Orchestrate multi-region failover, automate dependency-aware recovery, and validate RPO/RTO mandates with institutional precision across Azure, AWS, and Hybrid.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all shadow-2xl hover:shadow-white/10">
                            Run Resilience Scan
                        </button>
                        <button className="w-full sm:w-auto px-10 py-5 bg-slate-800/50 text-white border border-white/10 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all">
                            Initialize DR Drill
                        </button>
                    </div>
                </div>
            </main>

            <section className="max-w-7xl mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { title: 'Failover Automation', desc: 'Single-click cross-region activation with DNS cutover.', icon: '⚡' },
                    { title: 'Dependency Mapping', desc: 'Automatic service tiering and boot-order sequencing.', icon: '🗺️' },
                    { title: 'Cyber Recovery', desc: 'Secure air-gapped vault restoration after Ransomware.', icon: '🛡️' },
                    { title: 'Readiness Scoring', desc: 'Real-time board reporting on global recovery status.', icon: '📊' }
                ].map((feat, idx) => (
                    <div key={idx} className="p-10 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/[0.08] transition-all group">
                        <div className="text-4xl mb-8 group-hover:scale-110 transition-transform">{feat.icon}</div>
                        <h3 className="text-xl font-bold mb-4">{feat.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
                    </div>
                ))}
            </section>

            <footer className="py-20 border-t border-white/5 bg-slate-950/50 text-center">
                <p className="text-slate-600 text-xs font-black uppercase tracking-widest leading-loose">
                    © 2026 devopstrio bcdr accelerator &nbsp;·&nbsp; critical resilience framework &nbsp;·&nbsp; enterprise grade
                </p>
            </footer>

            <style jsx global>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
        </div>
    );
}
