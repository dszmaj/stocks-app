import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from '../shared/store.service';

@Component({
  selector: 'data-table-for-stock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="container">
    <div class="row">
      <handsontable [data]="data | async"></handsontable>
    </div>
  </div>
  `
})
export class DataTableForStockComponent {
  public data: Observable = this
    .store
    .observe$
    .filter(state => state.preparedResults > 0);

  constructor(private store: StoreService) {}
}
