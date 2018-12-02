import { Action } from "@ngrx/store";

export enum AuthActionTypes {
  AUTH_LOGIN = "[AUTH] login",
  AUTH_LOGIN_SUCCESS = "[AUTH] login success",
  AUTH_LOGIN_Failure = "[AUTH] login failure",
  AUTH_STATUS_CHECK = "[AUTH] status check",
  AUTH_STATUS = "[AUTH] status"
}

export class LoginAction implements Action {
  readonly type: string = AuthActionTypes.AUTH_LOGIN;
  constructor(public authenticate: { email: string; password: string }) {}
}

export class LoginSuccessAction implements Action {
  readonly type: string = AuthActionTypes.AUTH_LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LoginFailtureAction implements Action {
  readonly type: string = AuthActionTypes.AUTH_LOGIN_Failure;
  constructor() {}
}

export class AuthStatusCheckAction implements Action {
  readonly type: string = AuthActionTypes.AUTH_STATUS_CHECK;
  constructor() {}
}

export class AuthStatusAction implements Action {
  readonly type: string = AuthActionTypes.AUTH_STATUS;
  constructor(public payload: any) {}
}

export type AuthAction =
  | LoginAction
  | LoginSuccessAction
  | AuthStatusCheckAction
  | AuthStatusAction;
