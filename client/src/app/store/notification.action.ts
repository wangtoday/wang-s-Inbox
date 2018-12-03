import { Action } from '@ngrx/store';

export enum NotificationActionTypes {
  NOTIFI_ON = '[NOTIFICATION] on',
  NOTIFI_OFF = '[NOTIFICATION] off'
}

export class NotificationOnAction implements Action {
  readonly type: string = NotificationActionTypes.NOTIFI_ON;
  constructor() {}
}

export class NotificationOffAction implements Action {
  readonly type: string = NotificationActionTypes.NOTIFI_OFF;
  constructor() {}
}

export type NotificationAction = NotificationOffAction | NotificationOnAction;
