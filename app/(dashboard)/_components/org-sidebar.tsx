"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Star, UsersThree } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

function OrganizationSidebar() {
  const searchParams = useSearchParams();
  const favouriteRoute = searchParams.get("favourite");

  return (
    <div className="hidden lg:flex flex-col space-y-6 w-64 pl-5 pt-5">
      <div className="inline-flex gap-x-3 mb-3 mt-2">
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

              // "@media (prefers-color-scheme: dark)": {
              //   backgroundColor: "#374151",
              //   color: "#d1d5db",
              //   "&:hover": {
              //     backgroundColor: "#4b5563",
              //   },
              // },
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
            <Link href="/" className={favouriteRoute ? "" : "active"}>
              <UsersThree weight={favouriteRoute ? "regular" : "fill"} />
              Team Board
            </Link>
          </li>
          <li>
            <Link
              className={favouriteRoute ? "active" : ""}
              href={{
                pathname: "/",
                query: { favourite: "true" },
              }}
            >
              <Star weight={favouriteRoute ? "fill" : "regular"} />
              Favourite Board
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default OrganizationSidebar;
