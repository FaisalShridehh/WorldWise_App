import { createContext, useReducer } from "react";
import { UserType } from "../../types/models/User";
import AuthReducer from "../../Reducers/AuthReducer";
import { AuthActionKind, AuthState } from "../../types/models/AuthReducerType";

interface AuthContextIF {
  user: {
    name: string;
    email: string;
    password: string;
    avatar: string;
  } | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}
const FAKE_USER: UserType = {
  name: import.meta.env.VITE_NAME,
  email: import.meta.env.VITE_EMAIL,
  password: import.meta.env.VITE_PASSWORD,
  avatar: import.meta.env.VITE_AVATAR,
};

export const AuthContext = createContext<AuthContextIF | undefined>(undefined);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  function login(email: string, password: string): void {
    if (email === "jack@example.com" && password === "qwerty") {
      dispatch({
        type: AuthActionKind.LOGIN,
        payload: { user: FAKE_USER, isAuthenticated: true },
      });
    }
  }

  function logout(): void {
    dispatch({
      type: AuthActionKind.LOGOUT,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
