"""
Axiom RESET - Voice Test Client
اختبار التحدث مع الوكلاء من التيرمينال

Usage:
    python test_voice_client.py [agent_id]
    
Examples:
    python test_voice_client.py sofra
    python test_voice_client.py tajer
"""

import asyncio
import websockets
import pyaudio
import sys
import json

# إعدادات الصوت (يجب أن تطابق إعدادات Gemini Live API)
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 16000
CHUNK = 1024

async def voice_chat(agent_id: str = "sofra"):
    uri = f"ws://localhost:8000/ws/voice/{agent_id}"
    p = pyaudio.PyAudio()
    
    # فتح المايك للتسجيل
    input_stream = p.open(
        format=FORMAT,
        channels=CHANNELS,
        rate=RATE,
        input=True,
        frames_per_buffer=CHUNK
    )
    
    # فتح السماعة للتشغيل
    output_stream = p.open(
        format=FORMAT,
        channels=CHANNELS,
        rate=RATE,
        output=True,
        frames_per_buffer=CHUNK
    )
    
    print(f"🔌 Connecting to {uri}...")
    
    try:
        async with websockets.connect(uri) as websocket:
            print(f"✅ Connected to {agent_id}!")
            print("🎤 Speak now (Press Ctrl+C to stop)...")
            print("-" * 40)
            
            async def send_audio():
                """إرسال الصوت من المايك للسيرفر"""
                try:
                    while True:
                        # قراءة البيانات من المايك
                        data = input_stream.read(CHUNK, exception_on_overflow=False)
                        # إرسال البيانات الخام (PCM Int16)
                        await websocket.send(data)
                        await asyncio.sleep(0.01)
                except asyncio.CancelledError:
                    pass
                except Exception as e:
                    print(f"❌ Mic Error: {e}")
            
            async def receive_audio():
                """استقبال الرد من السيرفر"""
                try:
                    async for message in websocket:
                        if isinstance(message, bytes):
                            # تشغيل الصوت الراجع
                            output_stream.write(message)
                            print(f"🔊 Audio: {len(message)} bytes", end="\r")
                        else:
                            # رسالة JSON
                            data = json.loads(message)
                            if data.get("type") == "connected":
                                print(f"✅ {data.get('message', 'Connected')}")
                            elif data.get("type") == "text":
                                print(f"\n💬 {agent_id}: {data.get('content', '')}")
                            elif data.get("type") == "turn_complete":
                                print("\n--- انتهى الرد ---")
                            elif data.get("type") == "error":
                                print(f"\n❌ Error: {data.get('content', '')}")
                            else:
                                print(f"\n📝 {message}")
                except asyncio.CancelledError:
                    pass
                except Exception as e:
                    print(f"\n❌ Receiver Error: {e}")
            
            # تشغيل الإرسال والاستقبال بالتوازي
            send_task = asyncio.create_task(send_audio())
            receive_task = asyncio.create_task(receive_audio())
            
            try:
                await asyncio.gather(send_task, receive_task)
            except asyncio.CancelledError:
                send_task.cancel()
                receive_task.cancel()
                
    except websockets.exceptions.ConnectionClosedError as e:
        print(f"❌ Connection closed: {e}")
    except ConnectionRefusedError:
        print(f"❌ Cannot connect to server. Make sure the server is running:")
        print(f"   uvicorn api.main:app --reload --host 0.0.0.0 --port 8000")
    finally:
        input_stream.stop_stream()
        input_stream.close()
        output_stream.stop_stream()
        output_stream.close()
        p.terminate()


if __name__ == "__main__":
    agent = sys.argv[1] if len(sys.argv) > 1 else "sofra"
    
    print("=" * 40)
    print(f"🎤 Axiom RESET Voice Test - {agent.upper()}")
    print("=" * 40)
    
    try:
        asyncio.run(voice_chat(agent))
    except KeyboardInterrupt:
        print("\n\n🛑 Session closed. مع السلامة!")
