import { Flex, IconButton, Input, Spinner, Box, List, ListItem, Text, LinkOverlay } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { ListPublicProjectsByNameQuery, ListPublicProjectsByNameQueryVariables, Project } from "@/types/graphql";
import { LIST_PUBLIC_PROJECTS_BY_NAME } from "@/requetes/queries/project.queries";
import NextLink from "next/link";

type SearchbarProps = {
  onResults: (projects: Project[]) => void;
};

const Searchbar = ({ onResults }: SearchbarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Project[]>([]);
  
  const [searchProjects, { loading, data }] = useLazyQuery<
    ListPublicProjectsByNameQuery,
    ListPublicProjectsByNameQueryVariables
  >(LIST_PUBLIC_PROJECTS_BY_NAME);

  useEffect(() => {
    if (data) {
      setResults(data.listPublicProjectsByName as Project[]);
      onResults(data.listPublicProjectsByName as Project[]);
    }
  }, [data, onResults]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      searchProjects({ variables: { name: term } });
    } else {
      setResults([]);
      onResults([]);
    }
  };

  const handleResultClick = () => {
    setSearchTerm("");
    setResults([]);
  };

  return (
    <Flex direction="column" align="center" width="40%">
      <Flex
        position="relative"
        borderRadius={100}
        align="center"
        px="1rem"
        padding="0.5rem"
        bg="background2"
        color="white"
        width="100%"
      >
        <Input
          variant="unstyled"
          borderRadius={100}
          pl="1rem"
          placeholder="Search for projects"
          border="transparent"
          _focus={{ outline: "none" }}
          outline="none"
          value={searchTerm}
          onChange={handleSearch}
        />
        <IconButton
          aria-label="Magnifying glass"
          size="xs"
          icon={loading ? <Spinner size="xs" /> : <SearchIcon />}
          bg="primary"
          color="black"
        ></IconButton>
      </Flex>
      {searchTerm && results.length > 0 && (
        <Box
          position="absolute"
          mt="2.5rem"
          width={{ base: "250px", sm: "40%" }}
          bg="black"
          borderRadius="md"
          boxShadow="md"
          maxHeight="150px"
          overflowY="auto"
          zIndex={1}
        >
          <List spacing={2}>
            {results.map((project) => (
              <ListItem key={project.id} p="0.4rem" _hover={{ bg: "grey" }}>
                <LinkOverlay as={NextLink} href={`/editor/${project.id}`} onClick={handleResultClick}>
                  <Text>{project.name}</Text>
                </LinkOverlay>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Flex>
  );
};

export default Searchbar;
