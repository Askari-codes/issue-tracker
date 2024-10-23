import React from "react";
import { Badge } from "@radix-ui/themes";
import { Status } from "@prisma/client";

const statusMap: Record<
  Status,
  { lable: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { lable: "Open", color: "red" },
  IN_PROGRESS: { lable: "In Progress", color: "violet" },
  CLOSE: { lable: "close", color: "green" },
};

const IssueStatusBadge = ({ Status }: { Status: Status }) => {
  return <Badge color={statusMap[Status].color}>{statusMap[Status].lable}</Badge>;
};

export default IssueStatusBadge;
