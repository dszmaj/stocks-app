import {
  Observable,
  BehaviorSubject,
} from 'rxjs';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { StoreActions } from './store.actions';

export interface State {
  results: Object[],
  symbols: string[]
}


@Injectable()
export class StoreService {
  private data: State = {
    results: [],
    symbols: []
  };
  private store: BehaviorSubject<State> = new BehaviorSubject(this.data);
  public observe$: Observable<State> = this
    .store
    .asObservable()
    .share();

  dispatch(action: Action) {
    switch (action.type) {
      case StoreActions.LOAD_TO_STORE: {
        return this.reduce(action);
      }
      case StoreActions.LOAD_SYMBOLS_TO_STORE: {
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
      case StoreActions.LOAD_SYMBOLS_TO_STORE: {
        let temp = {
          symbols: []
        };
        action.payload.forEach(object => temp.symbols.push(object.Symbol));
        this.data = Object.assign(this.data, temp);
        return this.send(this.data);
      }
    }
  }

  send(data) {
    this.store.next(data);
  }
}
