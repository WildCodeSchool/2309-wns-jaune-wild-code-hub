import { Box, Button, Flex, Wrap } from "@chakra-ui/react";
import React from "react";
import Searchbar from "./Searchbar";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <Flex justify={"space-between"} position={"fixed"} w={"100%"} zIndex={2}>
      <Box>{"< Wild Code Hub />"}</Box>
      <Searchbar />
      <Box gap={"2rem"}>
        <Button variant="ghost" onClick={() => router.push("/auth/login")}>
          Log in
        </Button>
        <Button variant="primary" onClick={() => router.push("/auth/register")}>
          Sign In
        </Button>
      </Box>
    </Flex>
  );
};

export default Navbar;
