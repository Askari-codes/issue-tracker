"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "@/src/app/Components/Skeleton";
import React, { useEffect, useState } from "react";

const AssigneeSelect = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["user"],
    queryFn: () => axios.get("/api/user").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
  if (isLoading) return <Skeleton />;
  if (error) return null;

  console.log("users", users);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Asignee..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>suggestions...</Select.Label>
          {users?.map((user) => (
            <Select.Item value={user.id} key={user.id}>
              {user.email}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
