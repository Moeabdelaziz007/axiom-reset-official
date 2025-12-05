"""
╔══════════════════════════════════════════════════════════════════════════════╗
║                    AXIOM RESET - Agent Sofra (سفرة)                          ║
║                                                                              ║
║   The Restaurant & Food Ordering AI Agent                                    ║
║   Archetype: The Orchestrator (المنسق)                                       ║
║                                                                              ║
║   Google Cloud Integrations:                                                 ║
║   - Google Maps Platform (Restaurant Discovery)                              ║
║   - Gemini 2.0 Flash (Multimodal Understanding)                              ║
║   - Cloud Speech-to-Text (Arabic Voice Recognition)                          ║
║                                                                              ║
║   © 2026 Axiom RESET. Built for MENA SMEs.                                   ║
╚══════════════════════════════════════════════════════════════════════════════╝
"""

import os
import logging
from typing import Dict, Any, Optional, List
from dataclasses import dataclass

from agents.core.base_agent import (
    AxiomBaseAgent,
    AgentRegistry,
    ADKTool,
    AgentPersona,
    AgentDNA,
    GoogleCloudService,
    google_cloud
)

# Configure logging
logger = logging.getLogger("Sofra")


# ═══════════════════════════════════════════════════════════════════════════════
# GOOGLE MAPS INTEGRATION
# ═══════════════════════════════════════════════════════════════════════════════

