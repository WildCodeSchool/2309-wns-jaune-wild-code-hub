import { Button } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "@apollo/client";
import { LOGOUT } from "@/requetes/queries/auth.queries";
import { LogoutQuery, LogoutQueryVariables } from "@/types/graphql";
import { useRouter } from "next/router";
import Logout from "@/pages/auth/logout";

function LogoutButton() {
  const router = useRouter();

  const { loading } = useQuery<LogoutQuery, LogoutQueryVariables>(LOGOUT, {
    onCompleted: () => {
      router.push("/auth/login");
    },
  });

  const handleLogout = async () => {
    try {
      await Logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <Button variant="outline" colorScheme="teal" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
