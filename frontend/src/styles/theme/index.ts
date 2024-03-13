import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import colors from "./colors";
import styles from "./styles";
// import Button from "./components/Button"

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const overrides = {
  config,
  colors,
  styles,
  //components:{
  // import of custom component
  // Button,
  // }
};
export default extendTheme(overrides);
