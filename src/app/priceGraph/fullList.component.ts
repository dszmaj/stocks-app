import {
  OnInit,
  Component,
  ChangeDetectionStrategy, Output, EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { UtilsService } from '../shared/utils.service';

declare const d3;

@Component({
  selector: 'full-list',
  host: {
    'class': 'col-md-2',
    //'style': 'display: block;'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <h3>Symbols:</h3>
  <p><small>Select max. 3</small></p>
  <select multiple class="form-control">
    <option *ngFor="let symbol of symbols | async; let i = index">{{ symbol.Symbol }}</option>
  </select>
  `
})
export class FullListComponent implements OnInit {
  @Output() currentSelection: EventEmitter<Object> = new EventEmitter();

  // dirty hack, couldn't find solution for csv parsing that works in browser and is nice for webpack ;)
  // YQL doesnt provide a way for quickly fetching symbol list with one query
  private getObservable = Observable.bindCallback(d3.csv);
  private symbols: Observable<Object> = this
    .getObservable('//www.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=nasdaq&render=download')
    .map(data => data[1]);

  constructor(
    private http: Http,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    this.http.get(this.utils.makeQuery({
      symbols:   ['CSCO'],
      startDate: '2010-01-01',
      endDate:   '2010-06-01'
    })).subscribe(data => this.currentSelection.emit(data.json()));
  }
}
