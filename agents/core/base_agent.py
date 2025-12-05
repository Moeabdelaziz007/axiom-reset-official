"""
╔══════════════════════════════════════════════════════════════════════════════╗
║                    AXIOM RESET - ADK (Agent Developer Kit)                   ║
║                                                                              ║
║   A production-ready framework for building AI agents on Google Cloud        ║
║   Built with love for the MENA region 🌍                                      ║
║                                                                              ║
║   Powered by:                                                                ║
║   - Google Gemini 2.0 Flash (Multimodal LLM)                                ║
║   - Google Cloud Vertex AI                                                   ║
║   - Google Maps Platform                                                     ║
║   - Google Cloud Speech-to-Text                                              ║
║                                                                              ║
║   © 2026 Axiom RESET. Patent Pending.                                        ║
╚══════════════════════════════════════════════════════════════════════════════╝
"""

from typing import List, Optional, Any, Dict, Callable
from dataclasses import dataclass, field
from abc import ABC, abstractmethod
from enum import Enum
import logging
import os

# Configure logging
logger = logging.getLogger("AxiomADK")

# ═══════════════════════════════════════════════════════════════════════════════
# GOOGLE CLOUD INTEGRATION LAYER
# ═══════════════════════════════════════════════════════════════════════════════

class GoogleCloudService(Enum):
    """Supported Google Cloud services for ADK integration"""
    GEMINI = "gemini"
    MAPS = "maps"
    SPEECH_TO_TEXT = "speech-to-text"
    TEXT_TO_SPEECH = "text-to-speech"
    DOCUMENT_AI = "document-ai"
    VERTEX_AI = "vertex-ai"
    CLOUD_VISION = "cloud-vision"
    BIGQUERY = "bigquery"


@dataclass
class GoogleServiceConfig:
    """Configuration for a Google Cloud service"""
    service: GoogleCloudService
    api_key_env: str
    endpoint: Optional[str] = None
    region: str = "me-central1"  # MENA region by default
    is_enabled: bool = False
    
    def __post_init__(self):
        """Check if service is enabled via environment variable"""
        self.is_enabled = bool(os.getenv(self.api_key_env))
        if self.is_enabled:
            logger.info(f"✅ {self.service.value} service enabled")
        else:
            logger.debug(f"⚠️ {self.service.value} service not configured")


class GoogleCloudIntegration:
    """
    Central hub for Google Cloud service integrations
    
    This class manages connections to various Google Cloud services
    used by Axiom agents. Each service is lazily initialized on first use.
    """
    
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialize()
        return cls._instance
    
    def _initialize(self):
        """Initialize service configurations"""
        self.services: Dict[GoogleCloudService, GoogleServiceConfig] = {
            GoogleCloudService.GEMINI: GoogleServiceConfig(
                service=GoogleCloudService.GEMINI,
                api_key_env="GOOGLE_API_KEY"
            ),
            GoogleCloudService.MAPS: GoogleServiceConfig(
                service=GoogleCloudService.MAPS,
                api_key_env="GOOGLE_MAPS_API_KEY",
                endpoint="https://maps.googleapis.com/maps/api"
            ),
            GoogleCloudService.SPEECH_TO_TEXT: GoogleServiceConfig(
                service=GoogleCloudService.SPEECH_TO_TEXT,
                api_key_env="GOOGLE_CLOUD_API_KEY",
                endpoint="speech.googleapis.com"
            ),
            GoogleCloudService.DOCUMENT_AI: GoogleServiceConfig(
                service=GoogleCloudService.DOCUMENT_AI,
                api_key_env="GOOGLE_CLOUD_API_KEY",
                endpoint="documentai.googleapis.com"
            ),
            GoogleCloudService.VERTEX_AI: GoogleServiceConfig(
                service=GoogleCloudService.VERTEX_AI,
                api_key_env="GOOGLE_CLOUD_API_KEY",
                endpoint="aiplatform.googleapis.com"
            ),
        }
    
    def is_service_available(self, service: GoogleCloudService) -> bool:
        """Check if a service is configured and available"""
        return self.services.get(service, GoogleServiceConfig(
            service=service, 
            api_key_env=""
        )).is_enabled
    
    def get_config(self, service: GoogleCloudService) -> Optional[GoogleServiceConfig]:
        """Get configuration for a service"""
        return self.services.get(service)


# Singleton instance
google_cloud = GoogleCloudIntegration()


# ═══════════════════════════════════════════════════════════════════════════════
# ADK TOOL SYSTEM
# ═══════════════════════════════════════════════════════════════════════════════

