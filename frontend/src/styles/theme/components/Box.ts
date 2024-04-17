import { ResponsiveValue } from "@chakra-ui/react";
const box = {
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  containerBox: {
    display: "flex",
    flexDirection: "column" as ResponsiveValue<"column" | "row">,
    alignItems: "center",
  },
  form: {
    width: "400px",
  },
};

export default box;
