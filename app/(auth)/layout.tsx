import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {children}
    </div>
  );
}

export default AuthLayout;
