import {
  OnInit,
  Component,
  ChangeDetectionStrategy, Output, EventEmitter
} from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { UtilsService } from '../shared/utils.service';

declare const d3;

@Component({
  selector: 'full-list',
  host: {
    'class': 'col-md-2',
    //'style': 'display: block;'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <h3>Symbols:</h3>
  <p><small>Select max. 3</small></p>
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
  @Output() currentSelection: EventEmitter<Object> = new EventEmitter();

  constructor(
    private http: Http,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    this.http.get(this.utils.makeQuery({
      symbols:   ['CSCO'],
      startDate: '2010-01-01',
      endDate:   '2010-06-01'
    })).subscribe(data => this.currentSelection.emit(data.json()));
  }
}
