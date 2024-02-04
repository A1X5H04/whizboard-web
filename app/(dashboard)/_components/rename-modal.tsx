"use client";

import { useApiMutation } from "@/hooks/use-api-mutation";
import toast from "react-hot-toast";
import { api } from "@/convex/_generated/api";
import { SetStateAction, useState } from "react";

interface RenameModalProps {
  modalRef: React.RefObject<HTMLDialogElement>;
  boardId: string;
}

function RenameModal({ modalRef, boardId }: RenameModalProps) {
  const [value, setValue] = useState("");
  const { mutate, loading } = useApiMutation(api.board.update);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setValue(e.target.value);
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const renameBoard = () => {
    console.log(value);
    mutate({ id: boardId, title: value })
      .then(() => {
        closeModal();
        toast.success("Board renamed!");
      })
      .catch(() => {
        closeModal();
        toast.error("Failed to rename board");
      });
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box w-full">
        <h3 className="font-bold text-xl">Rename Board</h3>
        <p className="text-sm text-base-content mt-1">
          Enter a new name for the board
        </p>
        <div className="mt-7">
          <input
            type="text"
            placeholder="Board Name"
            onChange={handleChange}
            className="input input-bordered input-primary w-full"
          />
        </div>
        <div className="modal-action">
          <button onClick={closeModal} className="btn">
            Close
          </button>

          <button
            onClick={renameBoard}
            disabled={loading}
            className="btn btn-primary"
          >
            Rename Board
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default RenameModal;
