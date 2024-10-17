"use client";
import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
   
  return (
    <div className="max-w-[50%] space-y-3  mt-2 ">
      <TextField.Root placeholder="Title"></TextField.Root>
      <SimpleMDE
      placeholder="description"  />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
