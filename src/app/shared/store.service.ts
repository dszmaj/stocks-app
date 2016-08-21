import {
  Observable,
  BehaviorSubject,
} from 'rxjs';
import * as _ from 'lodash';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { StoreActions } from './store.actions';


export interface State {
  preparedResults: PreparedForSymbol[],
  allSymbols:      string[],
  selectedSymbols: string[]
}

interface RawDatapoint {
  Symbol:    string,
  Date:      string,
  Open:      string,
  High:      string,
  Low:       string,
  Close:     string,
  Volume:    string,
  Adj_Close: string
}

interface PreparedForSymbol {
  Symbol:    string,
  Date:      Date[],
  Open:      number[],
  High:      number[],
  Low:       number[],
  Close:     number[],
  Volume:    number[],
  Adj_Close: number[]
}


@Injectable()
export class StoreService {
  private data: State = {
    preparedResults: [],
    allSymbols:      [],
    selectedSymbols: []
  };
  private store: BehaviorSubject<State> = new BehaviorSubject(this.data);
  public observe$: Observable<State> = this
    .store
    .asObservable()
    .share();

  // unnecessary step, included only for need of more sophisticated store
  dispatch(action: Action) {
    switch (action.type) {
      case StoreActions.LOAD_DATA_TO_STORE: {
        return this.reduce(action);
      }
      case StoreActions.LOAD_SYMBOLS_TO_STORE: {
        return this.reduce(action);
      }
      case StoreActions.SET_SELECTED: {
        return this.reduce(action);
      }
    }
  }

  reduce(action) {
    switch (action.type) {
      case StoreActions.LOAD_DATA_TO_STORE: {
        let payload = action.payload.query.results.quote;
        let temp  = {
          preparedResults: prepareResults(payload)
        };
        this.data = Object.assign(this.data, temp);
        return this.send(this.data);
      }
      case StoreActions.LOAD_SYMBOLS_TO_STORE: {
        let temp = {
          allSymbols:         []
        };
        action.payload.forEach(object => temp.allSymbols.push(object.Symbol));
        this.data = Object.assign(this.data, temp);
        return this.send(this.data);
      }
      case StoreActions.SET_SELECTED: {
        let temp = {
          selectedSymbols: action.payload
        };
        this.data = Object.assign(this.data, temp);
        return this.send(this.data);
      }
    }
  }

  send(data: State) {
    console.log('Application State: ', data);
    this.store.next(data);
  }
}


// what was meant to be RxJS showoff...
// being able to use ngrx/store and ngrx/effects I would close that behaviour in series of (side)Effects
// resulting in much cleaner and readable code
function prepareResults(data: RawDatapoint[]): PreparedForSymbol[] {
  let finalData = [];

  // observable of all datapoints with values converted to proper type
  let initial = Observable.from(data)
    .map(datapoint => {
      let temp       = Object.assign({}, datapoint);
      temp.Symbol    = datapoint.Symbol;
      temp.Date      = new Date(datapoint.Date);
      temp.Open      = parseFloat(datapoint.Open);
      temp.High      = parseFloat(datapoint.High);
      temp.Low       = parseFloat(datapoint.Low);
      temp.Close     = parseFloat(datapoint.Close);
      temp.Volume    = parseInt(datapoint.Volume);
      temp.Adj_Close = parseFloat(datapoint.Adj_Close);
      return temp;
    })
    .reduce((acc, curr) => {
      let temp = [].concat(acc);
      if (_.last(temp).Symbol === curr.Symbol) {
        temp = temp.concat([curr])
      } else {
        finalData.push(temp);
        temp = [].concat(curr);
      }
      return temp;
    })
    .subscribe(last => finalData.push(last));

  return finalData
}
