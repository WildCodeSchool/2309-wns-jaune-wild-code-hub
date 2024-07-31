/* eslint-disable @next/next/no-img-element */
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
    Link,
  } from '@chakra-ui/react';
import components from "@/styles/theme/components";
import { LOGIN } from "@/requetes/queries/auth.queries";
import { InputLogin, LoginQuery, LoginQueryVariables } from "@/types/graphql";
import { useLazyQuery } from "@apollo/client";
import CustomToast from '@/components/ToastCustom/CustomToast';

const Login = () => {

    const router = useRouter();
    const { showAlert } = CustomToast();

    const [login, { error }] = useLazyQuery<
        LoginQuery,
        LoginQueryVariables
    >(LOGIN, {
        onCompleted: (data) => {
            if (data.login.success) {
                showAlert("success", data.login.message)
                router.push("/");
            } else {
                showAlert("error", data.login.message)
            }
        },
        onError: (error) => {
            console.log(error);
            showAlert("error", "We are sorry, there seems to be an error with the server. Please try again later.")
          },
    });

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        emailOrPseudo: '', 
    });
    const [errors, setErrors] = useState({
        password: '',
        emailOrPseudo: '', 

    });

    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    
    const handleSubmit = (newErrors: any, newData: any) => {
        if (Object.keys(newErrors).length === 0) {
            let data = newData as InputLogin;
            const pseudoConnect = { infos: { pseudo: data.pseudo, password: data.password } };
            const emailConnect = { infos: { email: data.email, password: data.password } } ; 
            login({
                variables: data?.email ? emailConnect : pseudoConnect,
            });
        }
    }

    const handleSubmitVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: { password: string; emailOrPseudo: string } = {
            password: '',
            emailOrPseudo: '', 
        };

        if (!formData.emailOrPseudo.trim()) {
            newErrors.emailOrPseudo += 'Email or Pseudo is required. ';
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

        let newData: InputLogin = {
            password: formData.password
        }

        if (!formData.emailOrPseudo.includes("@")) {
            newData.pseudo = formData.emailOrPseudo;
        } else {
            newData.email = formData.emailOrPseudo;
        }

        handleSubmit(newErrors, newData)
    }

    const togglePasswordVisibility  = () => {
        setShowPassword(!showPassword);
    }

    return (
        <Box {...components.Box.main} bgColor={"background"} bgRepeat={"no-repeat"} bgImage="url(/BGForm.png)">
            <Box {...components.Box.containerBox} p={30}>
                <Text fontSize='5xl' color="white" as='b' mb={10}>Connect to your Hub !</Text >
                <Box {...components.Box.form} p={2}>
                    <main>
                        <form onSubmit={handleSubmitVerify}>
                            <FormControl isInvalid={!!errors.emailOrPseudo} mb={2}>
                                <FormLabel color="text">Enter your Email or Pseudo*</FormLabel>
                                <Input color="placeholder" bg="white" type='text' name='emailOrPseudo' value={formData.emailOrPseudo} onChange={handleInputChange} />
                                <FormErrorMessage>{errors.emailOrPseudo}</FormErrorMessage>
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
                                        <Text fontSize='xs' color="primary" as='b'>Forget password ?</Text>
                                    </Link>
                                </Box>
                                <Box mt={5}>
                                    <Text fontSize='xs' color="grey" as='b'>Don&apos;t have an account?</Text>
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