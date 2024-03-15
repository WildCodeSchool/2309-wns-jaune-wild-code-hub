import { useState } from "react";
import { useRouter } from "next/router";
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
    useDisclosure,
    Link,
  } from '@chakra-ui/react';
import components from "@/styles/theme/components";
import { LOGIN } from "@/requetes/queries/auth.queries";
import { InputLogin, QueryLoginArgs, LoginQuery } from "@/types/graphql";
import { useLazyQuery } from "@apollo/client";

const Login = () => {
    const router = useRouter();

    const [login, { error }] = useLazyQuery<
        LoginQuery,
        QueryLoginArgs
    >(LOGIN);

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors = {
            email: '',
            password: ''
        };

        if (!formData.email.trim()) {
            newErrors.email += 'Email is required. ';
        }

        if (!formData.password.trim()) {
            newErrors.password += 'Password is required. ';
        }

        
        for (const key in newErrors) {
            if (newErrors[key as keyof typeof newErrors] === "") {
                delete newErrors[key as keyof typeof newErrors];
            }
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData) as InputLogin;
              login({
                variables: { infos: { email: data.email, password: data.password } },
                onCompleted(data) {
                    if (data.login.success) {
                        console.log(data)
                        router.reload();
                    }
                  },  
            });
        }
    }

    const togglePasswordVisibility  = () => {
        setShowPassword(!showPassword);
    }
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box {...components.Box.main} bgColor={"background"} bgRepeat={"no-repeat"} bgImage="url(/BGForm.png)">
            <Box {...components.Box.containerBox} p={30}>
                <Text fontSize='3xl' color="white" as='b' mb={10}>Connect to your Hub !</Text >
                <Box {...components.Box.formModal} p={2}>
                    <main>
                        <form onSubmit={handleSubmit}>
                            <FormControl isInvalid={!!errors.email} mb={2}>
                                <FormLabel color="text">Enter your Email *</FormLabel>
                                <Input color="placeholder" bg="white" type='email' name='email' value={formData.email} onChange={handleInputChange} />
                                <FormErrorMessage>{errors.email}</FormErrorMessage>
                            </FormControl>
                                <FormControl isInvalid={!!errors.password} mb={2}>
                                    <FormLabel color="text">Choose your Password *</FormLabel>
                                    <InputGroup>
                                        <Input color="placeholder" bg="white" type={showPassword ? 'text' : 'password'} name='password' value={formData.password} onChange={handleInputChange} />
                                        <InputRightElement>
                                            <img onClick={togglePasswordVisibility} src={!showPassword ? '/eyePasswordVisible.png' : '/eyePasswordNotVisible.png'} alt="Eye Password" style={{ cursor: "pointer" }} />
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                                </FormControl>
                                <Box textAlign="center">
                                    <Box mt={5}>
                                        <Link href='/auth/forgetpassword'>
                                            <Text fontSize='xs' color="primary" as='b'>Forget password ?</Text >
                                        </Link>
                                    </Box>
                                    <Box mt={5}>
                                        <Text fontSize='xs' color="grey" as='b'>Don't have an account? </Text >
                                        <Link href='/auth/register'>
                                            <Text fontSize='xs' color="accent" as='b'>Sign up</Text >
                                        </Link>
                                    </Box>
                                <Button type="submit" variant="secondary" mt={5}>
                                    Sign In
                                </Button>
                            </Box>
                        </form>
                    </main>
                </Box>
            </Box>
        </Box>
    );
}

export default Login;