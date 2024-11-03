import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BiEdit } from "react-icons/bi";
import ReactMarkdown from "react-markdown";
const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });

  if (!issue) return notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }}>
      <Box className="mb-5">
        <Heading>{issue.title}</Heading>
        <Flex gapX="3" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <BiEdit />
          <Link href={`/issues/${params.id}/edit`}>Edit</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
