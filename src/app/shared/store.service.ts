import {
  Observable,
  BehaviorSubject,
} from 'rxjs';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { StoreActions } from './store.actions';


declare const d3;

@Injectable()
export class StoreService {
  private data: Object = {};
  private store: BehaviorSubject<Object> = new BehaviorSubject(this.data);
  public observe$: Observable<Object> = this.store.asObservable().distinctUntilChanged().share();

  dispatch(action: Action) {
    switch (action.type) {
      case StoreActions.LOAD_TO_STORE: {
        return this.reduce(action);
      }
    }
  }

  reduce(action) {
    switch (action.type) {
      case StoreActions.LOAD_TO_STORE: {
        let temp  = {
          results:   action.payload.query.results.quote
        };
        this.data = Object.assign(this.data, temp);
        return this.send(this.data);
      }
      case StoreActions.REQUEST_DATA: {

      }
    }
  }

  a() {
    d3.json(this.makeQuery({
      symbols:   ['YHOO', 'CSCO', 'MSFT'],
      startDate: '2010-01-01',
      endDate:   '2010-06-01'
    }), data => this.renderChart(data))
  }

  send(data) {
    this.store.next(data);
  }

  private makeQuery(params: QueryParams): string {
    let symbolPart: string;
    let query: string;

    if (params.symbols.length === 1) {
      symbolPart = '= "' + params.symbols[0] + '"'
    } else if (params.symbols.length > 1) {
      symbolPart = 'in ("' + params.symbols.join('", "') + '")'
    }
    query = 'symbol '
      + symbolPart +
      ' and startDate = "'
      + params.startDate +
      '" and endDate = "'
      + params.endDate +
      '"';
    return 'https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.historicaldata where ' + query +
      '&format=json&diagnostics=false&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
  }
}
