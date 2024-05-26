import Link from "next/link";
import React from "react";

const routes = [
  { name: "Terms & Conditions", href: "/terms-conditions" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

export default function Footer() {
  // push footer to the bottom of the page
  return (
    <footer className="mt-auto flex justify-between items-center border-t border-white/10 h-16 px-3 sm:px-9 text-xs text-white/25">
      <small className="text-xs">&copy; 2050 VM. All rights reserved.</small>
      <ul className="flex gap-x-3 sm:gap-x-8">
        {routes.map((route) => (
          <li key={route.href}>
            <Link className="hover:text-white transition" href={route.href}>
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
