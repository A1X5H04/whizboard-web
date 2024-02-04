"use client";

import { api } from "@/convex/_generated/api";
import {
  LinkSimpleHorizontal,
  PencilSimple,
  TrashSimple,
} from "@phosphor-icons/react";
import React from "react";
import toast from "react-hot-toast";
import RenameModal from "./rename-modal";
import DeleteModal from "./delete-modal";
function BoardActions({ boardId }: { boardId: any }) {
  const deleteModalRef = React.useRef<HTMLDialogElement>(null);
  const renameModalRef = React.useRef<HTMLDialogElement>(null);
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.origin + "/board/" + boardId)
      .then(() => toast.success("Link copied!"));
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
            onClick={() => renameModalRef.current?.showModal()}
            className="tooltip tooltip-bottom"
            data-tip="Rename"
          >
            <PencilSimple size={20} />
          </button>
        </li>
        <li className="text-rose-600">
          <button
            onClick={() => deleteModalRef.current?.showModal()}
            className="tooltip tooltip-bottom"
            data-tip="Delete"
          >
            <TrashSimple size={20} />
          </button>
        </li>
      </ul>
      <DeleteModal modalRef={deleteModalRef} boardId={boardId} />
      <RenameModal modalRef={renameModalRef} boardId={boardId} />
    </div>
  );
}

export default BoardActions;
