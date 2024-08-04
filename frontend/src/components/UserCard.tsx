import {
  User,

} from "@/types/graphql";
import NextLink from "next/link";

import {
  Avatar,
  Box,
  Card,
  CardBody,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
  Tag,
  TagLabel,
  Text
} from "@chakra-ui/react";

type Props = {
  user: User;
  admin ?: boolean;
};

const UserCard = ({ user }: Props) => {

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
          justifyContent="flex-end"
        />
        

        <Avatar
          name={user?.pseudo}
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
                <LinkOverlay as={NextLink} href={`/admin/users/${user.id}`}>
                  {user.pseudo}
                </LinkOverlay>
              </Heading>
              <Text color={"gray.500"}>{user?.firstname} {user?.lastname}</Text>
              <Text color={"gray.500"}>
                { 
                  user?.ban ? 
                    <Tag size='sm' colorScheme='red' borderRadius='full'>
                      <TagLabel>Banned</TagLabel>
                    </Tag>
                  :
                    <Tag size='sm' colorScheme='black' borderRadius='full'>
                      <TagLabel>Not Banned</TagLabel>
                    </Tag>
                }
              </Text>
            </Stack>
          </CardBody>
        </Box>
      </Card>
    </LinkBox>
  );
};

export default UserCard;