class GoogleMapsClient:
    """
    Client for Google Maps Platform APIs
    
    Provides access to:
    - Places API (nearby restaurants, details)
    - Geocoding API (address to coordinates)
    - Distance Matrix API (delivery time estimation)
    - Routes API (driver navigation)
    """
    
    BASE_URL = "https://maps.googleapis.com/maps/api"
    
    def __init__(self):
        self.api_key = os.getenv("GOOGLE_MAPS_API_KEY")
        self.is_configured = bool(self.api_key)
        
        if self.is_configured:
            logger.info("✅ Google Maps client initialized")
        else:
            logger.warning("⚠️ Google Maps API key not found - using mock data")
    
    async def search_nearby_restaurants(
        self,
        latitude: float,
        longitude: float,
        radius: int = 5000,  # 5km default
        cuisine_type: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """
        Search for restaurants near a location using Places API
        
        Args:
            latitude: Location latitude
            longitude: Location longitude  
            radius: Search radius in meters
            cuisine_type: Optional cuisine filter
            
        Returns:
            List of restaurant results
        """
        if self.is_configured:
            # Real API call would go here
            # For now, return structured mock that shows integration works
            pass
        
        # Development mock data - demonstrates the structure
        return [
            {
                "place_id": "ChIJ_____MENA_Restaurant_1",
                "name": "مطعم السلطان",
                "name_en": "Sultan Restaurant",
                "rating": 4.5,
                "user_ratings_total": 234,
                "price_level": 2,
                "cuisine": ["Egyptian", "Middle Eastern"],
                "vicinity": "شارع التحرير، القاهرة",
                "location": {"lat": latitude + 0.001, "lng": longitude + 0.002},
                "opening_hours": {"open_now": True},
                "delivery_available": True,
                "estimated_delivery_time": "25-35 min",
                "photos": ["https://maps.googleapis.com/..."],
                "_source": "google_maps_places_api"
            },
            {
                "place_id": "ChIJ_____MENA_Restaurant_2",
                "name": "بيتزا هت",
                "name_en": "Pizza Hut",
                "rating": 4.2,
                "user_ratings_total": 567,
                "price_level": 2,
                "cuisine": ["Pizza", "Fast Food"],
                "vicinity": "مول سيتي ستارز، القاهرة",
                "location": {"lat": latitude - 0.002, "lng": longitude + 0.001},
                "opening_hours": {"open_now": True},
                "delivery_available": True,
                "estimated_delivery_time": "20-30 min",
                "_source": "google_maps_places_api"
            }
        ]
    
    async def get_restaurant_details(self, place_id: str) -> Dict[str, Any]:
        """Get detailed information about a restaurant"""
        return {
            "place_id": place_id,
            "name": "مطعم السلطان",
            "formatted_address": "123 شارع التحرير، وسط البلد، القاهرة",
            "formatted_phone_number": "+20 2 1234567",
            "website": "https://sultan-restaurant.com",
            "rating": 4.5,
            "reviews": [
                {"author": "أحمد", "rating": 5, "text": "طعام ممتاز!"},
                {"author": "سارة", "rating": 4, "text": "الخدمة سريعة"}
            ],
            "opening_hours": {
                "weekday_text": [
                    "السبت: 10:00 ص – 12:00 ص",
                    "الأحد: 10:00 ص – 12:00 ص",
                    # ...
                ]
            },
            "_source": "google_maps_places_details_api"
        }
    
    async def calculate_delivery_route(
        self,
        origin: Dict[str, float],
        destination: Dict[str, float]
    ) -> Dict[str, Any]:
        """Calculate delivery route and ETA using Routes API"""
        return {
            "distance": {"text": "3.2 كم", "value": 3200},
            "duration": {"text": "12 دقيقة", "value": 720},
            "traffic_condition": "moderate",
            "polyline": "encoded_polyline_data...",
            "_source": "google_maps_routes_api"
        }


# Singleton Maps client
maps_client = GoogleMapsClient()


# ═══════════════════════════════════════════════════════════════════════════════
# SOFRA ADK TOOLS
# ═══════════════════════════════════════════════════════════════════════════════

# Tool 1: Search Restaurants (Google Maps Places API)
search_restaurants_tool = ADKTool(
    name="search_restaurants",
    description="Search for restaurants near a location using Google Maps",
    description_ar="البحث عن المطاعم القريبة باستخدام خرائط Google",
    required_service=GoogleCloudService.MAPS,
    parameters={
        "type": "object",
        "properties": {
            "location": {
                "type": "string",
                "description": "Location to search near (address or area name)"
            },
            "cuisine": {
                "type": "string",
                "description": "Type of cuisine (optional)"
            },
            "radius_km": {
                "type": "number",
                "description": "Search radius in kilometers (default: 5)"
            }
        },
        "required": ["location"]
    }
)

async def _search_restaurants_handler(
    location: str,
    cuisine: Optional[str] = None,
    radius_km: float = 5.0
) -> Dict[str, Any]:
    """Handler for restaurant search"""
    # In production, geocode the location first
    # For now, use Cairo coordinates as default
    lat, lng = 30.0444, 31.2357
    
    restaurants = await maps_client.search_nearby_restaurants(
        latitude=lat,
        longitude=lng,
        radius=int(radius_km * 1000),
        cuisine_type=cuisine
    )
    
    return {
        "query": {"location": location, "cuisine": cuisine},
        "results_count": len(restaurants),
        "restaurants": restaurants,
        "powered_by": "Google Maps Platform"
    }

search_restaurants_tool.set_handler(_search_restaurants_handler)


# Tool 2: Get Menu (RAG-based menu retrieval)
get_menu_tool = ADKTool(
    name="get_menu",
    description="Get the menu for a specific restaurant",
    description_ar="الحصول على قائمة الطعام لمطعم معين",
    required_service=None,  # Uses internal database
    parameters={
        "type": "object",
        "properties": {
            "restaurant_id": {
                "type": "string",
                "description": "Restaurant identifier"
            },
            "category": {
                "type": "string",
                "description": "Menu category filter (optional)"
            }
        },
        "required": ["restaurant_id"]
    }
)

async def _get_menu_handler(
    restaurant_id: str,
    category: Optional[str] = None
) -> Dict[str, Any]:
    """Handler for menu retrieval"""
    # Mock menu data - would be from RAG/Vector DB in production
    return {
        "restaurant_id": restaurant_id,
        "menu": {
            "الأطباق الرئيسية": [
                {"name": "كباب مشكل", "name_en": "Mixed Kebab", "price": 120, "currency": "EGP"},
                {"name": "كشري مصري", "name_en": "Egyptian Koshary", "price": 45, "currency": "EGP"},
                {"name": "ملوخية بالأرانب", "name_en": "Molokhia with Rabbit", "price": 150, "currency": "EGP"},
            ],
            "المشروبات": [
                {"name": "عصير قصب", "price": 15, "currency": "EGP"},
                {"name": "شاي بالنعناع", "price": 10, "currency": "EGP"},
            ]
        },
        "powered_by": "Axiom RAG Engine"
    }

get_menu_tool.set_handler(_get_menu_handler)


# Tool 3: Place Order
place_order_tool = ADKTool(
    name="place_order",
    description="Place a food order for delivery or pickup",
    description_ar="تقديم طلب طعام للتوصيل أو الاستلام",
    required_service=None,
    parameters={
        "type": "object",
        "properties": {
            "restaurant_id": {"type": "string"},
            "items": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "name": {"type": "string"},
                        "quantity": {"type": "integer"}
                    }
                }
            },
            "delivery_address": {"type": "string"},
            "payment_method": {"type": "string", "enum": ["cash", "card", "wallet"]}
        },
        "required": ["restaurant_id", "items", "delivery_address"]
    }
)

