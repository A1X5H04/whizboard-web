"use client";

import React from "react";
import { CreateOrganization } from "@clerk/nextjs";
import { Plus } from "@phosphor-icons/react";
import OrgModal from "../org-modal";

function NewOrgButton() {
  const modalRef = React.useRef<HTMLDialogElement>(null);
  return (
    <div className="tooltip tooltip-right" data-tip="Create Organization">
      <button
        className="btn-square btn-sm btn"
        onClick={() => modalRef.current?.showModal()}
      >
        <Plus size={18} />
      </button>
      <OrgModal modalRef={modalRef} />
    </div>
  );
}

export default NewOrgButton;
