import { Status } from "@prisma/client";
import { Card, Flex,Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
interface Props{
    IssuesNumber:{
        Open:number;
        Close:number;
        In_Progress:number;
    }
   
}

const IssueSummary = ({IssuesNumber:{Open,Close,In_Progress}}:Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issues", value: Open, status: "OPEN" },
    { label: "In_Progress Issues", value: In_Progress, status: "IN_PROGRESS" },
    { label: "Close Issues", value:Close, status: "CLOSE" },
  ];
  return(
   <Flex gap='2'>
     {containers.map(({label,value,status})=>(
        <Card key={label}>
            <Flex direction='column' align='center'>
                <Link href={`/issues?status=${status}`}>
                {label}
                </Link>
                <Text>
                    {value}
                </Text>
                
            </Flex>
        </Card>
    ))}
   </Flex>
  )
};

export default IssueSummary;
