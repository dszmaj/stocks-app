import {
  OnInit,
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'company-details',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `name`
})
export class CompanyDetailsComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