@dataclass
class ADKTool:
    """
    Base class for all ADK tools
    
    Tools are the building blocks of agent capabilities.
    Each tool represents a specific action an agent can perform.
    """
    name: str
    description: str
    description_ar: str
    required_service: Optional[GoogleCloudService] = None
    parameters: Dict[str, Any] = field(default_factory=dict)
    _handler: Optional[Callable] = None
    
    def is_available(self) -> bool:
        """Check if this tool can be used"""
        if self.required_service is None:
            return True
        return google_cloud.is_service_available(self.required_service)
    
    def to_function_declaration(self) -> Dict[str, Any]:
        """Convert to Google Gemini function declaration format"""
        return {
            "name": self.name,
            "description": self.description,
            "parameters": self.parameters
        }
    
    def execute(self, **kwargs) -> Any:
        """Execute the tool with given parameters"""
        if self._handler:
            return self._handler(**kwargs)
        raise NotImplementedError(f"Tool {self.name} has no handler")
    
    def set_handler(self, handler: Callable):
        """Set the execution handler for this tool"""
        self._handler = handler
        return self


# ═══════════════════════════════════════════════════════════════════════════════
# AXIOM BASE AGENT (The Heart of ADK)
# ═══════════════════════════════════════════════════════════════════════════════

@dataclass
class AgentPersona:
    """Defines the personality and behavior of an agent"""
    archetype: str           # e.g., "The Orchestrator", "The Guardian"
    archetype_ar: str
    traits: List[str]        # e.g., ["fast", "organized", "hospitable"]
    traits_ar: List[str]
    communication_style: str
    communication_style_ar: str


@dataclass
class AgentDNA:
    """The unique capabilities DNA of an agent"""
    skill_name: str
    skill_name_ar: str
    value: int  # 0-100
    icon: str


class AxiomBaseAgent(ABC):
    """
    الوكيل الأساسي لـ Axiom RESET (ADK Core Agent)
    
    This is the foundation for all Axiom agents. It provides:
    
    Features:
        - 🎙️ Voice-first interaction (Bidi-streaming with Gemini)
        - 🌍 Full Arabic support (including Egyptian dialect)
        - 🔧 Google Cloud service integration
        - 📊 Agent DNA capabilities system
        - 🤝 Sub-agent delegation
    
    Google Cloud Integration:
        - Gemini 2.0 Flash for reasoning
        - Cloud Speech-to-Text for Arabic voice
        - Maps Platform for location services
        - Document AI for invoice processing
        - Vertex AI for specialized models (MedLM)
    
    Example:
        ```python
        agent = RestaurantAgent(
            name="Sofra",
            name_ar="سفرة",
            ...
        )
        response = await agent.process("أريد طلب برجر")
        ```
    """
    
    # Class-level configuration
    DEFAULT_MODEL = "gemini-2.0-flash-exp"
    DEFAULT_VOICE = "Kore"
    SUPPORTED_LANGUAGES = ["ar", "en", "ar-EG", "ar-SA"]
    
    def __init__(
        self,
        name: str,
        name_ar: str,
        description: str,
        description_ar: str,
        persona: AgentPersona,
        tools: List[ADKTool],
        dna: List[AgentDNA],
        model: str = DEFAULT_MODEL,
        voice_name: str = DEFAULT_VOICE,
        sub_agents: Optional[List["AxiomBaseAgent"]] = None,
        required_services: Optional[List[GoogleCloudService]] = None
    ):
        """
        Initialize an Axiom agent
        
        Args:
            name: Agent name in English
            name_ar: Agent name in Arabic (اسم الوكيل بالعربية)
            description: Agent description
            description_ar: Arabic description
            persona: Agent personality configuration
            tools: List of ADKTool instances
            dna: Agent capability DNA
            model: LLM model (default: gemini-2.0-flash-exp)
            voice_name: Voice for TTS output
            sub_agents: Optional sub-agents for delegation
            required_services: Google Cloud services needed
        """
        self.name = name
        self.name_ar = name_ar
        self.description = description
        self.description_ar = description_ar
        self.persona = persona
        self.tools = tools
        self.dna = dna
        self.model = model
        self.voice_name = voice_name
        self.sub_agents = sub_agents or []
        self.required_services = required_services or [GoogleCloudService.GEMINI]
        
        # Build system instruction
        self._instruction = self._build_system_instruction()
        
        # Check service availability
        self._check_services()
        
        logger.info(f"🚀 Agent '{name}' ({name_ar}) initialized")
    
    def _check_services(self):
        """Verify required Google Cloud services are available"""
        for service in self.required_services:
            if not google_cloud.is_service_available(service):
                logger.warning(
                    f"⚠️ Agent '{self.name}' requires {service.value} "
                    f"but it's not configured"
                )
    
    def _build_system_instruction(self) -> str:
        """Build the comprehensive system instruction"""
        traits_str = "، ".join(self.persona.traits_ar)
        tools_str = "\n".join([f"- {t.name}: {t.description_ar}" for t in self.tools])
        
        return f"""
╔══════════════════════════════════════════════════════════════════════════════╗
║                           AXIOM RESET - {self.name_ar}
║                           النموذج الأصلي: {self.persona.archetype_ar}
╚══════════════════════════════════════════════════════════════════════════════╝

أنت {self.name_ar}، وكيل ذكاء اصطناعي متخصص من منصة Axiom RESET.
مهمتك: {self.description_ar}

═══════════════════════════════════════════════════════════════════════════════
الشخصية والسلوك
═══════════════════════════════════════════════════════════════════════════════

▸ النموذج الأصلي (Archetype): {self.persona.archetype_ar}
▸ السمات الأساسية: {traits_str}
▸ أسلوب التواصل: {self.persona.communication_style_ar}

═══════════════════════════════════════════════════════════════════════════════
الأدوات المتاحة (ADK Tools)
═══════════════════════════════════════════════════════════════════════════════

{tools_str}

═══════════════════════════════════════════════════════════════════════════════
قواعد التواصل
═══════════════════════════════════════════════════════════════════════════════

1. 🗣️ اللغة: تحدث بالعربية بلهجة ودية ومهنية
2. ⚡ الإيجاز: كن مختصراً ومفيداً
3. 🎯 الوضوح: تأكد من فهم طلب المستخدم
4. 🔧 الأدوات: استخدم الأدوات المناسبة لإنجاز المهام
5. ✅ التأكيد: أكد تنفيذ الطلبات

═══════════════════════════════════════════════════════════════════════════════
ملاحظة هامة
═══════════════════════════════════════════════════════════════════════════════

أنت جزء من منظومة Axiom RESET - أول منصة Micro-SaaS للوكلاء الذكية 
في منطقة الشرق الأوسط وشمال أفريقيا، بدون عمولات (0% Commission).

مدعوم من Google Cloud ☁️
"""
    
    @property
    def instruction(self) -> str:
        """Get the system instruction"""
        return self._instruction
    
    def get_available_tools(self) -> List[ADKTool]:
        """Get list of tools that are currently available"""
        return [t for t in self.tools if t.is_available()]
    
    def get_tool_declarations(self) -> List[Dict]:
        """Get tools in Google function calling format"""
        return [t.to_function_declaration() for t in self.get_available_tools()]
    
    @abstractmethod
    async def process(self, input_text: str, language: str = "ar") -> str:
        """
        Process user input and return response
        
        Args:
            input_text: User's message
            language: Language code (default: Arabic)
            
        Returns:
            Agent's response text
        """
        pass
    
    def to_dict(self) -> Dict[str, Any]:
        """Serialize agent to dictionary for API responses"""
        return {
            "id": self.name.lower(),
            "name": self.name,
            "name_ar": self.name_ar,
            "description": self.description,
            "description_ar": self.description_ar,
            "archetype": self.persona.archetype,
            "archetype_ar": self.persona.archetype_ar,
            "dna": [
                {
                    "skill": d.skill_name,
                    "skill_ar": d.skill_name_ar,
                    "value": d.value,
                    "icon": d.icon
                }
                for d in self.dna
            ],
            "tools": [t.name for t in self.tools],
            "voice": self.voice_name,
            "model": self.model
        }


