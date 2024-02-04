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
          <span className="loading loading-dots loading-lg"></span>
        </div>
      }
    >
      <Canvas boardId={params.boardId} />
    </Room>
  );
}

export default BoardIdPage;
