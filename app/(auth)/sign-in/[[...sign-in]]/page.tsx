import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return (
    <main className="flex h-screen w-screen flex-center">
      <SignIn />
    </main>
  );
};

export default SignInPage;
