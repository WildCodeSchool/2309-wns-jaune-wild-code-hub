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
  Icon,
  IconButton,
  Image,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";

import { StarIcon } from "@chakra-ui/icons";
const HeartIcon = () => (
  <Icon viewBox="0 0 16 15">
    <path
      d="M8.0008 15H7.98965C5.93333 14.9619 0 9.62144 0 4.56329C0 2.13334 2.01015 0 4.30132 0C6.12439 0 7.35038 1.25304 8 2.16506C8.64802 1.25463 9.87402 0 11.6979 0C13.9906 0 16 2.13334 16 4.56408C16 9.62065 10.0659 14.9611 8.00955 14.9984H8.0008V15ZM4.30212 1.19039C2.64623 1.19039 1.19494 2.767 1.19494 4.56487C1.19494 9.11705 6.79471 13.7612 8.00159 13.8104C9.21007 13.7612 14.8082 9.11785 14.8082 4.56487C14.8082 2.767 13.357 1.19039 11.7011 1.19039C9.68853 1.19039 8.56444 3.51882 8.55488 3.54182C8.37178 3.98752 7.63459 3.98752 7.45069 3.54182C7.43955 3.51803 6.31625 1.19039 4.30292 1.19039H4.30212Z"
      fill="#8A98A4"
    />
  </Icon>
);
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
    <LinkBox maxWidth={"250px"} width={"100%"}>
      <Card backgroundColor={"white"}>
        <Image
          src=""
          alt="Project image"
          height={"50%"}
          fallbackSrc="https://via.placeholder.com/150"
          borderTopRadius={"lg"}
        />
        <CardBody
          justifyContent={"center"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Stack spacing="3">
            <Heading size="md" textAlign={"center"} color="background">
              {/* // TODO Properly link to the editor
               */}
              <LinkOverlay as={NextLink} href={`editor/${project.id}`}>
                <Text textShadow={"0px 2px 5px grey"}>{project.name}</Text>
              </LinkOverlay>
            </Heading>
            {/* <Text>{"The description of your projects"}</Text> */}
          </Stack>
        </CardBody>

        <CardFooter justifyContent={"center"}>
          <ButtonGroup spacing="2">
            <Button variant="ghost" leftIcon={<HeartIcon />}>
              {data?.countLikesPerProject}
            </Button>

            <IconButton
              variant="ghost"
              aria-label="Favorite this project"
              icon={<StarIcon />}
            ></IconButton>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </LinkBox>
  );
};

export default ProjectCard;
