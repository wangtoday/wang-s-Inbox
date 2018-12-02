import { intitalDaiGouState, DaiGouState } from './daigou.state';
import {
  DaigouActionUion,
  DaigouActionTypes,
  DgListAction
} from './daigou.actions';

export function daigouReducer(
  state: DaiGouState = intitalDaiGouState,
  action: DaigouActionUion
): DaiGouState {
  switch (action.type) {
    case DaigouActionTypes.DAIGOU_LIST:
      console.log('come DAIGOU_LIST');
      return { list: (<DgListAction>action).payload };

    default:
      return state;
  }
}
