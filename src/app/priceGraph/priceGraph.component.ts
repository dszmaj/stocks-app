import {
  OnInit,
  Component,
  OnDestroy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StoreService, State } from '../shared/store.service';


@Component({
  selector: 'price-graph',
  template: `
  <div class="container">
    <div class="row">
      <full-list></full-list>
      <div class="col-md-8">
        <ul 
          class="nav nav-tabs"
          *ngIf="selected.length > 0"
        >
          <li
            [class.active]="clickedIndex === i"
            *ngFor="let sel of selected; let i = index"
          >
            <a 
              (click)="clicked(i)"
            >
              <strong>{{ sel }}</strong>
            </a>
          </li>
        </ul>
        
        <div 
          class="tab-content" 
          *ngIf="data.length > 0"
        >
          <div
            class="tab-pane"
            [class.active]="clickedIndex === i"
            *ngFor="let dataSet of data; let i = index"
          >
            <stock-datepicker></stock-datepicker>
            <chart [chart_data]="dataSet"></chart>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})
export class PriceGraphComponent implements OnInit, OnDestroy {
  public _                               = _; // making lodash accessible in templates
  public clickedIndex: number            = 0;
  private filter$: Observable<State>     = this
    .store
    .observe$
    .filter(state => state.selected.length > 0 && state.results.length > 0);
  public selected                        = [];
  private selected$: Subscription        = this
    .filter$
    .map(state => state.selected)
    .subscribe(selected => {
      this.selected = selected
    });
  public data                            = []; // can't use async pipe in root route component
  private data$: Subscription            = this
    .filter$
    .map(state => state.results)
    .subscribe(data => {
      this.data = data
    });

  constructor(private store: StoreService) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.data$.unsubscribe();
    this.selected$.unsubscribe();
  }

  clicked(index) {
    this.clickedIndex = index;
  }
}
