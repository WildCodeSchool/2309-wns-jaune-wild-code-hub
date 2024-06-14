import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

type AppearStateLogin = {
  login: boolean;
};

function AppearLoginButton() {
  const [state, setState] = useState<AppearStateLogin>({ login: false });

  useEffect(() => {
    const loginActive = Cookies.get("login");
    setState({ login: !loginActive });
  }, []);

  return <>{state.login && <button>Login</button>}</>;
}

export default AppearLoginButton;
