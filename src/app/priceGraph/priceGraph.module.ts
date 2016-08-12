import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { PriceGraphComponent } from './priceGraph.component';
import { FullListComponent } from './fullList.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PriceGraphComponent,
    FullListComponent
  ],
  exports: [
    PriceGraphComponent,
    FullListComponent
  ]
})
export class PriceGraphModule {}
