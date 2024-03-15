import {
  Card,
  CardBody,
  Heading,
  Text,
  Image,
  CardProps,
  Box,
} from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
interface HomeCardProps extends CardProps {
  title: string;
  iconSrc: string;
}
const HomeCard = ({
  title,
  iconSrc,
  children,
  ...props
}: HomeCardProps & PropsWithChildren) => {
  return (
    <Card bg={"transparent"} {...props}>
      <Box
        borderRadius={100}
        w={"100%"}
        h="100%"
        position={"absolute"}
        bg={"#202020"}
        opacity={"80%"}
        left={"5%"}
        bottom={"2%"}
      ></Box>
      <CardBody
        border="1px solid white"
        display="flex"
        flexDirection={"column"}
        alignItems={"center"}
        bg={"transparent"}
        zIndex={1}
        borderRadius={"100"}
        h={"100%"}
      >
        <Image src={iconSrc} alt="bunny" py={"2.5rem"}></Image>
        <Heading
          mb={"1rem"}
          color={"text"}
          fontSize={"26px"}
          fontFamily={"source"}
        >
          {title}
        </Heading>
        <Text
          color={"textSecondary"}
          textAlign={"center"}
          px={"1.5rem"}
          fontFamily={"source"}
        >
          {children}
        </Text>
      </CardBody>
    </Card>
  );
};

export default HomeCard;
