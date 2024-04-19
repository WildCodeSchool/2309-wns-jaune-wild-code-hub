import { Box, Text } from "@chakra-ui/react";
import components from "@/styles/theme/components";

const privateAdmin = () => {
  return (
    <Box
      {...components.Box.main}
      bgColor={"background"}
      bgRepeat={"no-repeat"}
      bgImage="url(/BGForm.png)"
    >
      <Box {...components.Box.containerBox} p={30}>
        <Text fontSize="5xl" color="white" as="b">
          Route Private auth i am Admin
        </Text>
      </Box>
    </Box>
  );
};

export default privateAdmin;
