import StreamVideoApp from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Vroom",
  description: "Vroom is a video conferencing app built with Stream and Clerk.",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoApp>{children}</StreamVideoApp>
    </main>
  );
};

export default RootLayout;
