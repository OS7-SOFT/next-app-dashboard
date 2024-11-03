import React from "react";
import IssueForm from "../../_components/IssueForm";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";

const EditIssuePage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });

  if (!issue) return notFound();
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
