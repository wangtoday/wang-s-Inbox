import { Action } from '@ngrx/store';

export enum DaigouActionTypes {
  DAIGOU_GET_LIST = '[DAIGOU] get list',
  DAIGOU_LIST = '[DAIGOU] list',

  DAIGOU_CHANGE_TO_TRACKING = '[DAIGOU] toggle to tacking'
}

export class DgGetListAction implements Action {
  readonly type: string = DaigouActionTypes.DAIGOU_GET_LIST;
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
  | DgGetListAction
  | DgListAction
  | DgChangeToTracking;
