import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import delay from "delay";
import { Badge, Card, Flex, Heading, Text, Grid, Box, Button } from "@radix-ui/themes";
import ReactMarkdown from 'react-markdown'
import {Pencil2Icon} from '@radix-ui/react-icons'
import Link from 'next/link'


interface Props {
  params: { id: string };
}

const IssueDetail = async ({ params }: Props) => {
  await delay(2000);
  const issueId = parseInt(params.id);
  if (isNaN(issueId)) return notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) return notFound();
  return (
  
     <Grid columns={{initial:'1',md:'2'}} gap='5'>
   <Box>
   <Heading>{issue?.title}</Heading>
      <Flex gap="3" my="3">
        <Badge>{issue?.status}</Badge>
        <Text>{issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <ReactMarkdown className="prose">
          {issue.description}
        </ReactMarkdown>
        </Card>
   </Box>
  <Button className="w-28">
   <Pencil2Icon/>
   <Link href={`/issues/${issue.id}/edit`}> Edit Issue</Link>
   
  </Button>
     </Grid>
    
  );
};

export default IssueDetail;