# ═══════════════════════════════════════════════════════════════════════════════
# AGENT REGISTRY (Central Agent Management)
# ═══════════════════════════════════════════════════════════════════════════════

class AgentRegistry:
    """
    Central registry for managing all Axiom agents
    
    This singleton class maintains a registry of all available agents
    and provides methods for agent discovery and retrieval.
    
    Example:
        ```python
        AgentRegistry.register(sofra_agent)
        agent = AgentRegistry.get("sofra")
        ```
    """
    
    _agents: Dict[str, AxiomBaseAgent] = {}
    
    @classmethod
    def register(cls, agent: AxiomBaseAgent) -> None:
        """Register an agent in the central registry"""
        agent_id = agent.name.lower()
        cls._agents[agent_id] = agent
        logger.info(f"📋 Registered agent: {agent.name} ({agent.name_ar})")
    
    @classmethod
    def get(cls, name: str) -> Optional[AxiomBaseAgent]:
        """Get an agent by name (case-insensitive)"""
        return cls._agents.get(name.lower())
    
    @classmethod
    def list_all(cls) -> List[str]:
        """List all registered agent IDs"""
        return list(cls._agents.keys())
    
    @classmethod
    def get_all(cls) -> List[AxiomBaseAgent]:
        """Get all registered agents"""
        return list(cls._agents.values())
    
    @classmethod
    def count(cls) -> int:
        """Get count of registered agents"""
        return len(cls._agents)


# ═══════════════════════════════════════════════════════════════════════════════
# EXPORTS
# ═══════════════════════════════════════════════════════════════════════════════

__all__ = [
    # Core Classes
    "AxiomBaseAgent",
    "AgentRegistry",
    "ADKTool",
    "AgentPersona",
    "AgentDNA",
    # Google Cloud
    "GoogleCloudService",
    "GoogleServiceConfig", 
    "GoogleCloudIntegration",
    "google_cloud",
]
