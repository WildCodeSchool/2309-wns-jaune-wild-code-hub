import React from "react";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FindAllInfoUserAccessesProject } from "@/types/graphql";

interface ContributorsListProps {
  users : FindAllInfoUserAccessesProject[] | null;
}

const ContributorsList: React.FC<ContributorsListProps> = ({
  users
}: ContributorsListProps) => {

  const router = useRouter();

  return (
    <Box width={"100%"}>
      <Stack direction={"row"} alignItems={"center"}>
        <Text>Contributors : </Text>
        <Badge
          height={"fit-content"}
          bgColor="primary"
          color={"black"}
        >
          {users?.length || 0}
        </Badge>
      </Stack>
      <AvatarGroup spacing={1} flexWrap={"wrap"} size={"sm"} max={9}>
        {users && users.length > 0 ? (
          users?.map((contributor) => {
            const { user } = contributor;
            return (
              <Avatar
                key={user?.id}
                name={user?.pseudo}
                onClick={() => router.push(`/user/${user?.id}`)}
                title={`See ${user?.pseudo} profile`}
                _hover={{
                  cursor: "pointer",
                }}
              />
            );
          })
        ) : (
          <Text>No contributors on this project</Text>
        )}
      </AvatarGroup>
    </Box>
  );
};

export default ContributorsList;