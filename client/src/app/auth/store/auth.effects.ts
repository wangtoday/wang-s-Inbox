import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import {
  AuthActionTypes,
  LoginSuccessAction,
  LoginAction,
  LoginFailtureAction
} from './auth.actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  // Note: 之前卡在这个地了一下, 原因是没有给这个login$赋值, 就会报错, 找不到pipe
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.AUTH_LOGIN),
    mergeMap((action: LoginAction) => {
      return this.authService.login(action.authenticate).then(value => {
        return new LoginSuccessAction(value );
      });
    })
  );

  @Effect()
  status$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.AUTH_STATUS),
    mergeMap(action => {
      return this.authService.loginStatus().pipe(
        map(data => {
          if (data) {
            return new LoginSuccessAction(data);
          }
          return new LoginFailtureAction();
        })
      );
    })
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
