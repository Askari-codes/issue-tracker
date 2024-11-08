"use client";
import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import StatusDropdown from "../issues/StatusDropdown";

const statusMap: Record<
  Status,
  { lable: Status; color: "red" | "violet" | "green" }
> = {
  OPEN: { lable: "OPEN", color: "red" },
  IN_PROGRESS: { lable: "IN_PROGRESS", color: "violet" },
  CLOSE: { lable: "CLOSE", color: "green" },
};

const IssueStatusBadge = ({ status, id }: { status: Status; id: number }) => {
  const [badgeStatus, setBadgeStatus] = useState<Status>(
    statusMap[status].lable
  );

  useEffect(() => {
    setBadgeStatus(status);
  }, [status]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);
  const handleValueChange = (newStatus: string) => {
    const updatedStatus = newStatus as Status;
    setBadgeStatus(updatedStatus);
    setDropdownVisible(false);
  };

  return (
    <Badge
      className="cursor-pointer"
      onClick={toggleDropdown}
      color={statusMap[badgeStatus].color}
    >
      {!isDropdownVisible ? (
        badgeStatus
      ) : (
        <StatusDropdown id={id} onValueChange={handleValueChange} />
      )}
    </Badge>
  );
};

export default IssueStatusBadge;
