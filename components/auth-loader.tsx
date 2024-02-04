import React from "react";

function AuthLoader() {
  return (
    <div className="grid place-items-center h-full">
      <div className="text-center flex flex-col items-center justify-center">
        <span className="loading loading-dots loading-md"></span>
      </div>
    </div>
  );
}

export default AuthLoader;
