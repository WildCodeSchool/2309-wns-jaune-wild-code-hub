import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";

type AppearState = {
  email: string;
  role: string;
};

function AppearLogoutButton() {
  const [state, setState] = useState<AppearState>({ email: "", role: "role" });

  useEffect(() => {
    const email = Cookies.get("email") ?? "";
    const role = Cookies.get("role") ?? "role";
    setState({ email, role });
  }, [Cookies.get("email"), Cookies.get("role"), setState]);

  return state.email ? <LogoutButton /> : <></>;
}

export default AppearLogoutButton;
