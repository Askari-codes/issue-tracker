"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const IssuesStatusFilter = () => {
  const statuses: { label: string; value?: Status | "ALL" }[] = [
    { label: "ALL", value: "ALL" },
    { label: "OPEN", value: "OPEN" },
    { label: "CLOSE", value: "CLOSE" },
    { label: "IN PROGRESS", value: "IN_PROGRESS" },
  ];
  const router = useRouter();
  const searchParams = useSearchParams()
  
  const handleSelectChange = (status: string) => {
    const params=new URLSearchParams()
    if(status) params.append('status',status)
      if(searchParams.get('orderBy'))
        params.append('orderBy',searchParams.get('orderBy')!)
    
    searchParams.get('orderBy')
    const query = params.size? "?" + params.toString():''
   
    
    router.push("/issues/" + query);
  };

  return (
    <Select.Root
    defaultValue={searchParams.get('status')||''}
    onValueChange={handleSelectChange}>
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
