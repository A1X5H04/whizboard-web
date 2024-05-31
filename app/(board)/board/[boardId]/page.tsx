import React from "react";
import Room from "@/components/room";
import Canvas from "@/components/canvas/canvas";
import Image from "next/image";

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
      <div className="w-full h-full">
        <div className="grid place-items-center h-full lg:hidden">
          <div className="text-center flex flex-col items-center justify-center">
            <Image
              src="/desktoponly.svg"
              alt="Empty"
              width={175}
              height={175}
              className="mb-9"
            />

            <h2 className="text-2xl font-bold mb-3">Desktop Only..</h2>
            <p className="text-sm text-gray-500">
              Whizboard is a big-screen experience. <br /> Grab your desktop and
              let&apos;s get brainstorming!
            </p>
          </div>
        </div>
        <div className="hidden lg:block w-full h-full">
          <Canvas boardId={params.boardId} />
        </div>
      </div>
    </Room>
  );
}

export default BoardIdPage;
