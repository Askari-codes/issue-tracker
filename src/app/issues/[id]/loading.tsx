"use client";
import { Flex, Card, Box } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "../../Components";

const loading = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap="3" my="3">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Card>
    </Box>
  );
};

export default loading;