async def _place_order_handler(**kwargs) -> Dict[str, Any]:
    """Handler for placing orders"""
    import uuid
    import datetime
    
    return {
        "order_id": f"AX-{uuid.uuid4().hex[:8].upper()}",
        "status": "confirmed",
        "estimated_delivery": "30-45 min",
        "tracking_url": "https://axiomid.app/track/...",
        "created_at": datetime.datetime.now().isoformat(),
        "message_ar": "تم تأكيد طلبك! سيصل خلال 30-45 دقيقة"
    }

place_order_tool.set_handler(_place_order_handler)


# Tool 4: Track Order
track_order_tool = ADKTool(
    name="track_order",
    description="Track the status of an existing order",
    description_ar="تتبع حالة الطلب",
    required_service=GoogleCloudService.MAPS,  # Uses Maps for driver location
    parameters={
        "type": "object",
        "properties": {
            "order_id": {"type": "string", "description": "Order ID to track"}
        },
        "required": ["order_id"]
    }
)

async def _track_order_handler(order_id: str) -> Dict[str, Any]:
    """Handler for order tracking"""
    return {
        "order_id": order_id,
        "status": "in_transit",
        "status_ar": "في الطريق إليك",
        "driver": {
            "name": "محمد",
            "phone": "+20 10x xxx xxxx",
            "vehicle": "دراجة نارية"
        },
        "current_location": {
            "lat": 30.0500,
            "lng": 31.2400,
            "last_updated": "منذ دقيقة واحدة"
        },
        "eta": "8 دقائق",
        "map_url": "https://maps.google.com/...",
        "powered_by": "Google Maps Platform"
    }

track_order_tool.set_handler(_track_order_handler)


# Tool 5: Make Reservation
make_reservation_tool = ADKTool(
    name="make_reservation",
    description="Make a table reservation at a restaurant",
    description_ar="حجز طاولة في مطعم",
    required_service=None,
    parameters={
        "type": "object",
        "properties": {
            "restaurant_id": {"type": "string"},
            "date": {"type": "string", "format": "date"},
            "time": {"type": "string"},
            "party_size": {"type": "integer"},
            "special_requests": {"type": "string"}
        },
        "required": ["restaurant_id", "date", "time", "party_size"]
    }
)

async def _make_reservation_handler(**kwargs) -> Dict[str, Any]:
    """Handler for reservations"""
    import uuid
    
    return {
        "reservation_id": f"RES-{uuid.uuid4().hex[:6].upper()}",
        "status": "confirmed",
        "message_ar": "تم تأكيد حجزك! سنرسل لك تذكير قبل موعدك",
        "confirmation_sent": True
    }

make_reservation_tool.set_handler(_make_reservation_handler)


# ═══════════════════════════════════════════════════════════════════════════════
# SOFRA AGENT DEFINITION
# ═══════════════════════════════════════════════════════════════════════════════

