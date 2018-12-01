import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  AUTH_LOGIN = '[AUTH] login',
  AUTH_LOGIN_SUCCESS = '[AUTH] login success',
  AUTH_STATUS = '[AUTH] status'
}

export class LoginAction implements Action {
  readonly type: string = AuthActionTypes.AUTH_LOGIN;
  constructor(public authenticate: { email: string; password: string }) {}
}

export class LoginSuccessAction implements Action {
  readonly type: string = AuthActionTypes.AUTH_LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class AuthStatusAction implements Action {
  readonly type: string = AuthActionTypes.AUTH_STATUS;
}

export type AuthAction = LoginAction | LoginSuccessAction | AuthStatusAction;
