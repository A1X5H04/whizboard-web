"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";
import { usePathname, useSearchParams } from "next/navigation";
import { Star, User, UsersThree } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

function OrganizationSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex flex-col space-y-6 w-64 pl-5 pt-5">
      <div className="inline-flex gap-x-3 mx-2 mt-4 mb-6">
        <Image src="/logo.png" alt="Logo" width={28} height={28} />
        <h1 className="font-bold text-lg">WhizBoard</h1>
      </div>
      <OrganizationSwitcher
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "10px 12px",
              width: "100%",
              borderRadius: "var(--rounded-btn, 0.5rem)",
              boxShadow:
                "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);",
              color: "oklch(var(--bc))",
              backgroundColor: "oklch(var(--b3))",
              "&:hover": {
                backgroundColor: "oklch(var(--b2))",
              },
              justifyContent: "space-between",
            },
            organizationSwitcherTriggerIcon: {
              color: "oklch(var(--bc))",
            },
          },
        }}
        hidePersonal
      />
      <div className="space-y-1 w-full">
        <ul className="menu w-full space-y-2">
          <li>
            <Link href="/" className={twMerge(pathname === "/" && "active")}>
              <User weight={pathname === "/" ? "fill" : "regular"} />
              My Boards
            </Link>
          </li>
          <li>
            <Link
              href="/teams"
              className={twMerge(pathname === "/teams" && "active")}
            >
              <UsersThree weight={pathname === "/teams" ? "fill" : "regular"} />
              Team Boards
            </Link>
          </li>
          <li>
            <Link
              className={twMerge(pathname === "/favourites" && "active")}
              href="/favourites"
            >
              <Star weight={pathname === "/favourites" ? "fill" : "regular"} />
              Favourite Board
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default OrganizationSidebar;
