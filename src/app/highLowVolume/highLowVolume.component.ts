import {
  OnInit,
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'high-low-volume',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `name`
})
export class HighLowVolumeComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
