import {
  Project,
  useCountLikesPerProjectQuery,
  useFindProjectOwnerQuery,
} from "@/types/graphql";
import NextLink from "next/link";

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  Stack,
  Text
} from "@chakra-ui/react";

import CommentIcon from "./Editor/Icons/CommentIcon";
import HeartIcon from "./Editor/Icons/HeartIcon";
import ShareIcon from "./Editor/Icons/ShareIcon";

type Props = {
  project: Pick<Project, "id" | "category" | "name">;
};

const ProjectCard = ({ project }: Props) => {
  const { data: { countLikesPerProject: likeCount } = {} } =
    useCountLikesPerProjectQuery({
      variables: {
        projectId: +project.id,
      },
    });
  const { data: { findProjectOwner: projectOwner } = {} } =
    useFindProjectOwnerQuery({
      variables: {
        projectId: project.id,
      },
    });

  return (
    <LinkBox
      maxWidth={"205px"}
      width={"100%"}
      height={"100%"}
      maxHeight={"250px"}
      borderRadius={24}
      overflow="hidden"
    >
      <Card
        height={"100%"}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box
          backgroundColor="grey"
          height="52%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        ></Box>

        <Avatar
          name={projectOwner?.pseudo}
          size="md"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          border="4px solid white"
        />

        <Box
          backgroundColor="white"
          height="48%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p={4}
        >
          <CardBody
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            p={1}
          >
            <Stack alignItems={"center"} gap={0}>
              <Heading
                size="20em"
                textShadow={"0px 2px 5px grey"}
                textAlign={"center"}
                color="gray.800"
              >
                <LinkOverlay as={NextLink} href={`/editor/${project.id}`}>
                  {project.name}
                </LinkOverlay>
              </Heading>
              <Text color={"gray.500"}>{projectOwner?.pseudo}</Text>
            </Stack>
          </CardBody>
          <CardFooter
            justifyContent={"center"}
            color="gray.500"
            p={"0 0.5rem 0.5rem 0.5rem"}
          >
            <ButtonGroup>
              <Button
                variant="ghost"
                leftIcon={<HeartIcon boxSize={4} />}
                color="gray.500"
                p={0}
              >
                {likeCount}
              </Button>
              <Button
                variant="ghost"
                aria-label="Favorite this project"
                color="gray.500"
                p={0}
                leftIcon={<CommentIcon boxSize={4} />}
              >
                {Math.ceil(Math.random() * 10)}
              </Button>
              <IconButton
                aria-label="Share this project"
                color="gray.500"
                transitionDuration={"300ms"}
                _hover={{
                  backgroundColor: "blackAlpha.100",
                  transitionDuration: "300ms",
                }}
                icon={<ShareIcon color={"gray.500"} boxSize={4} />}
              ></IconButton>
            </ButtonGroup>
          </CardFooter>
        </Box>
      </Card>
    </LinkBox>
  );
};

export default ProjectCard;
