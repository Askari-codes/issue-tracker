"use client";
import React from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Avatar, Box, Container, DropdownMenu, Flex ,Text } from "@radix-ui/themes";

const NavBar = () => {
  const { status, data: session } = useSession();
  const currentPath = usePathname();
  console.log(status, session);

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className=" border-b-2 px-5 py-3">
      <Container>
      <Flex justify='between'>
        <Flex align='center' gap='3'>
        <Link href="/">
        <AiFillBug />
      </Link>
      <ul className=" flex space-x-5">
        {links.map((link) => (
          <li
            key={link.href}
            className={classNames({
              "hover:text-[var(--text-link-navbar-hover)] transition-colors":
                true,
              "text-[var(--text-link-navbar-active)]":
                currentPath === link.href,
              "text-[var(--text-link-navbar)]": currentPath !== link.href,
            })}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
        </Flex>
        <Box>
        {status === "authenticated" ? (
      
          <DropdownMenu.Root>
            <DropdownMenu.Trigger >
              <Avatar  src={session.user?.image!} fallback='?' 
              className="cursor-pointer"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>
                <Text size='4'>
                  {session.user?.email}
                </Text>
              </DropdownMenu.Label>
              <DropdownMenu.Item >
              <Link className="text-[1.2rem]"  href={"/api/auth/signout"}>logout</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        ) : (
          <Link href="/api/auth/signin">login</Link>
        )}
        </Box>
      </Flex>
     
      </Container>
     
    </nav>
  );
};

export default NavBar;
