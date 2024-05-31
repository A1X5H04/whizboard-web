"use client";

import { connectionIdtoColor } from "@/libs/utils";
import { useOthers, useSelf } from "@/liveblocks.config";
import Image from "next/image";

function Participants() {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 2;

  return (
    <div className="avatar-group -space-x-5 rtl:space-x-reverse">
      {users.map(({ connectionId, info }) => (
        <div
          key={connectionId}
          className="grid place-items-center rounded-full border-2"
          style={{
            borderColor: connectionIdtoColor(connectionId),
          }}
        >
          <div className="avatar">
            {info?.picture ? (
              <div className="w-8 rounded-full ring ring-primary ring-offset-transparent ring-offset-2">
                <Image src={info.picture} alt={info.name || "Teammate"} fill />
              </div>
            ) : (
              <div className="w-8 h-8 bg-neutral text-neutral-content">
                <p>T</p>
              </div>
            )}
          </div>
        </div>
      ))}
      {currentUser.info?.picture && (
        <div
          className="grid place-items-center rounded-full border-2"
          style={{
            borderColor: connectionIdtoColor(currentUser.connectionId),
          }}
        >
          <div className="avatar">
            <div className="w-8 bg-primary text-primary-content">
              <Image
                src={currentUser.info.picture}
                alt={currentUser.info?.name || "You"}
                fill
              />
            </div>
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
