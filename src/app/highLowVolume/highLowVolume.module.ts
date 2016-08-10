import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { HighLowVolumeComponent } from './highLowVolume.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HighLowVolumeComponent
  ],
  exports: [
    HighLowVolumeComponent
  ]
})
export class HighLowVolumeModule {}
