"use client";
import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface issueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control,handleSubmit } = useForm<issueForm>();
  const router = useRouter()
  console.log("register", register("description"));

const submitHandler = async (data:issueForm)=>{
await axios.post('/api/issue',data)
router.push('/issues')
}

  return (
    <form
    onSubmit={handleSubmit(submitHandler)}
    className="max-w-[50%] space-y-3  mt-2 ">
      <TextField.Root
        placeholder="Title"
        {...register("title")}
      ></TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({field}) => <SimpleMDE placeholder="description" {...field} />}
      />

      <Button >Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
