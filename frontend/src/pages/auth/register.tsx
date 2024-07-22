/* eslint-disable @next/next/no-img-element */
import { checkRegex, emailRegex, passwordRegex, pseudoRegex } from "@/regex";
import { REGISTER } from "@/requetes/mutations/auth.mutations";
import components from "@/styles/theme/components";
import {
  CreateUserInput,
  RegisterMutation,
  RegisterMutationVariables,
} from "@/types/graphql";
import { useMutation } from "@apollo/client";
import { Box, Button, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { PasswordInput } from "@/components/Inputs/PasswordInput";
import { TextInput } from "@/components/Inputs/TextInput";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    pseudo: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    lastname: "",
    firstname: "",
    pseudo: "",
    email: "",
    password: "",
  });

  const [register, { error }] = useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(REGISTER, {
    onCompleted: (data) => {
      console.log(data);
      router.push("/auth/login");
    },
    onError(error) {
      console.log(error.message);
      const newErrors = {
        lastname: "",
        firstname: "",
        pseudo: "",
        email: "",
        password: "",
      };
      if (error.message === "This email and pseudo is already in use!") {
        newErrors.email += "This email is already in use !";
        newErrors.pseudo += "This pseudo is already in use !";
      } else if (error.message === "This email is already in use!") {
        newErrors.email += "This email is already in use !";
      } else if (error.message === "This pseudo is already in use!") {
        newErrors.pseudo += "This pseudo is already in use !";
      }

      for (const key in newErrors) {
        if (newErrors[key as keyof typeof newErrors] === "") {
          delete newErrors[key as keyof typeof newErrors];
        }
      }

      setErrors(newErrors);
    },
  });

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      lastname: "",
      firstname: "",
      pseudo: "",
      email: "",
      password: "",
    };

    // Vérification des champs
    if (!formData.lastname.trim()) {
      newErrors.lastname += "Last name is required. ";
    }

    if (formData.lastname.length < 2 || formData.lastname.length > 20) {
      newErrors.lastname += "2 - 50 characters for lastname. ";
    }

    if (!formData.firstname.trim()) {
      newErrors.firstname += "First name is required. ";
    }

    if (formData.firstname.length < 2 || formData.firstname.length > 20) {
      newErrors.firstname += "2 - 50 characters for firstname. ";
    }

    if (!formData.pseudo.trim()) {
      newErrors.pseudo += "Pseudo is required. ";
    }

    if (formData.pseudo.length < 2 || formData.pseudo.length > 20) {
      newErrors.pseudo += "2 - 20 characters for pseudo. ";
    }

    if (!checkRegex(pseudoRegex, formData.pseudo)) {
      newErrors.pseudo += "Invaid format pseudo.";
    }

    if (!formData.email.trim()) {
      newErrors.email += "Email is required. ";
    }

    if (!checkRegex(emailRegex, formData.email)) {
      newErrors.email += "Invaid format email. ";
    }

    if (!formData.password.trim()) {
      newErrors.password += "Password is required. ";
    }

    if (formData.password.length < 8) {
      newErrors.password += "8 minimum characters for password. ";
    }

    if (!checkRegex(passwordRegex, formData.password)) {
      newErrors.password +=
        "Requires at least 1 uppercase letter, 1 number, and 1 special character. ";
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
          },
        },
      });
    }
  };

  return (
    <Box
      {...components.Box.main}
      bgColor={"background"}
      bgRepeat={"no-repeat"}
      bgImage="url(/BGForm.png)"
    >
      <Box {...components.Box.containerBox} p={30}>
        <Heading margin={"2rem 0 2rem 0"}>Welcome to Wild Code Hub !</Heading>

        <main
          style={{
            width: "100%",
            paddingInline: "6rem",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
            }}
          >
            <TextInput
              label="Enter Last Name"
              error={errors.lastname}
              name="lastname"
              onChange={handleInputChange}
            />
            <TextInput
              label="Enter First Name"
              error={errors.firstname}
              name="firstname"
              onChange={handleInputChange}
            />
            <TextInput
              label="Choose your Pseudo"
              error={errors.pseudo}
              value={formData.pseudo}
              name="pseudo"
              onChange={handleInputChange}
            />
            <TextInput
              inputType="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              label="Enter your Email"
            />
            <PasswordInput
              label="Choose your Password"
              name="password"
              value={formData.password}
              error={errors.password}
              onChange={handleInputChange}
            />

            <Box textAlign="center">
              <Button type="submit" variant="secondary" mt={2}>
                Submit
              </Button>
            </Box>
          </form>
        </main>
      </Box>
    </Box>
  );
};

export default Register;
