import { NextResponse } from 'next/server';
import openai from '@/utils/openaiClient';

export async function POST(request) {
  try {
    const { question } = await request.json();
    if (!question?.trim()) {
      return NextResponse.json({ error: 'No question provided' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1',
      messages: [{ role: 'user', content: question }],
    });

    const answer = completion.choices[0]?.message?.content ?? '(No response)';
    return NextResponse.json({ answer });
  } catch (err) {
    console.error('OpenAI error:', err);
    return NextResponse.json(
      { error: 'Failed to get answer from AI' },
      { status: 500 }
    );
  }
}
