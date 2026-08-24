"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  href: "/" | "/tickets" | "/tickets/new";
  label: string;
  isActive: (pathname: string) => boolean;
};

const links: NavLink[] = [
  {
    href: "/",
    label: "Dashboard",
    isActive: (pathname) => pathname === "/",
  },
  {
    href: "/tickets",
    label: "Tickets",
    isActive: (pathname) =>
      pathname === "/tickets" ||
      (pathname.startsWith("/tickets/") && !pathname.startsWith("/tickets/new")),
  },
  {
    href: "/tickets/new",
    label: "New Ticket",
    isActive: (pathname) => pathname === "/tickets/new",
  },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold text-zinc-900">
          Mini Support Desk
        </Link>
        <nav aria-label="Main" className="flex flex-wrap gap-1 sm:gap-2">
          {links.map((link) => {
            const active = link.isActive(pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-zinc-900 text-white underline underline-offset-4"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