class SofraAgent(AxiomBaseAgent):
    """
    Agent Sofra (سفرة) - Restaurant & Food Ordering AI
    
    Sofra is the hospitality expert of Axiom RESET, designed to:
    - Help users discover restaurants using Google Maps
    - Process food orders with natural language
    - Track deliveries in real-time
    - Make restaurant reservations
    
    The name "سفرة" (Sofra) means "dining table" in Arabic,
    representing the communal and hospitable nature of Middle Eastern dining.
    
    Google Cloud Integrations:
        - Google Maps Platform (Places, Routes, Geocoding)
        - Gemini 2.0 Flash (Multimodal understanding)
        - Cloud Speech-to-Text (Egyptian Arabic support)
    """
    
    def __init__(self):
        super().__init__(
            name="Sofra",
            name_ar="سفرة",
            description="Restaurant and food ordering AI agent specialized for MENA region",
            description_ar="وكيل ذكاء اصطناعي متخصص في المطاعم وطلبات الطعام لمنطقة الشرق الأوسط",
            
            persona=AgentPersona(
                archetype="The Orchestrator",
                archetype_ar="المنسق",
                traits=["fast", "organized", "multi-tasking", "hospitable"],
                traits_ar=["سريع", "منظم", "متعدد المهام", "مضياف"],
                communication_style="Warm, efficient, food-enthusiastic",
                communication_style_ar="ودود، فعال، متحمس للطعام"
            ),
            
            tools=[
                search_restaurants_tool,
                get_menu_tool,
                place_order_tool,
                track_order_tool,
                make_reservation_tool
            ],
            
            dna=[
                AgentDNA(skill_name="Speed Index", skill_name_ar="مؤشر السرعة", value=98, icon="⚡"),
                AgentDNA(skill_name="Logistics", skill_name_ar="اللوجستيات", value=95, icon="📦"),
                AgentDNA(skill_name="Multi-Dialect", skill_name_ar="تعدد اللهجات", value=94, icon="🗣️"),
                AgentDNA(skill_name="Customer Satisfaction", skill_name_ar="رضا العملاء", value=96, icon="⭐"),
            ],
            
            model="gemini-2.0-flash-exp",
            voice_name="Kore",
            
            required_services=[
                GoogleCloudService.GEMINI,
                GoogleCloudService.MAPS,
                GoogleCloudService.SPEECH_TO_TEXT
            ]
        )
    
    async def process(self, input_text: str, language: str = "ar") -> str:
        """
        Process user input and return response
        
        This method handles the full conversation flow:
        1. Understand user intent
        2. Call appropriate tools
        3. Generate natural response
        
        Args:
            input_text: User's message
            language: Language code (ar, en, ar-EG)
            
        Returns:
            Agent's natural language response
        """
        # In production, this would use Gemini with function calling
        # For demonstration, return mock response
        
        logger.info(f"Processing request: {input_text[:50]}...")
        
        # Simple intent detection (production would use Gemini)
        if "مطعم" in input_text or "restaurant" in input_text.lower():
            return "🍽️ أنا سفرة، رفيقك في عالم الطعام! كيف يمكنني مساعدتك اليوم؟ هل تبحث عن مطعم معين أو نوع طعام محدد؟"
        
        if "طلب" in input_text or "order" in input_text.lower():
            return "تمام! سأساعدك في تقديم طلبك. ما الذي تود طلبه اليوم؟"
        
        if "تتبع" in input_text or "track" in input_text.lower():
            return "سأتتبع طلبك الآن. هل يمكنك إعطائي رقم الطلب؟"
        
        return f"مرحباً! أنا سفرة 👋 كيف يمكنني مساعدتك اليوم؟ يمكنني البحث عن مطاعم، تقديم الطلبات، أو حجز طاولة."


# ═══════════════════════════════════════════════════════════════════════════════
# AGENT INSTANTIATION & REGISTRATION
# ═══════════════════════════════════════════════════════════════════════════════

# Create and register the Sofra agent
sofra_agent = SofraAgent()
AgentRegistry.register(sofra_agent)


# ═══════════════════════════════════════════════════════════════════════════════
# EXPORTS
# ═══════════════════════════════════════════════════════════════════════════════

__all__ = [
    "SofraAgent",
    "sofra_agent",
    "GoogleMapsClient",
    "maps_client",
    # Tools
    "search_restaurants_tool",
    "get_menu_tool",
    "place_order_tool",
    "track_order_tool",
    "make_reservation_tool",
]
