import {
  OnInit,
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'data-table-for-stock',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `name`
})
export class DataTableForStockComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
