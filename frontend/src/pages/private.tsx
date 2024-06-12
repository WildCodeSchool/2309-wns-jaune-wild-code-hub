import { Box, Text } from "@chakra-ui/react";
import components from "@/styles/theme/components";

const Private = () => {
  return (
    <Box
      {...components.Box.main}
      bgColor={"background"}
      bgRepeat={"no-repeat"}
      bgImage="url(/BGForm.png)"
    >
      <Box {...components.Box.containerBox} p={30}>
        <Text fontSize="5xl" color="white" as="b">
          Route Private auth not Admin
        </Text>
      </Box>
    </Box>
  );
};

export default Private;
