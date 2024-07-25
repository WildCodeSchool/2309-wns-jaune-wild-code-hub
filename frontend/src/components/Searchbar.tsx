import { Flex, IconButton, Input, Spinner, Box, List, ListItem, Text } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { ListPublicProjectsByNameQuery, ListPublicProjectsByNameQueryVariables, Project } from "@/types/graphql";
import { LIST_PUBLIC_PROJECTS_BY_NAME } from "@/requetes/queries/project.queries";

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

  return (
    <Flex
      direction="column"
      borderRadius={100}
      align={"center"}
      px={"1rem"}
      padding={"0.5rem"}
      bg={"background2"}
      color={"white"}
      w={"40%"}
    >
      <Flex align={"center"} w={"100%"}>
        <Input
          variant={"unstyled"}
          borderRadius={100}
          pl={"1rem"}
          placeholder="Search for projects"
          border={"transparent"}
          _focus={{ outline: "none" }}
          outline={"none"}
          value={searchTerm}
          onChange={handleSearch}
        />
        <IconButton
          aria-label="Magnifying glass"
          size={"xs"}
          icon={loading ? <Spinner size="xs" /> : <SearchIcon />}
          bg={"primary"}
          color={"black"}
        ></IconButton>
      </Flex>
      {results.length > 0 && (
        <Box
          mt={"0.5rem"}
          w={"100%"}
          bg={"white"}
          borderRadius={"md"}
          boxShadow={"md"}
          maxHeight={"200px"}
          overflowY={"auto"}
        >
          <List spacing={2}>
            {results.map((project) => (
              <ListItem key={project.id} p={"0.5rem"} _hover={{ bg: "gray.100" }}>
                <Text>{project.name}</Text>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Flex>
  );
};

export default Searchbar;
