'use client'
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<User[]>("/api/user");
      setUsers(data);
    };
    fetchData();
  }, []);
  return (
    <Select.Root>
      <Select.Trigger placeholder="Asignee..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>suggestions...</Select.Label>
          {users.map(user=>
            <Select.Item value={user.id} key={user.id}>{user.email}</Select.Item>
          )}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
