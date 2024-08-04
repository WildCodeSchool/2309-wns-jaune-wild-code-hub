import { TextInput } from "@/components/Inputs/TextInput";
import Loader from "@/components/Loader";
import SidebarLayout from "@/components/Sidebar/SidebarLayout";
import { checkRegex, emailRegex, pseudoRegex } from "@/regex";
import {
  UpdateUserInput,
  useDeleteUserMutation,
  useFindUserInfosByIdLazyQuery,
  User,
  useUpdateUserMutation,
} from "@/types/graphql";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { NextPageWithLayout } from "../../_app";
import GenericModal from "@/components/GenericModal";
import CustomToast from "@/components/ToastCustom/CustomToast";
import { useRouter } from "next/router";

const Settings: NextPageWithLayout = () => {

  const [user, setUser] = useState<
  (Partial<User>) | undefined
  >();
  const [errors, setErrors] = useState<Record<any, any>>({});
  const [getUser, { loading, error }] = useFindUserInfosByIdLazyQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const router = useRouter();
  const { showAlert } = CustomToast();
  const userId = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
  useEffect(() => {
    userId &&
      getUser({
        variables: { findUserByIdId: userId },
        onCompleted(data) {
          setUser(data.findUserById);
        },
      });
  }, [userId, getUser]);

  const isInputValid = (
    name: string,
    value: string,
    message: string,
    regex: RegExp
  ) => {
    setErrors((prevState) => {
      return { ...prevState, [name]: undefined };
    });
    setUser((prevState) => ({ ...prevState, [name]: value }));
    const isValid = checkRegex(regex, value);
    !isValid &&
      setErrors((prevState) => ({
        ...prevState,
        [name]: message,
      }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      const message = "Enter a valid email";
      isInputValid(name, value, message, emailRegex);
    } else if (name === "pseudo") {
      const message = "Enter a valid pseudo : No special character";
      isInputValid(name, value, message, pseudoRegex);
    } else {
      setUser((prevState) => ({ ...prevState, [name]: value }));
    }
  };
  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (user && userId) {
      const userForm: UpdateUserInput = {
        pseudo: user.pseudo,
        firstname: user.firstname,
        lastname: user.lastname,
        ban: user.ban,
        id: userId,
      };
      updateUser({
        variables: {
          data: userForm,
        },
        onCompleted(data) {
          if (data?.updateUser.success) {
            showAlert("success", "Your information should be saved!");
          } else {
            showAlert("error", data?.updateUser.message);
          }
        },
        onError(error) {
          showAlert(
            'error',
            error.message ?
              error.message
            :
              "We are sorry, there seems to be an error with the server. Please try again later."
          );
        },
      });
    }
  };
  const handleDeleteAccount = () => {
    userId &&
      deleteUser({
        variables: {
          data : {
            id : userId,
            password : "TestTESt!1"
          }
        },
        onCompleted(data) {
          if (data.deleteUser.success) {
            showAlert("success", data.deleteUser.message);
            router.push("/admin/users");
          } else {
            showAlert("error", data.deleteUser.message);
          }
        },
        onError(error) {
          showAlert(
            'error',
            error.message ?
              error.message
            :
              "We are sorry, there seems to be an error with the server. Please try again later."
          );
        }
      });
  };

  const openModal: () => void  = () => {
    setIsModalOpen(true);
  };

  const closeModal: () => void  = () => {
    setIsModalOpen(false);
  };


  return (
    <Flex
      padding={"2rem"}
      alignItems={"center"}
      width={"100%"}
      flexDirection={"column"}
    >
      <Heading textAlign={"center"} marginTop={"2rem"} marginBottom={"1rem"}>
        {`Manage ${user?.pseudo}'s profile `}
      </Heading>
      <Text color={"text"}>Here you can manage your infos</Text>
      {loading && <Loader />}
      {user && (
        <Flex marginTop={"4rem"} width={"65%"} marginBottom={"2rem"}>
          <form
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "3.5rem",
            }}
          >
            <TextInput
              name="email"
              label="Email"
              value={user.email}
              error={errors.email}
              onChange={handleInputChange}
            />
            <TextInput
              name="pseudo"
              inputType="text"
              error={errors.pseudo}
              value={user.pseudo}
              label="Pseudo"
              onChange={handleInputChange}
            />
            <TextInput
              name="firstname"
              inputType="text"
              error={errors.firstname}
              value={user.firstname}
              label="Firstname"
              onChange={handleInputChange}
            />
            <TextInput
              name="lastname"
              inputType="text"
              error={errors.lastname}
              value={user.lastname}
              label="Lastname"
              onChange={handleInputChange}
            />
            <Select
              size="sm"
              width={"100%"}
              mr={3}
              value={user.ban ? "Banned" : "Not Banned"}
              onChange={(e) => {
                setUser(prev => ({
                  ...prev,
                  ban: e.target.value === "Banned" ? true : false,
                }));
              }}
              bg="white"
              color="#000000"
              borderRadius={5}
            >
              <option value="Banned" style={{ color :"dark"}}>Banned</option>
              <option value="Not Banned" style={{ color :"dark"}}>Not Banned</option>
            </Select>
            <ButtonGroup alignSelf={"center"} spacing={8}>
              <Button
                variant={"secondary"}
                onClick={handleSubmit}
                isDisabled={
                  !Object.values(errors).every((value) => value === undefined)
                }
              >
                Confirm Change
              </Button>
              <Button variant="outline" onClick={openModal}>
                Delete Account
              </Button>
            </ButtonGroup>
          </form>
        </Flex>
      )}
      <GenericModal isOpen={isModalOpen} onClose={closeModal} title="Deleting account">
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Box width="100%" maxWidth="250px" textAlign="center">
            <Text color="white" mb={25}>
            Deleting your account will wipe all your info and data from Wild Code Hub. This action is irreversible.
            </Text>
            <Text color="white" mb={25}>
              Are you sure you want to delete your account ?
            </Text>
            <ButtonGroup spacing={5} mt={5} display="flex" justifyContent="center">
              <Button type="button" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="button" variant="primary" onClick={handleDeleteAccount}>
                {"Yes, I'm sure"}
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </GenericModal>
    </Flex>
  );
};

Settings.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default Settings;
