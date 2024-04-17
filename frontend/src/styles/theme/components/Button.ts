import { defineStyleConfig } from "@chakra-ui/react";

const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: "bold",
    borderColor: "transparent",
    fontSize: "20",
    px: "0.5rem",
    py: "0.5rem",
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