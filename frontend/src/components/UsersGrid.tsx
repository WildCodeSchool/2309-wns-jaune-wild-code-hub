import { Grid, GridItem } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import { User } from "@/types/graphql";
import UserCard from "./UserCard";

type UsersGridProps = {
  users: User[];
  admin ?: boolean;
};

export const UsersGrid = ({ users, admin }: UsersGridProps) => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(4, minmax(50px, 1fr))",
      }}
      gap={6}
      overflowY={"auto"}
      height={{ base: "53cqh", md: "fit-content" }}
      paddingBottom={{ base: "3rem", md: "0" }}
      css={{
        "&::-webkit-scrollbar": {
          width: "3px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
          borderRadius: "10px",
          marginBottom: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      }}
      paddingRight="1rem"
    >
      {users.map((user, id) => {
        return (
          <GridItem
            key={user.id + id}
            display={"flex"}
            justifyContent={"center"}
            height={"225px"}
          >
            { admin ?
              <UserCard user={user} admin={true} />
            :
              <UserCard user={user} />
            }
          </GridItem>
        );
      })}
    </Grid>
  );
};
