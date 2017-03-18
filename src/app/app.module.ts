import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import routes from './app.routes';

import { RootComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { PriceGraphModule } from './priceGraph/priceGraph.module';
import { HighLowVolumeModule } from './highLowVolume/highLowVolume.module';
import { CompanyDetailsModule } from './companyDetails/companyDetails.module';
import { DataTableForStockModule } from './dataTableForStock/dataTableForStock.module';


@NgModule({
  imports: [
    BrowserModule,
    // Router
    RouterModule.forRoot(routes),
    // Shared
    SharedModule.forRoot(),

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
