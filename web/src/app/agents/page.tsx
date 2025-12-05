'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Zap } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════
// AGENTS PAGE - ALL 10 AI AGENTS
// ═══════════════════════════════════════════════════════════════════

const AGENTS = [
    // Phase 1: Egypt Core
    { id: 'sofra', name: 'Sofra', nameAr: 'سفرة', icon: '🍽️', color: '#39FF14', role: 'Kitchen OS', roleAr: 'نظام المطبخ', price: '$1.99/mo', phase: 1, image: '/agents/sofra-humanized.png' },
    { id: 'tajer', name: 'Tajer', nameAr: 'تاجر', icon: '🏭', color: '#3B82F6', role: 'Smart Store', roleAr: 'المتجر الذكي', price: '$4.99/mo', phase: 1, image: '/agents/tajer-humanized.png' },
    { id: 'aqar', name: 'Aqar', nameAr: 'عقار', icon: '🏠', color: '#FF69B4', role: 'Housing Agent', roleAr: 'وكيل السكن', price: '$1.99/mo', phase: 1, image: null },
    { id: 'drmoe', name: 'Dr. Moe', nameAr: 'د. مو', icon: '💊', color: '#00C4B4', role: 'Pharmacy Guardian', roleAr: 'حارس الصيدلية', price: '$1.99/mo', phase: 1, image: '/agents/dr-moe-humanized.png' },
    { id: 'tirs', name: 'Tirs', nameAr: 'تِرس', icon: '🛵', color: '#39FF14', role: 'Delivery Fleet', roleAr: 'أسطول التوصيل', price: 'FREE', phase: 1, image: '/agents/tirs-humanized.png' },
    { id: 'ostaz', name: 'Ostaz', nameAr: 'أستاذ', icon: '📚', color: '#7C5CFF', role: 'AI Tutor', roleAr: 'المدرس الذكي', price: '$2.99/subject', phase: 1, image: '/agents/ostaz-humanized.png' },
    // Phase 3: MENA Expansion
    { id: 'falah', name: 'Falah', nameAr: 'فلاح', icon: '🌾', color: '#22C55E', role: 'Agri-Intelligence', roleAr: 'الذكاء الزراعي', price: 'Subsidized', phase: 3, image: '/agents/falah-humanized.png' },
    { id: 'murshid', name: 'Murshid', nameAr: 'مرشد', icon: '✈️', color: '#F59E0B', role: 'Tourism Guide', roleAr: 'المرشد السياحي', price: '$4.99/trip', phase: 3, image: '/agents/murshid-humanized.png' },
    { id: 'sanay3y', name: 'Sanay3y', nameAr: 'صنايعي', icon: '🔧', color: '#EF4444', role: 'Technician OS', roleAr: 'نظام الحرفيين', price: 'FREE', phase: 3, image: '/agents/sanay3y-humanized.png' },
    { id: 'watheeq', name: 'Watheeq', nameAr: 'وثيق', icon: '🏛️', color: '#6366F1', role: 'GovTech Navigator', roleAr: 'ملاح الحكومة', price: '$0.99/service', phase: 3, image: '/agents/watheeq-humanized.png' },
];

