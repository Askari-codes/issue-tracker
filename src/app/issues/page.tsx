import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssuesTable from "./IssuesTable";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; order: "asc" | "desc" };
}

const IssuePage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy =
    searchParams.orderBy && searchParams.order === "asc"
    
      ? { [searchParams.orderBy]: "asc" }
      : searchParams.orderBy && searchParams.order === "desc"? { [searchParams.orderBy]: "desc" }
      :undefined
      

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
  });
  const columns: { label: string; value: keyof Issue }[] = [
    { label: "title", value: "title" },
    { label: "status", value: "status" },
    { label: "created", value: "createdAt" },
  ];

  return (
    <div>
      <IssueActions />
      <IssuesTable
        columns={columns}
        searchParams={searchParams}
        issues={issues}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuePage;
