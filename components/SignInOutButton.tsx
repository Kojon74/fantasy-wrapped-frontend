"use client";
import React from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

type Props = {};

function SignInOutButton({}: Props) {
  const { data: session } = useSession();

  const isAuthenticated = !!session;

  const onSignInOut = () => {};
  return (
    <Button
      onClick={onSignInOut}
      variant="outline"
      className="text-white border-white hover:bg-white hover:text-purple-600"
    >
      {isAuthenticated ? "Sign Out" : "Sign In"}
    </Button>
  );
}

export default SignInOutButton;
