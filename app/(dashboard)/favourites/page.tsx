"use client";

import { useOrganization } from "@clerk/nextjs";
import EmptyStateOrg from "../_components/emptystates/organization";
import BoardList from "../_components/board-list";

interface DashboardPageProps {
  searchParams: {
    search?: string;
  };
}

function DashboardPage({ searchParams }: DashboardPageProps) {
  const { organization } = useOrganization();
  if (!organization) return null;
  return (
    <div className="h-[calc(100%-130px)] flex-1 px-7">
      <div className="h-full ">
        <h1 className="text-3xl mt-4 font-bold">Favourite Boards</h1>
        <BoardList organizationId={organization.id} query={searchParams} />
      </div>
    </div>
  );
}

export default DashboardPage;
