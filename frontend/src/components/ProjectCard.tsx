import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

const ProjectCard = ({ project }: any) => {
  return (
    <Card maxW="sm">
      <CardBody
        justifyContent={"center"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Image
          src=""
          alt="Green double couch with wooden legs"
          fallbackSrc="https://via.placeholder.com/150"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign={"center"}>
            {project.name}
          </Heading>
          <Text>{"The description of your projects"}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="ghost" colorScheme="yellow">
            Like
          </Button>
          <Button variant="ghost" colorScheme="yellow">
            Favorite
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
