import { defineStyleConfig } from "@chakra-ui/react";

const Heading = defineStyleConfig({
  // The styles all Heading have in common
  baseStyle: {},

  variants: {
    homepage: {
      fontSize: "64",
      fontFamily: "source",
      fontWeight: "700",
      color: "white",
    },
  },
});

export default Heading;
