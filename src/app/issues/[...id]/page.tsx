import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import delay from "delay";
import { Badge, Card, Flex, Heading, Text } from "@radix-ui/themes";

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
    <div>
      <Heading>{issue?.title}</Heading>
      <Flex gap="3" my="3">
        <Badge>{issue?.status}</Badge>
        <Text>{issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card>{issue?.description}</Card>
    </div>
  );
};

export default IssueDetail;
