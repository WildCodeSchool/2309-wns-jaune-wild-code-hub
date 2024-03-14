import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import colors from "./colors";
import styles from "./styles";
import components from "./components";
import "@fontsource/source-sans-3";
import "@fontsource/poppins";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const overrides = {
  config,
  colors,
  styles,
  components,
  fonts: {
    source: "Source Sans 3, sans-serif",
    poppins: "Poppins, sasn-serif",
  },
};
export default extendTheme(overrides);
