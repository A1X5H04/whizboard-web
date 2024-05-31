"use client";

import { useApiMutation } from "@/hooks/use-api-mutation";
import toast from "react-hot-toast";
import { api } from "@/convex/_generated/api";
import { SetStateAction, useState } from "react";
import { CreateOrganization } from "@clerk/nextjs";

interface OrgModalProps {
  modalRef: React.RefObject<HTMLDialogElement>;
}

function OrgModal({ modalRef }: OrgModalProps) {
  return (
    <dialog ref={modalRef} className="modal bg-transparent">
      <div className="modal-box bg-inherit shadow-none overflow-visible">
        <CreateOrganization
          appearance={{
            elements: {
              rootBox: {
                backgroundColor: "bg-slate-700",
                borderRadius: "rounded-md",
                padding: "p-5",
              },
            },
          }}
        />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default OrgModal;
