import {
  Input,
  OnInit,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { StoreService } from '../shared/store.service';

@Component({
    selector: 'graph',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ``
})
export class GraphComponent implements OnInit {
  @Input() data: Object;

  constructor(private store: StoreService) {}

  ngOnInit() {
    this.store.getData({
      symbols:   ['CSCO', 'YHOO'],
      startDate: '2009-09-11',
      endDate:   '2010-03-10'
    })
  }
}
