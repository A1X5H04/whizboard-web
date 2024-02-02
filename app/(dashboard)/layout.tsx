import React from "react";
import Sidebar from "./_components/sidebar";
import OrganizationSidebar from "./_components/org-sidebar";
import Navbar from "./_components/navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="h-full">
      <Sidebar />
      <div className="pl-[70px] h-full">
        <div className="flex gap-x-3 h-full">
          <OrganizationSidebar />
          <div className="h-full flex-1">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}

export default DashboardLayout;
