import {
  Component,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  Observable,
  Subscription
} from 'rxjs';
import {
  State,
  StoreService
} from '../shared/store.service';
import * as _ from 'lodash';

@Component({
  selector: 'data-table-for-stock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <!-- Nav tabs -->
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
      
        <!-- Tab panes -->
        <div 
          class="tab-content" 
          *ngIf="data.length > 0"
        >
          <div
            class="tab-pane"
            [class.active]="clickedIndex === i"
            *ngFor="let dataSet of data; let i = index"
          >
            <table class="table table-bordered table-condensed table-striped">
              <tr>
                <th
                  *ngFor="let header of _.keys(_.first(dataSet))"
                >{{ header }}</th>
              </tr>
              <tr
                *ngFor="let row of dataSet"
              >
                <td
                  *ngFor="let value of _.values(row); let hi = index"
                >
                  <span *ngIf="hi == 6 || hi == 0">{{ value }}</span>
                  <span *ngIf="hi == 1">{{ value | date:'longDate' }}</span>
                  <span *ngIf="hi != 1 && hi != 6 && hi != 0">{{ value | currency:'USD':true }}</span>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})
export class DataTableForStockComponent implements OnDestroy {
  public _ = _; // making lodash accessible in templates
  public clickedIndex: number = 0;
  private filter$: Observable<State> = this
    .store
    .observe$
    .filter(state => state.selected.length > 0 && state.results.length > 0);
  public selected = [];
  private selected$: Subscription = this
    .filter$
    .map(state => state.selected)
    .subscribe(selected => {
      this.selected = selected});
  public data = []; // can't use async pipe in root route component
  private data$: Subscription = this
    .filter$
    .map(state => state.results)
    .subscribe(data => {
      this.data = data});

  constructor(private store: StoreService) {}

  ngOnDestroy() {
    this.data$.unsubscribe();
    this.selected$.unsubscribe();
  }

  clicked(index) {
    this.clickedIndex = index;
  }
}
