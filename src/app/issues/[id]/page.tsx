import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Detail from "./Detail";
import EditIssueButton from "./EditIssueButton";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "../../api/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);
const IssueDetail = async ({ params }: Props) => {
  const sesssion = await getServerSession(authOptions);
  const issueId = parseInt(params.id);
  if (isNaN(issueId)) return notFound();

  const issue = await fetchUser(parseInt(params.id));
  if (!issue) return notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <Detail issue={issue} />
      </Box>
      {sesssion && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const issue = await fetchUser(parseInt(params.id));
  return {
    title: issue?.title,
    description: "Details of issue" + issue?.id,
  };
};

export default IssueDetail;
