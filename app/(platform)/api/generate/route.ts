import { generateLesson } from "@/lib/generate-lesson";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const generated = await generateLesson();

  return Response.json(generated);
}
