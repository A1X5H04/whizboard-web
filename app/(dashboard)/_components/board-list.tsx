"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import EmptyStateBoard from "./emptystates/board";
import EmptyStateFavourite from "./emptystates/favourite";
import EmptyStateSearch from "./emptystates/search";
import BoardCard from "./board-card";
import NewBoardCard from "./new-board-card";
import Loading from "./emptystates/loading";
import { usePathname } from "next/navigation";

interface BoardListProps {
  organizationId: string;
  query: {
    search?: string;
  };
}

function BoardList({ organizationId, query }: BoardListProps) {
  const pathname = usePathname();
  const data = useQuery(api.boards.get, {
    search: query?.search,
    favourite: pathname === "/favourites" ? "true" : "false",
    orgId: organizationId,
  });

  const showNewBoardCard =
    !query.search && (pathname === "/" || pathname === "/teams");

  if (data === undefined) {
    return <Loading />;
  }

  if (!data?.length && query?.search) {
    return <EmptyStateSearch />;
  } else if (pathname === "/favourites" && !data?.length) {
    return <EmptyStateFavourite />;
  } else if (!data?.length) {
    return <EmptyStateBoard />;
  } else {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
        {showNewBoardCard && <NewBoardCard organizationId={organizationId} />}
        {data.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            authorId={board.authorId}
            authorName={board.authorName}
            imageUrl={board.imageUrl}
            createdAt={board._creationTime}
            organizationId={board.orgId}
            isFavourite={board.isFavourite}
          />
        ))}
      </div>
    );
  }
}

export default BoardList;
