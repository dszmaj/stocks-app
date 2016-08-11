import {
  OnInit,
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import { StoreService } from '../shared/store.service';

@Component({
  selector: 'price-graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <graph [data]="store.observe$ | async"></graph>
      </div>
    </div>
  </div>
  `
})
export class PriceGraphComponent implements OnInit {
  constructor(private store: StoreService) {}

  ngOnInit() {}
}