export default function AgentsPage() {
    const [isArabic, setIsArabic] = useState(false);
    const isRTL = isArabic;

    const phase1Agents = AGENTS.filter(a => a.phase === 1);
    const phase3Agents = AGENTS.filter(a => a.phase === 3);

    return (
        <div
            className="min-h-screen bg-[#030303] text-white"
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
            {/* Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#39FF14] opacity-[0.03] blur-[150px] rounded-full" />
            </div>

            {/* Navigation */}
            <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="Axiom" className="h-8 w-auto" />
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/pricing" className="text-sm text-white/50 hover:text-white transition-colors">
                            {isArabic ? 'الأسعار' : 'Pricing'}
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

            {/* Header */}
            <section className="relative pt-28 pb-12 px-6 z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/20 mb-6"
                    >
                        <Zap className="w-4 h-4 text-[#39FF14]" />
                        <span className="text-sm text-[#39FF14]">
                            {isArabic ? '10 وكلاء ذكاء اصطناعي' : '10 AI Agents'}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        {isArabic ? 'القوى العاملة الرقمية' : 'The Digital Workforce'}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/50 max-w-xl mx-auto"
                    >
                        {isArabic
                            ? 'وكلاء متخصصون لكل قطاع في الاقتصاد المصري والشرق أوسطي'
                            : 'Specialized agents for every sector of the Egyptian and MENA economy'
                        }
                    </motion.p>
                </div>
            </section>

            {/* Phase 1: Egypt Core */}
            <section className="relative px-6 pb-12 z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-2 h-2 rounded-full bg-[#39FF14]" />
                        <h2 className="text-lg font-bold text-white/80">
                            {isArabic ? 'المرحلة 1: النواة المصرية' : 'Phase 1: Egypt Core'}
                        </h2>
                        <span className="px-2 py-0.5 rounded-full bg-[#39FF14]/20 text-[#39FF14] text-xs">LIVE</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {phase1Agents.map((agent, i) => (
                            <motion.div
                                key={agent.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link href={`/agents/${agent.id}`}>
                                    <div className="glass-card group p-5 h-full cursor-pointer hover:border-white/20">
                                        <div className="flex items-start justify-between mb-4">
                                            {/* Agent Image or Icon */}
                                            {agent.image ? (
                                                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-white/20 transition-all">
                                                    <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                                                </div>
                                            ) : (
                                                <div
                                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                                                    style={{ background: agent.color + '15' }}
                                                >
                                                    {agent.icon}
                                                </div>
                                            )}
                                            <span className="text-xs font-bold" style={{ color: agent.color }}>
                                                {agent.price}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-white mb-1">
                                            {isArabic ? agent.nameAr : agent.name}
                                        </h3>
                                        <p className="text-xs text-white/40 mb-4">
                                            {isArabic ? agent.roleAr : agent.role}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-white/30 group-hover:text-[#39FF14] transition-colors">
                                            <span>{isArabic ? 'عرض التفاصيل' : 'View Details'}</span>
                                            <ArrowRight className="w-3 h-3" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Phase 3: MENA Expansion */}
            <section className="relative px-6 pb-20 z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <h2 className="text-lg font-bold text-white/80">
                            {isArabic ? 'المرحلة 3: توسع MENA' : 'Phase 3: MENA Expansion'}
                        </h2>
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs">COMING SOON</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {phase3Agents.map((agent, i) => (
                            <motion.div
                                key={agent.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.05 }}
                            >
                                <Link href={`/agents/${agent.id}`}>
                                    <div className="glass-card group p-5 h-full cursor-pointer hover:border-white/20 relative overflow-hidden">
                                        {/* Coming Soon Ribbon */}
                                        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-[8px] text-amber-400 uppercase">
                                            Soon
                                        </div>
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-3"
                                            style={{ background: agent.color + '15' }}
                                        >
                                            {agent.icon}
                                        </div>
                                        <h3 className="font-bold text-white text-sm mb-1">
                                            {isArabic ? agent.nameAr : agent.name}
                                        </h3>
                                        <p className="text-[10px] text-white/40">
                                            {isArabic ? agent.roleAr : agent.role}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative px-6 pb-20 z-10">
                <div className="max-w-2xl mx-auto text-center">
                    <Link href="/pricing">
                        <button className="btn-primary px-8 py-4 text-lg">
                            {isArabic ? 'اطلع على الأسعار' : 'View Pricing'}
                        </button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative border-t border-white/5 py-8 px-6 z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                        <span className="text-[9px] px-2 py-1 rounded-full bg-white/5 text-[#4285F4]">Google Cloud</span>
                        <span className="text-[9px] px-2 py-1 rounded-full bg-white/5 text-[#39FF14]">Gemini 2.0</span>
                        <span className="text-[9px] px-2 py-1 rounded-full bg-white/5 text-[#9945FF]">Solana</span>
                    </div>
                    <p className="text-center text-white/30 text-sm">
                        © 2025 Axiom RESET • {isArabic ? 'صُنع في القاهرة' : 'Built in Cairo'} 🇪🇬
                    </p>
                    <p className="text-center text-white/20 text-xs mt-2">
                        {isArabic ? 'صمم بواسطة' : 'By'} <span className="text-[#39FF14]/60">Mohamed Hossameldin Abdelaziz</span>
                    </p>
                </div>
            </footer>
        </div>
    );
}
