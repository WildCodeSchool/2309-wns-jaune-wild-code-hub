import { Box, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import components from "@/styles/theme/components";

const Error404 = () => {
  return (
    <Box
      {...components.Box.main}
      bgColor={"background"}
      bgRepeat={"no-repeat"}
      bgImage="url(/BGForm.png)"
    >
      <Box {...components.Box.containerBox} p={30}>
        <Text fontSize="5xl" color="white" as="b" mb={10}>
          ERROR 400 - Page Not Found
        </Text>
        <Text fontSize="lg" color="white">
          Oops! It seems like the page you re looking for does not exist.
        </Text>
        <Box mt={10}>
          <Link  href="/" passHref>
            <Button colorScheme="primary" variant="outline">
              Go Back Home
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Error404;