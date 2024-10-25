import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";
import prisma from "@/prisma/client";

const EditIssuePage = async ({params}:{params:{id:string}}) => {
  const issue = await prisma.issue.findUnique({
    where:{id:parseInt(params.id)}
  })
  if(!issue) notFound()
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
