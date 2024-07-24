import {
  Flex,
  IconButton,
  Input,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { debounce } from "lodash";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_QUERY } from "@/requetes/queries/search.queries";
import React, { useState, useEffect, useCallback } from "react";

const Searchbar = ({}) => {
  const [query, setQuery] = useState("");
  const [debouceQuery, setDebouceQuery] = useState(query);
  const [search, { loading, data, error }] = useLazyQuery(SEARCH_QUERY);

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      search({ variables: { query } });
    }
  }, [query, search]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouceQuery(query);
    }, 300);
    return () => {
      clearTimeout(timerId);
    };
  }, [query]);
  useEffect(() => {
    if (debouceQuery) {
      search({ variables: { SEARCH_QUERY: debouceQuery } });
    }
  }, [debouceQuery, search]);

  const suggestions = data?.search || [];

  return (
    <Flex direction="column" align="center" w="40%">
      <Flex
        borderRadius={100}
        align={"center"}
        px={"1rem"}
        padding={"0.5rem"}
        bg={"background2"}
        color={"white"}
        w="100%"
      >
        <Input
          variant={"unstyled"}
          borderRadius={100}
          pl={"1reme"}
          placeholder="Search for projects"
          border={"transparent"}
          _focus={{ outline: "none" }}
          outline={"none"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton
          aria-label="Magnifying glass"
          size={"xs"}
          icon={<SearchIcon />}
          bg={"primary"}
          color={"black"}
        ></IconButton>
      </Flex>
      {loading && <Spinner />}
      {error && <Text color="red.500">An error occurred</Text>}
      {data && data.search.length > 0 && (
        <List mt={2} w="100%" bg="white" borderRadius="md" boxShadow="md">
          {data.search.map((result, index) => (
            <ListItem key={index} p={2} borderBottom="1px solid #e2e8f0">
              {result.name || result.pseudo || "No name"}
            </ListItem>
          ))}
        </List>
      )}
    </Flex>
  );
};

export default Searchbar;
