import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Detail from "./Detail";
import EditIssueButton from "./EditIssueButton";
import DeleteIssueButton from "./DeleteIssueButton";


interface Props {
  params: { id: string };
}

const IssueDetail = async ({ params }: Props) => {
 
  const issueId = parseInt(params.id);
  if (isNaN(issueId)) return notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) return notFound();
  return (
    <Grid  columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <Detail issue={issue} />
      </Box>
      <Box >
       <Flex  direction='column' gap='4'>
       <EditIssueButton issueId={issue.id} />
       <DeleteIssueButton/>
       </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetail;
