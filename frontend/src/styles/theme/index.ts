import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import colors from "./colors";
import styles from "./styles";
import components from "./components";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const overrides = {
  config,
  colors,
  styles,
  components,
};
export default extendTheme(overrides);
