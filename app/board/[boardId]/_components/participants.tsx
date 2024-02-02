"use client";

import { useOthers, useSelf } from "@/liveblocks.config";
import Image from "next/image";

function Participants() {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 2;

  const displayColors = [
    "#ef476f",
    "#f78c6b",
    "#ffd166",
    "#06d6a0",
    "#118ab2",
    "#073b4c",
  ];

  const connectionIdtoColor = (connectionId: number) => {
    return displayColors[connectionId % displayColors.length];
  };

  return (
    <div className="avatar-group -space-x-5 rtl:space-x-reverse">
      {users.map(({ connectionId, info }) => (
        <div key={connectionId} className="avatar">
          {info?.picture ? (
            <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <Image src={info.picture} alt={info.name || "Teammate"} fill />
            </div>
          ) : (
            <div className="w-8 h-8 bg-neutral text-neutral-content">
              <p>T</p>
            </div>
          )}
        </div>
      ))}
      {currentUser.info?.picture && (
        <div className="avatar">
          <div className="w-8 ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image
              className="ring ring-primary ring-offset-base-100 ring-offset-2"
              src={currentUser.info.picture}
              alt={currentUser.info?.name || "You"}
              fill
            />
          </div>
        </div>
      )}
      {hasMoreUsers && (
        <div className="avatar placeholder">
          <div className="w-8 bg-neutral text-neutral-content">
            <span>+{users.length - 2}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Participants;
