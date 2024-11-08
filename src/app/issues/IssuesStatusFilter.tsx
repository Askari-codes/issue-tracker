"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const IssuesStatusFilter = () => {
  const statuses: { label: string; value?: Status | "ALL" }[] = [
    { label: "ALL", value: "ALL" },
    { label: "OPEN", value: "OPEN" },
    { label: "CLOSE", value: "CLOSE" },
    { label: "IN PROGRESS", value: "IN_PROGRESS" },
  ];
  const router = useRouter();
  const handleSelectChange = (status: string) => {
    console.log(status);

    const query = status === "ALL" || !status ? "" : `?status=${status}`;

    router.push("/issues/" + query);
  };

  return (
    <Select.Root onValueChange={handleSelectChange}>
      <Select.Trigger placeholder="Filter issues" />
      <Select.Content>
        <Select.Group></Select.Group>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || ""}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssuesStatusFilter;
