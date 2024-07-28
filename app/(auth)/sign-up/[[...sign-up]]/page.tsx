import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <main className="flex h-screen w-screen flex-center">
      <SignUp />
    </main>
  );
};

export default SignUpPage;
