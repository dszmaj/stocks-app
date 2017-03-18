import { Action } from './store.service';


export class StoreActions {
  public static LOAD_DATA_TO_STORE = 'Load to store';
  public static loadToStore(payload): Action {
    return {
      type:    StoreActions.LOAD_DATA_TO_STORE,
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

  public static SET_SELECTED = 'Set currently selected symbols in store';
  public static setSelected(payload): Action {
    return {
      type:    StoreActions.SET_SELECTED,
      payload: payload
    }
  }
}
