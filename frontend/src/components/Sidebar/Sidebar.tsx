import { ChevronRightIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  LinkBox,
  LinkOverlay,
  SlideFade,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

import MeSidebar from "./MeSidebarContent";
import { usePathname } from "next/navigation";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ isOpen, setIsOpen }: Props) => {
  const pathname = usePathname();

  return (
    <Flex
      id="sidebar"
      transition="all .5s ease"
      style={{
        backgroundColor: "background",
        left: isOpen ? 0 : "-13rem",
        top: 0,
        height: "100vh",
        paddingTop: "4.5rem",
        position: "fixed",
        paddingLeft: "2rem",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "start",
        paddingBottom: "3rem",
        fontSize: "1.25rem",
        width: "16rem",
      }}
    >
      <IconButton
        aria-label="toggle sidebar"
        icon={<ChevronRightIcon />}
        transition="all .5s ease"
        _hover={{
          filter: "auto",
          brightness: "150%",
        }}
        style={{
          position: "absolute",
          rotate: isOpen ? "180deg" : "0deg",
          right: 0,
          translate: "50% 25%",
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
      >
        {pathname?.startsWith("/me") && <MeSidebar />}
      </SlideFade>
      <SlideFade in={isOpen} offsetX="-16rem">
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
            >
              Settings
            </LinkOverlay>
          </Box>
        </LinkBox>
      </SlideFade>
    </Flex>
  );
};

export default Sidebar;
