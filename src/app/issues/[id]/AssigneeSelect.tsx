"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "@/src/app/Components/Skeleton";
import toast, { Toaster } from "react-hot-toast";
import { use } from "react";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
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

  
  const onChangeHandler = (userId: string) => {
    const targetUser=users?.find(user=>user.id===userId)
    if (userId) {
      axios
        .patch(
          "/api/issue/" + issue.id,
          userId === "unassigned"
            ? { assignedToUserId: null }
            : { assignedToUserId: userId }
            
        )
        .then(()=>{
          if(userId==='unassigned'){
            toast.success(`The issue is unassigned now`)
          }
          else{

            toast.success(`The issue is assigned to ${targetUser?.email}`)
          }
        })
        .catch(() => {
          toast.error("changes could not be saved");
        });
    }
  };

  return (
    <>
      <Select.Root onValueChange={onChangeHandler}>
        <Select.Trigger placeholder="Asignee..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>suggestions...</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item value={user.id} key={user.id}>
                {user.email}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
