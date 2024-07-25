import Link from "next/link";
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
  Toast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import components from "@/styles/theme/components";
import toast from "react-hot-toast";
import Login from "@/pages/auth/login";

type ForgotPasswordInputs = {
  email: string;
  pseudo: string;
};

const ForgotPasswordForm = () => {
  const router = useRouter();
};

const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm<ForgotPasswordInputs>();

const onSubmit = async (data: ForgotPasswordInputs) => {
  try {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("There was an error sending the reeset password");
    }
    toast.success(
      "If the email is associated with an account, a password reset email will be sent."
    ); // Faire des Toast component
    <Link href="/auth/register"></Link>; // Optionally, redirect to the login page or a page that says 'Check your email'
  } catch (error: any) {
    toast.error(error.message || "Failed to send reset password email."); // Faire des Toast component
  }
  return (
    <div className="max-w-sm">
      <Box
        {...components.Box.containerBox}
        bgColor={"background"}
        bgRepeat={"no-repeat"}
        bgImage="url(/BGForm.png)"
      >
        <Box {...components.Box.containerBox} p={30}>
          <Text>Forgot Password</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input color="placeholder" bg="white" type="email" id="email" />
            {errors.email && (
              <p className="text-error">{errors.email.message}</p>
            )}
            <div>
              <button type="submit" disabled={isSubmitting} color="primary">
                {isSubmitting ? (
                  <span className=" loading loading-spinner"></span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
          <div>
            Remembered your password? {""}
            <Link href="/auth/register">
              <button className="link"> Sign in</button>
            </Link>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default ForgotPasswordForm;
