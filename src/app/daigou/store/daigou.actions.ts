import { Action } from '@ngrx/store';

export enum DaigouActionTypes {
  DAIGOU_GET_LIST = '[DAIGOU] get list',
  DAIGOU_LIST = '[DAIGOU] list',

  DAIGOU_ADD_CONTACT = '[DAIGOU] add contact',

  DAIGOU_UPDATE_CONTACT = '[DAIGOU] update contact',

  DAIGOU_ADD_TO_BUY = '[DAIGOU] add to buy',

  DAIGOU_CHANGE_TO_TRACKING = '[DAIGOU] toggle to tacking'
}

export class DgUpdateContactAction implements Action {
  readonly type: string = DaigouActionTypes.DAIGOU_UPDATE_CONTACT;
  constructor(public payload: any) {}
}

export class DgAddContactAction implements Action {
  readonly type: string = DaigouActionTypes.DAIGOU_ADD_CONTACT;
  constructor(public payload: any) {}
}

export class DgGetListAction implements Action {
  readonly type: string = DaigouActionTypes.DAIGOU_GET_LIST;
  constructor(public payload: string) {}
}

export class DgAddToBuyAction implements Action {
  readonly type: string = DaigouActionTypes.DAIGOU_ADD_TO_BUY;
  constructor(public payload: string) {}
}

export class DgChangeToTracking implements Action {
  readonly type: string = DaigouActionTypes.DAIGOU_CHANGE_TO_TRACKING;
  constructor(public payload: string) {}
}

export class DgListAction implements Action {
  readonly type: string = DaigouActionTypes.DAIGOU_LIST;
  constructor(public payload: any) {}
}

export type DaigouActionUion =
  | DgAddContactAction
  | DgUpdateContactAction
  | DgGetListAction
  | DgAddToBuyAction
  | DgListAction
  | DgChangeToTracking;
