import { Box, DropdownMenu, Avatar, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return null;
  if (status === "unauthenticated")
    return <Link className="text-zinc-500" href="/api/auth/signin">login</Link>;
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user?.image!}
            fallback="?"
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="4">{session!.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link className="text-[1.2rem]" href={"/api/auth/signout"}>
              logout
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default AuthStatus;
