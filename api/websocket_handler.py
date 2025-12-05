"""
Axiom RESET - Voice Bridge
Bi-directional bridge connecting Client WebSocket to Google's Gemini Live API
"""

import asyncio
import json
import logging
from fastapi import WebSocket, WebSocketDisconnect
from google import genai
from typing import Optional, Dict, Any

logger = logging.getLogger("AxiomVoice")
logging.basicConfig(level=logging.INFO)


class AgentConfig:
    """Agent configuration for Gemini Live API"""
    
    def __init__(
        self,
        agent_id: str,
        instruction: str,
        tools: list = None,
        voice_name: str = "Kore"
    ):
        self.agent_id = agent_id
        self.instruction = instruction
        self.tools = tools or []
        self.voice_name = voice_name


# Agent configurations registry
AGENT_CONFIGS: Dict[str, AgentConfig] = {
    "sofra": AgentConfig(
        agent_id="sofra",
        instruction="""
أنت سفرة، وكيل ذكاء اصطناعي متخصص في المطاعم والطعام من منصة Axiom RESET.

## مهامك:
- مساعدة العملاء في اختيار المطاعم والأطباق
- تنفيذ طلبات الطعام
- حجز الطاولات
- تتبع حالة الطلبات

## أسلوبك:
- تحدث بالعربية مع لمسة مصرية ودية
- كن مختصراً ومفيداً وحماسياً
- اسأل أسئلة توضيحية عند الحاجة
- أكد تنفيذ الطلبات بوضوح

## المطاعم المتاحة (للمحاكاة):
- بيتزا هت: بيتزا إيطالية، توصيل 30-45 دقيقة
- ماكدونالدز: برجر أمريكي، توصيل 20-30 دقيقة
- الشرقاوي: أكل مصري، توصيل 40 دقيقة

ابدأ بتحية العميل واسأله عن ما يشتهيه اليوم.
""",
        tools=[]  # Tools disabled for now - Gemini Live uses function calls differently
    ),
    "tajer": AgentConfig(
        agent_id="tajer",
        instruction="""
أنت تاجر، وكيل ذكاء اصطناعي متخصص في العقارات من منصة Axiom RESET.

## مهامك:
- مساعدة العملاء في البحث عن العقارات
- تقديم معلومات عن الأسعار والمواقع
- ترتيب معاينات العقارات
- المساعدة في إجراءات الشراء والإيجار
"""
    ),
    "drmoe": AgentConfig(
        agent_id="drmoe",
        instruction="""
أنت د. مو، وكيل ذكاء اصطناعي متخصص في الصيدلة والصحة من منصة Axiom RESET.

## مهامك:
- تقديم معلومات عن الأدوية
- التحقق من التفاعلات الدوائية
- المساعدة في طلب الأدوية
- تقديم نصائح صحية عامة
"""
    ),
    "tirs": AgentConfig(
        agent_id="tirs",
        instruction="""
أنت ترس، وكيل ذكاء اصطناعي متخصص في الصناعة والتجارة B2B من منصة Axiom RESET.

## مهامك:
- مساعدة الشركات في طلب المواد الخام
- إدارة سلاسل التوريد
- تقديم عروض أسعار
- تتبع الشحنات
"""
    ),
    "ostaz": AgentConfig(
        agent_id="ostaz",
        instruction="""
أنت أستاذ، وكيل ذكاء اصطناعي متخصص في التعليم من منصة Axiom RESET.

## مهامك:
- تقديم دروس خصوصية
- شرح المفاهيم الصعبة
- المساعدة في الواجبات
- تقييم مستوى الطالب
"""
    )
}


def get_agent_config(agent_id: str) -> Optional[AgentConfig]:
    """Get agent configuration by ID"""
    return AGENT_CONFIGS.get(agent_id.lower())


