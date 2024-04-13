import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";

export function useAuth() {
  const authContext = useContext(AuthContext);
  if (authContext === undefined)
    throw new Error('there is an error in using "Context"');
  return authContext;
}
