import { LOGOUT } from "@/requetes/queries/auth.queries";
import { LogoutQuery, LogoutQueryVariables } from "@/types/graphql";
import { useQuery } from "@apollo/client";
import React from "react";
import { useRouter } from "next/router";

function Logout() {

  const router = useRouter();

  const { loading } = useQuery<LogoutQuery, LogoutQueryVariables>(LOGOUT, {
    onCompleted: () => {
      router.push("/auth/login");
    },
    onError(error) {
    console.log(error.message);
    }
  });

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      {loading ? "Please wait..." : "You are disconnected !"}
    </main>
  );
}

export default Logout;