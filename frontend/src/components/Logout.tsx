import { Flex, IconButton, Input, Box, Button } from "@chakra-ui/react";
import React from "react";
import Logout from "@/pages/auth/logout";

const handleLogout = async () => {
  try {
    await logout();
    // je dois ajouter la logique de déconnexion ici, par exemple, rediriger l'utilisateur
    window.location.reload();
  } catch (err) {
    console.error("Logout failed", err);
  }

  return (
    <Tooltip label="Logout" aria-label="Logout Tooltip">
      <IconButton
        icon={<FiLogOut />}
        onClick={handleLogout}
        isLoading={logoutLoading}
        aria-label="Logout"
        variant="outline"
        colorScheme="teal"
      />
    </Tooltip>
  );
};

export default handleLogout;
