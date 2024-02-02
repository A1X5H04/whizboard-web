"use client";

import React from "react";
import { CreateOrganization } from "@clerk/nextjs";
import { Plus } from "@phosphor-icons/react";

function NewOrgButton() {
  return (
    <div className="tooltip tooltip-right" data-tip="Create Organization">
      <button
        className="btn-square btn-sm btn"
        onClick={() =>
          (
            document?.getElementById("org_modal") as HTMLDialogElement
          )?.showModal()
        }
      >
        <Plus size={18} />
      </button>
      <dialog id="org_modal" className="modal">
        <div className="modal-box w-full">
          <CreateOrganization
            appearance={{
              elements: {
                rootBox: {
                  backgroundColor: "bg-slate-700",
                  borderRadius: "rounded-md",
                  padding: "p-5",
                  width: "w-full",
                  height: "h-full",
                },
              },
            }}
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default NewOrgButton;
