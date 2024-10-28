import React from "react";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(
  () => import("@/src/app/issues/_components/IssueForm"),
  {
    ssr: false,
    loading:()=><IssueFormSkeleton/>
  }
);

const NewIssuePage = async () => {
 
  return <IssueForm />;
};

export default NewIssuePage;
