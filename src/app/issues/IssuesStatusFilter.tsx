import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

const IssuesStatusFilter = () => {
  const statuses: { label: string; value?: Status|"All" }[] = [
    { label: "ALL",value:"All"},
    { label: "OPEN", value: "OPEN" },
    { label: "CLOSE", value: "CLOSE" },
    { label: "IN PROGRESS", value: "IN_PROGRESS" },
  ];
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter issues" />
      <Select.Content>
        <Select.Group></Select.Group>
        {statuses.map((status)=>(
                <Select.Item key={status.value} value={status.value||''}>
                        {status.label}
                </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssuesStatusFilter;
