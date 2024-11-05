import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditButton from "./EditButton";
import IssueDetail from "./IssueDetail";
import DeleteIssueButton from "./DeleteButton";
import { getServerSession } from "next-auth";
import authOption from "@/app/auth/authOption";
const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOption);
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });

  if (!issue) return notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
      <Box className=" md:col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction={"column"} gap={"4"}>
            <EditButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
