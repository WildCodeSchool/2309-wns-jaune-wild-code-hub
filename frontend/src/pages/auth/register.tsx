/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { REGISTER } from "@/requetes/mutations/auth.mutations";
import {
    CreateUserInput,
    RegisterMutation,
    RegisterMutationVariables,
  } from "@/types/graphql";
import { useMutation } from "@apollo/client";
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
    useBreakpointValue,
  } from '@chakra-ui/react';
import components from "@/styles/theme/components";
import { 
    emailRegex,
    pseudoRegex,
    passwordRegex,
    checkRegex,
} from "@/regex";

const Register = () => {

    const router = useRouter();

    
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        lastname: '',
        firstname: '',
        pseudo: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        lastname: '',
        firstname: '',
        pseudo: '',
        email: '',
        password: ''
    });
    
    const [register, { error }] = useMutation<
        RegisterMutation,
        RegisterMutationVariables
    >(REGISTER, {
        onCompleted: (data) => {
            console.log(data)
            router.push("/auth/login");
        },
        onError(error) {
        console.log(error.message);
        const newErrors = {
            lastname: '',
            firstname: '',
            pseudo: '',
            email: '',
            password: ''
        }
        if (error.message === "This email and pseudo is already in use!") {
            newErrors.email += 'This email is already in use !';
            newErrors.pseudo += 'This pseudo is already in use !';
        } else if (error.message === "This email is already in use!") {
            newErrors.email += 'This email is already in use !';
        } else if (error.message === "This pseudo is already in use!"){
            newErrors.pseudo += 'This pseudo is already in use !';
        }

        for (const key in newErrors) {
            if (newErrors[key as keyof typeof newErrors] === "") {
                delete newErrors[key as keyof typeof newErrors];
            }
        }

        setErrors(newErrors);
        }
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
            lastname: '',
            firstname: '',
            pseudo: '',
            email: '',
            password: ''
        };

        // Vérification des champs
        if (!formData.lastname.trim()) {
            newErrors.lastname += 'Last name is required. ';
        } 

        if (formData.lastname.length < 2 || formData.lastname.length > 20) {
            newErrors.lastname += '2 - 50 characters for lastname. ';
        }

        if (!formData.firstname.trim()) {
            newErrors.firstname += 'First name is required. ';
        }

        if (formData.firstname.length < 2 || formData.firstname.length > 20) {
            newErrors.firstname += '2 - 50 characters for firstname. ';
        }

        if (!formData.pseudo.trim()) {
            newErrors.pseudo += 'Pseudo is required. ';
        }

        if (formData.pseudo.length < 2 || formData.pseudo.length > 20) {
            newErrors.pseudo += '2 - 20 characters for pseudo. ';
        }

        if (!checkRegex(pseudoRegex, formData.pseudo)) {
            newErrors.pseudo += 'Invaid format pseudo.';
        }

        if (!formData.email.trim()) {
            newErrors.email += 'Email is required. ';
        }

        if (!checkRegex(emailRegex, formData.email)) {
            newErrors.email += 'Invaid format email. ';
        }

        if (!formData.password.trim()) {
            newErrors.password += 'Password is required. ';
        }

        if (formData.password.length < 8) {
            newErrors.password += '8 minimum characters for password. ';
        }

        if (!checkRegex(passwordRegex, formData.password)) {
            newErrors.password += 'Requires at least 1 uppercase letter, 1 number, and 1 special character. ';
        }
        
        for (const key in newErrors) {
            if (newErrors[key as keyof typeof newErrors] === "") {
                delete newErrors[key as keyof typeof newErrors];
            }
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData) as unknown as CreateUserInput;
            register({
            variables: { 
                data: {
                    ban: false,
                    email: data.email,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    password: data.password,
                    pseudo: data.pseudo,
                    run_counter: 1,
                } },
            });
        }
    }

    const togglePasswordVisibility  = () => {
        setShowPassword(!showPassword);
    }

    const titleFontSize = useBreakpointValue({ base: "2xl", sm:"4xl",  md: "5xl" });

    return (
        <Box {...components.Box.main} bgColor={"background"} bgRepeat={"no-repeat"} bgImage="url(/BGForm.png)">
            <Box {...components.Box.containerBox} p={30}>
                <Text fontSize={titleFontSize} color="white" as='b'>Welcome to Wild Code Hub !</Text >
                <Box {...components.Box.form} w="95%" p={2}>
                  <form onSubmit={handleSubmit}>
                    <FormControl isInvalid={!!errors.lastname} mb={2}>
                        <FormLabel color="text">Enter Last Name</FormLabel>
                        <Input color="placeholder" bg="white" type='text' name='lastname' value={formData.lastname} onChange={handleInputChange} />
                        <FormErrorMessage>{errors.lastname}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.firstname} mb={2}>
                        <FormLabel color="text">Enter First Name</FormLabel>
                        <Input color="placeholder" bg="white" type='text' name='firstname' value={formData.firstname} onChange={handleInputChange} />
                        <FormErrorMessage>{errors.firstname}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.pseudo} mb={2}>
                        <FormLabel color="text">Chosse your Pseudo</FormLabel>
                        <Input color="placeholder" bg="white" type='text' name='pseudo' value={formData.pseudo} onChange={handleInputChange} />
                        <FormErrorMessage>{errors.pseudo}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.email} mb={2}>
                        <FormLabel color="text">Enter your Email</FormLabel>
                        <Input color="placeholder" bg="white" type='email' name='email' value={formData.email} onChange={handleInputChange} />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                        <FormControl isInvalid={!!errors.password} mb={2}>
                            <FormLabel color="text">Choose your Password</FormLabel>
                            <InputGroup>
                                <Input color="placeholder" bg="white" type={showPassword ? 'text' : 'password'} name='password' value={formData.password} onChange={handleInputChange} />
                                <InputRightElement>
                                    <img onClick={togglePasswordVisibility} src={!showPassword ? '/eyePasswordVisible.png' : '/eyePasswordNotVisible.png'} alt="Eye Password" style={{ cursor: "pointer" }} />
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{errors.password}</FormErrorMessage>
                        </FormControl>
                        <Box textAlign="center">
                        <Button type="submit" variant="secondary" mt={2}>
                            Submit
                        </Button>
                    </Box>
                  </form>
                </Box>
            </Box>
        </Box>
    );
}

export default Register;