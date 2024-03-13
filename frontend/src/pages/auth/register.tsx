import { REGISTER } from "@/requetes/mutations/auth.mutations";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    ButtonGroup
  } from '@chakra-ui/react';

function Register() {
    const router = useRouter();
  
    // const [register, { error }] = useMutation<
    //   RegisterMutation,
    //   RegisterMutationVariables
    // >(REGISTER, {
    //   onCompleted: (data) => {
    //     console.log(data);
    //     router.push("/auth/login");
    //   },
    //   onError(error) {
    //     console.log(error);
    //   },
    // });
    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //   const formData = new FormData(e.currentTarget);
    //   const data = Object.fromEntries(formData) as InputRegister;
    //   if (data.email && data.password) {
    //     register({
    //       variables: { infos: { email: data.email, password: data.password } },
    //     });
    //   }
    // };
    return (
        <main>
            <h1>Welcome to Wild Code Hub !</h1>
            <FormControl>
                <FormLabel>Enter your Last Name</FormLabel>
                <Input type='lastname' />
                <FormLabel>Enter your First Name</FormLabel>
                <Input type='firstname' />
                <FormLabel>Enter your Pseudo</FormLabel>
                <Input type='pseudo' />
                <FormLabel>Enter your email</FormLabel>
                <Input type='email' />
                <FormLabel>Enter your Password</FormLabel>
                <Input type='password' />
            </FormControl>
            <Button colorScheme='green' variant='solid'>
                Submit
            </Button>
        </main>
    );
  }
  
  export default Register;