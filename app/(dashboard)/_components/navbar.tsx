"use client";

import { UserButton } from "@clerk/nextjs";
import { CreateOrganization } from "@clerk/nextjs";
import React from "react";
import SearchInput from "./search-input";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-x-4 p-5">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export default Navbar;
