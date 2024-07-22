import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const ProfilePageContainer = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      width={"100%"}
      direction={"column"}
      padding={"3rem 5rem 3rem 5rem"}
      style={{ containerName: "profile-page" }}
    >
      {children}
    </Flex>
  );
};
