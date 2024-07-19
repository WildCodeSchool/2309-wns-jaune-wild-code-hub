import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface IAuthContext {
  email?: string;
  role?: string;
  pseudo?: string;
  id?: string;
}

export const AuthContext = createContext({} as IAuthContext);

function AuthProvider({ children }: React.PropsWithChildren) {
  const [state, setState] = useState<IAuthContext>({});

  useEffect(() => {
    const email = Cookies.get("email");
    const role = Cookies.get("role");
    const pseudo = Cookies.get("pseudo");
    const id = Cookies.get("id");

    setState({
      email,
      role,
      pseudo,
      id,
    });
  }, [Cookies.get("email")]);
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
export default AuthProvider;
