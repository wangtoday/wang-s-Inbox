import { Action } from '@ngrx/store';

export enum DaigouActionTypes {
  DAIGOU_GET_LIST = '[DAIGOU] list',
  DAIGOU_LIST = '[DAIGOU] list'
}

export class DgGetListAction implements Action {
  readonly type: string = DaigouActionTypes.DAIGOU_GET_LIST;
  constructor(public payload: string) {}
}

export class DgListAction implements Action {
  readonly type: string = DaigouActionTypes.DAIGOU_LIST;
  constructor(public payload: any) {}
}

export type DaigouActionUion = DgGetListAction | DgListAction;
