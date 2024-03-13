// theme.js
import { background, extendTheme } from "@chakra-ui/react";
import styles from './styles';
const theme = extendTheme({
  styles: {
    global: {
      // Styles for MainBox
      ".main-box": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      },
      // Styles for FormBox
      ".form-box": {
        width: "400px",
      },
    },
  },
  components: {
    FormLabel: {
      baseStyle: {
        // Custom input styles
        bg: "red.100", 
        color: "yellow.200",
      },
    },
    MainBox: {
      // Styles for the main Box component
      baseStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      },
    },
    FormBox: {
      // Styles for the form Box component
      baseStyle: {
        width: "400px",
      },
    },
  },
});

export default theme;