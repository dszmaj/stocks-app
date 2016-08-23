import {
  Component,
  ViewChild,
  OnDestroy,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  Observable,
  Subscription
} from 'rxjs';
import * as _ from 'lodash';
import { StoreService } from '../shared/store.service';

@Component({
  selector: 'data-table-for-stock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div></div>
      </div>
    </div>
  </div>
  `
})
export class DataTableForStockComponent implements AfterViewInit, OnDestroy {
  private data = this
    .store
    .observe$
    .filter(state => state.preparedResults.length > 0);

  constructor(private store: StoreService) {}

  ngAfterViewInit() {}

  ngOnDestroy() {}
}

