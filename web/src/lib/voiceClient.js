/**
 * Axiom RESET - Voice Client
 * Handles bidirectional voice communication with AI agents
 * 
 * Uses AudioWorklet for efficient audio processing
 * Connects to FastAPI WebSocket for real-time streaming
 */

import { useState, useEffect } from 'react';

export class VoiceClient {
    constructor(agentId, options = {}) {
        this.agentId = agentId;
        this.ws = null;
        this.audioContext = null;
        this.mediaStream = null;
        this.recorder = null;
        this.source = null;
        this.isConnected = false;
        this.isListening = false;

        // Options
        this.apiUrl = options.apiUrl || 'wss://api.axiomid.app';
        this.sampleRate = options.sampleRate || 16000;

        // Callbacks
        this.onConnected = options.onConnected || (() => { });
        this.onDisconnected = options.onDisconnected || (() => { });
        this.onTextResponse = options.onTextResponse || (() => { });
        this.onAudioResponse = options.onAudioResponse || (() => { });
        this.onError = options.onError || (() => { });
        this.onTurnComplete = options.onTurnComplete || (() => { });
    }

    /**
     * Connect to the voice WebSocket
     */
    async connect() {
        try {
            const wsUrl = `${this.apiUrl}/ws/voice/${this.agentId}`;
            this.ws = new WebSocket(wsUrl);

            this.ws.binaryType = 'arraybuffer';

            this.ws.onopen = () => {
                console.log(`🎤 Connected to ${this.agentId}`);
            };

            this.ws.onmessage = async (event) => {
                if (event.data instanceof ArrayBuffer) {
                    // Audio response - play it
                    await this.playAudio(event.data);
                    this.onAudioResponse(event.data);
                } else {
                    // JSON message
                    const data = JSON.parse(event.data);
                    this.handleMessage(data);
                }
            };

            this.ws.onerror = (error) => {
                console.error('❌ WebSocket error:', error);
                this.onError(error);
            };

            this.ws.onclose = () => {
                console.log('🔌 Disconnected');
                this.isConnected = false;
                this.onDisconnected();
            };

        } catch (error) {
            console.error('❌ Connection failed:', error);
            this.onError(error);
            throw error;
        }
    }

    /**
     * Handle incoming JSON messages
     */
    handleMessage(data) {
        switch (data.type) {
            case 'connected':
                this.isConnected = true;
                this.onConnected(data);
                break;

            case 'text':
                this.onTextResponse(data.content);
                break;

            case 'turn_complete':
                this.onTurnComplete();
                break;

            case 'error':
                this.onError(new Error(data.content));
                break;

            default:
                console.log('Unknown message type:', data);
        }
    }

    /**
     * Start listening (capture microphone)
     */
    async startListening() {
        if (this.isListening) return;

        try {
            // Get microphone access
            this.mediaStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    channelCount: 1,
                    sampleRate: this.sampleRate,
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });

            // Create AudioContext
            this.audioContext = new AudioContext({ sampleRate: this.sampleRate });

            // Create source from microphone
            this.source = this.audioContext.createMediaStreamSource(this.mediaStream);

            // Load AudioWorklet
            await this.audioContext.audioWorklet.addModule('/audio-processor.js');

            // Create recorder node
            this.recorder = new AudioWorkletNode(this.audioContext, 'pcm-recorder');

            // Handle audio data from worklet
            this.recorder.port.onmessage = (e) => {
                if (this.ws && this.ws.readyState === WebSocket.OPEN && this.isListening) {
                    this.ws.send(e.data);
                }
            };

            // Connect the nodes
            this.source.connect(this.recorder);
            this.recorder.connect(this.audioContext.destination);

            this.isListening = true;
            console.log('🎙️ Listening started');

        } catch (error) {
            console.error('❌ Failed to start listening:', error);
            this.onError(error);
            throw error;
        }
    }

    /**
     * Stop listening
     */
    stopListening() {
        if (!this.isListening) return;

        // Disconnect nodes
        if (this.recorder) {
            this.recorder.disconnect();
            this.recorder = null;
        }

        if (this.source) {
            this.source.disconnect();
            this.source = null;
        }

        // Stop microphone
        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach(track => track.stop());
            this.mediaStream = null;
        }

        // Signal end of turn
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ type: 'end_turn' }));
        }

        this.isListening = false;
        console.log('🔇 Listening stopped');
    }

    /**
     * Send text message instead of voice
     */
    sendText(text) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                type: 'text_input',
                content: text
            }));
        }
    }

    /**
     * Play audio response
     */
    async playAudio(arrayBuffer) {
        try {
            if (!this.audioContext) {
                this.audioContext = new AudioContext({ sampleRate: this.sampleRate });
            }

            // Create an AudioBuffer from Int16 PCM data
            const int16Array = new Int16Array(arrayBuffer);
            const float32Array = new Float32Array(int16Array.length);

            for (let i = 0; i < int16Array.length; i++) {
                float32Array[i] = int16Array[i] / 32768.0;
            }

            const audioBuffer = this.audioContext.createBuffer(1, float32Array.length, this.sampleRate);
            audioBuffer.getChannelData(0).set(float32Array);

            // Play the audio
            const source = this.audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(this.audioContext.destination);
            source.start();

        } catch (error) {
            console.error('❌ Audio playback error:', error);
        }
    }

    /**
     * Disconnect and cleanup
     */
    disconnect() {
        this.stopListening();

        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }

        if (this.ws) {
            this.ws.send(JSON.stringify({ type: 'stop' }));
            this.ws.close();
            this.ws = null;
        }

        this.isConnected = false;
    }
}

/**
 * React Hook for Voice Client
 */
export function useVoiceClient(agentId) {
    const [client, setClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');

    useEffect(() => {
        const voiceClient = new VoiceClient(agentId, {
            onConnected: () => setIsConnected(true),
            onDisconnected: () => setIsConnected(false),
            onTextResponse: (text) => setTranscript(prev => prev + text),
            onTurnComplete: () => setIsListening(false)
        });

        setClient(voiceClient);

        return () => {
            voiceClient.disconnect();
        };
    }, [agentId]);

    const connect = async () => {
        if (client) await client.connect();
    };

    const startListening = async () => {
        if (client) {
            await client.startListening();
            setIsListening(true);
        }
    };

    const stopListening = () => {
        if (client) {
            client.stopListening();
            setIsListening(false);
        }
    };

    return {
        connect,
        startListening,
        stopListening,
        isConnected,
        isListening,
        transcript,
        sendText: (text) => client?.sendText(text)
    };
}
