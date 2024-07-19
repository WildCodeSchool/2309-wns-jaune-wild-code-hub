import React, { useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import SidebarLayout from "@/components/SidebarLayout";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useQuery } from "@apollo/client";
import {
  FindUserByIdQuery,
  FindUserByIdQueryResult,
  FindUserByIdQueryVariables,
  QueryFindUserByIdArgs,
} from "@/types/graphql";
import { FIND_USER_BY_ID } from "@/requetes/queries/user.queries";
import Image from "next/image";

const Settings: NextPageWithLayout = () => {
  const userId = Cookies.get("id");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { data } = useQuery<FindUserByIdQuery, FindUserByIdQueryVariables>(
    FIND_USER_BY_ID,
    {
      skip: !userId,
      variables: { findUserByIdId: userId || "" },
    }
  );
  const [formData, setFormData] = useState<any>({
    email: "",
    pseudo: "",
  });
  const [errors, setErrors] = useState();

  useEffect(() => {
    data && setFormData(data?.findUserById);
  }, [data]);

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = () => {};
  const handleDeleteAccount = () => {};
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
      <Flex marginTop={"4rem"} width={"65%"} marginBottom={"2rem"}>
        <form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <FormControl>
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              paddingInline={"1rem"}
            >
              <FormLabel>Email</FormLabel>
              <Input
                width="60%"
                backgroundColor={"white"}
                color={"textSecondary"}
                type="email"
                name="mail"
                autoComplete="off"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Flex>
            {/* <FormHelperText>
              Enter the email you&apos;d like to receive the newsletter on.
            </FormHelperText> */}
          </FormControl>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            paddingInline={"1rem"}
          >
            <FormLabel>Pseudo</FormLabel>
            <Input
              width="60%"
              backgroundColor={"white"}
              color={"textSecondary"}
              type="email"
              value={formData.pseudo}
              onChange={handleInputChange}
            />
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            paddingInline={"1rem"}
          >
            <FormLabel>Lastname</FormLabel>
            <Input
              width="60%"
              backgroundColor={"white"}
              color={"textSecondary"}
              type="email"
              value={formData.lastname}
              onChange={handleInputChange}
            />
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            paddingInline={"1rem"}
          >
            <FormLabel>Firstname</FormLabel>
            <Input
              width="60%"
              backgroundColor={"white"}
              color={"textSecondary"}
              type="email"
              value={formData.firstname}
              onChange={handleInputChange}
            />
          </Flex>
          <Flex
            justifyContent={"space-between"}
            backgroundColor={"grey"}
            p={"1rem"}
            borderRadius={"1rem"}
          >
            <FormLabel>Change Password</FormLabel>
            <Flex flexDirection={"column"} width={"60%"}>
              <FormControl>
                <FormLabel>New Password</FormLabel>
                <InputGroup>
                  <Input
                    color="placeholder"
                    bg="white"
                    type={showPassword ? "text" : "password"}
                    name="new-password"
                    value={formData.password}
                    autoComplete="new-password"
                    onChange={handleInputChange}
                  />
                  <InputRightElement>
                    <img
                      onClick={() => setShowPassword(!showPassword)}
                      src={
                        !showPassword
                          ? "/eyePasswordVisible.png"
                          : "/eyePasswordNotVisible.png"
                      }
                      alt="Eye Password"
                      style={{ cursor: "pointer" }}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Confirm New Password</FormLabel>
                <InputGroup>
                  <Input
                    color="placeholder"
                    bg="white"
                    type={showPassword ? "text" : "password"}
                    name="confirm-password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <InputRightElement>
                    <img
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      src={
                        !showConfirmPassword
                          ? "/eyePasswordVisible.png"
                          : "/eyePasswordNotVisible.png"
                      }
                      alt="Eye Password"
                      style={{ cursor: "pointer" }}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Flex>
          </Flex>
        </form>
      </Flex>
      <ButtonGroup>
        <Button variant={"secondary"} onClick={handleSubmit}>
          Confirm Change
        </Button>
        <Button variant="outline" onClick={handleDeleteAccount}>
          Delete Account
        </Button>
      </ButtonGroup>
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
