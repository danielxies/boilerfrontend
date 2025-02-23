import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message, code, solution, maxSentences } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'No message provided' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are a helpful coding assistant. You help users solve coding problems and explain concepts clearly. 
          Keep your responses very concise - no more than ${maxSentences || 2} sentences.
          Be direct and straightforward with your tips.
          
          The user is working on a coding problem. Here's their current code:
          ${code}
          
          And here's the solution for reference:
          ${solution}
          
          Help them understand the problem and guide them towards the solution without giving it away directly.`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    return NextResponse.json({
      text: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error in chat:', error);
    return NextResponse.json(
      { error: 'Error processing chat request' },
      { status: 500 }
    );
  }
} 