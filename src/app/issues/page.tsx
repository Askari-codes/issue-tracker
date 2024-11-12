import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssuesTable, { IssueQuery } from "./IssuesTable";
import Pagination from "../Components/Pagination";

interface Props {
  searchParams: IssueQuery;
}

const IssuePage = async ({ searchParams }: Props) => {
  const currentpage=parseInt(searchParams.page)||1
  const pageSize = 10


  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
    const where={status}

  const orderBy =
    searchParams.orderBy && searchParams.order === "asc"
    
      ? { [searchParams.orderBy]: "asc" }
      : searchParams.orderBy && searchParams.order === "desc"? { [searchParams.orderBy]: "desc" }
      :undefined
      

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip:(currentpage-1)*10,
    take:pageSize
  });
  const columns: { label: string; value: keyof Issue }[] = [
    { label: "title", value: "title" },
    { label: "status", value: "status" },
    { label: "created", value: "createdAt" },
  ];
  const itemNumbers=await prisma.issue.count({
    where
  })

  return (
    <div>
      <IssueActions />
      <IssuesTable
        columns={columns}
        searchParams={searchParams}
        issues={issues}
      />
     <Pagination  itemCount={itemNumbers} pageSize={pageSize} currentPage={currentpage}/>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuePage;
