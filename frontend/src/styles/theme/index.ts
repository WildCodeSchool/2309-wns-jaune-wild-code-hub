import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import styles from "./styles";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const overrides = {
  config,
  styles,
  //components:{
  // Button,
  // }
};

export default extendTheme(overrides);
