import { initialState, AuthState } from "./auth.state";
import { AuthAction, AUTH_LOGIN } from "./auth.actions";
import { ActionReducerMap } from "@ngrx/store";

export function authReducer(
  state: AuthState = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    //   TODO: 这里后面还要进行一些操作才可以
    case AUTH_LOGIN:
      return {
        ...state
        // modify properties here
      };
    // more actions
    default:
      return state;
  }
}
