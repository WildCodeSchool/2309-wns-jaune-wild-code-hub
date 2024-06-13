import { Flex } from "@chakra-ui/react";
import React, { PropsWithChildren, useState } from "react";
import Sidebar from "./Sidebar";

const SidebarLayout = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Flex
      width={"100%"}
      bgColor={"background"}
      bgSize={"100%"}
      paddingTop={"4.5rem"}
      paddingLeft={"16rem"}
      minHeight={"100vh"}
    >
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      {children}
    </Flex>
  );
};

export default SidebarLayout;
