import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { HighLowVolumeComponent } from './highLowVolume.component';
import { ChartComponent } from './chart.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HighLowVolumeComponent,
    ChartComponent
  ],
  exports: [
    HighLowVolumeComponent,
    ChartComponent
  ]
})
export class HighLowVolumeModule {}
