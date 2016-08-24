import {
  Component,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { StoreService } from '../shared/store.service';

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
          *ngIf="data.length > 0"
        >
          <li
            [class.active]="clickedIndex === i"
            *ngFor="let dataSet of data; let i = index"
          >
            <a 
              (click)="clicked(i)"
            ><strong>{{ _.first(dataSet).Symbol }}</strong></a>
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
  _ = _; // making lodash accessible in templates
  public data = []; // can't use async pipe subscribing to the same property in 2 places in template despite of multicasting
  public clickedIndex: number = 0;
  private sub: Subscription = this.store.observe$
    .map(state => state.preparedResults)
    .filter(results => results.length > 0)
    .subscribe(results => this.data = results);

  constructor(private store: StoreService) {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  clicked(index) {
    this.clickedIndex = index;
  }
}
