import StreamVideoApp from "@/providers/StreamClientProvider";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoApp>{children}</StreamVideoApp>
    </main>
  );
};

export default RootLayout;
