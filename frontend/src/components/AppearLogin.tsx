import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Login from "@/pages/auth/login";
import { Box } from "@chakra-ui/react";

type AppearState = {
  email: string;
  id: string;
  pseudo: string;
  role: string;
};

function AuthPage() {
  const [state, setState] = useState<AppearState>({
    email: "",
    id: "",
    pseudo: "",
    role: "",
  });
  const router = useRouter();

  useEffect(() => {
    const email = Cookies.get("email") ?? "";
    const id = Cookies.get("id") ?? "";
    const pseudo = Cookies.get("pseudo") ?? "";
    const role = Cookies.get("role") ?? "";

    if (email || id || pseudo || role) {
      setState({ email, id, pseudo, role });
    }
    [
      Cookies.get("email"),
      Cookies.get("id"),
      Cookies.get("pseudo"),
      Cookies.get("role"),
      setState,
    ];
  }, []);

  return (
    <Box>
      <Login isConnected={!!state} />
    </Box>
  );
}

export default AuthPage;
