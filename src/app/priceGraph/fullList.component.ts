import {
  OnInit,
  Renderer,
  Component,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import * as d3 from 'd3';
import * as _ from 'lodash';
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
  @ViewChild('sel') select: ElementRef;
  private symbols: Observable<string[]>;

  constructor(
    private http: Http,
    private renderer: Renderer,
    private store: StoreService,
    private utils: UtilsService
  ) {
    this.symbols = store.observe$
      .map(state => state.allSymbols);
  }

  ngOnInit() {
    // initial data for placeholder chart
    this.getSymbols(['CSCO']);

    // hacked csv parsing
    // normally I would create server endpoint that will download, parse, store and serve as JSON
    Observable
      .bindCallback(d3.csv)('nasdaq.csv')
      .subscribe(data => this.store.dispatch(StoreActions.loadSymbols(data[1])));
  }

  selectedOptions() {
    let selections = this.select.nativeElement.selectedOptions;
    while (selections.length > 3) {
      this.renderer.setElementProperty(_.last(selections), 'selected', false);
    }
    this.getSymbols(_.map(selections, option => option.value));
  }

  getSymbols(symbols: string[]): void {
    this.store.dispatch(StoreActions.setSelected(symbols));
    this.http.get(this.utils.makeQuery({
      symbols:   symbols,
      startDate: '2010-01-01',
      endDate:   '2010-06-01'
    }))
      .map(data => data.json())
      .subscribe(data => this.store.dispatch(StoreActions.loadToStore(data)));
  }
}
