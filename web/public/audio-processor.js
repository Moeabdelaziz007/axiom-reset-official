/**
 * Axiom RESET - Audio Processor (AudioWorklet)
 * Processes microphone input for real-time streaming to Gemini Live API
 * 
 * This runs in a separate thread, avoiding main thread blocking.
 */

class PCMRecorderProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.bufferSize = 4096;
        this.buffer = new Float32Array(this.bufferSize);
        this.bufferIndex = 0;
    }

    /**
     * Convert Float32 audio samples to Int16 PCM
     * Gemini expects Int16 PCM at 16kHz
     */
    floatTo16BitPCM(float32Array) {
        const int16Array = new Int16Array(float32Array.length);
        for (let i = 0; i < float32Array.length; i++) {
            // Clamp the value between -1 and 1
            const s = Math.max(-1, Math.min(1, float32Array[i]));
            // Convert to 16-bit integer
            int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        return int16Array;
    }

    process(inputs, outputs, parameters) {
        const input = inputs[0];

        if (input.length > 0) {
            const channelData = input[0]; // Mono channel

            // Accumulate samples into buffer
            for (let i = 0; i < channelData.length; i++) {
                this.buffer[this.bufferIndex++] = channelData[i];

                // When buffer is full, send it
                if (this.bufferIndex >= this.bufferSize) {
                    // Convert to Int16 PCM and send to main thread
                    const pcmData = this.floatTo16BitPCM(this.buffer);
                    this.port.postMessage(pcmData.buffer, [pcmData.buffer]);

                    // Reset buffer
                    this.buffer = new Float32Array(this.bufferSize);
                    this.bufferIndex = 0;
                }
            }
        }

        // Keep the processor alive
        return true;
    }
}

registerProcessor('pcm-recorder', PCMRecorderProcessor);
