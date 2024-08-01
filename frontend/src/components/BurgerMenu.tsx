import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  LinkBox,
  LinkOverlay,
  SlideFade,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, SettingsIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import Searchbar from "./Searchbar";
import { usePathname, useRouter } from "next/navigation";
import MeSidebar from "./Sidebar/MeSidebarContent";
import { Project } from "@/types/graphql";
import Cookies from "js-cookie";

const BurgerMenu = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState<Omit<Project, "files">[]>([]);
  const [user, setUser] = useState<string | undefined>(undefined);

  const pathname = usePathname();
  const router = useRouter();
  const pseudo = Cookies.get("pseudo");

  const handleSearchResults = (results: Project[]) => {
    setProjects(results);
  }; 

  useEffect(() => {
    setUser(pseudo);
  }, [pseudo]);

  return (
    <Box position="fixed" top="1rem" right="1rem" zIndex="1000">
      <IconButton
        aria-label="Open menu"
        icon={<HamburgerIcon />}
        size="2xl"
        fontSize="22px"
        onClick={() => setIsOpen(!isOpen)}
      />
      <Flex
        direction="column"
        position="fixed"
        top="0"
        right="0"
        width="100%"
        height="100vh"
        backgroundColor="background"
        transform={isOpen ? "translateX(0)" : "translateX(100%)"}
        transition="transform 0.3s ease-in-out"
        paddingTop="5rem"
        padding="4rem"        
        justifyContent="space-between"
        alignItems="center"
        fontSize="1.25rem"
      >
        <IconButton
          aria-label="Toggle sidebar"
          icon={<CloseIcon />}          
          onClick={() => setIsOpen(!isOpen)}
          position="absolute"
          top="1rem"
          right="1rem"         
          opacity={0.7}
          fontSize="20px"
          transform={isOpen ? "rotate(180deg)" : "rotate(0)"}
          transition="transform 0.3s ease-in-out"
        />

        <SlideFade in={isOpen} offsetX="100vw">
          <Box>    
          {
            !user ?
            <>
              <Button
                variant="ghost"
                w="50%"
                mt="1rem"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/auth/login");
                }}
              >
                Log in
              </Button>
              <Button
                variant="primary"
                w="50%"
                mt="1rem"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/auth/register");
                }}
              >
                Sign Up
              </Button>
            </>
          :
          <Flex justifyContent="center">
              <Button onClick={() => router.push("/auth/logout")}>
                Log out
              </Button>
          </Flex>
          }               

            <Flex 
              w={"260%"}
             paddingTop="4rem"
            >
              <Searchbar onResults={handleSearchResults} />
            </Flex> 
            
            <Box mr={20} mt={10}>
             <MeSidebar />
            </Box>

          </Box>
        </SlideFade>
     

        <SlideFade in={isOpen} offsetX="16rem">
          <LinkBox
            _hover={{
              textDecoration: "none",
              color: "accent",
              appearance: "none",
            }}
          >
            <Box id="settings" fontSize={28}>
              <SettingsIcon marginRight={4} />
              <LinkOverlay
                as={NextLink}
                href="/me/settings"
                display={"inline-flex"}
                verticalAlign={"text-top"}
                paddingRight="120"
              >
                Settings
              </LinkOverlay>
            </Box>
          </LinkBox>
        </SlideFade>
      </Flex>
    </Box>
  );
};

export default BurgerMenu;
