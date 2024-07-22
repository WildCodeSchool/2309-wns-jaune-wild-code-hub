import {
  Project,
  useCountLikesPerProjectQuery,
  useFindProjectOwnerQuery,
} from "@/types/graphql";
import NextLink from "next/link";

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
  Text,
} from "@chakra-ui/react";

import CommentIcon from "./Icons/CommentIcon";
import HeartIcon from "./Icons/HeartIcon";
import ShareIcon from "./Icons/ShareIcon";

type Props = {
  project: Omit<Project, "files">;
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
          p={"0"}
          pt={"0.5rem"}
        >
          <Stack alignItems={"center"} gap={0}>
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
            <Text color={"textSecondary"}>{projectOwner?.pseudo}</Text>
          </Stack>
        </CardBody>

        <CardFooter
          justifyContent={"center"}
          color="lightGrey"
          p={"0 0.5rem 0.5rem 0.5rem"}
        >
          <ButtonGroup>
            <Button
              variant="ghost"
              leftIcon={<HeartIcon boxSize={4} />}
              color="lightGrey"
              p={0}
            >
              {likeCount}
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
