import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { PriceGraphComponent } from './priceGraph.component';
import { GraphComponent } from './graph.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PriceGraphComponent,
    GraphComponent
  ],
  exports: [
    PriceGraphComponent,
    GraphComponent
  ]
})
export class PriceGraphModule {}
