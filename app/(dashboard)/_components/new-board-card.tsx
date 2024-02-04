"use client";
import { api } from "@/convex/_generated/api";
import { Plus } from "@phosphor-icons/react";
import React from "react";
import { useMutation } from "convex/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface NewBoardCardProps {
  organizationId: string;
}

function NewBoardCard({ organizationId }: NewBoardCardProps) {
  const create = useMutation(api.board.create);
  const router = useRouter();
  const createBoard = () => {
    create({
      orgId: organizationId,
      title: "Untitled Board",
    })
      .then((result) => {
        router.push(`/board/${result}`);
        toast.success("Board created!");
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="group aspect-[100/127] grid place-items-center border-2 border-dashed border-primary rounded-xl bg-neutral hover:border-opacity-75">
      <button onClick={createBoard} className="cursor-pointer w-full h-full">
        <div className="inline-flex items-center justify-center flex-col gap-y-4">
          <Plus size={40} className="text-primary" />
          <h1 className="text-neutral-content font-semibold">New Board</h1>
        </div>
      </button>
    </div>
  );
}

export default NewBoardCard;
