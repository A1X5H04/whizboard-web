"use client";

import { api } from "@/convex/_generated/api";
import {
  LinkSimpleHorizontal,
  PencilSimple,
  TrashSimple,
} from "@phosphor-icons/react";
import { useMutation } from "convex/react";
import React from "react";
import toast from "react-hot-toast";
function BoardActions({ boardId }: { boardId: any }) {
  const remove = useMutation(api.board.remove);

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.origin + "/board/" + boardId)
      .then(() => toast.success("Link copied!"));
  };

  const onDeleteBoard = () => {
    remove({ id: boardId })
      .then(() => toast.success("Board deleted!"))
      .catch(() => toast.error("Failed to delete board"));
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <ul className="menu menu-xs menu-horizontal bg-base-200 rounded-box z-10">
        <li>
          <button
            onClick={onCopyLink}
            className="tooltip tooltip-bottom"
            data-tip="Copy Link"
          >
            <LinkSimpleHorizontal size={20} />
          </button>
        </li>
        <li>
          <button
            onClick={onCopyLink}
            className="tooltip tooltip-bottom"
            data-tip="Rename"
          >
            <PencilSimple size={20} />
          </button>
        </li>
        <li className="text-rose-600">
          <button
            onClick={onDeleteBoard}
            className="tooltip tooltip-bottom"
            data-tip="Delete"
          >
            <TrashSimple size={20} />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default BoardActions;
