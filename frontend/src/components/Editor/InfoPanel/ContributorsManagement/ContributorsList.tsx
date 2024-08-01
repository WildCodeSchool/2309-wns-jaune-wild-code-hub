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
import { GetContributorsProps } from "@/types/InfosPanel";

interface ContributorsListProps {
  contributors : GetContributorsProps[] | null;
}

const ContributorsList: React.FC<ContributorsListProps> = ({ contributors }: ContributorsListProps) => {

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
          {contributors?.length || 0}
        </Badge>
      </Stack>
      <AvatarGroup spacing={1} flexWrap={"wrap"} size={"sm"} max={9}>
        {contributors && contributors.length > 0 ? (
          contributors?.map((contributor) => {
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