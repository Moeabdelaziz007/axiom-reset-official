'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Zap, Users, Truck, GraduationCap } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════
// PRICING PAGE - HUMAN-FIRST ECONOMY
// ═══════════════════════════════════════════════════════════════════

const PLANS = [
    {
        id: 'listing',
        name: 'App Listing',
        nameAr: 'إدراج على التطبيق',
        price: '$1.99',
        period: '/mo',
        periodAr: '/شهر',
        description: 'For Restaurants, Pharmacies, Rentals',
        descriptionAr: 'للمطاعم والصيدليات والعقارات',
        color: '#39FF14',
        agents: ['Sofra', 'Dr. Moe', 'Aqar'],
        features: [
            { en: '0% Commission Forever', ar: 'عمولة 0% للأبد' },
            { en: 'Listed on Axiom App', ar: 'ظهور على تطبيق Axiom' },
            { en: 'Tirs Delivery Integration', ar: 'ربط مع توصيل Tirs' },
            { en: 'Voice AI (Arabic/English)', ar: 'ذكاء صوتي (عربي/إنجليزي)' },
        ],
        cta: { en: 'Get Listed', ar: 'سجّل الآن' },
        popular: false,
    },
    {
        id: 'store',
        name: 'Tajer Store',
        nameAr: 'متجر تاجر',
        price: '$4.99',
        period: '/mo',
        periodAr: '/شهر',
        description: 'For Factories & Home Business',
        descriptionAr: 'للمصانع والأعمال المنزلية',
        color: '#3B82F6',
        agents: ['Tajer'],
        features: [
            { en: 'AI Web Store Builder', ar: 'بناء متجر ويب بالـ AI' },
            { en: 'B2B Sales Agent', ar: 'وكيل مبيعات B2B' },
            { en: 'Inventory Management', ar: 'إدارة المخزون' },
            { en: 'Contract Generation', ar: 'إنشاء العقود' },
        ],
        cta: { en: 'Build Store', ar: 'ابنِ متجرك' },
        popular: true,
    },
    {
        id: 'driver',
        name: 'For Drivers',
        nameAr: 'للسائقين',
        price: 'FREE',
        period: '',
        periodAr: '',
        description: 'Keep 100% of your fees',
        descriptionAr: 'احتفظ بـ 100% من رسومك',
        color: '#39FF14',
        agents: ['Tirs'],
        features: [
            { en: '100% Delivery Fees to YOU', ar: '100% رسوم التوصيل ليك' },
            { en: 'Smart Route Optimization', ar: 'تحسين الطرق الذكي' },
            { en: 'Instant Pay', ar: 'دفع فوري' },
            { en: 'Work When You Want', ar: 'اشتغل وقتما تحب' },
        ],
        cta: { en: 'Join Fleet', ar: 'انضم للأسطول' },
        popular: false,
    },
    {
        id: 'education',
        name: 'Ostaz',
        nameAr: 'أستاذ',
        price: '$2.99',
        period: '/subject',
        periodAr: '/مادة',
        description: 'AI Private Tutor',
        descriptionAr: 'مدرس خصوصي ذكي',
        color: '#7C5CFF',
        agents: ['Ostaz'],
        features: [
            { en: 'Egyptian Curriculum', ar: 'المنهج المصري' },
            { en: '24/7 Availability', ar: 'متاح 24/7' },
            { en: 'Exam Practice', ar: 'تدريب امتحانات' },
            { en: 'Progress Tracking', ar: 'تتبع التقدم' },
        ],
        cta: { en: 'Start Learning', ar: 'ابدأ التعلم' },
        popular: false,
    },
];

