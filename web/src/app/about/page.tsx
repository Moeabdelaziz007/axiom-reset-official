'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Globe, Home, Users, Target, Heart, Brain, Zap, Shield, Code, Truck, GraduationCap, Pill, Factory, Building } from 'lucide-react';
import { motion } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════
// ABOUT PAGE - THE STORY OF AXIOM RESET
// Smart Marketing for Google for Startups Application
// ═══════════════════════════════════════════════════════════════════

const translations = {
    en: {
        back: 'Back to Home',

        // Hero
        heroTitle: 'Reclaiming the Digital Economy.',
        heroSubtitle: 'We are building an Operating System where technology serves the human, not the other way around.',

        // The Problem
        problemTitle: 'The Problem',
        problemText: 'Traditional platforms (Uber, Talabat, Amazon) take 15-30% of local business revenue. Delivery drivers lose a cut of every ride. Small shops cannot compete.',

        // Mission & Vision
        missionTitle: 'Our Mission',
        missionText: 'To democratize AI for the streets of Egypt. A small falafel shop in Cairo should have the same technological power as a global franchise — without losing 30% of their profit to commissions.',
        visionTitle: 'The Vision',
        visionText: 'A world where AI Agents handle the repetitive, boring, and complex tasks. Humans focus on Creation, Hospitality, and Growth. We are shifting from an Extraction Economy to an Empowerment Economy.',

        // Values
        valuesTitle: 'Our Core Values',
        values: [
            { icon: Target, title: 'Zero Commission', desc: 'We charge for technology ($1.99), not for your success. Keep 100% of your orders.' },
            { icon: Truck, title: 'Drivers First', desc: 'Tirs is the only fleet where drivers keep 100% of delivery fees. No middleman cuts.' },
            { icon: Globe, title: 'Local Intelligence', desc: 'Our agents speak Egyptian. They know Sahel seasons, Cairo traffic, and exam schedules.' },
            { icon: Heart, title: 'Human-First AI', desc: 'AI makes you richer, not replaces you. Technology that empowers, not extracts.' },
        ],

        // The Sectors
        sectorsTitle: 'The 6 Sectors We Serve',
        sectors: [
            { icon: '🍽️', name: 'Sofra', market: 'Restaurants & Cafes', desc: 'AI Waiter, Menu RAG, Kitchen OS' },
            { icon: '🏭', name: 'Tajer', market: 'Factories & B2B', desc: 'Connecting manufacturers to merchants' },
            { icon: '🏠', name: 'Aqar', market: 'Rentals: Cairo/Sahel', desc: 'Student housing & summer rentals' },
            { icon: '💊', name: 'Dr. Moe', market: 'Pharmacies', desc: 'Prescription OCR, Drug interactions' },
            { icon: '🛵', name: 'Tirs', market: 'Delivery Fleet', desc: 'Driver keeps 100% of fees' },
            { icon: '📚', name: 'Ostaz', market: 'Education', desc: 'AI Tutor per subject' },
        ],

        // Tech Stack
        techTitle: 'Powered by Google Cloud',
        techItems: [
            { icon: Brain, name: 'Vertex AI (Gemini 2.0)', desc: 'Multimodal reasoning for all agents' },
            { icon: Code, name: 'Agent Developer Kit', desc: 'ADK Framework for agent creation' },
            { icon: Shield, name: 'Document AI', desc: 'Contract generation (Tajer/Aqar)' },
            { icon: Zap, name: 'Cloud Speech-to-Text', desc: 'Egyptian Arabic voice support' },
        ],

        // Founder
        founderTitle: 'Architect & Founder',
        founderName: 'Mohamed Hossameldin Abdelaziz (Amrikyy)',
        founderRole: 'Full Stack AI Architect • Cybersecurity @ Kennesaw State University',
        founderQuote: '"I built Axiom RESET to prove that AI can be a tool for economic liberation. We are giving every Egyptian business a digital brain and a global standard infrastructure."',

        // CTA
        ctaTitle: 'Ready to Join the Human-First Economy?',
        ctaText: 'Start with $1.99/month. Keep 100% of your profits.',
        ctaButton: 'Deploy Your AI',

        // Footer
        footerText: '© 2025 Axiom RESET. Built in Cairo 🇪🇬 • Deployed on Google Cloud.',
    },
    ar: {
        back: 'العودة للرئيسية',

        // Hero
        heroTitle: 'استعادة الاقتصاد الرقمي.',
        heroSubtitle: 'نبني نظام تشغيل حيث التقنية تخدم الإنسان، وليس العكس.',

        // The Problem
        problemTitle: 'المشكلة',
        problemText: 'التطبيقات التقليدية (أوبر، طلبات، أمازون) تأخذ 15-30% من إيرادات الأعمال المحلية. سائقو التوصيل يفقدون نسبة من كل رحلة. المتاجر الصغيرة لا تستطيع المنافسة.',

        // Mission & Vision
        missionTitle: 'مهمتنا',
        missionText: 'إتاحة الذكاء الاصطناعي لشوارع مصر. محل فلافل صغير في القاهرة يجب أن يمتلك نفس القوة التقنية للشركات العالمية — بدون خسارة 30% من أرباحه للعمولات.',
        visionTitle: 'الرؤية',
        visionText: 'عالم حيث وكلاء الذكاء الاصطناعي يتعاملون مع المهام المتكررة والمملة والمعقدة. الإنسان يركز على الإبداع والضيافة والنمو. نحن ننتقل من اقتصاد الاستخراج إلى اقتصاد التمكين.',

        // Values
        valuesTitle: 'قيمنا الأساسية',
        values: [
            { icon: Target, title: 'عمولة صفر', desc: 'ندفع مقابل التقنية ($1.99)، وليس مقابل نجاحك. احتفظ بـ100% من طلباتك.' },
            { icon: Truck, title: 'السائقين أولاً', desc: 'تِرس هو الأسطول الوحيد حيث السائق يحتفظ بـ100% من رسوم التوصيل.' },
            { icon: Globe, title: 'ذكاء محلي', desc: 'وكلاؤنا يتحدثون المصرية. يعرفون مواسم الساحل، زحمة القاهرة، ومواعيد الامتحانات.' },
            { icon: Heart, title: 'الإنسان أولاً', desc: 'الذكاء الاصطناعي يزيد دخلك، مش بياخد مكانك.' },
        ],

        // The Sectors
        sectorsTitle: 'الـ 6 قطاعات التي نخدمها',
        sectors: [
            { icon: '🍽️', name: 'سفرة', market: 'مطاعم وكافيهات', desc: 'جرسون ذكي، قائمة طعام، إدارة مطبخ' },
            { icon: '🏭', name: 'تاجر', market: 'مصانع وتجارة', desc: 'ربط المصنعين بالتجار' },
            { icon: '🏠', name: 'عقار', market: 'إيجار: القاهرة/الساحل', desc: 'سكن طلاب وإيجارات المصيف' },
            { icon: '💊', name: 'د. مو', market: 'صيدليات', desc: 'قراءة الروشتات، تعارض الأدوية' },
            { icon: '🛵', name: 'تِرس', market: 'أسطول التوصيل', desc: 'السائق ياخد 100% من الرسوم' },
            { icon: '📚', name: 'أستاذ', market: 'تعليم', desc: 'مدرس خصوصي لكل مادة' },
        ],

        // Tech Stack
        techTitle: 'مدعوم بـ Google Cloud',
        techItems: [
            { icon: Brain, name: 'Vertex AI (Gemini 2.0)', desc: 'استدلال متعدد الوسائط' },
            { icon: Code, name: 'Agent Developer Kit', desc: 'إطار عمل ADK' },
            { icon: Shield, name: 'Document AI', desc: 'إنشاء العقود (تاجر/عقار)' },
            { icon: Zap, name: 'Cloud Speech-to-Text', desc: 'دعم الصوت بالعربية المصرية' },
        ],

        // Founder
        founderTitle: 'المهندس والمؤسس',
        founderName: 'محمد حسام الدين عبدالعزيز (أمريكي)',
        founderRole: 'مهندس ذكاء اصطناعي • أمن سيبراني @ جامعة كينيسو',
        founderQuote: '"بنيت Axiom RESET لأثبت أن الذكاء الاصطناعي يمكن أن يكون أداة للتحرر الاقتصادي. نحن نعطي كل مشروع مصري عقلاً رقمياً وبنية تحتية عالمية."',

        // CTA
        ctaTitle: 'مستعد تنضم لاقتصاد الإنسان أولاً؟',
        ctaText: 'ابدأ بـ $1.99/شهر. احتفظ بـ100% من أرباحك.',
        ctaButton: 'شغّل وكيلك الذكي',

        // Footer
        footerText: '© 2025 Axiom RESET. صُنع في القاهرة 🇪🇬 • منشور على Google Cloud.',
    }
};

