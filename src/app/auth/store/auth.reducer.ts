import { initialState, AuthState } from "./auth.state";
import {
  AuthAction,
  AuthActionTypes,
  LoginSuccessAction,
  AuthStatusAction
} from "./auth.actions";

export function authReducer(
  state: AuthState = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    //   TODO: 这里后面还要进行一些操作才可以
    // case AuthActionTypes.AUTH_LOGIN:
    //   return {
    //     ...state
    //     // modify properties here
    //   };
    // more actions

    case AuthActionTypes.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        ...{
          status: true,
          user: (<LoginSuccessAction>action).payload
        }
      };

    case AuthActionTypes.AUTH_LOGIN_Failure:
      return {
        ...state,
        ...{
          status: false,
          user: null
        }
      };

    case AuthActionTypes.AUTH_STATUS:
      return {
        ...state,
        ...{
          status: (<AuthStatusAction>action).payload.status,
          user: (<AuthStatusAction>action).payload.user
        }
      };

    //命名为获取status, 我还是更习惯这个用法
    // NOTE: 不需要这个, 原因是我再effect里面对status的这个disptach进行操作
    // 好处就是会弹出来新的state
    // case AuthActionTypes.AUTH_STATUS:
    //   return state;
    default:
      return state;
  }
}
