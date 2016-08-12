import { Action } from '@ngrx/store';


interface QueryParams {
  symbols: string[];
  startDate: string;
  endDate: string;
}

export class StoreActions {
  public static LOAD_TO_STORE = 'Load to store';
  public static loadToStore(payload): Action {
    return {
      type: StoreActions.LOAD_TO_STORE,
      payload: payload
    }
  }

  public static REQUEST_DATA = 'Request data for given symbol';
  public static requestData(payload: QueryParams): Action {
    return {
      type:    StoreActions.REQUEST_DATA,
      payload: payload
    }
  }
}
