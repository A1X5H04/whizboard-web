"use client";

import { ArrowLeft, Download, Info, UserPlus } from "@phosphor-icons/react";
import Link from "next/link";
import Participants from "./participants";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import toast from "react-hot-toast";
import { useRef } from "react";
import BoardInfoModal from "./board-info-modal";

const message = `Let's bring our imaginations to life on our collaborative board! 🎨✨

Whether you're brainstorming ideas or letting your creativity flow through drawing, there's plenty of room for all of us!

Join here: ${window.location.href}

Can't wait to see what magic we'll make together! 🌟🚀`;

function CanvasNavbar({ boardId }: { boardId: string }) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const data = useQuery(api.board.get, { id: boardId as Id<"boards"> });

  const inviteMember = () => {
    navigator.clipboard
      .writeText(message)
      .then(() =>
        toast.success("Invitation message copied!", {
          icon: "🚀",
          position: "bottom-center",
        })
      )
      .catch(() => toast.error("Failed to copy message!"));
  };

  return (
    <div className="absolute top-3 w-full px-10 z-30">
      <div className="navbar bg-neutral rounded-box shadow-xl">
        <div className="navbar-start">
          <Link
            href="/"
            className="btn btn-ghost btn-circle text-neutral-content"
          >
            <ArrowLeft size={20} weight="bold" />
          </Link>
        </div>
        <div className="navbar-center">
          <div className="dropdown ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-neutral-content text-xl"
            >
              {data?.title}
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content text-center mt-3 z-[1] p-2 shadow bg-base-100 rounded-box  translate-x-1/2 right-1/2 w-60"
            >
              <li>
                <button
                  onClick={inviteMember}
                  className="inline-flex gap-1 w-full"
                >
                  <UserPlus width={20} />
                  Invite Member
                </button>
              </li>
              <li>
                <div className="inline-flex gap-1 w-full">
                  <Download width={20} />
                  <a>Download Board</a>
                </div>
              </li>
              <li>
                <button
                  onClick={() => modalRef.current?.showModal()}
                  className="inline-flex gap-1 w-full"
                >
                  <Info width={20} />
                  Board Info
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-end">
          <Participants />
        </div>
        {data && <BoardInfoModal data={data} modalRef={modalRef} />}
      </div>
    </div>
  );
}

export default CanvasNavbar;
