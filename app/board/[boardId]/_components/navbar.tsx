"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import Link from "next/link";
import Participants from "./participants";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";

function CanvasNavbar({ boardId }: { boardId: string }) {
  const data = useQuery(api.board.get, { id: boardId as Id<"boards"> });

  return (
    <div className="absolute top-3 w-[95%] translate-x-1/2 right-1/2">
      <div className="navbar bg-neutral rounded-xl shadow-xl">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost btn-circle">
            <ArrowLeft size={20} weight="bold" />
          </Link>
        </div>
        <div className="navbar-center">
          <div className="dropdown ">
            <div tabIndex={0} role="button" className="btn btn-ghost text-xl">
              {data?.title}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content text-center mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-60"
            >
              <li>
                <a>Download Board as Image</a>
              </li>
              <li>
                <a>Copy Board Link</a>
              </li>
              <li>
                <a>Rename Board</a>
              </li>
              <li>
                <a>Delete Board</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-end">
          <Participants />
        </div>
      </div>
    </div>
  );
}

export default CanvasNavbar;
