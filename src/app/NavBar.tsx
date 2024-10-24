"use client";
import React from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();
  console.log(currentPath);

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b-2 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className=" flex space-x-5">
        {links.map((link) => (
          <li
            key={link.href}
            className={classNames({
               "hover:text-[var(--text-link-navbar-hover)] transition-colors":true,
                "text-[var(--text-link-navbar-active)]":currentPath === link.href,
                "text-[var(--text-link-navbar)]": currentPath !== link.href 
            }
             
            )}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
