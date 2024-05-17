import { LOGOUT } from "@/requetes/queries/auth.queries";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { IconButton, Spinner, Tooltip } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import React from "react";

const LogoutButton = () => {
  const router = useRouter();
  const [logout, { loading }] = useLazyQuery(LOGOUT, {
    onCompleted: () => {
      router.push("/auth/login");
    },
    onError: (error) => {
      console.error("Logout failed", error);
    },
  });

  return (
    <Tooltip label="Logout" aria-label="Logout Tooltip">
      <IconButton
        icon={<FiLogOut />}
        onClick={() => logout()}
        isLoading={loading}
        aria-label="Logout"
        variant="outline"
        colorScheme="teal"
      />
    </Tooltip>
  );
};

export default LogoutButton;
