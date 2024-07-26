import { RESET_PASSWORD } from "@/requetes/mutations/auth.mutations";
import {
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
} from "@/types/graphql";
import components from "@/styles/theme/components";
import { useMutation } from "@apollo/client";

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

function ResetByEmail() {
  const [resetPassword, { data, error }] = useMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >(RESET_PASSWORD);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as { email: string };
    resetPassword({ variables: { email: data.email } });
  };

  return (
    <Box
      {...components.Box.main}
      bgColor={"background"}
      bgRepeat={"no-repeat"}
      bgImage="url(/BGForm.png)"
      textAlign="center"
    >
      <Box {...components.Box.containerBox} p={30}>
        <Text fontSize="4xl" color="white" as="b" mb={10}>
          Reset your Password !
        </Text>
        <Box {...components.Box.form} p={2}>
          <main>
            {!data?.resetPassword.resetToken ? (
              <form onSubmit={handleSubmit}>
                <FormControl isInvalid={!!error} mb={2}>
                  <FormLabel color="text">Enter your email</FormLabel>
                  <Input
                    color="placeholder"
                    bg="white"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    required
                  />
                  <FormErrorMessage>{error?.message}</FormErrorMessage>
                </FormControl>
                <Button type="submit" variant="secondary" mt={5}>
                  Reset Password
                </Button>
              </form>
            ) : (
              <Text>Check your emails</Text>
            )}
          </main>
        </Box>
      </Box>
    </Box>
  );
}

export default ResetByEmail;
