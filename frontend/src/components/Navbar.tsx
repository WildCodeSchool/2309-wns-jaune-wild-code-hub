import { Box, Button, Flex, Icon, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import Searchbar from "./Searchbar";
import { useParams, usePathname, useRouter } from "next/navigation";
import BurgerMenu from "./BurgerMenu";

const Navbar = () => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  console.log("pathname", pathname);
  console.log("params", params);
  const isDesktop = useBreakpointValue({ base: false, md: true });


  return (
    <>
      {isDesktop ? (
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
    ): (
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
        <BurgerMenu />
      </Flex>
    )}
  </>
  );
};

export default Navbar;
