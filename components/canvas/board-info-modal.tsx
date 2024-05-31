"use client";

import { Doc } from "@/convex/_generated/dataModel";
import Image from "next/image";

interface BoardInfoModalProps {
  modalRef: React.RefObject<HTMLDialogElement>;
  data: Doc<"boards">;
}

function BoardInfoModal({ data, modalRef }: BoardInfoModalProps) {
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box w-full">
        <h3 className="font-bold text-2xl">Board Info</h3>

        <div className="flex h-full items-center gap-x-8 my-5 bg-base-200 p-3 rounded-box">
          <div className="relative bg-base-300 rounded-box p-4 w-2/5 h-56 ">
            <Image
              src={data.imageUrl}
              alt="Thumbnail"
              fill
              objectFit="cover"
              className="rounded-box"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <div>
              <h4 className="text-lg font-semibold">Title</h4>
              <p className="opacity-75 text-sm">{data.title}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Author</h4>
              <p className="opacity-75 text-sm">{data.authorName}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Visibility</h4>
              <p className="opacity-75 text-sm">Public</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Created At</h4>
              <p className="opacity-75 text-sm">
                {new Date(data._creationTime).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="modal-action">
          <button
            onClick={() => modalRef.current?.close()}
            className="btn btn-primary"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default BoardInfoModal;
