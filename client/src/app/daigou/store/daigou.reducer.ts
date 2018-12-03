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
      return {
        dUserList: (<DgListAction>action).payload.dUserList,
        dTrackingList: (<DgListAction>action).payload.dTrackingList,
        dToBuyList: (<DgListAction>action).payload.dToBuyList,
      };

    default:
      return state;
  }
}
