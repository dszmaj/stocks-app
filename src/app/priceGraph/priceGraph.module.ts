import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { PriceGraphComponent } from './priceGraph.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PriceGraphComponent
  ],
  exports: [
    PriceGraphComponent
  ]
})
export class PriceGraphModule {}
