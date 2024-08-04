import { ChevronRightIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  LinkBox,
  LinkOverlay,
  SlideFade,
  useBreakpointValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

import { usePathname } from "next/navigation";
import MeSidebar from "./MeSidebarContent";

import EditorSidebarContent from "./EditorSidebarContent";
import ProfileSidebarContent from "./ProfileSidebarContent";

import AdminSidebar from "./AdminSidebarContent";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ isOpen, setIsOpen }: Props) => {
  const pathname = usePathname();

  const isDesktop = useBreakpointValue({ base: false, md: true });
  
  return (
    <>
    {
      isDesktop &&
      <Flex
        id="sidebar"
        transition="all .5s ease"
        style={{
          backgroundColor: "background",
          left: isOpen ? 0 : "-14rem",
          top: 0,
          height: "100vh",
          paddingTop: "4.5rem",
          position: "fixed",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "start",
          paddingBottom: "3rem",
          fontSize: "1.25rem",
          width: "16rem",
        }}
      >
        <IconButton
          isRound
          aria-label="toggle sidebar"
          icon={<ChevronRightIcon />}
          transition="all .5s ease"
          _hover={{
            filter: "auto",
            brightness: "150%",
          }}
          style={{
            position: "relative",
            rotate: isOpen ? "180deg" : "0deg",
            left: "16rem",
            translate: "-50% 10%",
            backgroundColor: "gray",
            opacity: 0.7,
            fontSize: 24,
          }}
          onClick={() => setIsOpen(!isOpen)}
        />
        <SlideFade
          in={isOpen}
          offsetX="-16rem"
          transition={{
            exit: { delay: 0.1, duration: 0.5 },
            enter: { duration: 0.5 },
          }}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            height={"100%"}
          >
            {pathname?.startsWith("/me") && <MeSidebar />}
            {pathname?.startsWith("/editor") && <EditorSidebarContent />}
            {pathname?.startsWith("/user") && <ProfileSidebarContent />}
            {pathname?.startsWith("/admin") &&  <AdminSidebar />}
            <LinkBox
              width="fit-content"
              _hover={{
                textDecoration: "none",
                color: "accent",
                appearance: "none",
                cursor: "pointer",
              }}
            >
              <Box id="settings" width={"fit-content"} pl={6} fontSize={28}>
                <SettingsIcon marginRight={4} />
                <LinkOverlay
                  as={NextLink}
                  href="/me/settings"
                  display={"inline-flex"}
                  verticalAlign={"text-top"}
                >
                  Settings
                </LinkOverlay>
              </Box>
            </LinkBox>
          </Flex>
        </SlideFade>
      </Flex>
    }
    </>
)};

export default Sidebar;
