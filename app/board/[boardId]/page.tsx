import React from "react";
import Room from "@/components/room";
import Canvas from "./_components/canvas";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

function BoardIdPage({ params }: BoardIdPageProps) {
  return (
    <Room
      roomId={params.boardId}
      fallback={
        <div className="w-screen h-screen grid place-items-center">
          <div className="space-y-3 inline-flex flex-col items-center justify-center">
            <span className="loading loading-dots loading-lg text-primary" />
            <p className="text-lg font-semibold">Loading Board</p>
          </div>
        </div>
      }
    >
      <Canvas boardId={params.boardId} />
    </Room>
  );
}

export default BoardIdPage;
