"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Star, UsersThree } from "@phosphor-icons/react";
import React from "react";
import Link from "next/link";

function OrganizationSidebar() {
  const searchParams = useSearchParams();
  const favouriteRoute = searchParams.get("favourite");

  return (
    <div className="hidden lg:flex flex-col space-y-6 w-64 pl-5 pt-5">
      <div className="mb-3 mt-2">
        <h1 className="font-extrabold text-xl">WhizBoard</h1>
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
              color: "#374151",
              backgroundColor: "#d1d5db",
              "&:hover": {
                backgroundColor: "#e5e7eb",
              },
              "@media (prefers-color-scheme: dark)": {
                backgroundColor: "#374151",
                color: "#d1d5db",
                "&:hover": {
                  backgroundColor: "#4b5563",
                },
              },
              justifyContent: "space-between",
            },
          },
        }}
        hidePersonal
      />
      <div className="space-y-1 w-full">
        <ul className="menu w-full space-y-2">
          <li>
            <Link href="/" className={favouriteRoute ? "" : "active"}>
              <UsersThree />
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
              <Star />
              Favourite Board
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default OrganizationSidebar;
