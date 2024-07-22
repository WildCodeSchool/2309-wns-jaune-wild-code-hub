import { PasswordInput } from "@/components/Inputs/PasswordInput";
import { TextInput } from "@/components/Inputs/TextInput";
import Loader from "@/components/Loader";
import SidebarLayout from "@/components/Sidebar/SidebarLayout";
import { checkRegex, emailRegex, passwordRegex, pseudoRegex } from "@/regex";
import {
  UpdateUserInput,
  useDeleteUserMutation,
  useFindUserByIdLazyQuery,
  User,
  useUpdateUserMutation,
} from "@/types/graphql";
import {
  Button,
  ButtonGroup,
  Flex,
  FormLabel,
  Heading,
  Text,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";

const Settings: NextPageWithLayout = () => {
  const userId = Cookies.get("id");
  const [user, setUser] = useState<
    (Partial<User> & { confirmPassword?: string }) | undefined
  >();
  const [errors, setErrors] = useState<Record<any, any>>({});
  const router = useRouter();
  const [getUser, { loading, error }] = useFindUserByIdLazyQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

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
    } else if (name === "password") {
      const message =
        "Your password must have at least 8 characters with at least one uppercase letter, one digit and one special character";
      isInputValid(name, value, message, passwordRegex);
    } else if (name === "confirmPassword") {
      setErrors((prevState) => {
        return { ...prevState, confirmPassword: undefined };
      });
      setUser((prevState) => ({ ...prevState, [name]: value }));
      const isValid = value === user?.password;
      !isValid &&
        setErrors((prevState) => {
          return { ...prevState, [name]: undefined };
        });
    } else {
      setUser((prevState) => ({ ...prevState, [name]: value }));
    }
  };
  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    //TODO Change for open modal and update user only after modal confirmation
    e.preventDefault();
    if (user && userId) {
      const userForm: UpdateUserInput = {
        pseudo: user.pseudo,
        firstname: user.firstname,
        lastname: user.lastname,
        id: userId,
        password: user.password,
      };
      updateUser({
        variables: {
          data: userForm,
        },
        onCompleted(data) {
          console.log("data", data.updateUser.message);
          setUser((prevState) => ({
            ...prevState,
            password: "",
            confirmPassword: "",
          }));
        },
        onError(error, clientOptions) {
          console.log("data", error.message);
        },
      });
    }
  };
  const handleDeleteAccount = () => {
    //TODO add confirmation modal
    userId &&
      deleteUser({
        variables: {
          deleteUserId: +userId,
        },
        onCompleted(data, clientOptions) {
          router.push("/");
        },
      });
  };
  return (
    <Flex
      padding={"2rem"}
      alignItems={"center"}
      width={"100%"}
      flexDirection={"column"}
    >
      <Heading textAlign={"center"} marginTop={"2rem"} marginBottom={"1rem"}>
        Manage your Account
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
            <Flex
              alignItems={"space-between"}
              justifyContent={"space-between"}
              backgroundColor={"grey"}
              p={"1rem"}
              borderRadius={"1rem"}
            >
              <Flex direction={"column"} maxWidth={"35%"}>
                <FormLabel>Change Password</FormLabel>
                <Text
                  fontStyle={"italic"}
                  fontSize={"sm"}
                  margin={"auto"}
                  color="#FC8181"
                >
                  {errors.password ? errors.password : errors.confirmPassword}
                </Text>
              </Flex>
              <Flex flexDirection={"column"} width={"60%"} gap={"2.5rem"}>
                <PasswordInput
                  value={user.password}
                  label="Password"
                  name="password"
                  onChange={handleInputChange}
                  error={errors.password}
                />
                <PasswordInput
                  value={user.confirmPassword}
                  label="Confirm Password"
                  name="confirmPassword"
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                />
              </Flex>
            </Flex>
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
              <Button variant="outline" onClick={handleDeleteAccount}>
                Delete Account
              </Button>
            </ButtonGroup>
          </form>
        </Flex>
      )}
    </Flex>
  );
  // TODO Add confirmation modal for submit an delete
  //TODO Add logic for submit
  //TODO Add logic for delete
};
Settings.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
export default Settings;
