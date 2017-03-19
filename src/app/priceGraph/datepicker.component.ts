import {
  OnInit,
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import { IMyOptions } from 'mydatepicker';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'stock-datepicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
        <form class="form-inline">
          <div class="form-group">
            <label for="startDate">Start Date</label>
            <input 
              type="text" 
              class="form-control" 
              id="startDate" 
              placeholder="2010-01-01"
            >
          </div>
          <div class="form-group">
            <label for="endDate">End Date</label>
            <input 
              type="text" 
              class="form-control" 
              id="endDate" 
              placeholder="2010-06-01"
            >
          </div>
          <button type="submit" class="btn btn-default">Change Chart</button>
        </form>
`
})
export class DatepickerComponent {
  private myDatePickerOptions: IMyOptions = {
    dateFormat: 'yyyy-mm-dd',
    height: '34px',
    width:  '210px',
    inline: false
  };
  private model: Object = {
    date: {year: 2018, month: 10, day: 9},
    property1: true,
    property2: 'testing...'
  };
  private form: FormGroup;

  onSubmit() {
    // todo
  }
}
