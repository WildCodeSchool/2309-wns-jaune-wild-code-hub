import HomeCard from "@/components/HomeCard";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import router from "next/router";
import { useState } from "react";

const cardsInfos = [
  {
    title: "Faster than local",
    imageSrc: "bunnyIcon.svg",
    text: "Our platform is designed to make coding faster and more efficient than ever before. Say goodbye to sluggish local setups and hello to instant coding gratification. Start coding faster, smarter, and more seamlessly with us today!",
  },
  {
    title: "Works on all machine",
    imageSrc: "ordi.svg",
    text: "Experience seamless coding on any device our platform works flawlessly across all machines, providing you with the flexibility to code anytime, anywhere. Say goodbye to compatibility issues and hello to effortless coding, no matter what device you're using",
  },
  {
    title: "Collaborative 24/7",
    imageSrc: "groupe.svg",
    text: "Our platform empowers developers to work together in real-time, around the clock, from anywhere in the world. Whether you're coding solo or collaborating with a global team, our intuitive interface and robust features ensure a smooth and efficient coding experience, 24 hours a day, 7 days a week. ",
  },
  {
    title: "Reliable and secure",
    imageSrc: "securite.svg",
    text: "Welcome to our online code editor, where reliability and security are our top priorities. With robust features and stringent security measures in place, you can code with confidence, knowing that your work is protected and your experience is seamless. Join us today and experience coding like never before",
  },
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Flex
      width={"100%"}
      direction={"column"}
      bgImage="url(/loop.svg)"
      bgRepeat={"no-repeat"}
      bgColor={"black"}
      bgSize={"100%"}
    >
      <Flex
        direction="column"
        alignItems="center"
        justify={"center"}
        style={{ height: "100vh", width: "100%" }}
        gap={"4rem"}
      >
        <Heading variant="homepage" textAlign="center" color="white" fontSize={{ base: "36px"}}>
          Create, collaborate, make an impact
        </Heading>
        <Text
          color={"white"}
          fontSize={{ base: "16px", md: "26px" }}
          fontFamily={"Source Sans 3, sans-serif"}
          textAlign={"center"}
          width={{ base: "90%", md: "55%" }}
        >
          Unlock your coding potential with our seamless online code editor.{" "}
          <br />
          Join now to embark on a journey of limitless possibilities in the
          world of coding!
        </Text>
        <Stack direction={{ base: "column", md: "row" }} marginTop={"4rem"} gap={"2rem"}>
          <Button variant={"outline"}>See projects</Button>
          <Button variant={"secondary"}>Start for free</Button>
        </Stack>
      </Flex>

      <Flex
        direction="column"
        alignItems="center"
        justify={"center"}
        style={{ height: "60vh", width: "100%" }}
        gap={"1rem"}
      >
        <Heading variant={"homepage"} textAlign={"center"} color="white" fontSize={{ base: "36px"}}>
          Discover our online Code Editor
        </Heading>
        <Text
          color={"white"}
          fontSize={{ base: "16px", md: "26px" }}
          fontFamily={"source"}
          textAlign={"center"}
          width={{ base: "90%", md: "55%" }}
        >
          Unleash your coding potential with our intuitive online code editor.{" "}
          <br />
          faster than local setups and compatible with all machines. Collaborate seamlessly 
          in a reliable and secure environment
        </Text>
        <Button variant="secondary">Discover</Button>
      </Flex>
      <Flex
        direction={"column"}
        bgImage={"url(loop2.svg)"}
        bgPos={"bottom"}
        bgRepeat={"no-repeat"}
        bgSize={"100%"}
      >
        <Flex
          w={"100%"}
          minHeight={"100vh"}
          p={"2rem"}
          justify={"space-around"}
          flexWrap={"wrap"}
        >
          {cardsInfos.map((cardInfos, index) => (
            <HomeCard
              key={`Card-Info-${index}`}
              title={cardInfos.title}
              iconSrc={cardInfos.imageSrc}
              h="35rem"
              w={{ base: "100%", md: "20rem" }}
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
          direction={{ base: "column", md: "row" }}
          alignItems="center"
          justify={"center"}
          style={{ height: "100vh", width: "100%" }}
          gap={"1rem"}
          pl={"2rem"}
          py={"6rem"}
        >
          <Flex
            w={{ base: "100%", md: "50%" }}
            p={"2rem"}
            direction={"column"}
            justifyContent={"space-between"}
          >
            <Box>
              <Heading variant={"homepage"} textAlign={"left"} color="white" fontSize={{ base: "36px"}}>
                Accelerate your git workflow
              </Heading>
              <Text color={"white"}  fontSize={{ base: "16px", md: "26px" }} py={"3rem"} >
              Join a vibrant community with a rich history of over 9 weeks and discover how our tools can transform your coding journey. 
              Embrace a world where limitless possibilities await, with real-time collaboration 
              and an intuitive interface that adapts to your needs.
              </Text>
            </Box>
            <Button 
              variant={"secondary"} 
              w={"fit-content"} 
              px={"3rem"}
              onClick={() => {
                  setIsOpen(false);
                  router.push("/auth/register");
                }}
            >
              Join us
            </Button>
          </Flex>
          <Flex
            w={{ base: "100%", md: "50%" }}
            h={{ base: "auto", md: "60%" }}
          >
            <video
              width="100%"
              height="100%"
              autoPlay
              loop
              muted
              style={{
                borderRadius: '20px',
                objectFit: 'cover',
                filter: 'brightness(0.7)',
              }}
            >
              <source src="/codingVideo.mp4" type="video/mp4" />
            </video>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
