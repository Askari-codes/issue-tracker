"use client";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import React, { useState } from "react";
import NextLink from "next/link";
import { IssueStatusBadge, Link } from "../Components";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
interface Props {
  columns: { label: string; value: keyof Issue }[];
  issues: Issue[];
  searchParams: { status: Status; orderBy: keyof Issue };
}

const IssuesTable = ({ columns, issues, searchParams }: Props) => {
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending" | "">(
    ""
  );
  const sortHandler = () => {
    if (!sortOrder || sortOrder === "descending") {
      setSortOrder("ascending");
    } else {
      setSortOrder("descending");
    }
  };
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map(({ label, value }) => (
            <Table.ColumnHeaderCell key={value}>
              <NextLink
                onClick={sortHandler}
                href={{ query: { ...searchParams, orderBy: value } }}
              >
                {label}
              </NextLink>
              {value === searchParams.orderBy ? (
                sortOrder === "ascending" ? (
                  <IoIosArrowRoundUp className="inline text-xl" />
                ) : sortOrder === "descending" ? (
                  <IoIosArrowRoundDown className="inline text-xl" />
                ) : null
              ) : null}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => {
          console.log(
            `Issue ID: ${issue.id}, Status: ${issue.status}, Title: ${issue.title}`
          );
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
