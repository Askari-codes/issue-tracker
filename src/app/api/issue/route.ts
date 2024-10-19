import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "@/src/app/validationSchema";
import prisma from "@/prisma/client";



export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
     const newIsuue= await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newIsuue,{status:201})
}
