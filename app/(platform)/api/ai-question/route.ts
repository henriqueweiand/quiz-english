import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// Set the runtime to edge for best performance
export const runtime = 'edge';
 
export async function POST(req: Request) {
  const { messages } = await req.json();

  const topic = messages[0].content; // ### WIP Tests
 
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-1106',     
    stream: true,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "user",
        content:
          'You are a helpful assistant that generate quiz questions based on a topic. Respond with one short question and three plausible options/answers, of which only one is correct. Provide your answer in JSON structure like this {"questions": [{"title": "<The quiz question you generate>","options": [{"content": "<Plausible option 1>", "isCorrect": <"true" or "false">},{"content": "<Plausible option 2>", "isCorrect": <"true" or "false">},{"content": "<Plausible option 3>", "isCorrect": <"true" or "false">}]}]} use true or false as a string value',
      },
      {
        role: "user",
        content:
          `Provide three questions with three possible answers about: ${topic}`,
      },
    ]
  });
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}