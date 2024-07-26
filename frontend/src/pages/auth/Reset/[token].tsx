import { useRouter } from "next/router";
import { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CHECK_RESET_TOKEN } from "@/requetes/queries/auth.queries";

import {
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
  CheckResetTokenQuery,
  CheckResetTokenQueryVariables,
} from "@/types/graphql";

import { useEffect } from "react";
import { CHANGE_PASSWORD } from "@/requetes/mutations/auth.mutations";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
  InputGroup,
  InputRightElement,
  Text,
  Link,
} from "@chakra-ui/react";
import components from "@/styles/theme/components";

function Reset({ isConnected }: { isConnected: boolean }) {
  const router = useRouter();
  const [checkToken, { data, loading }] = useLazyQuery<
    CheckResetTokenQuery,
    CheckResetTokenQueryVariables
  >(CHECK_RESET_TOKEN);

  const [changePassword, { data: dataChange }] = useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(CHANGE_PASSWORD);

  useEffect(() => {
    if (router.isReady) {
      const token = router.query.token;
      if (token) {
        checkToken({
          variables: {
            token: token as string,
          },
        });
      }
    }
  }, [router.isReady]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as { password: string };

    console.log("%c", "color: #733d00", data);
    const token = router.query.token;
    if (token) {
      changePassword({
        variables: {
          data: { password: data.password, token: token as string },
        },
        onCompleted(data) {
          console.log("data", data);
          console.log("Change Password Mutation Completed: ", data);
        },
      });
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  if (isConnected) {
    return null;
  }
  if (loading) {
    <div>
      <Text>Verification in progress</Text>
    </div>;
  }
  useEffect(() => {
    if (dataChange?.changePassword.success) {
      console.log(
        "Password Change Success: 🥲🥲🥲🥲🥲",
        dataChange.changePassword.success
      );
    }
  }, [dataChange]);

  return (
    <Box
      {...components.Box.main}
      bgColor={"background"}
      bgRepeat={"no-repeat"}
      bgImage="url(/BGForm.png)"
      textAlign="center"
    >
      <Box {...components.Box.form} p={30}>
        <main>
          <div>
            {data?.checkResetToken.success ? (
              <form onSubmit={handleSubmit}>
                <div>
                  <Text fontSize="4xl" color="white" as="b" mb={10}>
                    {" "}
                    Password reset
                  </Text>
                  {!dataChange?.changePassword.success && (
                    <>
                      <FormControl>
                        <InputGroup>
                          <Input
                            type={showPassword ? "text" : "password"}
                            color="placeholder"
                            bg="white"
                            name="password"
                            placeholder="Enter your new password"
                            required
                          />
                          <InputRightElement>
                            <img
                              onClick={togglePasswordVisibility}
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

                      <Button type="submit" variant="secondary" mt={5}>
                        Submit
                      </Button>
                    </>
                  )}
                </div>

                {dataChange?.changePassword.success && (
                  <div>
                    <Link href="/auth/login">
                      {dataChange?.changePassword.message}
                    </Link>
                  </div>
                )}
              </form>
            ) : (
              <div>
                <Text>Goodjob for the password reset.</Text>
              </div>
            )}
          </div>
        </main>
      </Box>
    </Box>
  );
}

export default Reset;
