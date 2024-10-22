"use client";

import { TextField, Button, Callout, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "../../validationSchema";
import { z } from "zod";
import { ChangeEventHandler, useState } from "react";
import ErrorMessage from "../../Components/ErrorMessage";

type issueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState("");

  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isTitleFill, setIsTitleFill] = useState<boolean>(false);
  const [isdescriptionFill, setIsDescriptionFill] =
    useState<boolean>(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<issueForm>({
    resolver: zodResolver(createIssueSchema),
  });
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

  const handleClick = () => {
    setIsClicked(true);
  };
  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsClicked(false);
    if (e.target.value) {
      setIsTitleFill(true);
    }else{
      setIsTitleFill(false)
    }
  };
  const descriptionHandler = (value: string) => {
    setIsClicked(false);
    if (value) {
      setIsDescriptionFill(true);
    } else {
      setIsDescriptionFill(false);
    }
  };

  return (
    <div>
      {error && (
        <Callout.Root className="max-w-[50%] mb-5">
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="max-w-[50%] space-y-3  mt-2 "
      >
        <TextField.Root
          {...register("title")}
          onChange={titleHandler}
          placeholder="Title"
        ></TextField.Root>
        {isClicked && !isTitleFill && (
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              placeholder="description"
              {...field}
              onChange={descriptionHandler}
            />
          )}
        />
        {isClicked && !isdescriptionFill && (
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        )}

        <Button onClick={handleClick}>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
