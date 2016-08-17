// for some reason this operator is not included in Observable.prototype by default
import 'rxjs/add/operator/pairwise';
import {
  Observable,
  BehaviorSubject,
} from 'rxjs';
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
  Symbol:          string,
  Date:            Date[],
  Open:            number[],
  High:            number[],
  Low:             number[],
  Close:           number[],
  Volume:          number[],
  Adj_Close:       number[]
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
    console.log(data);
    this.store.next(data);
  }
}


// what was meant to be RxJS showoff...
// being able to use ngrx/store and ngrx/effects I would close that behaviour in series of (side)Effects
// resulting in much cleaner and readable code
function prepareResults(data: RawDatapoint[]): PreparedForSymbol[] {
  let finalData = [];

  console.log('initial data: ', data.length);
  // observable of all datapoints with values converted to proper type
  let initial = Observable.from(data)
    .map(datapoint => {
      let temp       = Object.assign({}, datapoint);
      temp.Symbol    = datapoint.Symbol;
      temp.Date      = [new Date(datapoint.Date)];
      temp.Open      = [parseFloat(datapoint.Open)];
      temp.High      = [parseFloat(datapoint.High)];
      temp.Low       = [parseFloat(datapoint.Low)];
      temp.Close     = [parseFloat(datapoint.Close)];
      temp.Volume    = [parseInt(datapoint.Volume)];
      temp.Adj_Close = [parseFloat(datapoint.Adj_Close)];
      return temp;
    })
    .reduce((acc, curr) => {
      let temp = Object.assign({}, acc);
      if (acc.Symbol === curr.Symbol) {
        temp.Symbol    = curr.Symbol;
        temp.Date      = temp.Date.concat(curr.Date);
        temp.Open      = temp.Open.concat(curr.Open);
        temp.High      = temp.High.concat(curr.High);
        temp.Low       = temp.Low.concat(curr.Low);
        temp.Close     = temp.Close.concat(curr.Close);
        temp.Volume    = temp.Volume.concat(curr.Volume);
        temp.Adj_Close = temp.Adj_Close.concat(curr.Adj_Close);
      } else {
        finalData.push(temp);
        temp = Object.assign({}, curr);
      }
      return temp;
    })
    .subscribe(last => finalData.push(last));

  return finalData
}
