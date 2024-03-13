import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import colors from "./colors";
// import Button from "./components/Button"

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const overrides = {
  config,
  colors,
  //components:{
  // import of custom component
  // Button,
  // }
};
export default extendTheme(overrides);
