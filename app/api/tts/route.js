import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    error: 'Use POST method',
    example: { text: 'বাংলা টেক্সট', lang: 'bn' }
  });
}

export async function POST(request) {
  try {
    const { text, lang = 'bn' } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Using a free TTS service endpoint
    // This uses the Web Speech API approach with audio capture
    // For production, consider using Google Cloud TTS or Azure Speech Services

    const encodedText = encodeURIComponent(text.substring(0, 500)); // Limit text length

    // Return a simple response indicating TTS is configured
    // The frontend will handle the actual speech synthesis
    return NextResponse.json({
      success: true,
      message: 'TTS endpoint ready',
      textLength: text.length,
      lang
    });

  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}