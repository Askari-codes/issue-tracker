"use client";
import { TextField, Button } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "../../validationSchema";
import { z } from "zod";
import { useEffect, useState } from "react";
import { ErrorMessage, Spinner } from "@/src/app/Components";
import { Issue } from "@prisma/client";
import { log } from "node:console";

type issueFormData = z.infer<typeof issueSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
const NewIssuePage = ({ issue }: { issue?: Issue }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isSubmitted, setSubmitted] = useState<boolean>(false);
  const [isTitleFill, setIsTitleFill] = useState<boolean>(false);
  const [isdescriptionFill, setIsDescriptionFill] = useState<boolean>(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<issueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();

  const submitHandler = async (data: issueFormData) => {
    console.log('data',data);
    console.log('issue',issue);
    

    try {
      setSubmitted(true);
      if (issue) await axios.patch("/api/issue/" + issue.id, data);
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
        defaultValue={issue?.title}
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
        defaultValue={issue?.description}
        render={({ field: { onChange, value } }) => (
          <SimpleMDE
            value={value}
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

      <Button disabled={isSubmitted} onClick={handleClick}>
        {issue?'Update issue':'New Issue'} {''} {isSubmitted && <Spinner />}{" "}
      </Button>
    </form>
  );
};

export default NewIssuePage;
