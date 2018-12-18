import { NotificationState, intialState } from './notification.state';
import { Action } from '@ngrx/store';
import { NotificationActionTypes } from './notification.action';

export function notificationReducer(
  state: NotificationState = intialState,
  action: Action
) {
  switch (action.type) {
    case NotificationActionTypes.NOTIFI_ON:
      return {
        ...state,
        ...{
          loading: true
        }
      };

    case NotificationActionTypes.NOTIFI_OFF:
      return {
        ...state,
        ...{
          loading: false
        }
      };
    default:
      return state;
  }
}
