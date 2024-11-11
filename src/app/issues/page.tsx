import prisma from "@/prisma/client";
import { IssueStatusBadge, Link } from "@/src/app/Components";
import { Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import { useState } from "react";
import NextLink from "next/link";
import { IoIosArrowRoundUp } from "react-icons/io";
import IssuesTable from "./IssuesTable";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue };
}

const IssuePage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status },
  });
  const columns: { label: string; value: keyof Issue }[] = [
    { label: "title", value: "title" },
    { label: "status", value: "status" },
    { label: "created", value: "createdAt" },
  ];

  return (
    <div>
      <IssueActions />
      <IssuesTable columns={columns} searchParams={searchParams} issues={issues}/>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuePage;
