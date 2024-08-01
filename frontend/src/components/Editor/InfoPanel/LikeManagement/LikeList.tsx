import { 
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { 
  GetSupportersProps, 
} from "@/types/InfosPanel";
import { useRouter } from "next/router";

interface LikeListProps {
  supporters : GetSupportersProps[];
  maxAvatar : number
  setMaxAvatar: React.Dispatch<React.SetStateAction<number>>;
}

const LikeList: React.FC<LikeListProps> = ({ supporters, maxAvatar, setMaxAvatar }: LikeListProps) => {
  
  const router = useRouter();

  return (
    <Box width={"100%"}>
      <Stack direction={"row"} alignItems={"center"}>
        <Text>Likes : </Text>
        <Badge height={"fit-content"} bgColor="secondary">
          {supporters.length}
        </Badge>
      </Stack>
      <AvatarGroup spacing={1} flexWrap={"wrap"} size={"sm"}>
        {supporters?.map((user, index) => {
          if (index < maxAvatar) {
            return (
              <Avatar
                key={user?.id}
                name={user?.pseudo}
                title={`See ${user?.pseudo} profile`}
                _hover={{
                  cursor: "pointer",
                }}
                onClick={() => router.push(`/user/${user.id}`)}
              />
            );
          }
        })}
        {supporters.length > maxAvatar && (
          <Avatar
            title="Show all users"
            _hover={{
              cursor: "pointer",
            }}
            name={`+${supporters.length - maxAvatar}`}
            getInitials={(name) => name}
            backgroundColor={"grey"}
            onClick={() => setMaxAvatar(supporters.length)}
          />
        )}
      </AvatarGroup>
    </Box>
  );
};

export default LikeList;