"use client";

import { UserButton } from "@clerk/nextjs";
import React from "react";
import SearchInput from "./search-input";
import ThemeToggler from "@/components/theme-toggler";

function Navbar() {
  return (
    <div className="flex items-center gap-x-4 p-5">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <ThemeToggler />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export default Navbar;
