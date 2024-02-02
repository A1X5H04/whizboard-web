"use client";

import { ReactNode } from "react";
import {
  LiveList,
  LiveMap,
  LiveObject,
  createClient,
} from "@liveblocks/client";
import { ClientSideSuspense, createRoomContext } from "@liveblocks/react";

import { RoomProvider } from "@/liveblocks.config";
import { Layer } from "@/types/canvas";

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}

function Room({ children, roomId, fallback }: RoomProps) {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        selection: [],
      }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList(),
      }}
    >
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}

export default Room;
