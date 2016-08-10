import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RootComponent } from './app.component';

import routes from './app.routes';

import { BrowserModule } from '@angular/platform-browser';
import { CompanyDetailsModule } from './companyDetails/companyDetails.module';
import { PriceGraphModule } from './priceGraph/priceGraph.module';
import { DataTableForStockModule } from './dataTableForStock/dataTableForStock.module';
import { HighLowVolumeModule } from './highLowVolume/highLowVolume.module';


@NgModule({
  imports: [
    BrowserModule,
    // Router
    RouterModule.forRoot(routes),

    CompanyDetailsModule,
    PriceGraphModule,
    DataTableForStockModule,
    HighLowVolumeModule
  ],
  declarations: [
    RootComponent
  ],
  bootstrap: [
    RootComponent
  ],
})
export class RootModule {}
