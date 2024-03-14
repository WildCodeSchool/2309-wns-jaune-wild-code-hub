import { useState } from "react";
import { REGISTER } from "@/requetes/mutations/auth.mutations";
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
  } from '@chakra-ui/react';
import components from "@/styles/theme/components";
import { 
    emailRegex,
    pseudoRegex,
    passwordRegex,
    checkRegex,
} from "@/regex";

const Register = () => {
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

    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
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
            // Code pour soumettre le formulaire si tout est valide
            console.log("totto")
        }
    }

    const togglePasswordVisibility  = () => {
        setShowPassword(!showPassword);
    }

    return (
        <Box {...components.Box.main}>
            <Box {...components.Box.containerBox} >
                <Text fontSize='5xl' color="white" as='b'>Welcome to Wild Code Hub !</Text >
                <Box {...components.Box.form} p={3}>
                    <main>
                        <form onSubmit={handleSubmit}>
                            <FormControl isInvalid={!!errors.lastname} mb={3}>
                                <FormLabel>Enter Last Name</FormLabel>
                                <Input type='text' name='lastname' value={formData.lastname} onChange={handleInputChange} />
                                <FormErrorMessage>{errors.lastname}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.firstname} mb={3}>
                                <FormLabel>Enter First Name</FormLabel>
                                <Input type='text' name='firstname' value={formData.firstname} onChange={handleInputChange} />
                                <FormErrorMessage>{errors.firstname}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.pseudo} mb={3}>
                                <FormLabel>Chosse your Pseudo</FormLabel>
                                <Input type='text' name='pseudo' value={formData.pseudo} onChange={handleInputChange} />
                                <FormErrorMessage>{errors.pseudo}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.email} mb={3}>
                                <FormLabel>Enter your Email</FormLabel>
                                <Input type='email' name='email' value={formData.email} onChange={handleInputChange} />
                                <FormErrorMessage>{errors.email}</FormErrorMessage>
                            </FormControl>
                                <FormControl isInvalid={!!errors.password} mb={3}>
                                    <FormLabel>Choose your Password</FormLabel>
                                    <InputGroup>
                                        <Input type={showPassword ? 'text' : 'password'} name='password' value={formData.password} onChange={handleInputChange} />
                                        <InputRightElement>
                                            <img onClick={togglePasswordVisibility} src={showPassword ? '/eyePasswordVisible.png' : '/eyePasswordNotVisible.png'} alt="Eye Password" style={{ cursor: "pointer" }} />
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                                </FormControl>
                                <Box textAlign="center">
                                <Button type="submit" variant="secondary" mt={3}>
                                    Submit
                                </Button>
                            </Box>
                        </form>
                    </main>
                </Box>
            </Box>
        </Box>
    );
}

export default Register;