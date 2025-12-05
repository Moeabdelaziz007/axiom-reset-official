// ═══════════════════════════════════════════════════════════════════
// AXIOM RESET - AGENT AIX DNA DATA
// Powered by Google Cloud ADK (Agent Developer Kit)
// ═══════════════════════════════════════════════════════════════════

export interface AgentDNA {
    label: string;
    labelAr: string;
    value: number;
    icon: string;
}

export interface Agent {
    id: string;
    name: string;
    nameAr: string;
    role: string;
    roleAr: string;
    archetype: string;
    archetypeAr: string;
    persona: string;
    personaAr: string;
    description: string;
    descriptionAr: string;
    image: string;
    dna: AgentDNA[];
    adkTools: string[];
    googleServices: string[];
}

export const agents: Agent[] = [
    {
        id: 'sofra',
        name: 'Sofra',
        nameAr: 'سفرة',
        role: 'Restaurant OS',
        roleAr: 'نظام المطاعم',
        archetype: 'The Orchestrator',
        archetypeAr: 'المنسق',
        persona: 'Fast, organized, multi-tasking, hospitable',
        personaAr: 'سريع، منظم، متعدد المهام، مضياف',
        description: 'Sofra is an autonomous AI agent specialized in F&B logistics, order processing, and restaurant reservations. It handles everything from menu queries to real-time delivery dispatching.',
        descriptionAr: 'سفرة هو وكيل ذكاء اصطناعي متخصص في لوجستيات المطاعم ومعالجة الطلبات والحجوزات. يتعامل مع كل شيء من استعلامات القائمة إلى إرسال التوصيل في الوقت الفعلي.',
        image: '/agents/sofra-humanized.png',
        dna: [
            { label: 'Speed Index', labelAr: 'مؤشر السرعة', value: 98, icon: '⚡' },
            { label: 'Logistics', labelAr: 'اللوجستيات', value: 95, icon: '📦' },
            { label: 'Multi-Dialect', labelAr: 'تعدد اللهجات', value: 94, icon: '🗣️' }
        ],
        adkTools: [
            'ADK_Menu_RAG',
            'Maps_Routing_API',
            'Dispatch_Extension',
            'Speech_to_Text'
        ],
        googleServices: [
            'Vertex AI Gemini Pro',
            'Google Maps Platform',
            'Cloud Speech-to-Text',
            'Firebase Realtime DB'
        ]
    },
    {
        id: 'tajer',
        name: 'Tajer',
        nameAr: 'تاجر',
        role: 'Real Estate',
        roleAr: 'العقارات',
        archetype: 'The Negotiator',
        archetypeAr: 'المفاوض',
        persona: 'Persuasive, market-smart, sharp closer',
        personaAr: 'مقنع، ذكي سوقياً، منهي للصفقات',
        description: 'Tajer is a market-savvy real estate agent that handles property valuations, contract generation, and intelligent negotiation workflows using advanced NLP.',
        descriptionAr: 'تاجر هو وكيل عقارات ذكي سوقياً يتعامل مع تقييمات العقارات وإنشاء العقود وسير عمل التفاوض الذكي باستخدام معالجة اللغة الطبيعية المتقدمة.',
        image: '/agents/tajer-humanized.png',
        dna: [
            { label: 'Negotiation', labelAr: 'التفاوض', value: 92, icon: '🤝' },
            { label: 'Market Intel', labelAr: 'ذكاء السوق', value: 96, icon: '📈' },
            { label: 'Contract Gen', labelAr: 'إنشاء العقود', value: 99, icon: '⚖️' }
        ],
        adkTools: [
            'ADK_Valuation_Engine',
            'Contract_PDF_Gen',
            'Search_Grounding',
            'Maps_Places_API'
        ],
        googleServices: [
            'Vertex AI Gemini Pro',
            'Document AI',
            'Google Search Grounding',
            'Maps Places API'
        ]
    },
    {
        id: 'drmoe',
        name: 'Dr. Moe',
        nameAr: 'د. مو',
        role: 'Pharmacy AI',
        roleAr: 'الصيدلية الذكية',
        archetype: 'The Guardian',
        archetypeAr: 'الحارس',
        persona: 'Precise, analytical, calm, trustworthy',
        personaAr: 'دقيق، تحليلي، هادئ، موثوق',
        description: 'Dr. Moe is a clinical logic agent that manages pharmacy inventory, drug interaction checks, and prescription processing using Google MedLM for medical-grade accuracy.',
        descriptionAr: 'د. مو هو وكيل منطق سريري يدير مخزون الصيدلية وفحوصات تفاعل الأدوية ومعالجة الوصفات الطبية باستخدام Google MedLM لدقة طبية.',
        image: '/agents/dr-moe-humanized.png',
        dna: [
            { label: 'Precision', labelAr: 'الدقة', value: 99, icon: '💊' },
            { label: 'Safety', labelAr: 'السلامة', value: 100, icon: '🛡️' },
            { label: 'OCR Arabic', labelAr: 'قراءة الوصفات', value: 95, icon: '📜' }
        ],
        adkTools: [
            'ADK_MedLM_Grounding',
            'Vision_OCR_v2',
            'Firebase_Sync',
            'Drug_Interaction_API'
        ],
        googleServices: [
            'Vertex AI MedLM',
            'Cloud Vision API',
            'Firebase Realtime DB',
            'Healthcare API'
        ]
    },
    {
        id: 'tirs',
        name: 'Tirs',
        nameAr: 'تِرس',
        role: 'Industrial B2B',
        roleAr: 'الصناعة والجملة',
        archetype: 'The Logistician',
        archetypeAr: 'خبير اللوجستيات',
        persona: 'Robust, logical, efficiency-focused',
        personaAr: 'قوي، منطقي، يركز على الكفاءة',
        description: 'Tirs is a robust industrial agent optimized for B2B operations, supply chain management, fleet coordination, and bulk order processing at scale.',
        descriptionAr: 'تِرس هو وكيل صناعي قوي محسّن لعمليات B2B وإدارة سلسلة التوريد وتنسيق الأسطول ومعالجة الطلبات بالجملة على نطاق واسع.',
        image: '/agents/tirs-humanized.png',
        dna: [
            { label: 'Supply Chain', labelAr: 'سلسلة التوريد', value: 98, icon: '🏗️' },
            { label: 'Fleet Coord', labelAr: 'تنسيق الأسطول', value: 96, icon: '🚛' },
            { label: 'Bulk Orders', labelAr: 'الطلبات الجملة', value: 99, icon: '📊' }
        ],
        adkTools: [
            'IoT_Integration',
            'BigQuery_Analytics',
            'Optimization_Engine',
            'Fleet_Tracking_API'
        ],
        googleServices: [
            'BigQuery ML',
            'Cloud IoT Core',
            'Operations Suite',
            'Dataflow'
        ]
    },
    {
        id: 'ostaz',
        name: 'Ostaz',
        nameAr: 'أستاذ',
        role: 'Education',
        roleAr: 'التعليم',
        archetype: 'The Mentor',
        archetypeAr: 'المرشد',
        persona: 'Patient, knowledgeable, adaptive',
        personaAr: 'صبور، واسع المعرفة، متكيف',
        description: 'Ostaz is an adaptive learning agent that provides personalized tutoring, curriculum planning, and student assessment using advanced knowledge graph reasoning.',
        descriptionAr: 'أستاذ هو وكيل تعلم متكيف يوفر تعليمًا شخصيًا وتخطيط المناهج وتقييم الطلاب باستخدام استدلال الرسم البياني المعرفي المتقدم.',
        image: '/agents/ostaz-humanized.png',
        dna: [
            { label: 'Adaptability', labelAr: 'التكيف', value: 97, icon: '🧠' },
            { label: 'Knowledge', labelAr: 'المعرفة', value: 99, icon: '📚' },
            { label: 'Engagement', labelAr: 'التفاعل', value: 93, icon: '💬' }
        ],
        adkTools: [
            'ADK_Curriculum_Planner',
            'Quiz_Gen_Model',
            'Knowledge_Graph',
            'Adaptive_Learning_API'
        ],
        googleServices: [
            'Vertex AI Gemini Pro',
            'Knowledge Graph',
            'Natural Language API',
            'Cloud Functions'
        ]
    },
];

export const getAgentById = (id: string): Agent | undefined => {
    return agents.find(agent => agent.id === id);
};
