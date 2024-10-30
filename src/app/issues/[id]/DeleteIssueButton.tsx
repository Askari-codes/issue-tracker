"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import { useParams, useRouter } from "next/navigation";


const DeleteIssueButton = () => {
  const { id } = useParams();
  const router = useRouter();

  const deleteaHandler = async () => {
    try {
      await axios.delete("/api/issue/" + id);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      console.log("an error happend", error);
    }
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Delition</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? the action cannot undone
        </AlertDialog.Description>
        <Flex gap="3" mt="4">
          <AlertDialog.Cancel>
            <Button color="gray" variant="soft">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action onClick={deleteaHandler}>
            <Button color="red">Delete Issue</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
