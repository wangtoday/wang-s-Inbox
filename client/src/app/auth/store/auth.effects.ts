import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import {
  catchError,
  map,
  mergeMap,
  concatMap,
  switchMap,
  concatMapTo,
  flatMap
} from "rxjs/operators";

import { Action } from "@ngrx/store";
import {
  AuthActionTypes,
  LoginSuccessAction,
  LoginAction,
  LoginFailtureAction,
  AuthStatusAction
} from "./auth.actions";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  // Note: 之前卡在这个地了一下, 原因是没有给这个login$赋值, 就会报错, 找不到pipe
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.AUTH_LOGIN),
    flatMap((action: LoginAction) =>
      this.authService.login(action.authenticate)
    ),
    flatMap((result: any) => {
      // console.log("第一个obv", result);
      return this.authService.userdeatail(result.uid).pipe(
        map(rr => {
          // navigate to the core page
          return new LoginSuccessAction(rr);
        })
      );
      // Note: 登录成功, 那么这里就跳转到主页面.
    })
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.AUTH_LOGIN_SUCCESS),
    map(result => {
      this.router.navigateByUrl("/core");
      // console.log("result:", result);
    })
  );

  @Effect()
  status$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.AUTH_STATUS_CHECK),
    mergeMap(action => this.authService.loginStatus()),
    mergeMap(result => {
      return this.authService.userdeatail(result.uid).pipe(
        map(data => {
          // console.log("", data);
          if (data) {
            // console.log(data);
            return new AuthStatusAction({
              status: true,
              user: data
            });
          }
          // todo: 这个地方后面再进行操作吧
          return new LoginFailtureAction();
        })
      );
    })
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthService
  ) {}
}
