import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { auth } from "@clerk/nextjs/server";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req: Request) {
  const { userId } = auth();

  if (userId !== "user_2bKX3bD3mYc4dSSLJCvOdsAQ2ag" && userId !== "user_2bKboVbNZoYdLB9ijIJ7crf8QnL") {
    throw new Error('Invalid user ID');
  }

  const { messages } = await req.json();

  // const topic = messages[0].content; // ### WIP Tests

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    stream: true,
    response_format: { type: "json_object" },
    messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
