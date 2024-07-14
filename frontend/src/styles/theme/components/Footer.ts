import { defineStyleConfig } from "@chakra-ui/react";

const Footer = defineStyleConfig({
  baseStyle: {
    fontSize: "1.2rem",
  },

  variants: {
    variants: {
      homepage: {
        fontSize: "64",
        fontFamily: "source",
        fontWeight: "700",
        color: "white",
      },
    },
  },
});

export default Footer;
