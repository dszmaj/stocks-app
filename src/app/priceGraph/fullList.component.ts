import {
  OnInit,
  Output,
  Component,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  State,
  StoreService
} from '../shared/store.service';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { UtilsService } from '../shared/utils.service';
import { StoreActions } from '../shared/store.actions';

declare const d3;

@Component({
  selector: 'full-list',
  host: {'class': 'col-md-2'},
  styles: [`select {height: 400px;}`],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <h3>Symbols:</h3>
  <p><small>Select max. 3</small></p>
  <select multiple class="form-control">
    <option *ngFor="let symbol of symbols | async">{{ symbol }}</option>
  </select>
  `
})
export class FullListComponent implements OnInit {
  private symbols: Observable<State> = this.store.observe$.map(state => state.symbols);
  @Output() currentSelection: EventEmitter<Object> = new EventEmitter();

  constructor(
    private http: Http,
    private store: StoreService,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    this.http.get(this.utils.makeQuery({
      symbols:   ['CSCO'],
      startDate: '2010-01-01',
      endDate:   '2010-06-01'
    }))
      .map(data => data.json())
      .do(data => this.store.dispatch(StoreActions.loadToStore(data)))
      .subscribe(data => this.currentSelection.emit(data));
    let nasdaq = '//www.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=nasdaq&render=download';
    Observable
      .bindCallback(d3.csv)(nasdaq)
      .subscribe(data => this.store.dispatch(StoreActions.loadSymbols(data[1])));
  }
}
