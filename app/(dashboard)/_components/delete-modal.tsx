"use client";
import { useRef } from "react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import toast from "react-hot-toast";

interface DeleteModalProps {
  modalRef: React.RefObject<HTMLDialogElement>;
  boardId: string;
}

function DeleteModal({ boardId, modalRef }: DeleteModalProps) {
  const { mutate, loading } = useApiMutation(api.board.remove);

  const closeModal = () => {
    modalRef.current?.close();
  };

  const deleteBoard = () => {
    mutate({ id: boardId })
      .then(() => {
        closeModal();
        toast.success("Board deleted!");
      })
      .catch(() => {
        closeModal();
        toast.error("Failed to delete board");
      });
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box w-full">
        <h3 className="font-bold text-xl">Delete Board</h3>
        <p className="text-base text-base-content mt-3">
          Are you really sure you want to delete this board? <br />
          This action cannot be undone.
        </p>
        <div className="modal-action">
          <button onClick={closeModal} className="btn">
            Close
          </button>
          <button
            onClick={deleteBoard}
            disabled={loading}
            className="btn btn-error"
          >
            Delete Board
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default DeleteModal;
