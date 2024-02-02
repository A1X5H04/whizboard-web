"use client";

import { useOrganizationList } from "@clerk/nextjs";

import React from "react";
import OrganizationItem from "./org-item";

function OrganizationList() {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!userMemberships?.data?.length) return null;

  return (
    <ul className="space-y-5">
      {userMemberships.data.map((membership) => (
        <OrganizationItem
          key={membership.organization.id}
          id={membership.organization.id}
          name={membership.organization.name}
          imageUrl={membership.organization.imageUrl}
        />
      ))}
    </ul>
  );
}

export default OrganizationList;
