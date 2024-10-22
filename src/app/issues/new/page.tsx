"use client";
import { TextField, Button, Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "../../validationSchema";
import { z } from "zod";
import { useState } from "react";
import ErrorMessage from "../../Components/ErrorMessage";
import Spinner from "../../Components/Spinner";

type issueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isSubmitted, setSubmitted] = useState<boolean>(false);
  const [isTitleFill, setIsTitleFill] = useState<boolean>(false);
  const [isdescriptionFill, setIsDescriptionFill] = useState<boolean>(false);
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
    console.log("form is submitted");

    try {
      setSubmitted(true);
      await axios.post("/api/issue", data);
      router.push("/issues");
    } catch (error) {
      setSubmitted(false);
      if (axios.isAxiosError(error)) {
        console.log(error);
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
    } else {
      setIsTitleFill(false);
    }
  };

  return (
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
        render={({ field: { onChange } }) => (
          <SimpleMDE
            placeholder="description"
            onChange={(newValue: string) => {
              setIsClicked(false);
              if (newValue) {
                setIsDescriptionFill(true);
              } else {
                setIsDescriptionFill(false);
              }
              onChange(newValue);
            }}
          />
        )}
      />
      {isClicked && !isdescriptionFill && (
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
      )}

      <Button onClick={handleClick}>
        Submit New Issue {isSubmitted && <Spinner />}{" "}
      </Button>
    </form>
  );
};

export default NewIssuePage;
