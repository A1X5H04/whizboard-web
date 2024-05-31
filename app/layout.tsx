import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { ToasterProvider } from "@/providers/toaster-provider";
import { Suspense } from "react";
import AuthLoader from "@/components/auth-loader";
import { ThemeProvider } from "next-themes";

const font = Poppins({
  weight: ["900", "800", "700", "600", "500", "400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Whizboard - A Realtime Whiteboard",
  description: "A realtime collaborative whiteboard for teams!",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      url: "/logo.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Suspense fallback={<AuthLoader />}>
          <ConvexClientProvider>
            <ThemeProvider
              storageKey="app-theme"
              themes={[
                "light",
                "dark",
                "cupcake",
                "retro",
                "corporate",
                "business",
                "coffee",
                "night",
              ]}
            >
              <ToasterProvider />

              {children}
            </ThemeProvider>
          </ConvexClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
