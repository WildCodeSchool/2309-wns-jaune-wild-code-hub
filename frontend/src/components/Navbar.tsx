import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import Searchbar from "./Searchbar";
import { useParams, usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  return (
    <Flex
      justify={"space-between"}
      position={"fixed"}
      w={"100%"}
      p={"1rem"}
      bgColor={"background"}
      zIndex={2}
      alignItems={"center"}
    >
      <Button variant={"link"} onClick={() => router.push("/")}>
        {"< Wild Code Hub />"}
      </Button>
      <Searchbar />
      <Box gap={"2rem"}>
        {pathname != "/auth/login" && (
          <Button variant="ghost" onClick={() => router.push("/auth/login")}>
            Log in
          </Button>
        )}
        {pathname != "/auth/register" && (
          <Button
            variant="primary"
            onClick={() => router.push("/auth/register")}
          >
            Sign In
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
