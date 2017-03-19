import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { PriceGraphComponent } from './priceGraph.component';
import { FullListComponent } from './fullList.component';
import { DatepickerComponent } from './datepicker.component';
import { ChartComponent } from './chart.component';


@NgModule({
  imports: [
    CommonModule
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
