// theme.js
import { background, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    FormLabel: {
      baseStyle: {
        // Custom input styles
        bg: "red.100", 
        color: "yellow.200",
      },
    },
  },
});

export default theme;