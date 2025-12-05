"""
Axiom RESET - FastAPI Backend
Main entry point for the agent API with Voice Bridge
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("AxiomAPI")

# Import Voice Bridge
from api.websocket_handler import VoiceBridge, get_agent_config, AGENT_CONFIGS


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup and shutdown events"""
    logger.info("🚀 Axiom RESET API Starting...")
    logger.info(f"📦 Registered Agents: {list(AGENT_CONFIGS.keys())}")
    
    # Check for API key
    if not os.getenv("GOOGLE_API_KEY"):
        logger.warning("⚠️ GOOGLE_API_KEY not set - Voice features will not work")
    else:
        logger.info("✅ Google API Key configured")
    
    yield
    
    logger.info("👋 Axiom RESET API Shutting down...")


app = FastAPI(
    title="Axiom RESET API",
    description="Voice-First AI Agent Platform for MENA",
    version="1.0.0",
    lifespan=lifespan
)

# CORS - Configure for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:8000",
        "https://reset.axiomid.app",
        "https://axiomid.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files (for voice-test.html)
static_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "web", "public")
if os.path.exists(static_path):
    app.mount("/static", StaticFiles(directory=static_path), name="static")
    logger.info(f"📁 Static files mounted from: {static_path}")


# ═══════════════════════════════════════════════════════════════════
# REST ENDPOINTS
# ═══════════════════════════════════════════════════════════════════

@app.get("/")
async def root():
    """Health check and API info"""
    return {
        "name": "Axiom RESET API",
        "version": "1.0.0",
        "status": "operational",
        "voice_enabled": bool(os.getenv("GOOGLE_API_KEY")),
        "agents": list(AGENT_CONFIGS.keys())
    }


@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {"status": "healthy"}


@app.get("/agents")
async def list_agents():
    """List all available agents"""
    agents = []
    for agent_id, config in AGENT_CONFIGS.items():
        agents.append({
            "id": agent_id,
            "name": agent_id.capitalize(),
            "voice_enabled": True,
            "tools_count": len(config.tools)
        })
    return {"agents": agents, "total": len(agents)}


@app.get("/agents/{agent_id}")
async def get_agent(agent_id: str):
    """Get agent details"""
    config = get_agent_config(agent_id)
    if not config:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    return {
        "id": agent_id,
        "name": agent_id.capitalize(),
        "instruction_preview": config.instruction[:200] + "...",
        "tools": [t.get("name", "unknown") for t in config.tools],
        "voice_name": config.voice_name
    }


@app.post("/agents/{agent_id}/chat")
async def chat_with_agent(agent_id: str, message: dict):
    """Send a text message to an agent (non-streaming)"""
    config = get_agent_config(agent_id)
    if not config:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    # For text chat, we'll use the standard Gemini API
    # This is a simplified implementation
    try:
        from google import genai
        
        client = genai.Client()
        response = await client.aio.models.generate_content(
            model="gemini-2.0-flash-exp",
            contents=message.get("text", ""),
            config={
                "system_instruction": config.instruction
            }
        )
        
        return {
            "agent": agent_id,
            "response": response.text,
            "status": "success"
        }
    except Exception as e:
        logger.error(f"Chat error: {e}")
        return {
            "agent": agent_id,
            "response": "عذراً، حدث خطأ. حاول مرة أخرى.",
            "status": "error",
            "error": str(e)
        }


# ═══════════════════════════════════════════════════════════════════
# WEBSOCKET ENDPOINTS (Voice Streaming)
# ═══════════════════════════════════════════════════════════════════

@app.websocket("/ws/voice/{agent_id}")
async def voice_endpoint(websocket: WebSocket, agent_id: str):
    """
    WebSocket endpoint for bidirectional voice streaming
    
    Protocol:
    - Client sends: audio chunks (binary PCM 16kHz) or JSON commands
    - Server sends: audio response (binary) or JSON text/events
    
    JSON Commands from Client:
    - {"type": "text_input", "content": "..."} - Send text instead of voice
    - {"type": "end_turn"} - Signal end of user turn
    - {"type": "stop"} - End session
    
    JSON Events from Server:
    - {"type": "connected", "agent": "..."} - Connection established
    - {"type": "text", "content": "..."} - Text response
    - {"type": "turn_complete"} - Agent finished speaking
    - {"type": "error", "content": "..."} - Error occurred
    """
    bridge = VoiceBridge(websocket, agent_id)
    await bridge.start()


# ═══════════════════════════════════════════════════════════════════
# RUN SERVER
# ═══════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("PORT", 8080))
    
    uvicorn.run(
        "api.main:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info"
    )
