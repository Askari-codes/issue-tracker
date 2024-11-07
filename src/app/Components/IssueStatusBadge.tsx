'use client'
import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import { useState } from "react";
import StatusDropdown from "../issues/StatusDropdown";

const statusMap: Record<
  Status,
  { lable: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { lable: "Open", color: "red" },
  IN_PROGRESS: { lable: "In Progress", color: "violet" },
  CLOSE: { lable: "Close", color: "green" },
};

const IssueStatusBadge = ({ Status,id }: { Status: Status,id:number }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [statusLable,setStatusLable] = useState(statusMap[Status].lable)
  const [statusColor,setStatusColor] = useState(statusMap[Status].color)

  const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);
  const handleValueChange=(value:string)=>{
    const newStaus =value as Status
    setStatusLable(statusMap[newStaus].lable)
    setStatusColor(statusMap[newStaus].color)
    }
  
  return (
    <Badge className="cursor-pointer" onClick={toggleDropdown} color={statusColor}>
      {!isDropdownVisible ? (
        statusLable
      ) : (
        <StatusDropdown id={id} onValueChange={handleValueChange}   />
      )}
    </Badge>
  );
};

export default IssueStatusBadge;

