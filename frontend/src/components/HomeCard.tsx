import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Icon,
  Text,
  Image,
  CardProps,
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
    <Card bg={"background2"} borderRadius={"100"} {...props}>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "100px",
          right: "5%",
          border: "1px solid white",
        }}
      ></div>
      <CardBody display="flex" flexDirection={"column"} alignItems={"center"}>
        <Image src={iconSrc} alt="bunny" py={"2.5rem"}></Image>
        <Heading
          mb={"1rem"}
          color={"text"}
          fontSize={"33px"}
          fontFamily={"source"}
        >
          {title}
        </Heading>
        <Text
          color={"textSecondary"}
          textAlign={"center"}
          px={"2rem"}
          fontFamily={"source"}
        >
          {children}
        </Text>
      </CardBody>
    </Card>
  );
};

export default HomeCard;
