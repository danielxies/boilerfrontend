import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audioBlob = formData.get('file') as Blob;

    if (!audioBlob) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // Convert Blob to File
    const audioFile = new File([audioBlob], 'audio.webm', { type: audioBlob.type });

    const response = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error('Error transcribing audio:', error);
    return NextResponse.json(
      { error: 'Error transcribing audio' },
      { status: 500 }
    );
  }
} 