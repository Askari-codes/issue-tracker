import { NextRequest, NextResponse } from "next/server";
import { patchIssueSchema } from "@/src/app/validationSchema";
import prisma from "@/prisma/client";
import delay from "delay";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions";
import { error, log } from "node:console";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { assignedToUserId, title, description } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user) {
      return NextResponse.json({ error: "invalid user" }, { status: 400 });
    }
  }

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
    data: { title, description, assignedToUserId },
  });
  return NextResponse.json(updatedIssue, { status: 201 });
}

export async function DELETE(
  request: NextResponse,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  if (isNaN(parseInt(params.id))) {
    return NextResponse.json({ error: "Invalid Id format" }, { status: 400 });
  }
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "invalid issue" }, { status: 404 });
  await delay(2000);
  await prisma.issue.delete({
    where: { id: issue.id },
  });
  return NextResponse.json(
    { message: "Issue deleted successfully" },
    { status: 200 }
  );
}
