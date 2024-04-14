"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {
  AuthLoading,
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import AuthLoader from "@/components/auth-loader";
import { usePathname } from "next/navigation";
import Image from "next/image";
import NotAuthenticated from "@/components/not-authenticated";
import { Fragment } from "react";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => {
  const pathname = usePathname();

  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {pathname === "/sign-in" || pathname === "/sign-up" ? (
          <Fragment>{children}</Fragment>
        ) : (
          <Fragment>
            <Authenticated>{children}</Authenticated>
            <Unauthenticated>
              <NotAuthenticated />
            </Unauthenticated>
          </Fragment>
        )}
        <AuthLoading>
          <AuthLoader />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
