"use client";

import { useOrganization } from "@clerk/nextjs";
import EmptyStateOrg from "./_components/emptystates/organization";
import BoardList from "./_components/board-list";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favourite?: string;
  };
}

function DashboardPage({ searchParams }: DashboardPageProps) {
  const { organization } = useOrganization();
  return (
    <div className="h-[calc(100%-130px)] flex-1 px-7">
      {!organization ? (
        <EmptyStateOrg />
      ) : (
        <div className="h-full ">
          <h1 className="text-2xl mt-4 font-semibold">
            {searchParams.favourite ? "Favourite Boards" : "Team Boards"}
          </h1>
          <BoardList organizationId={organization.id} query={searchParams} />
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
