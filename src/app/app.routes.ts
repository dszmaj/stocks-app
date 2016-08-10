import { PriceGraphComponent } from './priceGraph/priceGraph.component';
import { HighLowVolumeComponent } from './highLowVolume/highLowVolume.component';
import { DataTableForStockComponent } from './dataTableForStock/dataTableForStock';
import { CompanyDetailsComponent } from './companyDetails/companyDetails.component';


export default [
  { path: '', redirectTo: 'price-graph', pathMatch: 'full'},
  { path: 'price-graph', component: PriceGraphComponent },
  { path: 'high-low-volume', component: HighLowVolumeComponent},
  { path: 'data-table', component: DataTableForStockComponent },
  { path: 'company-details', component: CompanyDetailsComponent }
];
