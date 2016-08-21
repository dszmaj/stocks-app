import {
  Input,
  OnInit,
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'handsontable',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `name`
})
export class HandsontableComponent implements OnInit {
  @Input() data;

  constructor() {}

  ngOnInit() {}
}
