import {
  AuthAction,
  AuthActionKind,
  AuthState,
} from "../types/models/AuthReducerType";

export default function AuthReducer(
  state: AuthState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case AuthActionKind.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
      };
    case AuthActionKind.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      throw new Error(
        `Action ${action.type} not supported and unknown action type`
      );
  }
}
