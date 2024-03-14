import HomeCard from "@/components/HomeCard";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";

const cardsInfos = [
  {
    title: "Faster than local",
    imageSrc: "bunnyIcon.svg",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore in incidunt cupiditate placeat ipsam a facere libero deserunt iste eius. Ipsam dolorum, maxime et error odio nobis eveniet temporibus modi",
  },
  {
    title: "Faster than local",
    imageSrc: "bunnyIcon.svg",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore in incidunt cupiditate placeat ipsam a facere libero deserunt iste eius. Ipsam dolorum, maxime et error odio nobis eveniet temporibus modi",
  },
  {
    title: "Faster than local",
    imageSrc: "bunnyIcon.svg",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore in incidunt cupiditate placeat ipsam a facere libero deserunt iste eius. Ipsam dolorum, maxime et error odio nobis eveniet temporibus modi",
  },
  {
    title: "Faster than local",
    imageSrc: "bunnyIcon.svg",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore in incidunt cupiditate placeat ipsam a facere libero deserunt iste eius. Ipsam dolorum, maxime et error odio nobis eveniet temporibus modi",
  },
];

export default function Home() {
  return (
    <Box bgImage={"url('/loop.svg')"} bgColor={"background"}>
      <Flex
        direction="column"
        alignItems="center"
        justify={"center"}
        style={{ height: "100vh", width: "100%" }}
        gap={"2rem"}
      >
        <Heading
          fontSize={"64"}
          textAlign={"center"}
          fontFamily={"Poppins, sans-serif"}
          fontWeight="700"
          color={"white"}
        >
          Create, collaborate, make an impact
        </Heading>
        <Text
          color={"text"}
          fontSize={"26"}
          fontFamily={"Source Sans 3, sans-serif"}
          textAlign={"center"}
          width={"55%"}
        >
          Unlock your coding potential with our seamless online code editor.{" "}
          <br />
          Join now to embark on a journey of limitless possibilities in the
          world of coding!
        </Text>
        <Stack direction={"row"} marginTop={"4rem"} gap={"2rem"}>
          <Button variant={"outline"}>See projects</Button>
          <Button variant={"secondary"}>Start for free</Button>
        </Stack>
      </Flex>
      <Flex
        direction="column"
        alignItems="center"
        justify={"center"}
        style={{ height: "100vh", width: "100%" }}
        gap={"2rem"}
      >
        <Heading
          fontSize={"64"}
          textAlign={"center"}
          fontFamily={"Poppins, sans-serif"}
          fontWeight="700"
          color={"white"}
        >
          Discover our online Code Editor
        </Heading>
        <Text
          color={"text"}
          fontSize={"26"}
          fontFamily={"Source Sans 3, sans-serif"}
          textAlign={"center"}
          width={"55%"}
        >
          Unlock your coding potential with our seamless online code editor.{" "}
          <br />
          Join now to embark on a journey of limitless possibilities in the
          world of coding!
        </Text>
        <Button variant="secondary">Discover</Button>
      </Flex>
      <Flex
        direction="column"
        alignItems="center"
        justify={"center"}
        style={{ height: "100vh", width: "100%" }}
        gap={"2rem"}
      >
        <Flex w={"100%"} gap={"2rem"} height={"100vh"} p={"2rem"}>
          {cardsInfos.map((cardInfos, index) => (
            <HomeCard
              title={cardInfos.title}
              iconSrc={cardInfos.imageSrc}
              h="66%"
              // alignSelf={index % 2 ? "flex-end" : "flex-start"}
              mt={
                index === 1
                  ? "15%"
                  : index === 2
                  ? "1rem"
                  : index === 3
                  ? "calc(15% + 2rem)"
                  : 0
              }
            >
              {cardInfos.text}
            </HomeCard>
          ))}
        </Flex>
      </Flex>
      <Flex
        direction="row"
        alignItems="center"
        justify={"center"}
        style={{ height: "100vh", width: "100%" }}
        gap={"2rem"}
        px={"2rem"}
        py={"4rem"}
      >
        <Flex w={"50%"} p={"2rem"} h={"100%"}>
          <Heading color={"text"}>Accelarate your git worflow</Heading>
        </Flex>
        <Flex w={"50%"} h={"100%"} py={"5rem"} backgroundColor={"grey"}>
          SOME VIDEO MATRIX STYLE
        </Flex>
      </Flex>
    </Box>
  );
}
