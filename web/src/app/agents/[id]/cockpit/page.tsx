'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Mic, MicOff, Phone,
    Map, FileText, Pill, Package, GraduationCap,
    Zap, Activity, Send, Radio, Shield, X
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════
// AGENT COCKPIT - LIVE OPERATING INTERFACE
// ═══════════════════════════════════════════════════════════════════

const AGENT_CONFIG: Record<string, any> = {
    sofra: {
        id: 'sofra', name: 'Sofra', nameAr: 'سفرة',
        role: 'Kitchen OS', roleAr: 'نظام المطبخ',
        color: '#39FF14', icon: '🍽️',
        greeting: "Sofra online. Ready to optimize your restaurant.",
        greetingAr: "سفرة متصل. جاهز لتحسين مطعمك.",
        suggestions: ['Show delivery routes', 'Check active orders', 'Optimize kitchen'],
        suggestionsAr: ['اعرض خطوط التوصيل', 'شوف الطلبات', 'نظم المطبخ'],
    },
    tajer: {
        id: 'tajer', name: 'Tajer', nameAr: 'تاجر',
        role: 'Sales Agent', roleAr: 'وكيل المبيعات',
        color: '#3B82F6', icon: '🏭',
        greeting: "Tajer active. What are we selling today?",
        greetingAr: "تاجر نشط. هنبيع ايه النهاردة؟",
        suggestions: ['Generate contract', 'Check inventory', 'B2B leads'],
        suggestionsAr: ['اعمل عقد', 'شوف المخزون', 'عملاء جملة'],
    },
    aqar: {
        id: 'aqar', name: 'Aqar', nameAr: 'عقار',
        role: 'Housing Agent', roleAr: 'وكيل السكن',
        color: '#FF69B4', icon: '🏠',
        greeting: "Aqar ready. Let's find the perfect tenant.",
        greetingAr: "عقار جاهز. نلاقي المستأجر المثالي.",
        suggestions: ['Generate contract', 'Screen tenant', 'List property'],
        suggestionsAr: ['اعمل عقد', 'افحص المستأجر', 'انشر العقار'],
    },
    drmoe: {
        id: 'drmoe', name: 'Dr. Moe', nameAr: 'د. مو',
        role: 'Pharmacy Guardian', roleAr: 'حارس الصيدلية',
        color: '#00C4B4', icon: '💊',
        greeting: "Dr. Moe active. Patient safety is priority.",
        greetingAr: "د. مو نشط. سلامة المريض أولاً.",
        suggestions: ['Scan prescription', 'Check interactions', 'Find alternative'],
        suggestionsAr: ['امسح الروشتة', 'فحص التعارض', 'بديل'],
    },
    tirs: {
        id: 'tirs', name: 'Tirs', nameAr: 'تِرس',
        role: 'Fleet Commander', roleAr: 'قائد الأسطول',
        color: '#39FF14', icon: '🛵',
        greeting: "Tirs online. Fleet ready for dispatch.",
        greetingAr: "تِرس متصل. الأسطول جاهز.",
        suggestions: ['Track fleet', 'Optimize routes', 'Driver status'],
        suggestionsAr: ['تتبع الأسطول', 'حسّن الطرق', 'حالة السائقين'],
    },
    ostaz: {
        id: 'ostaz', name: 'Ostaz', nameAr: 'أستاذ',
        role: 'AI Tutor', roleAr: 'المدرس الذكي',
        color: '#7C5CFF', icon: '📚',
        greeting: "Ostaz here. What shall we learn today?",
        greetingAr: "أستاذ هنا. هنتعلم ايه النهاردة؟",
        suggestions: ['Start lesson', 'Practice exam', 'Review progress'],
        suggestionsAr: ['ابدأ درس', 'تدريب امتحان', 'راجع التقدم'],
    },
};

export default function CockpitPage({ params }: { params: { id: string } }) {
    const [isArabic, setIsArabic] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [messages, setMessages] = useState<{ role: string, text: string }[]>([]);
    const [inputText, setInputText] = useState('');

    const agent = AGENT_CONFIG[params.id];

    if (!agent) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-2xl font-bold mb-4">Agent Not Found</h1>
                    <Link href="/" className="text-[#39FF14]">← Back</Link>
                </div>
            </div>
        );
    }

    const isRTL = isArabic;

    // Add initial greeting
    useEffect(() => {
        setMessages([{
            role: 'agent',
            text: isArabic ? agent.greetingAr : agent.greeting
        }]);
    }, [isArabic]);

    const handleSend = () => {
        if (!inputText.trim()) return;
        setMessages(prev => [...prev, { role: 'user', text: inputText }]);
        setInputText('');
        // Simulate response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'agent',
                text: isArabic ? 'جاري المعالجة...' : 'Processing your request...'
            }]);
        }, 1000);
    };

    return (
        <div
            className="min-h-screen bg-[#050505] text-white flex flex-col"
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
            {/* Header */}
            <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl">
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                    <Link href={`/agents/${params.id}`} className="flex items-center gap-2 text-white/50 hover:text-white">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">{isArabic ? 'رجوع' : 'Back'}</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <span className="text-xl">{agent.icon}</span>
                        <div>
                            <h1 className="font-bold" style={{ color: agent.color }}>
                                {isArabic ? agent.nameAr : agent.name}
                            </h1>
                            <p className="text-xs text-white/40">{isArabic ? agent.roleAr : agent.role}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-[#39FF14]">
                            <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
                            <span>LIVE</span>
                        </div>
                        <button
                            onClick={() => setIsArabic(!isArabic)}
                            className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10"
                        >
                            {isArabic ? 'EN' : 'عربي'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 max-w-4xl mx-auto w-full">
                <div className="space-y-4">
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] px-4 py-3 rounded-2xl ${msg.role === 'user'
                                    ? 'bg-white/10 rounded-br-sm'
                                    : 'rounded-bl-sm'
                                    }`}
                                style={msg.role === 'agent' ? {
                                    background: agent.color + '15',
                                    border: `1px solid ${agent.color}30`
                                } : {}}
                            >
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="px-4 pb-2 max-w-4xl mx-auto w-full">
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {(isArabic ? agent.suggestionsAr : agent.suggestions).map((s: string, i: number) => (
                        <button
                            key={i}
                            onClick={() => setInputText(s)}
                            className="shrink-0 px-3 py-1.5 rounded-full text-xs bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 bg-black/50 backdrop-blur-xl p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-3">
                    <button
                        onClick={() => setIsListening(!isListening)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isListening
                            ? 'bg-red-500 animate-pulse'
                            : 'bg-white/10 hover:bg-white/20'
                            }`}
                    >
                        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>

                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={isArabic ? 'اكتب رسالتك...' : 'Type your message...'}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30"
                    />

                    <button
                        onClick={handleSend}
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                        style={{ background: agent.color }}
                    >
                        <Send className="w-5 h-5 text-black" />
                    </button>
                </div>
            </div>
        </div>
    );
}
