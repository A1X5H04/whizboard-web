import React from "react";

function Loading() {
  return (
    <div className="grid place-items-center h-full">
      <div className="text-center flex flex-col items-center justify-center">
        <span className="loading loading-dots loading-md" />
        <p>Loading Boards</p>
      </div>
    </div>
  );
}

export default Loading;