class VoiceBridge:
    """
    A bi-directional bridge connecting the Client's WebSocket 
    to Google's Gemini Live API WebSocket.
    
    This enables real-time voice conversations with AI agents.
    """
    
    def __init__(self, client_ws: WebSocket, agent_id: str):
        self.client_ws = client_ws
        self.agent_id = agent_id
        self.client = genai.Client(http_options={'api_version': 'v1alpha'})
        self.model_id = "gemini-2.0-flash-exp"  # Multimodal Live API model
        self.is_connected = False
    
    async def start(self):
        """Start the voice bridge"""
        await self.client_ws.accept()
        self.is_connected = True
        
        # 1. Retrieve Agent Configuration
        agent_config = get_agent_config(self.agent_id)
        
        if not agent_config:
            await self.client_ws.send_json({
                "type": "error",
                "content": f"Agent '{self.agent_id}' not found"
            })
            await self.client_ws.close(code=4004)
            return
        
        logger.info(f"🎤 Starting Voice Bridge for Agent: {self.agent_id}")
        
        try:
            # 2. Connect to Gemini Live API
            # Build config - only include tools if they exist and are properly formatted
            live_config = {
                "system_instruction": agent_config.instruction,
                "generation_config": {
                    "response_modalities": ["AUDIO"],
                    "speech_config": {
                        "voice_config": {
                            "prebuilt_voice_config": {
                                "voice_name": agent_config.voice_name
                            }
                        }
                    }
                }
            }
            
            async with self.client.aio.live.connect(
                model=self.model_id,
                config=live_config
            ) as session:
                
                logger.info(f"✅ Connected to Gemini Live for Agent: {self.agent_id}")
                
                # Send connection confirmation to client
                await self.client_ws.send_json({
                    "type": "connected",
                    "agent": self.agent_id,
                    "message": f"متصل بـ {self.agent_id}"
                })
                
                # 3. Parallel Task Management
                client_to_gemini = asyncio.create_task(
                    self._forward_client_to_gemini(session)
                )
                gemini_to_client = asyncio.create_task(
                    self._forward_gemini_to_client(session)
                )
                
                try:
                    await asyncio.gather(client_to_gemini, gemini_to_client)
                except WebSocketDisconnect:
                    logger.info(f"🔌 Client disconnected from {self.agent_id}")
                except Exception as e:
                    logger.error(f"❌ Bridge error: {e}")
                finally:
                    client_to_gemini.cancel()
                    gemini_to_client.cancel()
                    
        except Exception as e:
            logger.error(f"❌ Failed to connect to Gemini Live: {e}")
            await self.client_ws.send_json({
                "type": "error",
                "content": f"فشل الاتصال: {str(e)}"
            })
            await self.client_ws.close(code=1011)
    
    async def _forward_client_to_gemini(self, session):
        """Forward audio/text from client to Gemini"""
        try:
            while self.is_connected:
                message = await self.client_ws.receive()
                
                if "bytes" in message:
                    # Send Audio Chunk (PCM 16kHz) to Gemini
                    await session.send(
                        input={"data": message["bytes"], "mime_type": "audio/pcm"},
                        end_of_turn=False
                    )
                    logger.debug(f"📤 Sent {len(message['bytes'])} bytes to Gemini")
                
                elif "text" in message:
                    data = json.loads(message["text"])
                    
                    if data.get("type") == "text_input":
                        # Send text message
                        await session.send(
                            input=data.get("content", ""),
                            end_of_turn=True
                        )
                        logger.info(f"📤 Sent text: {data.get('content', '')[:50]}...")
                    
                    elif data.get("type") == "end_turn":
                        # Signal end of user turn
                        await session.send(input="", end_of_turn=True)
                    
                    elif data.get("type") == "stop":
                        # Stop the session
                        self.is_connected = False
                        break
                        
        except WebSocketDisconnect:
            self.is_connected = False
        except Exception as e:
            logger.error(f"❌ Error forwarding to Gemini: {e}")
            self.is_connected = False
    
    async def _forward_gemini_to_client(self, session):
        """Forward audio/text from Gemini to client"""
        try:
            async for response in session.receive():
                if not self.is_connected:
                    break
                
                # Handle Audio Response
                if response.data:
                    await self.client_ws.send_bytes(response.data)
                    logger.debug(f"📥 Sent {len(response.data)} bytes to client")
                
                # Handle Text Response
                if response.text:
                    await self.client_ws.send_json({
                        "type": "text",
                        "content": response.text
                    })
                    logger.info(f"📥 Text response: {response.text[:50]}...")
                
                # Handle Tool Calls
                if hasattr(response, 'tool_calls') and response.tool_calls:
                    for tool_call in response.tool_calls:
                        result = await self._execute_tool(tool_call)
                        # Send tool result back to session
                        await session.send(
                            input={"tool_response": result},
                            end_of_turn=False
                        )
                
                # Handle End of Response
                if hasattr(response, 'server_content') and response.server_content:
                    if response.server_content.turn_complete:
                        await self.client_ws.send_json({
                            "type": "turn_complete"
                        })
                        
        except Exception as e:
            logger.error(f"❌ Error forwarding from Gemini: {e}")
            self.is_connected = False
    
    async def _execute_tool(self, tool_call) -> dict:
        """Execute a tool call and return the result"""
        tool_name = tool_call.name
        tool_args = tool_call.args
        
        logger.info(f"🔧 Executing tool: {tool_name} with args: {tool_args}")
        
        # Tool implementations (mock data for now)
        if tool_name == "search_restaurants":
            return {
                "restaurants": [
                    {
                        "id": "rest_001",
                        "name": "بيتزا هت",
                        "cuisine": "إيطالي",
                        "rating": 4.5,
                        "delivery_time": "30-45 دقيقة"
                    },
                    {
                        "id": "rest_002",
                        "name": "ماكدونالدز",
                        "cuisine": "أمريكي",
                        "rating": 4.2,
                        "delivery_time": "20-30 دقيقة"
                    }
                ]
            }
        
        elif tool_name == "place_order":
            return {
                "order_id": "ORD-2024-001",
                "status": "confirmed",
                "estimated_delivery": "45 دقيقة",
                "total": 85.00
            }
        
        elif tool_name == "get_menu":
            return {
                "categories": [
                    {
                        "name": "بيتزا",
                        "items": [
                            {"name": "بيبروني", "price": 45},
                            {"name": "مارغريتا", "price": 35}
                        ]
                    }
                ]
            }
        
        return {"error": f"Tool {tool_name} not implemented"}
