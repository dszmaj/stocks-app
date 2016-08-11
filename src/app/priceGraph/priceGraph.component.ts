import {
  OnInit,
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import { StoreService } from '../shared/store.service';

@Component({
    selector: 'price-graph',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `name`
})
export class PriceGraphComponent implements OnInit {
    constructor(private store: StoreService) {
      this.store.observe$.subscribe(state => console.log(state))
    }

    ngOnInit() {
      this.store.getData('select * from yahoo.finance.historicaldata where symbol = "CSCO" and startDate = "2009-09-11" and endDate = "2010-03-10"')
    }
}
