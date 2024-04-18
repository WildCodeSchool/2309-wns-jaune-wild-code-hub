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
    <Flex
      direction={"column"}
      bgImage="url(/loop.svg)"
      bgRepeat={"no-repeat"}
      bgColor={"background"}
    >
      <Flex
        direction="column"
        alignItems="center"
        justify={"center"}
        style={{ height: "100vh", width: "100%" }}
        gap={"2rem"}
      >
        <Heading variant="homepage" textAlign="center">
          Create, collaborate, make an impact TOTO v2 
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
        style={{ height: "60vh", width: "100%" }}
        gap={"2rem"}
      >
        <Heading variant={"homepage"} textAlign={"center"}>
          Discover our online Code Editor
        </Heading>
        <Text
          color={"text"}
          fontSize={"26"}
          fontFamily={"source"}
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
        direction={"column"}
        bgImage={"url(loop2.svg)"}
        bgPos={"bottom"}
        bgRepeat={"no-repeat"}
      >
        <Flex
          w={"100%"}
          gap={"2rem"}
          minHeight={"100vh"}
          p={"2rem"}
          flexWrap={"nowrap"}
        >
          {cardsInfos.map((cardInfos, index) => (
            <HomeCard
              key={`Card-Info-${index}`}
              title={cardInfos.title}
              iconSrc={cardInfos.imageSrc}
              h="30rem"
              w={"20rem"}
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
        <Flex
          direction="row"
          alignItems="center"
          justify={"center"}
          style={{ height: "100vh", width: "100%" }}
          gap={"1rem"}
          pl={"2rem"}
          py={"6rem"}
        >
          <Flex
            w={"50%"}
            p={"2rem"}
            h={"100%"}
            direction={"column"}
            justifyContent={"space-between"}
          >
            <Box>
              <Heading variant={"homepage"} textAlign={"left"}>
                Accelarate your git worflow
              </Heading>
              <Text color={"textSecondary"} fontSize={"26px"} py={"3rem"}>
                Our comminuty has more than 9 weeks of history, so we will need
                to change this, but you can still join us
              </Text>
            </Box>
            <Button variant={"secondary"} w={"fit-content"} px={"3rem"}>
              Join us
            </Button>
          </Flex>
          <Flex
            w={"50%"}
            h={"100%"}
            py={"5rem"}
            backgroundColor={"grey"}
            justify={"center"}
            align={"center"}
            color="text"
            fontSize="46px"
            fontWeight={"bold"}
          >
            SOME VIDEO MATRIX STYLE
          </Flex>
        </Flex>

        <Flex bg={"background2"} w={"100%"} h={"10rem"}></Flex>
      </Flex>
    </Flex>
  );
}
