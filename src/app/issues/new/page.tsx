"use client";
import { TextField, Button, Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface issueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const [error, setError] = useState("");
  const { register, control, handleSubmit } = useForm<issueForm>();
  const router = useRouter();
  

  const submitHandler = async (data: issueForm) => {
    try {
      await axios.post("/api/issue", data);
      router.push("/issues");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("an unexpected error occurred");
      }
    }
  };

  return (
    <div>
      {error && (
        <Callout.Root className="max-w-[50%] mb-5">
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )

      }
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="max-w-[50%] space-y-3  mt-2 "
      >
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="description" {...field} />
          )}
        />

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
