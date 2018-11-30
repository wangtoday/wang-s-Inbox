import { Action } from "@ngrx/store";

export const AUTH_LOGIN = "[AUTH] login";

export class LoginAction implements Action {
  readonly type: string;
  constructor(public authenticate: any) {}
}

export type AuthAction = LoginAction;
