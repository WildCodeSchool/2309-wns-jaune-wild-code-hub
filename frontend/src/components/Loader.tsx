import { Spinner } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <Spinner
      thickness="5px"
      speed="0.65s"
      emptyColor="gray.200"
      color="accent"
      size="xl"
    />
  );
};

export default Loader;
