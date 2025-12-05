'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Mic, MapPin, FileText, Pill, Truck, GraduationCap,
    Zap, Shield, CheckCircle, Store, Users, TrendingUp, Clock,
    Utensils, Home, Factory, Building, Leaf, Compass, Wrench, Camera, Languages
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════
// AGENT DOSSIER DATA (Content Strategy)
// ═══════════════════════════════════════════════════════════════════
const AGENT_DATA: Record<string, AgentDossier> = {
    sofra: {
        id: 'sofra',
        name: 'Sofra',
        nameAr: 'سفرة',
        title: 'The Kitchen OS',
        titleAr: 'نظام تشغيل المطبخ',
        icon: '🍽️',
        color: '#39FF14',
        type: 'marketplace',
        typeLabel: 'Consumer Marketplace',
        typeLabelAr: 'سوق المستهلكين',
        price: '$1.99',
        priceLabel: '/month',
        priceLabelAr: '/شهر',

        headline: 'Transform your restaurant into a digital machine.',
        headlineAr: 'حوّل مطعمك إلى آلة رقمية.',
        hook: 'Stop paying 30% to delivery apps. Pay just $1.99.',
        hookAr: 'توقف عن دفع 30% للتطبيقات. ادفع 1.99 دولار فقط.',

        features: [
            { icon: Mic, title: 'Voice Ordering', titleAr: 'طلب صوتي', desc: 'Customers order via Arabic voice commands', descAr: 'العملاء يطلبون بالصوت بالعربي' },
            { icon: FileText, title: 'Smart Menu', titleAr: 'منيو ذكي', desc: 'AI-managed menu with RAG technology', descAr: 'منيو مُدار بالذكاء الاصطناعي' },
            { icon: Truck, title: 'Tirs Integration', titleAr: 'ربط Tirs', desc: 'Direct connection to delivery fleet', descAr: 'ربط مباشر بأسطول التوصيل' },
            { icon: Clock, title: 'Kitchen Dispatch', titleAr: 'إدارة المطبخ', desc: 'Real-time order queue management', descAr: 'إدارة فورية لأولويات الطلبات' },
        ],

        techStack: ['Google Maps', 'Speech-to-Text', 'Gemini AI', 'WhatsApp API'],

        comparison: {
            oldWay: { title: 'Old Way', titleAr: 'الطريقة القديمة', items: ['30% commission per order', 'No customer data access', 'Dependent on platform'] },
            oldWayAr: { items: ['30% عمولة على كل طلب', 'لا وصول لبيانات العملاء', 'تابع للمنصة'] },
            newWay: { title: 'Axiom Way', titleAr: 'طريقة Axiom', items: ['0% commission forever', 'Own your customer data', 'Full independence'] },
            newWayAr: { items: ['0% عمولة للأبد', 'امتلك بيانات عملائك', 'استقلالية كاملة'] },
        },
    },

    tajer: {
        id: 'tajer',
        name: 'Tajer',
        nameAr: 'تاجر',
        title: 'Smart Store Builder',
        titleAr: 'بانٍ المتاجر الذكية',
        icon: '🏭',
        color: '#3B82F6',
        type: 'saas',
        typeLabel: 'Business SaaS',
        typeLabelAr: 'أداة للأعمال',
        price: '$4.99',
        priceLabel: '/month',
        priceLabelAr: '/شهر',

        headline: 'Build your store. Sell your goods.',
        headlineAr: 'ابنِ متجرك. وبِع بضاعتك.',
        hook: 'No technical skills needed. Tajer is your digital sales manager.',
        hookAr: 'لا تحتاج خبرة تقنية. تاجر هو مدير مبيعاتك الرقمي.',

        features: [
            { icon: Store, title: 'Instant Web Store', titleAr: 'متجر ويب فوري', desc: 'Create your online store in minutes', descAr: 'أنشئ متجرك الإلكتروني في دقائق' },
            { icon: Users, title: 'B2B Sales Agent', titleAr: 'وكيل مبيعات B2B', desc: 'AI negotiator for wholesale deals', descAr: 'مفاوض ذكي للصفقات بالجملة' },
            { icon: TrendingUp, title: 'Inventory AI', titleAr: 'مخزون ذكي', desc: 'Auto-track stock levels', descAr: 'تتبع تلقائي لمستويات المخزون' },
            { icon: FileText, title: 'Contract Generation', titleAr: 'إنشاء عقود', desc: 'Auto-generate B2B contracts (PDF)', descAr: 'إنشاء عقود B2B تلقائياً' },
        ],

        techStack: ['Document AI', 'BigQuery', 'Stripe', 'Gemini Pro'],

        comparison: {
            oldWay: { title: 'Old Way', titleAr: 'الطريقة القديمة', items: ['Hire developer ($500+)', 'Buy hosting, domain', '3-6 months to launch'] },
            oldWayAr: { items: ['وظّف مطور ($500+)', 'اشتري استضافة ودومين', '3-6 شهور للإطلاق'] },
            newWay: { title: 'Axiom Way', titleAr: 'طريقة Axiom', items: ['$4.99/month, no upfront', 'Everything included', 'Launch in 10 minutes'] },
            newWayAr: { items: ['$4.99/شهر بدون مقدم', 'كل شيء مضمّن', 'أطلق في 10 دقائق'] },
        },
    },

    aqar: {
        id: 'aqar',
        name: 'Aqar',
        nameAr: 'عقار',
        title: 'Housing Platform',
        titleAr: 'منصة السكن',
        icon: '🏠',
        color: '#FF69B4',
        type: 'marketplace',
        typeLabel: 'Consumer Marketplace',
        typeLabelAr: 'سوق المستهلكين',
        price: '$1.99',
        priceLabel: '/month',
        priceLabelAr: '/شهر',

        headline: 'Instant housing without brokers.',
        headlineAr: 'تسكين فوري بدون سماسرة.',
        hook: 'Rent your Sahel apartment or student housing. Keep 100% of the rent.',
        hookAr: 'أجّر شقتك في الساحل أو للطلاب واحتفظ بكامل الإيجار.',

        features: [
            { icon: FileText, title: 'Smart Contracts', titleAr: 'عقود ذكية', desc: 'Auto-generate rental agreements', descAr: 'إنشاء عقود إيجار تلقائياً' },
            { icon: MapPin, title: 'Location AI', titleAr: 'موقع ذكي', desc: 'Match tenants with perfect locations', descAr: 'طابق المستأجرين بالمواقع المثالية' },
            { icon: Shield, title: 'Tenant Screening', titleAr: 'فحص المستأجر', desc: 'Verify tenant credibility', descAr: 'تحقق من مصداقية المستأجر' },
            { icon: Users, title: 'Student & Sahel', titleAr: 'طلاب والساحل', desc: 'Specialized for Cairo & Sahel markets', descAr: 'متخصص لأسواق القاهرة والساحل' },
        ],

        techStack: ['Document AI', 'Google Maps', 'Vision AI'],

        comparison: {
            oldWay: { title: 'Old Way', titleAr: 'الطريقة القديمة', items: ['10% broker fees', 'Slow process (weeks)', 'Risk of bad tenants'] },
            oldWayAr: { items: ['10% عمولة سمسار', 'عملية بطيئة (أسابيع)', 'خطر مستأجر سيء'] },
            newWay: { title: 'Axiom Way', titleAr: 'طريقة Axiom', items: ['0% broker fees', 'Rent in 24 hours', 'AI-verified tenants'] },
            newWayAr: { items: ['0% عمولة سمسار', 'أجّر في 24 ساعة', 'مستأجرين موثقين بالـ AI'] },
        },
    },

    drmoe: {
        id: 'drmoe',
        name: 'Dr. Moe',
        nameAr: 'د. مو',
        title: 'Pharmacy Guardian',
        titleAr: 'حارس الصيدلية',
        icon: '💊',
        color: '#00C4B4',
        type: 'marketplace',
        typeLabel: 'Consumer Marketplace',
        typeLabelAr: 'سوق المستهلكين',
        price: '$1.99',
        priceLabel: '/month',
        priceLabelAr: '/شهر',

        headline: 'Your pharmacy in every patient\'s pocket.',
        headlineAr: 'صيدليتك في جيب كل مريض.',
        hook: 'Make your pharmacy visible to every patient searching for medicine.',
        hookAr: 'اجعل صيدليتك مرئية لكل مريض يبحث عن دواء.',

        features: [
            { icon: FileText, title: 'Prescription OCR', titleAr: 'قراءة الروشتة', desc: 'Scan and understand handwritten prescriptions', descAr: 'امسح وافهم الروشتات بخط اليد' },
            { icon: Shield, title: 'Drug Interactions', titleAr: 'تعارض الأدوية', desc: 'Automatic safety checks', descAr: 'فحص سلامة تلقائي' },
            { icon: TrendingUp, title: 'Stock Sync', titleAr: 'مزامنة المخزون', desc: 'Real-time inventory on the app', descAr: 'مخزون فوري على التطبيق' },
            { icon: Truck, title: 'Delivery Ready', titleAr: 'جاهز للتوصيل', desc: 'Connect to Tirs for instant delivery', descAr: 'ربط مع Tirs للتوصيل الفوري' },
        ],

        techStack: ['Vision AI', 'MedLM', 'Gemini Pro'],

        comparison: {
            oldWay: { title: 'Old Way', titleAr: 'الطريقة القديمة', items: ['Wait for walk-ins', 'Manual prescription reading', 'No online presence'] },
            oldWayAr: { items: ['انتظر الزبون يجي', 'قراءة الروشتة يدوياً', 'لا وجود على الإنترنت'] },
            newWay: { title: 'Axiom Way', titleAr: 'طريقة Axiom', items: ['Patients find you online', 'AI reads any prescription', 'Full digital presence'] },
            newWayAr: { items: ['المرضى يجدوك أونلاين', 'AI يقرأ أي روشتة', 'وجود رقمي كامل'] },
        },
    },

    tirs: {
        id: 'tirs',
        name: 'Tirs',
        nameAr: 'تِرس',
        title: 'Zero-Commission Fleet',
        titleAr: 'أسطول بدون عمولة',
        icon: '🛵',
        color: '#39FF14',
        type: 'infrastructure',
        typeLabel: 'FREE for Drivers',
        typeLabelAr: 'مجاني للسائقين',
        price: 'FREE',
        priceLabel: '',
        priceLabelAr: '',

        headline: 'Your hard work pays YOU.',
        headlineAr: 'تعبك ليك لوحدك.',
        hook: 'First app in Egypt that gives you 100% of delivery fees.',
        hookAr: 'أول تطبيق في مصر يعطيك 100% من رسوم التوصيل.',

        features: [
            { icon: TrendingUp, title: '100% Earnings', titleAr: '100% أرباح', desc: 'Keep every pound you earn', descAr: 'احتفظ بكل جنيه تكسبه' },
            { icon: MapPin, title: 'Smart Routes', titleAr: 'طرق ذكية', desc: 'AI optimized to save fuel', descAr: 'AI لتوفير البنزين' },
            { icon: Clock, title: 'Instant Pay', titleAr: 'دفع فوري', desc: 'Get paid after every delivery', descAr: 'اقبض بعد كل توصيلة' },
            { icon: Shield, title: 'Full Freedom', titleAr: 'حرية كاملة', desc: 'Work when you want, where you want', descAr: 'اشتغل وقت ما تحب، فين ما تحب' },
        ],

        techStack: ['Google Maps', 'IoT Core', 'PubSub', 'Solana Pay'],

        comparison: {
            oldWay: { title: 'Other Apps', titleAr: 'التطبيقات الأخرى', items: ['Take 20-30% of your fees', 'Forced schedules', 'Delayed payments'] },
            oldWayAr: { items: ['ياخدوا 20-30% من رسومك', 'جداول إجبارية', 'دفع متأخر'] },
            newWay: { title: 'Tirs', titleAr: 'تِرس', items: ['Keep 100% of fees', 'Total flexibility', 'Instant payment'] },
            newWayAr: { items: ['احتفظ بـ 100% من الرسوم', 'مرونة كاملة', 'دفع فوري'] },
        },
    },

    ostaz: {
        id: 'ostaz',
        name: 'Ostaz',
        nameAr: 'أستاذ',
        title: 'AI Private Tutor',
        titleAr: 'مدرس خصوصي ذكي',
        icon: '📚',
        color: '#7C5CFF',
        type: 'saas',
        typeLabel: 'Education SaaS',
        typeLabelAr: 'أداة تعليمية',
        price: '$2.99',
        priceLabel: '/subject',
        priceLabelAr: '/مادة',

        headline: 'Your 24/7 private tutor.',
        headlineAr: 'مدرسك الخصوصي المتاح 24/7.',
        hook: 'One tutoring session price gives you a full month of AI learning.',
        hookAr: 'سعر حصة واحدة يمنحك شهراً كاملاً من التعليم الذكي.',

        features: [
            { icon: GraduationCap, title: 'Curriculum Aligned', titleAr: 'متوافق مع المنهج', desc: 'Matches Egyptian school curriculum', descAr: 'يتوافق مع المنهج المصري' },
            { icon: FileText, title: 'Exam Prep', titleAr: 'تحضير امتحانات', desc: 'Practice with past exams & mocks', descAr: 'تدرب على امتحانات سابقة' },
            { icon: TrendingUp, title: 'Progress Tracking', titleAr: 'تتبع التقدم', desc: 'See improvement over time', descAr: 'شوف تحسنك مع الوقت' },
            { icon: Clock, title: 'Always Available', titleAr: 'متاح دائماً', desc: 'Ask questions anytime', descAr: 'اسأل في أي وقت' },
        ],

        techStack: ['Gemini Pro', 'YouTube API', 'Speech-to-Text'],

        comparison: {
            oldWay: { title: 'Traditional Tutoring', titleAr: 'الدروس التقليدية', items: ['$10-30 per session', 'Limited hours', 'One teacher per subject'] },
            oldWayAr: { items: ['$10-30 في الحصة', 'ساعات محدودة', 'مدرس واحد للمادة'] },
            newWay: { title: 'Ostaz', titleAr: 'أستاذ', items: ['$2.99/month unlimited', '24/7 access', 'AI tutor adapts to you'] },
            newWayAr: { items: ['$2.99/شهر بلا حدود', 'متاح 24/7', 'AI يتكيف معاك'] },
        },
    },

    // ═══════════════════════════════════════════════════════════════════
    // PHASE 3: MENA EXPANSION AGENTS
    // ═══════════════════════════════════════════════════════════════════

    falah: {
        id: 'falah',
        name: 'Falah',
        nameAr: 'فلاح',
        title: 'Agri-Intelligence OS',
        titleAr: 'نظام الذكاء الزراعي',
        icon: '🌾',
        color: '#22C55E',
        type: 'saas',
        typeLabel: 'AgriTech SaaS',
        typeLabelAr: 'تكنولوجيا زراعية',
        price: '$1.99',
        priceLabel: '/month',
        priceLabelAr: '/شهر',

        headline: 'Your farm\'s digital brain.',
        headlineAr: 'العقل الرقمي لمزرعتك.',
        hook: 'Detect crop diseases before they spread. Maximize your yield with AI.',
        hookAr: 'اكتشف أمراض المحاصيل قبل انتشارها. زوّد إنتاجك بالذكاء الاصطناعي.',

        features: [
            { icon: Camera, title: 'Disease Detection', titleAr: 'كشف الأمراض', desc: 'Photograph a leaf, get instant diagnosis', descAr: 'صوّر ورقة، خد التشخيص فوراً' },
            { icon: Leaf, title: 'Yield Optimization', titleAr: 'تحسين الإنتاج', desc: 'AI-powered crop management', descAr: 'إدارة المحاصيل بالذكاء الاصطناعي' },
            { icon: MapPin, title: 'Satellite Monitoring', titleAr: 'مراقبة بالأقمار', desc: 'Track field health from space', descAr: 'تابع صحة الحقل من الفضاء' },
            { icon: Zap, title: 'Offline Mode', titleAr: 'بدون إنترنت', desc: 'Works in remote areas', descAr: 'يعمل في المناطق النائية' },
        ],

        techStack: ['Google Earth Engine', 'Vision AI', 'TensorFlow Edge'],

        comparison: {
            oldWay: { title: 'Traditional Farming', titleAr: 'الزراعة التقليدية', items: ['Guess when to water', 'Discover disease too late', 'Unpredictable yields'] },
            oldWayAr: { items: ['تخمين وقت الري', 'اكتشاف المرض متأخر', 'إنتاج غير متوقع'] },
            newWay: { title: 'With Falah', titleAr: 'مع فلاح', items: ['Precision irrigation alerts', 'Early disease detection', 'Predicted yield reports'] },
            newWayAr: { items: ['تنبيهات ري دقيقة', 'كشف مبكر للأمراض', 'تقارير إنتاج متوقعة'] },
        },
    },

    murshid: {
        id: 'murshid',
        name: 'Murshid',
        nameAr: 'مرشد',
        title: 'Tourism Experience OS',
        titleAr: 'نظام الخبرة السياحية',
        icon: '✈️',
        color: '#F59E0B',
        type: 'saas',
        typeLabel: 'Tourism SaaS',
        typeLabelAr: 'تكنولوجيا سياحية',
        price: '$4.99',
        priceLabel: '/trip',
        priceLabelAr: '/رحلة',

        headline: 'Your AI tour guide to Egypt.',
        headlineAr: 'مرشدك السياحي الذكي في مصر.',
        hook: 'Skip the scams. Experience Egypt like a local with real-time translation.',
        hookAr: 'تفادى النصب. اختبر مصر كالمحليين مع ترجمة فورية.',

        features: [
            { icon: Compass, title: 'AR Temple Tours', titleAr: 'جولات بالواقع المعزز', desc: 'Immersive historical experiences', descAr: 'تجارب تاريخية تفاعلية' },
            { icon: Languages, title: 'Real-time Translation', titleAr: 'ترجمة فورية', desc: 'Speak to locals in any language', descAr: 'تكلم مع المحليين بأي لغة' },
            { icon: Shield, title: 'Fair Price Guide', titleAr: 'دليل الأسعار العادلة', desc: 'Know the real price before buying', descAr: 'اعرف السعر الحقيقي قبل الشراء' },
            { icon: MapPin, title: 'Hidden Gems', titleAr: 'الأماكن السرية', desc: 'Discover spots tourists miss', descAr: 'اكتشف أماكن السياح ما يعرفوهاش' },
        ],

        techStack: ['Maps Immersive View', 'Cloud Translation', 'Gemini 1.5 Pro'],

        comparison: {
            oldWay: { title: 'Traditional Tourism', titleAr: 'السياحة التقليدية', items: ['Expensive tour guides', 'Language barriers', 'Tourist trap prices'] },
            oldWayAr: { items: ['مرشدين غاليين', 'حاجز اللغة', 'أسعار سياحية مبالغة'] },
            newWay: { title: 'With Murshid', titleAr: 'مع مرشد', items: ['AI guide in your pocket', 'Instant translation', 'Local price knowledge'] },
            newWayAr: { items: ['مرشد AI في جيبك', 'ترجمة فورية', 'معرفة الأسعار المحلية'] },
        },
    },

    sanay3y: {
        id: 'sanay3y',
        name: 'Sanay3y',
        nameAr: 'صنايعي',
        title: 'The Technician OS',
        titleAr: 'نظام تشغيل الحرفيين',
        icon: '🔧',
        color: '#EF4444',
        type: 'infrastructure',
        typeLabel: 'FREE for Technicians',
        typeLabelAr: 'مجاني للحرفيين',
        price: 'FREE',
        priceLabel: '',
        priceLabelAr: '',

        headline: 'Fix it right. Price it fair.',
        headlineAr: 'صَلَّح صح. بسعر حق.',
        hook: 'Restoring trust between technicians and customers through AI diagnostics.',
        hookAr: 'استعادة الثقة بين الحرفي والعميل بالتشخيص الذكي.',

        features: [
            { icon: Camera, title: 'Visual Diagnostic', titleAr: 'التشخيص البصري', desc: 'Photo the problem, get instant analysis', descAr: 'صوّر العطل، خد التحليل فوراً' },
            { icon: TrendingUp, title: 'Fair Price Estimator', titleAr: 'مقدر السعر العادل', desc: 'Real market prices for parts & labor', descAr: 'أسعار السوق الحقيقية للقطع والمصنعية' },
            { icon: MapPin, title: 'Parts Locator', titleAr: 'مكتشف القطع', desc: 'Find genuine parts nearby', descAr: 'لاقي قطع غيار أصلية قريبة' },
            { icon: Shield, title: 'Safety First', titleAr: 'السلامة أولاً', desc: 'Instant alerts for dangerous faults', descAr: 'تنبيهات فورية للأعطال الخطيرة' },
        ],

        techStack: ['Vision API', 'Maps Routing', 'Parts Catalog API'],

        comparison: {
            oldWay: { title: 'Traditional Service', titleAr: 'الخدمة التقليدية', items: ['Unknown prices', 'Risk of scams', 'Fake parts'] },
            oldWayAr: { items: ['أسعار مجهولة', 'خطر النصب', 'قطع غيار مقلدة'] },
            newWay: { title: 'With Sanay3y', titleAr: 'مع صنايعي', items: ['Transparent pricing', 'Verified technicians', 'Genuine parts guarantee'] },
            newWayAr: { items: ['تسعير شفاف', 'حرفيين موثقين', 'ضمان قطع أصلية'] },
        },
    },

    watheeq: {
        id: 'watheeq',
        name: 'Watheeq',
        nameAr: 'وثيق',
        title: 'Bureaucracy Navigator',
        titleAr: 'ملاح الإجراءات الحكومية',
        icon: '🏛️',
        color: '#6366F1',
        type: 'saas',
        typeLabel: 'GovTech SaaS',
        typeLabelAr: 'تكنولوجيا حكومية',
        price: '$0.99',
        priceLabel: '/service',
        priceLabelAr: '/خدمة',

        headline: 'Your papers, done right. The first time.',
        headlineAr: 'أوراقك سليمة، من أول مشوار.',
        hook: 'No more wasted trips to government offices. AI that knows every rule.',
        hookAr: 'لا مزيد من المشاوير الفاضية. ذكاء اصطناعي يعرف كل القوانين.',

        features: [
            { icon: FileText, title: 'Red Tape Cutter', titleAr: 'قاطع البيروقراطية', desc: 'Complex laws → simple 1-2-3 checklist', descAr: 'قوانين معقدة → قائمة 1-2-3 بسيطة' },
            { icon: Camera, title: 'Form Filler Pro', titleAr: 'ملء النماذج', desc: 'Upload ID, auto-fill all forms', descAr: 'ارفع البطاقة، يملأ كل النماذج' },
            { icon: Shield, title: 'Zero-Knowledge', titleAr: 'خصوصية كاملة', desc: 'Your data is never stored', descAr: 'بياناتك لا تُخزن أبداً' },
            { icon: CheckCircle, title: 'Legal Accuracy', titleAr: 'دقة قانونية', desc: 'Updated with latest regulations', descAr: 'محدث بأحدث القوانين' },
        ],

        techStack: ['Document AI', 'Gemini 1.5 Pro', 'Gov Portal API'],

        comparison: {
            oldWay: { title: 'Traditional Way', titleAr: 'الطريقة التقليدية', items: ['5+ trips to offices', 'Wrong documents', 'Hours of waiting'] },
            oldWayAr: { items: ['5+ مشاوير للمصالح', 'أوراق غلط', 'ساعات انتظار'] },
            newWay: { title: 'With Watheeq', titleAr: 'مع وثيق', items: ['One trip, done', 'Perfect checklist', 'Pre-filled forms'] },
            newWayAr: { items: ['مشوار واحد وخلاص', 'قائمة كاملة', 'نماذج جاهزة'] },
        },
    },
};

