import { RESET_PASSWORD } from "@/requetes/mutations/auth.mutations";
import {
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
} from "@/types/graphql";
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
  const [resetPassword, { data }] = useMutation<
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
    <main className={`Flex min-h-screen items-center p-24 jb`}>
      <div>
        {!data?.resetPassword.resetToken ? (
          <form onSubmit={handleSubmit}>
            <input name="email" placeholder="Indiquez votre email" />
            <input type="submit" />
          </form>
        ) : (
          <div>
            <Text>Vérifiez vos emails</Text>
          </div>
        )}
      </div>
    </main>
  );
}
export default ResetByEmail;
