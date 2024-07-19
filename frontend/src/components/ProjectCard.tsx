import { COUNT_LIKE_PER_PROJECT } from "@/requetes/queries/project.queries";
import {
  CountLikesPerProjectQuery,
  CountLikesPerProjectQueryVariables,
} from "@/types/graphql";
import NextLink from "next/link";

import { useQuery } from "@apollo/client";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  IconButton,
  Image,
  LinkBox,
  LinkOverlay,
  Stack,
} from "@chakra-ui/react";

import CommentIcon from "./Icons/CommentIcon";
import HeartIcon from "./Icons/HeartIcon";
import ShareIcon from "./Icons/ShareIcon";

const ProjectCard = ({ item }: any) => {
  const { project, role } = item;

  const { data } = useQuery<
    CountLikesPerProjectQuery,
    CountLikesPerProjectQueryVariables
  >(COUNT_LIKE_PER_PROJECT, {
    variables: {
      projectId: +project.id,
    },
  });

  return (
    <LinkBox maxWidth={"200px"} width={"100%"} height={"100%"}>
      <Card
        backgroundColor={"white"}
        height={"100%"}
        style={{ containerType: "size" }}
      >
        <Image
          src=""
          alt="Project image"
          height={"50%"}
          fallbackSrc="https://via.placeholder.com/10"
          borderTopRadius={"lg"}
        />
        <CardBody
          justifyContent={"center"}
          display={"flex"}
          flexDirection={"column"}
          p={"0.5rem"}
        >
          <Stack spacing="3">
            <Heading
              size="md"
              textShadow={"0px 2px 5px grey"}
              textAlign={"center"}
              color="background"
              fontSize={"9cqw"}
            >
              {/* // TODO Properly link to the editor
               */}
              <LinkOverlay as={NextLink} href={`editor/${project.id}`}>
                {project.name}
              </LinkOverlay>
            </Heading>
            {/* <Text>{"The description of your projects"}</Text> */}
          </Stack>
        </CardBody>

        <CardFooter justifyContent={"center"} color="lightGrey" p={"0.5rem"}>
          <ButtonGroup>
            <Button
              variant="ghost"
              leftIcon={<HeartIcon boxSize={4} />}
              color="lightGrey"
              p={0}
            >
              {data?.countLikesPerProject}
            </Button>

            <Button
              variant="ghost"
              aria-label="Favorite this project"
              color="lightGrey"
              p={0}
              leftIcon={<CommentIcon boxSize={4} />}
            >
              {Math.ceil(Math.random() * 10)}
            </Button>

            <IconButton
              aria-label="Share this project"
              color="lightGrey"
              transitionDuration={"300ms"}
              _hover={{
                backgroundColor: "blackAlpha.100",
                transitionDuration: "300ms",
              }}
              icon={<ShareIcon color={"lightGrey"} boxSize={4} />}
            ></IconButton>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </LinkBox>
  );
};

export default ProjectCard;
