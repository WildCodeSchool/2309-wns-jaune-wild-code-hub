import SidebarLayout from "@/components/SidebarLayout";
import { Flex } from "@chakra-ui/react";

import React from "react";

const Workspace = () => {
  return (
    <SidebarLayout>
      <Flex justify={"space-between"} width={"100%"} pr={"2rem"}>
        <h1>Welcome to your Workspace</h1>
        <h1>TEST</h1>
      </Flex>
    </SidebarLayout>
  );
};

export default Workspace;
