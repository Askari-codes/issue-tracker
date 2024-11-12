"use client";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { IssueStatusBadge, Link } from "../Components";

export interface IssueQuery{
  status: Status;
   orderBy: keyof Issue;
  order:'asc'|'desc';
  page:string 

}

interface Props {
  columns: { label: string; value: keyof Issue }[];
  issues: Issue[];
  searchParams: IssueQuery;
}

const IssuesTable = ({ columns, issues, searchParams }: Props) => {
  
  const toggleSortOrder =(currentOrder:'asc'|'desc')=>{
   return currentOrder==='asc'?'desc':'asc'
  }
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map(({ label, value }) => (
            <Table.ColumnHeaderCell key={value}>
              <NextLink
                href={
                    {
                        pathname:"/issues",
                        query:{
                            ...searchParams,
                            orderBy:value,
                            order:
                            searchParams.orderBy===value
                            ?toggleSortOrder(searchParams.order):
                            'asc'
                        }

                    }
                }
              >
                {label}
              </NextLink>
              {value === searchParams.orderBy ? (
                searchParams.order === "asc" ? (
                  <IoIosArrowRoundUp className="inline text-xl" />
                ) : searchParams.order === "desc" ? (
                  <IoIosArrowRoundDown className="inline text-xl" />
                ) : null
              ) : null}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => {
        
          return (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge id={issue.id} status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge id={issue.id} status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};

export default IssuesTable;
