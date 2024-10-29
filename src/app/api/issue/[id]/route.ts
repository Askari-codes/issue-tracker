import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "@/src/app/validationSchema";
import prisma from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) return NextResponse.json("invalid issue", { status: 404 });
  const isDataUnchanged =
  issue.title === body.title && issue.description === body.description;

if (isDataUnchanged) {
  return NextResponse.json("No changes detected", { status: 204 }); // 204 - No Content
}

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title: body.title, description: body.description},
  });
  return NextResponse.json(updatedIssue, { status: 201 });
}