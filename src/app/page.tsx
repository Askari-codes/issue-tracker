import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";


export default async function Home() {
const Open = await prisma.issue.count({
  where:{status:"OPEN"}
})
const In_Progress = await prisma.issue.count({
  where:{status:'IN_PROGRESS'}
})
const Close = await prisma.issue.count({
  where:{status:'CLOSE'}
})
const IssusNumbers={
  Open,
  In_Progress,
  Close
}
 
  return (
    <Grid  width='100%' columns={{initial:'1',md:'2'}}>
      <Flex m='5' gap='5' direction='column' >
        <IssueSummary  IssuesNumber={IssusNumbers}/>
        <IssueChart IssuesNumber={IssusNumbers}/>
      </Flex>
      <LatestIssues/>
    </Grid>
  );
}

export const metadata: Metadata={
  title:'Issue Tracker - Dashboard',
  description:'Vies a summary of project issues'
}
