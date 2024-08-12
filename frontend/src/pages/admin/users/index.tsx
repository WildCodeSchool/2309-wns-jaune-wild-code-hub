import SidebarLayout from "@/components/Sidebar/SidebarLayout";
import { Button, ButtonGroup, Center, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { NextPageWithLayout } from "../../_app";
import { useEffect, useState } from "react";
import {
  User,
  useListUsersLazyQuery
} from "@/types/graphql";
import Loader from "@/components/Loader";
import { WarningIcon } from "@chakra-ui/icons";
import { UsersGrid } from "@/components/UsersGrid";

const AdminUsers: NextPageWithLayout = () => {
  
  const [users, setUsers] =
    useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberCount, setNumberCount] = useState<number>(1);


  const [getUsers, { error, loading, data }] =
   useListUsersLazyQuery();

  useEffect(() => {
    getUsers({
      variables: { offset: 8 * (currentPage - 1), limit: 8 },
      onCompleted(data) {
        console.log(data)
        setNumberCount(data.listUsers.total);
        setUsers(data.listUsers.users);
      },
    });
  }, [currentPage, getUsers, data]);

  const next = () => {
    setCurrentPage(currentPage + 1);
  };

  const previous = () => {
    setCurrentPage(currentPage - 1);
  };

  const Loading = () => {
    return (
      <Center width={"100%"}>
        <Loader />
      </Center>
    );
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Center width={"100%"}>
        <Stack direction="column" alignItems={"center"}>
          <WarningIcon color={"#FC8181"} boxSize={8} />
          <Text paddingInline={"4rem"} fontSize={20} textAlign={"center"}>
            An error occured while loading the user information, please refresh
            the page or try again later
          </Text>
        </Stack>
      </Center>
    );
  } 
  if (users) {
    return (
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        width={"100%"}
        padding={"3rem 1rem 1rem 1rem"}
        gap={"3rem"}
      >
        <Heading textAlign={"center"} fontSize={"3cqw"}>
          Users Management 
        </Heading>
        {users ? 
          <UsersGrid users={users} admin={true} />
        : 
          <Loader />
        }

        <ButtonGroup display="flex" alignItems="center" mt="10" ml="4" spacing={4}>
          <Button
            variant={"outline"}
            w={"fit-content"}
            px={"3rem"}
            onClick={previous}
            isDisabled={currentPage === 1}
          >
            Prev
          </Button>
          <Button
            variant={"secondary"}
            w={"fit-content"}
            px={"3rem"}
            onClick={next}
            isDisabled={currentPage === Math.ceil(numberCount / 8)}
          >
            Next
          </Button>
        </ButtonGroup>
      </Flex>
    );
  }
};

AdminUsers.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default AdminUsers;