// Types
interface AgentDossier {
    id: string;
    name: string;
    nameAr: string;
    title: string;
    titleAr: string;
    icon: string;
    color: string;
    image?: string;
    type: 'marketplace' | 'saas' | 'infrastructure';
    typeLabel: string;
    typeLabelAr: string;
    price: string;
    priceLabel: string;
    priceLabelAr: string;
    headline: string;
    headlineAr: string;
    hook: string;
    hookAr: string;
    features: { icon: any; title: string; titleAr: string; desc: string; descAr: string }[];
    techStack: string[];
    comparison: any;
}

// Main Component
export default function AgentDossierPage({ params }: { params: { id: string } }) {
    const [isArabic, setIsArabic] = useState(false);
    const agent = AGENT_DATA[params.id];

    if (!agent) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Agent Not Found</h1>
                    <Link href="/" className="text-[#39FF14] hover:underline">← Back to Home</Link>
                </div>
            </div>
        );
    }

    const isRTL = isArabic;

    return (
        <div
            className="min-h-screen bg-[#050505] text-white"
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
            {/* Background Effects */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[150px] opacity-10"
                    style={{ background: agent.color }}
                />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">{isArabic ? 'العودة' : 'Back'}</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <span
                            className="text-xs px-3 py-1 rounded-full border"
                            style={{ borderColor: agent.color + '50', color: agent.color }}
                        >
                            {isArabic ? agent.typeLabelAr : agent.typeLabel}
                        </span>
                        <button
                            onClick={() => setIsArabic(!isArabic)}
                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs hover:bg-white/10 transition-colors"
                        >
                            {isArabic ? 'EN' : 'عربي'}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Agent Icon */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center text-5xl"
                        style={{ background: agent.color + '10', border: `2px solid ${agent.color}30` }}
                    >
                        {agent.icon}
                        {/* Coming Soon Badge for Phase 3 Agents */}
                        {['falah', 'murshid', 'sanay3y', 'watheeq'].includes(agent.id) && (
                            <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/50 text-[9px] font-bold text-amber-400 uppercase tracking-wider">
                                Coming Soon
                            </div>
                        )}
                    </motion.div>

                    {/* Name & Title */}
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold mb-2"
                    >
                        <span style={{ color: agent.color }}>{isArabic ? agent.nameAr : agent.name}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="text-xl text-white/40 mb-8"
                    >
                        {isArabic ? agent.titleAr : agent.title}
                    </motion.p>

                    {/* Headline */}
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-3xl font-bold text-white mb-4"
                    >
                        {isArabic ? agent.headlineAr : agent.headline}
                    </motion.h2>

                    {/* Hook */}
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        className="text-lg text-white/60 mb-8"
                    >
                        {isArabic ? agent.hookAr : agent.hook}
                    </motion.p>

                    {/* Price Badge */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl"
                        style={{ background: agent.color + '15', border: `1px solid ${agent.color}30` }}
                    >
                        <span className="text-3xl font-black" style={{ color: agent.color }}>{agent.price}</span>
                        <span className="text-white/50">{isArabic ? agent.priceLabelAr : agent.priceLabel}</span>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <h3 className="text-xl font-bold text-center mb-10 text-white/80">
                        {isArabic ? 'القدرات' : 'Capabilities'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {agent.features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                                        style={{ background: agent.color + '15' }}
                                    >
                                        <feature.icon className="w-5 h-5" style={{ color: agent.color }} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">
                                            {isArabic ? feature.titleAr : feature.title}
                                        </h4>
                                        <p className="text-sm text-white/50">
                                            {isArabic ? feature.descAr : feature.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-12 px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-6">
                        {isArabic ? 'مدعوم بـ' : 'Powered By'}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {agent.techStack.map((tech, i) => (
                            <span
                                key={i}
                                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white/60"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison */}
            <section className="py-16 px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Old Way */}
                        <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                            <h4 className="text-lg font-bold text-red-400 mb-4">
                                {isArabic ? agent.comparison.oldWay.titleAr : agent.comparison.oldWay.title}
                            </h4>
                            <ul className="space-y-3">
                                {(isArabic ? agent.comparison.oldWayAr.items : agent.comparison.oldWay.items).map((item: string, i: number) => (
                                    <li key={i} className="flex items-center gap-3 text-white/60">
                                        <span className="text-red-400">✕</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* New Way */}
                        <div
                            className="p-6 rounded-2xl border"
                            style={{ background: agent.color + '05', borderColor: agent.color + '30' }}
                        >
                            <h4 className="text-lg font-bold mb-4" style={{ color: agent.color }}>
                                {isArabic ? agent.comparison.newWay.titleAr : agent.comparison.newWay.title}
                            </h4>
                            <ul className="space-y-3">
                                {(isArabic ? agent.comparison.newWayAr.items : agent.comparison.newWay.items).map((item: string, i: number) => (
                                    <li key={i} className="flex items-center gap-3 text-white/80">
                                        <CheckCircle className="w-4 h-4" style={{ color: agent.color }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 relative z-10">
                <div className="max-w-2xl mx-auto text-center">
                    <h3 className="text-2xl font-bold mb-6">
                        {isArabic ? `هل أنت مستعد لتفعيل ${agent.nameAr}؟` : `Ready to activate ${agent.name}?`}
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            className="px-8 py-4 rounded-xl font-bold text-black transition-all shadow-lg"
                            style={{
                                background: agent.color,
                                boxShadow: `0 0 30px ${agent.color}40`
                            }}
                        >
                            {isArabic ? `اشترك وفعّل (${agent.price})` : `Subscribe & Deploy (${agent.price})`}
                        </button>
                        <button className="px-8 py-4 rounded-xl font-bold bg-white/5 border border-white/20 hover:bg-white/10 transition-colors">
                            {isArabic ? 'اطلب عرض توضيحي' : 'Request Demo'}
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-white/5 text-center relative z-10">
                <p className="text-white/30 text-sm">
                    © 2025 Axiom RESET • {isArabic ? 'صُنع في القاهرة' : 'Built in Cairo'} 🇪🇬
                </p>
            </footer>
        </div>
    );
}
