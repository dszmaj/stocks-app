import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { DataTableForStockComponent } from './dataTableForStock';
import { HandsontableComponent } from './handsontable.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HandsontableComponent,
    DataTableForStockComponent
  ],
  exports: [
    HandsontableComponent,
    DataTableForStockComponent
  ]
})
export class DataTableForStockModule {}
