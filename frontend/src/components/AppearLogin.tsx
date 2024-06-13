import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";

type AppearStateLogin = {
  login: boolean;
};

function AppearLoginButton() {
  const [state, setState] = useState<AppearStateLogin>({ login: true });

  useEffect(() => {
    const loginActive = Cookies.get("login");
    setState({ login: !loginActive });
  }, [Cookies.get("login")]);

  return <>{state.login && <Login />};</>;
}

export default AppearLoginButton;
