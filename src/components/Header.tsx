"use client";

import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { motion } from "framer-motion";

const routes = [
  { name: "Home", path: "/" },
  { name: "All Events", path: "/events/all" },
];

export default function Header() {
  const activePathname = usePathname();
  return (
    // mobile first design; specify mobile classes first (e.g. px-3 then sm:px-9)
    <header className="flex justify-between items-center border-b border-white/10 h-14 px-3 sm:px-9">
      <Logo />
      <nav className="h-full">
        <ul className="h-full flex gap-x-6 text-sm">
          {routes.map((route) => (
            <li
              key={route.path}
              className={clsx(
                "relative flex items-center hover:text-white transition",
                {
                  "text-white": activePathname === route.path,
                  "text-white/50": activePathname !== route.path,
                }
              )}
            >
              <Link href={route.path}>{route.name}</Link>
              {activePathname === route.path && (
                <motion.div
                  layoutId="header-active-link"
                  className="absolute bg-accent h-1 w-full bottom-0"
                ></motion.div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
