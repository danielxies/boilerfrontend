import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { CartesiaClient } from "@cartesia/cartesia-js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const cartesia = new CartesiaClient({
  apiKey: process.env.CARTESIA_API_KEY || 'sk_car_R2QN6_HwSdd_Lz1mdmBE6'
});

export async function POST(req: Request) {
  try {
    const { text, useCartesia } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: 'No text provided' },
        { status: 400 }
      );
    }

    if (useCartesia) {
      try {
        const response = await cartesia.tts.bytes({
          modelId: "sonic-english",
          transcript: text,
          voice: {
            mode: "id",
            id: "694f9389-aac1-45b6-b726-9d9369183238"
          },
          language: "en",
          outputFormat: {
            container: "wav",
            sampleRate: 44100,
            encoding: "pcm_f32le"
          }
        });

        return new NextResponse(response, {
          headers: {
            'Content-Type': 'audio/wav',
            'Content-Length': response.byteLength.toString(),
          },
        });
      } catch (error: any) {
        console.error('Cartesia error:', error);
        throw new Error(`Failed to generate speech with Cartesia: ${error.message}`);
      }
    }

    // Fallback to OpenAI TTS if useCartesia is false
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy',
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error generating speech:', error);
    return NextResponse.json(
      { error: 'Error generating speech' },
      { status: 500 }
    );
  }
}