export default function AboutPage() {
    const [isArabic, setIsArabic] = useState(false);
    const t = isArabic ? translations.ar : translations.en;
    const isRTL = isArabic;

    return (
        <div
            className="min-h-screen bg-[#030303] text-white"
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
            {/* Navigation */}
            <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">{t.back}</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/agents" className="text-sm text-white/50 hover:text-white transition-colors">
                            {isArabic ? 'الوكلاء' : 'Agents'}
                        </Link>
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

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#39FF1408_1px,transparent_1px),linear-gradient(to_bottom,#39FF1408_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#39FF14] opacity-[0.02] blur-[150px] rounded-full" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#39FF14]/5 border border-[#39FF14]/20 mb-8"
                    >
                        <Heart className="w-4 h-4 text-[#39FF14]" />
                        <span className="text-xs font-bold text-[#39FF14] uppercase tracking-wider">Human-First Economy</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#00AA77]">
                            {t.heroTitle}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-white/60 max-w-2xl mx-auto"
                    >
                        {t.heroSubtitle}
                    </motion.p>
                </div>
            </section>

            {/* The Problem */}
            <section className="py-16 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20">
                        <h2 className="text-2xl font-bold text-red-400 mb-4">{t.problemTitle}</h2>
                        <p className="text-white/60 leading-relaxed">{t.problemText}</p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10">
                        <h2 className="text-xl font-bold text-[#39FF14] mb-4">{t.missionTitle}</h2>
                        <p className="text-white/60 leading-relaxed">{t.missionText}</p>
                    </div>
                    <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10">
                        <h2 className="text-xl font-bold text-[#39FF14] mb-4">{t.visionTitle}</h2>
                        <p className="text-white/60 leading-relaxed">{t.visionText}</p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 px-6 border-t border-white/5">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">{t.valuesTitle}</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {t.values.map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-[#39FF14]/30 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#39FF14]/10 flex items-center justify-center mb-4">
                                    <value.icon className="w-6 h-6 text-[#39FF14]" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                                <p className="text-sm text-white/50">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sectors */}
            <section className="py-16 px-6 border-t border-white/5">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">{t.sectorsTitle}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {t.sectors.map((sector, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="p-5 rounded-xl bg-[#0a0a0a] border border-white/10 hover:border-[#39FF14]/30 transition-colors text-center"
                            >
                                <span className="text-3xl mb-3 block">{sector.icon}</span>
                                <h3 className="font-bold text-white mb-1">{sector.name}</h3>
                                <p className="text-xs text-[#39FF14] mb-2">{sector.market}</p>
                                <p className="text-xs text-white/40">{sector.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-16 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">{t.techTitle}</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {t.techItems.map((tech, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[#0a0a0a] border border-white/10">
                                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <tech.icon className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">{tech.name}</h3>
                                    <p className="text-sm text-white/40">{tech.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founder */}
            <section className="py-16 px-6 border-t border-white/5">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="text-xs text-[#39FF14] uppercase tracking-widest">{t.founderTitle}</span>
                    <h2 className="text-3xl font-bold mt-4 mb-2">{t.founderName}</h2>
                    <p className="text-white/40 mb-8">{t.founderRole}</p>
                    <blockquote className="text-lg text-white/60 italic leading-relaxed border-l-4 border-[#39FF14]/30 pl-6 text-left">
                        {t.founderQuote}
                    </blockquote>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">{t.ctaTitle}</h2>
                    <p className="text-white/40 mb-8">{t.ctaText}</p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#39FF14] text-black font-bold hover:bg-white transition-colors shadow-[0_0_30px_rgba(57,255,20,0.3)]"
                    >
                        {t.ctaButton}
                        <ArrowLeft className={`w-4 h-4 ${isRTL ? '' : 'rotate-180'}`} />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-white/5 text-center">
                <p className="text-white/30 text-sm">{t.footerText}</p>
            </footer>
        </div>
    );
}
