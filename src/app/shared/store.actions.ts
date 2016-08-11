import { Action } from '@ngrx/store';


export class StoreActions {
  public static LOAD_TO_STORE = 'Load to store';
  public static loadToStore(payload): Action {
    return {
      type: StoreActions.LOAD_TO_STORE,
      payload: payload
    }
  }
}
