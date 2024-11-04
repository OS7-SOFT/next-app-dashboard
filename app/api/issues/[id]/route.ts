import { issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const issue = await prisma.issue.findUnique({ where: { id: params.id } });

  if (!issue)
    return NextResponse.json(
      { error: "This issue not founded" },
      { status: 404 }
    );

  const issueUpdated = await prisma.issue.update({
    where: { id: params.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(issueUpdated, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({ where: { id: params.id } });

  if (!issue)
    return NextResponse.json(
      { error: "This issue not founded" },
      { status: 404 }
    );

  await prisma.issue.delete({
    where: { id: params.id },
  });

  return NextResponse.json({});
}
