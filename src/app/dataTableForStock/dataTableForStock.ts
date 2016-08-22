import {
  Component,
  ViewChild,
  OnDestroy,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  State,
  StoreService
} from '../shared/store.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'data-table-for-stock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="container">
    <div class="row">
      <div #hot></div>
    </div>
  </div>
  `
})
export class DataTableForStockComponent implements AfterViewInit, OnDestroy {
  private hot;
  private data = [];
  @ViewChild('hot') private container: ElementRef;
  private sub: Subscription = this
    .store
    .observe$
    .filter(state => state.preparedResults.length > 0)
    .subscribe(state => this.data = state.preparedResults);

  constructor(private store: StoreService) {}

  ngAfterViewInit() {
    this.hot = new Handsontable(this.container.nativeElement, {
      data:       [
        ["", "Ford", "Volvo", "Toyota", "Honda"],
        ["2016", 10, 11, 12, 13],
        ["2017", 20, 11, 14, 13],
        ["2018", 30, 15, 12, 13]
      ],
      rowHeaders: true,
      colHeaders: true
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
