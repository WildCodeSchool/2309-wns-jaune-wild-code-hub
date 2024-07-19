import { AuthContext } from "@/contextes/AuthContext";
import { useContext } from "react";

function useUser() {
  const context = useContext(AuthContext);
  return context;
}
export default useUser;
