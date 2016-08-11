import {
  Observable,
  BehaviorSubject,
} from 'rxjs';
import { Action } from '@ngrx/store';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { StoreActions } from './store.actions';


interface QueryParams {
  symbols: string[];
  startDate: string;
  endDate: string;
}

@Injectable()
export class StoreService {
  private data: Object = {};
  private store: BehaviorSubject<Object> = new BehaviorSubject(this.data);
  public observe$: Observable<Object> = this.store
    .asObservable()
    .distinctUntilChanged()
    .share();

  constructor(private http: Http) {}

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
          results:   action.payload.query.results
        };
        this.data = Object.assign(this.data, temp);
        return this.send(this.data);
      }
    }
  }

  send(data) {
    this.store.next(data);
  }

  getData(params: QueryParams): void {
    this.http.get(
      'https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.historicaldata where '
      + this.makeQuery(params) +
      '&format=json&diagnostics=false&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
    )
      .map((res: Response) => res.json())
      .subscribe(data => this.dispatch(StoreActions.loadToStore(data)));
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
    console.log(query);
    return query
  }
}
