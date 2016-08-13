import { Action } from '@ngrx/store';


export class StoreActions {
  public static LOAD_TO_STORE = 'Load to store';
  public static loadToStore(payload): Action {
    return {
      type:    StoreActions.LOAD_TO_STORE,
      payload: payload
    }
  }

  public static LOAD_SYMBOLS_TO_STORE = 'Load parsed symbols to store';
  public static loadSymbols(payload): Action {
    return {
      type:    StoreActions.LOAD_SYMBOLS_TO_STORE,
      payload: payload
    }
  }
}
