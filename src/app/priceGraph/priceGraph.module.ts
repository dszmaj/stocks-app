import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceGraphComponent } from './priceGraph.component';
import { FullListComponent } from './fullList.component';
import { DatepickerComponent } from './datepicker.component';
import { ChartComponent } from './chart.component';
import { MyDatePickerModule } from 'mydatepicker';


@NgModule({
  imports: [
    CommonModule,
    MyDatePickerModule
  ],
  declarations: [
    PriceGraphComponent,
    FullListComponent,
    DatepickerComponent,
    ChartComponent
  ],
  exports: [
    PriceGraphComponent,
    FullListComponent,
    DatepickerComponent,
    ChartComponent
  ]
})
export class PriceGraphModule {}
