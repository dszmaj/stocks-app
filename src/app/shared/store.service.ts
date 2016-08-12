import {
  Observable,
  BehaviorSubject,
} from 'rxjs';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { StoreActions } from './store.actions';


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
    }
  }

  send(data) {
    this.store.next(data);
  }
}
