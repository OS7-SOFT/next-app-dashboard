import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BiEdit } from "react-icons/bi";
import ReactMarkdown from "react-markdown";
import EditButton from "./EditButton";
import IssueDetail from "./IssueDetail";
const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });

  if (!issue) return notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }}>
      <Box className="mb-5">
        <IssueDetail issue={issue} />
      </Box>
      <Box>
        <EditButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
