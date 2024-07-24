import { Flex, IconButton, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { debounce } from "lodash";
import { useLazyQuery } from "@apollo/client";
// import { SEARCH_QUERY } from "@/requetes/queries/search.queries";
import React, { useState, useEffect, useCallback } from "react";

const Searchbar = () => {
  return (
    <Flex
      borderRadius={100}
      align={"center"}
      px={"1rem"}
      padding={"0.5rem"}
      bg={"background2"}
      color={"white"}
      w={"40%"}
    >
      <Input
        variant={"unstyled"}
        borderRadius={100}
        pl={"1rem"}
        placeholder="Search for projects"
        border={"transparent"}
        _focus={{ outline: "none" }}
        outline={"none"}
      />
      <IconButton
        aria-label="Magnifying glass"
        size={"xs"}
        icon={<SearchIcon />}
        bg={"primary"}
        color={"black"}
      ></IconButton>
    </Flex>
  );
};

export default Searchbar;
