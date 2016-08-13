import {
  OnInit,
  Output,
  Component,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { UtilsService } from '../shared/utils.service';

declare const d3;

@Component({
  selector: 'full-list',
  host: {'class': 'col-md-2'},
  styles: [`
    select {
      height: 400px;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
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
  private symbols: Observable<Object[]>;
  @Output() currentSelection: EventEmitter<Object> = new EventEmitter();

  constructor(
    private http: Http,
    private utils: UtilsService
  ) {
    let getObservable = Observable.bindCallback(d3.csv);
    this.symbols = getObservable('//www.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=nasdaq&render=download')
      .map(data => data[1]);
  }

  ngOnInit() {
    this.http.get(this.utils.makeQuery({
      symbols:   ['CSCO'],
      startDate: '2010-01-01',
      endDate:   '2010-06-01'
    })).subscribe(data => this.currentSelection.emit(data.json()));
  }
}
