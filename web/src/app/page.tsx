'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mic, ArrowRight, Zap, Users, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════
// AXIOM RESET - SIMPLIFIED LANDING PAGE
// Clean Focus: Hero + 3 Featured Agents + CTAs to /agents & /pricing
// ═══════════════════════════════════════════════════════════════════

// Featured Agents (Top 3)
const FEATURED_AGENTS = [
    { id: 'sofra', name: 'Sofra', nameAr: 'سفرة', icon: '🍽️', color: '#39FF14', desc: 'Restaurant OS', descAr: 'نظام المطعم', price: '$1.99', image: '/agents/sofra-humanized.png' },
    { id: 'tajer', name: 'Tajer', nameAr: 'تاجر', icon: '🏭', color: '#3B82F6', desc: 'Smart Store', descAr: 'المتجر الذكي', price: '$4.99', image: '/agents/tajer-humanized.png' },
    { id: 'tirs', name: 'Tirs', nameAr: 'تِرس', icon: '🛵', color: '#39FF14', desc: '100% Driver Fees', descAr: '100% للسائق', price: 'FREE', image: '/agents/tirs-humanized.png' },
];

// Waveform Visualizer Component
const WaveformVisualizer = () => (
    <div className="flex items-center justify-center gap-0.5">
        {[...Array(5)].map((_, i) => (
            <motion.div
                key={i}
                className="w-1 bg-[#39FF14] rounded-full"
                animate={{ height: [8, 20, 8] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
            />
        ))}
    </div>
);

export default function Home() {
    const [isArabic, setIsArabic] = useState(false);
    const [isListening, setIsListening] = useState(false);

    const isRTL = isArabic;

    const t = isArabic ? {
        headline1: 'أول نظام تشغيل',
        headline2: 'ذكاء اصطناعي في مصر',
        subtitle: 'عمولة 0% على الطلبات • السائق ياخد 100% رسوم التوصيل',
        tapToSpeak: 'اضغط للتحدث',
        listening: 'جاري الاستماع...',
        featuredAgents: '3 وكلاء رئيسيين',
        viewAll: 'عرض كل الـ 10 وكلاء',
        viewPricing: 'عرض الأسعار',
        stats: { agents: '10 وكلاء', commission: 'عمولة 0%', support: 'دعم عربي' },
    } : {
        headline1: "Egypt's First",
        headline2: 'AI Operating System',
        subtitle: '0% commission on orders • Drivers keep 100% delivery fees',
        tapToSpeak: 'Tap to Speak',
        listening: 'Listening...',
        featuredAgents: 'Featured Agents',
        viewAll: 'View All 10 Agents',
        viewPricing: 'View Pricing',
        stats: { agents: '10 Agents', commission: '0% Commission', support: 'Arabic Native' },
    };

    return (
        <div
            className="min-h-screen bg-[#030303] text-white"
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
            {/* ═══ BACKGROUND ═══ */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#39FF14] opacity-[0.02] blur-[150px] rounded-full" />
            </div>

            {/* ═══ NAVIGATION ═══ */}
            <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="Axiom" className="h-8 w-auto" />
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/agents" className="text-sm text-white/50 hover:text-white transition-colors">
                            {isArabic ? 'الوكلاء' : 'Agents'}
                        </Link>
                        <Link href="/pricing" className="text-sm text-white/50 hover:text-white transition-colors">
                            {isArabic ? 'الأسعار' : 'Pricing'}
                        </Link>
                        <Link href="/about" className="text-sm text-white/50 hover:text-white transition-colors">
                            {isArabic ? 'عنّا' : 'About'}
                        </Link>
                        <button
                            onClick={() => setIsArabic(!isArabic)}
                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs hover:bg-white/10 transition-colors"
                        >
                            {isArabic ? 'EN' : 'عربي'}
                        </button>
                    </div>
                </div>
            </nav>

            {/* ═══ HERO SECTION ═══ */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 z-10">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/20 mb-8"
                    >
                        <Zap className="w-4 h-4 text-[#39FF14]" />
                        <span className="text-sm text-[#39FF14]">
                            {isArabic ? '🚀 الذكاء الاصطناعي مش هياخد شغلك' : "🚀 AI won't take your job"}
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                    >
                        <span className="text-white">{t.headline1}</span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#00AA77]">
                            {t.headline2}
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-white/50 mb-12 max-w-xl mx-auto"
                    >
                        {t.subtitle}
                    </motion.p>

                    {/* Arc Reactor (Voice Button) */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className={`arc-reactor w-28 h-28 mx-auto mb-8 cursor-pointer ${isListening ? 'active' : ''}`}
                        onClick={() => setIsListening(!isListening)}
                    >
                        <div className="arc-reactor-glow" />
                        <div className="arc-reactor-ring-outer" />
                        <div className="arc-reactor-ring-inner" />
                        <div className="arc-reactor-ring-core" />
                        <div className="arc-reactor-center w-14 h-14">
                            {isListening ? <WaveformVisualizer /> : <Mic className="w-5 h-5 text-white/50" />}
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xs text-white/30 tracking-widest uppercase mb-12"
                    >
                        {isListening ? t.listening : t.tapToSpeak}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap items-center justify-center gap-4"
                    >
                        <Link href="/agents">
                            <button className="btn-primary px-8 py-4 flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                {t.viewAll}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                        <Link href="/pricing">
                            <button className="btn-glass px-8 py-4">
                                {t.viewPricing}
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ═══ FEATURED AGENTS ═══ */}
            <section className="relative py-24 px-6 z-10 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-white mb-2">{t.featuredAgents}</h2>
                        <p className="text-white/40 text-sm">Sofra • Tajer • Tirs</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {FEATURED_AGENTS.map((agent, i) => (
                            <motion.div
                                key={agent.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link href={`/agents/${agent.id}`}>
                                    <div className="glass-accent group p-6 text-center cursor-pointer">
                                        {/* Agent Image */}
                                        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4 ring-2 ring-white/10 group-hover:ring-white/20 transition-all">
                                            <img
                                                src={agent.image}
                                                alt={agent.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h3 className="font-bold text-white mb-1">
                                            {isRTL ? agent.nameAr : agent.name}
                                        </h3>
                                        <p className="text-xs text-white/40 mb-3">
                                            {isRTL ? agent.descAr : agent.desc}
                                        </p>
                                        <span
                                            className="text-sm font-bold"
                                            style={{ color: agent.price === 'FREE' ? '#39FF14' : agent.color }}
                                        >
                                            {agent.price}{agent.price !== 'FREE' && '/mo'}
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/agents">
                            <button className="text-[#39FF14] text-sm font-medium hover:underline flex items-center gap-2 mx-auto">
                                {t.viewAll}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══ STATS BAR ═══ */}
            <section className="relative py-12 px-6 z-10 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#39FF14]" />
                            <span className="text-white/50 text-sm">{t.stats.agents}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#39FF14]" />
                            <span className="text-white/50 text-sm">{t.stats.commission}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#39FF14]" />
                            <span className="text-white/50 text-sm">{t.stats.support}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ FOOTER ═══ */}
            <footer className="relative border-t border-white/5 py-12 px-6 z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                            <span className="text-[10px] text-white/40">Powered by</span>
                            <span className="text-[10px] font-bold text-[#4285F4]">Google Cloud</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                            <span className="text-[10px] text-white/40">AI Model:</span>
                            <span className="text-[10px] font-bold text-[#39FF14]">Gemini 2.0</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                            <span className="text-[10px] text-white/40">Payments:</span>
                            <span className="text-[10px] font-bold text-[#9945FF]">Solana</span>
                        </div>
                    </div>

                    {/* Main Footer */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <span className="text-white/30 text-sm">© 2025 Axiom RESET</span>
                            <span className="text-white/20">•</span>
                            <span className="text-white/30 text-sm">{isArabic ? 'صُنع في القاهرة' : 'Built in Cairo'} 🇪🇬</span>
                        </div>
                        <div className="text-xs text-white/20">
                            {isArabic ? 'صمم وهندس بواسطة' : 'Designed & Architected By'}{' '}
                            <span className="text-[#39FF14]/70 font-medium">Mohamed Hossameldin Abdelaziz</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
