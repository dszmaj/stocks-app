import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { DataTableForStockComponent } from './dataTableForStock';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DataTableForStockComponent
  ],
  exports: [
    DataTableForStockComponent
  ]
})
export class DataTableForStockModule {}
