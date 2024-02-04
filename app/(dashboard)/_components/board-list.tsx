"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import EmptyStateBoard from "./emptystates/board";
import EmptyStateFavourite from "./emptystates/favourite";
import EmptyStateSearch from "./emptystates/search";
import BoardCard from "./board-card";
import NewBoardCard from "./new-board-card";
import Loading from "./emptystates/loading";
import RenameModal from "./rename-modal";

interface BoardListProps {
  organizationId: string;
  query: {
    search?: string;
    favourite?: string;
  };
}

function BoardList({ organizationId, query }: any) {
  const data = useQuery(api.boards.get, {
    ...query,
    orgId: organizationId,
  });

  if (data === undefined) {
    return <Loading />;
  }

  if (!data?.length && query?.search) {
    return <EmptyStateSearch />;
  } else if (!data?.length && query?.favourite) {
    return <EmptyStateFavourite />;
  } else if (!data?.length) {
    return <EmptyStateBoard />;
  } else {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
        {!query.search && !query.favourite && (
          <NewBoardCard organizationId={organizationId} />
        )}
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
