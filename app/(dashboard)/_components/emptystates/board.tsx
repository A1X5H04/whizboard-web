"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useOrganization } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { title } from "process";
import toast from "react-hot-toast";

function EmptyStateBoard() {
  const router = useRouter();
  const { organization } = useOrganization();
  const { mutate, loading } = useApiMutation(api.board.create);

  const createBoard = () => {
    if (!organization) return;
    mutate({
      orgId: organization.id,
      title: "Untitled Board",
    })
      .then((result) => {
        router.push(`/board/${result}`);
        toast.success("Board created!");
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="grid place-items-center h-full">
      <div className="text-center flex flex-col items-center justify-center">
        <Image
          src="/emptyboard.svg"
          alt="Empty"
          width={175}
          height={175}
          className="mb-9"
        />
        <h2 className="text-2xl font-bold ">Create your first Board!</h2>
        <p className="text-sm text-gray-500">
          Start by creating a board for your organization
        </p>
        <button onClick={createBoard} className="btn btn-primary mt-6">
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <p>Create Board</p>
          )}
        </button>
      </div>
    </div>
  );
}

export default EmptyStateBoard;
