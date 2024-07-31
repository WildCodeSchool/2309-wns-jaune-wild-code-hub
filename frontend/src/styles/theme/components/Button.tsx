import { defineStyleConfig } from "@chakra-ui/react";

const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: 600,
    borderColor: "transparent",
    lineHeight: 1,
    borderRadius: "100",
  },

  variants: {
    outline: {
      border: "2px solid",
      borderColor: "text",
      color: "text",

      _hover: {
        borderColor: "transparent",
        bgColor: "background",
      },
    },
    primary: {
      bg: "primary",
      color: "background",
      border: "2px solid white",
    },
    secondary: {
      border: "2px solid",
      bg: "secondary",
      color: "text",
      _hover: {
        borderColor: "secondary",
      },
    },
  },
});
export default Button;
