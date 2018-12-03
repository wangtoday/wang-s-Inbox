import { Inject, Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { DaigouService } from '../services/daigou.service';
import {
  DaigouActionTypes,
  DgGetListAction,
  DgListAction,
  DgChangeToTracking
} from './daigou.actions';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class DaigouEffects {
  @Effect()
  getListDaigou$: Observable<Action> = this.action$.pipe(
    ofType(DaigouActionTypes.DAIGOU_GET_LIST),
    mergeMap((action: DgGetListAction) => {
      return this.daigouService.consumeDaigouTable(action.payload).pipe(
        map(result => {
          return new DgListAction(result);
        })
      );
    })
  );

  @Effect()
  changeToTracking$: Observable<Action> = this.action$.pipe(
    ofType(DaigouActionTypes.DAIGOU_CHANGE_TO_TRACKING),
    mergeMap((action: DgChangeToTracking) => {
      return this.daigouService.updateDaigouTable(action.payload).pipe(
        map((result: any) => {
          return new DgGetListAction(result);
        })
      );
    })
  );

  constructor(private action$: Actions, private daigouService: DaigouService) {}
}
