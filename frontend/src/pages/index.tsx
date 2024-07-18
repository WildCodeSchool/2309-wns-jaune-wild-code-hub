import HomeCard from "@/components/HomeCard";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/VideoPlayer";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";

const cardsInfos = [
  {
    title: "Faster than local",
    imageSrc: "bunnyIcon.svg",
    text: "Our platform is designed to make coding faster and more efficient than ever before. Say goodbye to sluggish local setups and hello to instant coding gratification. Start coding faster, smarter, and more seamlessly with us today!",
  },
  {
    title: "Works on all machine",
    imageSrc: "monitor-smartphone.svg",
    text: "Lexperience seamless coding on any device our platform works flawlessly across all machines, providing you with the flexibility to code anytime, anywhere. Say goodbye to compatibility issues and hello to effortless coding, no matter what device you're using",
  },
  {
    title: "Collaborative 24/7",
    imageSrc: "users-round.svg",
    text: "Our platform empowers developers to work together in real-time, around the clock, from anywhere in the world. Whether you're coding solo or collaborating with a global team, our intuitive interface and robust features ensure a smooth and efficient coding experience, 24 hours a day, 7 days a week. ",
  },
  {
    title: "Reliable and secure",
    imageSrc: "lock-keyhole.svg",
    text: "Welcome to our online code editor, where reliability and security are our top priorities. With robust features and stringent security measures in place, you can code with confidence, knowing that your work is protected and your experience is seamless. Join us today and experience coding like never before",
  },
];

export default function Home() {
  return (
    <>
      <Flex
        width={"100%"}
        direction={"column"}
        bgImage="url(/loop.svg)"
        bgRepeat={"no-repeat"}
        bgColor={"background"}
        bgSize={"100%"}
      >
        <Flex
          direction="column"
          alignItems="center"
          justify={"center"}
          style={{ height: "100vh", width: "100%" }}
          gap={"2rem"}
        >
          <Heading variant="homepage" textAlign="center">
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
            minHeight={"100vh"}
            p={"2rem"}
            justify={"space-around"}
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
                  Our comminuty has more than 9 weeks of history, so we will
                  need to change this, but you can still join us
                </Text>
              </Box>
              <Button variant={"secondary"} w={"fit-content"} px={"3rem"}>
                Join us
              </Button>
            </Flex>
            <Flex
              w={"640"}
              h={"590"}
              py={"5rem"}
              backgroundColor={"grey"}
              justify={"center"}
              align={"center"}
              color="text"
              fontSize="46px"
              fontWeight={"bold"}
            >
              <VideoPlayer />
            </Flex>
          </Flex>

          <Flex bg={"background2"} w={"100%"} h={"10rem"}></Flex>
        </Flex>
      </Flex>
      <Flex
        w={"100%"}
        direction={"column"}
        bgColor={"background"}
        fontSize={"30px"}
      >
        <Footer />
      </Flex>
    </>
  );
}
