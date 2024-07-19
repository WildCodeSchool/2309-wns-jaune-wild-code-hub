import * as React from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function FooterMailto() {
  return (
    <>
      <Heading fontSize="16px" mb="15px" className="yellow-gradient-color">
        Subscribe To Our Newsletter
      </Heading>
      {/* <Text color="gray.400" mb="15px">
        Get notified about the upcoming sessions, news, articles, jobs, and
        opensource projects.
      </Text> */}

      <form action="#">
        <Box position="relative">
          <Input
            type="email"
            isRequired
            name="entry.1808449400"
            px="25px"
            height="50px"
            rounded="50px"
            bg={useColorModeValue("gray.900", "gray.600")}
            _placeholder={{ color: "gray.300" }}
            placeholder="Your email"
            _focus={{ outline: 0 }}
            color="gray.100"
            borderWidth={0}
          />
          <Button
            type="submit"
            height="50px"
            color="gray.900"
            _hover={{ bg: "primary", color: "gray.500" }}
            position="absolute"
            top="0"
            right="0"
            bg="primary"
            rounded="50px"
            px="25px"
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
}
