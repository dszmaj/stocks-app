import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  State,
  StoreService
} from '../shared/store.service';
import { Observable } from 'rxjs';

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
  public data: Observable<State> = this
    .store
    .observe$
    .filter(state => state.preparedResults.length > 0);

  constructor(private store: StoreService) {}
}
