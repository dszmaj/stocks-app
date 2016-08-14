import {
  OnInit,
  Output,
  Component,
  ViewChild,
  ElementRef,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import * as d3 from 'd3';
import * as last from 'lodash.last';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { StoreService } from '../shared/store.service';
import { UtilsService } from '../shared/utils.service';
import { StoreActions } from '../shared/store.actions';


@Component({
  selector: 'full-list',
  host: {'class': 'col-md-2'},
  styles: [`select {height: 300px;}`],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <h3>Symbols:</h3>
  <p><small>Select max. 3</small></p>
  <select multiple class="form-control" #sel (click)="selectedOptions()">
    <option *ngFor="let symbol of symbols | async">{{ symbol }}</option>
  </select>
  `
})
export class FullListComponent implements OnInit {
  private symbols: Observable<string[]> = this.store.observe$.map(state => state.symbols);
  @Output() currentSelection: EventEmitter<Object> = new EventEmitter();
  @ViewChild('sel') select: ElementRef;

  constructor(
    private http: Http,
    private store: StoreService,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    // initial data for placeholder chart
    this.http.get(this.utils.makeQuery({
      symbols:   ['CSCO'],
      startDate: '2010-01-01',
      endDate:   '2010-06-01'
    }))
      .map(data => data.json())
      .do(data => this.store.dispatch(StoreActions.loadToStore(data)))
      .subscribe(data => this.currentSelection.emit(data));

    // hacked csv parsing
    // normally I would create server endpoint that will download, parse, store and serve as JSON
    Observable
      .bindCallback(d3.csv)('nasdaq.csv')
      .subscribe(data => this.store.dispatch(StoreActions.loadSymbols(data[1])));
  }

  selectedOptions() {
    let selections = this.select.nativeElement.selectedOptions;
    while (selections.length > 3) {
      last(selections).selected = false;
    }
  }
}
