"use client";

import { useAuth } from "@clerk/nextjs";
import { Star } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";
import { formatTimestamp } from "@/libs/format";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import BoardActions from "../_components/board-actions";
import { Id } from "@/convex/_generated/dataModel";
import toast from "react-hot-toast";

interface BoardCardProps {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  createdAt: number;
  imageUrl: string;
  organizationId: string;
  isFavourite: boolean;
}

function BoardCard({
  id,
  title,
  authorId,
  authorName,
  createdAt,
  organizationId,
  imageUrl,
  isFavourite,
}: BoardCardProps) {
  const { userId } = useAuth();
  const favourite = useMutation(api.board.favourite);
  const unfavourite = useMutation(api.board.unfavourite);
  const authorLabel = authorId === userId ? "You" : authorName;

  const toggleFavourite = (
    event: React.MouseEvent<HTMLOrSVGElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();

    if (isFavourite) {
      unfavourite({ id: id as Id<"boards"> }).catch(() =>
        toast.error("Failed to Unfavourite")
      );
    } else {
      favourite({ id: id as Id<"boards">, orgId: organizationId }).catch(() =>
        toast.error("Failed to Favourite")
      );
    }
  };

  return (
    <div>
      <Link href={`/board/${id}`}>
        <div className="group w-full h-80 rounded-box flex flex-col justify-between shadow-xl bg-base-100">
          <div className="relative flex-1 m-1 rounded-box rounded-b-xl overflow-hidden">
            <Image src={imageUrl} alt={title} fill className="object-cover" />
            {/* <div className="opacity-0 group-hover:opacity-75 transition-opacity h-full w-full bg-base-300" /> */}
            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <BoardActions boardId={id} />
            </div>
          </div>
          <div className="px-3 pb-3 pt-1">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold truncate">{title}</h2>
              <Star
                onClick={toggleFavourite}
                weight={isFavourite ? "fill" : "regular"}
                className="fill-secondary hover:opacity-60 transition-opacity cursor-pointer"
                size={20}
              />
            </div>
            <p className="text-sm text-primary">
              {authorLabel}
              <span className="text-xs dark:text-slate-500">
                &nbsp; {formatTimestamp(createdAt)}
              </span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BoardCard;
