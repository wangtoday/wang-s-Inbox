import { Inject, Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { DaigouService } from '../services/daigou.service';
import {
  DaigouActionTypes,
  DgGetListAction,
  DgListAction,
  DgChangeToTracking,
  DgAddToBuyAction,
  DgAddContactAction,
  DgUpdateContactAction
} from './daigou.actions';
import { mergeMap, map } from 'rxjs/operators';
import { NotificationOffAction } from 'src/app/store/notification.action';

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
  addContact$: Observable<Action> = this.action$.pipe(
    ofType(DaigouActionTypes.DAIGOU_ADD_CONTACT),
    mergeMap((action: DgAddContactAction) => {
      console.log(action.payload);
      return this.daigouService.addContact(action.payload).pipe(
        map(result => {
          console.log(result);
          this.store.dispatch(new NotificationOffAction());
          return new DgGetListAction(result);
        })
      );
    })
  );


  @Effect()
  updateContact$: Observable<Action> = this.action$.pipe(
    ofType(DaigouActionTypes.DAIGOU_UPDATE_CONTACT),
    mergeMap((action: DgUpdateContactAction) => {
      console.log(action.payload);
      return this.daigouService.updateContact(action.payload).pipe(
        map(result => {
          console.log(result);
          // this.store.dispatch(new NotificationOffAction());
          return new DgGetListAction(result);
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
          this.store.dispatch(new NotificationOffAction());
          return new DgGetListAction(result);
        })
      );
    })
  );

  @Effect()
  addToBuy$: Observable<Action> = this.action$.pipe(
    ofType(DaigouActionTypes.DAIGOU_ADD_TO_BUY),
    mergeMap((action: DgAddToBuyAction) => {
      return this.daigouService.addToBuy(action.payload).pipe(
        map((result: any) => {
          this.store.dispatch(new NotificationOffAction());
          return new DgGetListAction(result);
        })
      );
    })
  );

  constructor(
    private store: Store<any>,
    private action$: Actions,
    private daigouService: DaigouService
  ) {}
}
