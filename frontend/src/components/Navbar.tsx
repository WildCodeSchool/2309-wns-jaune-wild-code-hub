"use client";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { Project } from "@/types/graphql";
import Searchbar from "./Searchbar";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import BurgerMenu from "./BurgerMenu";

const Navbar = () => {
  const [projects, setProjects] = useState<Omit<Project, "files">[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const [pseudo, setPseudo] = useState<string | undefined>(undefined);
  const [role, setRole] = useState<string | undefined>(undefined);
  const getPseudo = Cookies.get("pseudo");
  const getRole = Cookies.get("role");

  useEffect(() => {
    setPseudo(getPseudo);
  }, [getPseudo]);

  useEffect(() => {
    setRole(getRole);
  }, [getRole]);

  const isDesktop = useBreakpointValue({ base: false, md: true });

  const handleSearchResults = (results: Project[]) => {
    setProjects(results);
  };

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
          <Searchbar onResults={handleSearchResults} />
          {pseudo ? (
            <Box display="flex" gap={"1rem"}>
              {
                role === "ADMIN" &&
                <Button variant="secondary" onClick={() => router.push("/admin")}>
                  Administration
                </Button>
              }
              <IconButton
                aria-label="Go to profile page"
                onClick={() => router.push("/me")}
                icon={<Avatar name={pseudo} />}
              />
              <Button onClick={() => router.push("/auth/logout")}>
                Log out
              </Button>
            </Box>
          ) : (
            <Box gap={"2rem"}>
              {pathname != "/auth/login" && (
                <Button
                  variant="ghost"
                  onClick={() => router.push("/auth/login")}
                >
                  Log in
                </Button>
              )}
              {pathname != "/auth/register" && (
                <Button
                  variant="primary"
                  onClick={() => router.push("/auth/register")}
                >
                  Sign Up
                </Button>
              )}
            </Box>
          )}
        </Flex>
      ) : (
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