export default function PricingPage() {
    const [isArabic, setIsArabic] = useState(false);
    const isRTL = isArabic;

    return (
        <div
            className="min-h-screen bg-[#030303] text-white"
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
            {/* Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            {/* Navigation */}
            <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="Axiom" className="h-8 w-auto" />
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/agents" className="text-sm text-white/50 hover:text-white transition-colors">
                            {isArabic ? 'الوكلاء' : 'Agents'}
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
                        <span className="text-sm text-[#39FF14]">
                            {isArabic ? '🚀 الذكاء الاصطناعي مش هياخد شغلك' : "🚀 AI won't take your job"}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        {isArabic ? 'اقتصاد إنساني أولاً' : 'Human-First Economy'}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/50 max-w-xl mx-auto text-lg"
                    >
                        {isArabic
                            ? 'عمولة 0% على الطلبات • السائق ياخد 100% رسوم التوصيل'
                            : '0% commission on orders • Drivers keep 100% delivery fees'
                        }
                    </motion.p>
                </div>
            </section>

            {/* Pricing Grid */}
            <section className="relative px-6 pb-20 z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {PLANS.map((plan, i) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`glass-card relative p-6 ${plan.popular ? 'border-blue-500/50 ring-1 ring-blue-500/20' : ''}`}
                            >
                                {/* Popular Badge */}
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-bold">
                                        {isArabic ? 'الأكثر طلباً' : 'Most Popular'}
                                    </div>
                                )}

                                {/* Agents Badge */}
                                <div
                                    className="text-[9px] font-bold uppercase tracking-wider mb-4"
                                    style={{ color: plan.color }}
                                >
                                    {plan.agents.join(' • ')}
                                </div>

                                {/* Plan Name */}
                                <h3 className="text-xl font-bold mb-2">
                                    {isArabic ? plan.nameAr : plan.name}
                                </h3>

                                {/* Price */}
                                <div className="flex items-baseline gap-1 mb-2">
                                    <span
                                        className="text-4xl font-black"
                                        style={{ color: plan.price === 'FREE' ? plan.color : 'white' }}
                                    >
                                        {plan.price}
                                    </span>
                                    <span className="text-white/40 text-sm">
                                        {isArabic ? plan.periodAr : plan.period}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-xs text-white/40 mb-6">
                                    {isArabic ? plan.descriptionAr : plan.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((feature, j) => (
                                        <li key={j} className="flex items-start gap-2 text-sm">
                                            <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: plan.color }} />
                                            <span className="text-white/70">
                                                {isArabic ? feature.ar : feature.en}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <button
                                    className="w-full py-3 rounded-xl font-bold transition-all text-sm"
                                    style={{
                                        background: plan.popular ? plan.color : 'rgba(255,255,255,0.05)',
                                        color: plan.popular ? '#000' : '#fff',
                                        border: plan.popular ? 'none' : '1px solid rgba(255,255,255,0.1)'
                                    }}
                                >
                                    {isArabic ? plan.cta.ar : plan.cta.en}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Banner */}
            <section className="relative px-6 pb-20 z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="glass-panel p-8 text-center">
                        <h3 className="text-2xl font-bold mb-4">
                            {isArabic ? 'قارن واختار' : 'Compare & Choose'}
                        </h3>
                        <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
                            {/* Old Way */}
                            <div className="text-left">
                                <h4 className="text-red-400 font-bold mb-3 text-sm">
                                    {isArabic ? 'الطريقة القديمة' : 'Old Way'}
                                </h4>
                                <ul className="space-y-2 text-xs text-white/50">
                                    <li>❌ {isArabic ? 'عمولة 30% لكل طلب' : '30% commission per order'}</li>
                                    <li>❌ {isArabic ? 'السائق ياخد 70% فقط' : 'Driver gets only 70%'}</li>
                                    <li>❌ {isArabic ? 'لا تملك بيانات عملائك' : "Don't own customer data"}</li>
                                </ul>
                            </div>
                            {/* Axiom Way */}
                            <div className="text-left">
                                <h4 className="text-[#39FF14] font-bold mb-3 text-sm">
                                    {isArabic ? 'طريقة Axiom' : 'Axiom Way'}
                                </h4>
                                <ul className="space-y-2 text-xs text-white/80">
                                    <li>✓ {isArabic ? 'عمولة 0% للأبد' : '0% commission forever'}</li>
                                    <li>✓ {isArabic ? 'السائق ياخد 100%' : 'Driver keeps 100%'}</li>
                                    <li>✓ {isArabic ? 'امتلك كل بياناتك' : 'Own all your data'}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative px-6 pb-20 z-10">
                <div className="max-w-2xl mx-auto text-center">
                    <Link href="/agents">
                        <button className="btn-glass px-8 py-4">
                            {isArabic ? 'استكشف الوكلاء' : 'Explore Agents'}
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
