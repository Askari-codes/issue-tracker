"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "@/src/app/Components/Skeleton";
import toast,{Toaster} from 'react-hot-toast'


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

  console.log("users", users);

  return (
    <>
    <Select.Root
      onValueChange={(userId) => {
        if (userId) {
          axios.patch(
            "/xapi/issue/" + issue.id,
            userId === "unassigned"
              ? { assignedToUserId: null }
              : { assignedToUserId: userId }
          ).catch(()=>{
            toast.error('changes could not be saved')
          });
        }
      }}
    >
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
    <Toaster/>
    </>
  );
};

export default AssigneeSelect;
