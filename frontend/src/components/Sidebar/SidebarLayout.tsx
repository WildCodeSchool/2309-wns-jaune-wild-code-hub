import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { PropsWithChildren, useState } from "react";
import Sidebar from "./Sidebar";

const SidebarLayout = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(true);

  const isDesktop = useBreakpointValue({ base: false, md: true });
  
  return (
    <Flex
      width={"100%"}
      bgColor={"background"}
      bgSize={"100%"}
      paddingTop={"4.5rem"}
      paddingLeft={isDesktop ? isOpen ? "16rem" : "3rem" : ""}
      transition="all .5s ease"
      minHeight={"100vh"}
    >
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      {children}
    </Flex>
  );
};

export default SidebarLayout;
