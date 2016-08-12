import {
  OnInit,
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'full-list',
  host: {
    'class': 'col-md-2',
    //'style': 'display: block;'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <h3>Pick max. 3</h3>
  <select multiple class="form-control">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
  </select>
  `
})
export class FullListComponent implements OnInit {
  constructor(private http: Http) {}

  ngOnInit() {}
}
