import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <ul className=" flex space-x-5">
      {links.map((link) => (
        <li
          key={link.href}
          className={classNames({
            "hover:text-[var(--text-link-navbar-hover)] transition-colors":
              true,
            "text-[var(--text-link-navbar-active)]": currentPath === link.href,
            "text-[var(--text-link-navbar)]": currentPath !== link.href,
          })}
        >
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
