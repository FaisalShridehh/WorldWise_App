import { UserType } from "./User";

// An enum with all the types of actions to use in our reducer
export enum AuthActionKind {
  LOGIN = "login",
  LOGOUT = "logout",
}
// An interface for our state
export interface AuthState {
  user: UserType | null | undefined;
  isAuthenticated: boolean | undefined;
}

export interface AuthAction {
  type: AuthActionKind;
  payload?: AuthState | null;
}
