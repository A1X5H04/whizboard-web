"use client";

import Image from "next/image";
import clsx from "clsx";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}
function OrganizationItem({ id, name, imageUrl }: ItemProps) {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return;

    setActive({ organization: id });
  };
  return (
    <div className="aspect-square relative">
      <Image
        fill
        alt={name}
        src={imageUrl}
        onClick={onClick}
        className={clsx(
          "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition ring-offset-2 ring-1 hover:ring-neutral ring-offset-transparent",
          isActive ? "ring-primary" : "ring-transparent",
          isActive ? "opacity-100" : "opacity-75"
        )}
      />
    </div>
  );
}

export default OrganizationItem;
