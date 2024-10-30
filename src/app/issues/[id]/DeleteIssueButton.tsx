"use client";
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const DeleteIssueButton = () => {
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  useEffect(() => {
    console.log("error", error);
  }, [error]);

  const deleteaHandler = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/issue/" + id);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      console.log(error);
      setError(true);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={isDeleting} color="red">
            Delete Issue{isDeleting && <Spinner />}
          </Button>
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
      {error && (
        <AlertDialog.Root>
          <AlertDialog.Content>
            <AlertDialog.Title>Delete</AlertDialog.Title>
            <AlertDialog.Description>
              you can not delete this issue
            </AlertDialog.Description>
            <AlertDialog.Cancel>
              <Button
                mt="2"
                color="gray"
                variant="soft"
                onClick={() => setError(false)}
              >
                Ok
              </Button>
            </AlertDialog.Cancel>
          </AlertDialog.Content>
        </AlertDialog.Root>
      )}
    </>
  );
};

export default DeleteIssueButton;
