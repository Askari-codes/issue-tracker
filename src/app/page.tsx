import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";


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
 
  return (
    <div className="text-black">
    <IssueSummary Open={Open} Close={Close} In_Progress={In_Progress}/>
    </div>
  );
}
