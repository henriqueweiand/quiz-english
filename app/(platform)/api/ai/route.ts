import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { auth } from '@clerk/nextjs/server';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req: Request) {
  const { userId } = auth();

  if (userId !== "user_2bKX3bD3mYc4dSSLJCvOdsAQ2ag" && userId !== "user_2bKboVbNZoYdLB9ijIJ7crf8QnL") {
    return false;
  }

  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}