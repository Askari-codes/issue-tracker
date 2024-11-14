import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IssueStatusBadge } from "./Components";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });
  return (
    <Card>
        <Heading mb='4' size='4'>Latest Issues</Heading>
        <Table.Root>
      <Table.Body>
          {issues.map(({ id, status, title, assignedToUser }) => (
            <Table.Row key={id}>
              <Table.Cell key={id}>
                <Flex justify='between'>
                  <Flex direction="column" align='baseline' gap='2'>
                    <Link href={`/issues/${id}`}>{title}</Link>
                    <IssueStatusBadge id={id} status={status} />
                  </Flex>
                  {assignedToUser && (
                    <Avatar src={assignedToUser.image!} fallback="?" />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table.Root>
    </Card>
  );
};

export default LatestIssues;
