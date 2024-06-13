import { Button } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "@apollo/client";
import { LOGOUT } from "@/requetes/queries/auth.queries";
import { LogoutQuery, LogoutQueryVariables } from "@/types/graphql";
// import { useRouter } from "next/router";
import Logout from "@/pages/auth/logout";
import Link from "next/link";

function LogoutButton() {
  // const router = useRouter();

  // const handleLogout = async () => {
  //   router.push("/auth/logout");
  // };

  return (
    <Link href="/auth/logout">
      <Button variant="outline" colorScheme="teal">
        Logout
      </Button>
    </Link>
  );
}

export default LogoutButton;
