import React from "react";
import NewOrgButton from "./neworg-btn";
import OrganizationList from "./org-list";

function Sidebar() {
  return (
    <aside className="fixed z-[1] left-0 bg-slate-700 h-full w-[70px] flex flex-col gap-y-6 pt-8 px-4">
      <OrganizationList />
      <NewOrgButton />
    </aside>
  );
}

export default Sidebar;
