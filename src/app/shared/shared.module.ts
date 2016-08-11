import {
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreService } from './store.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule:  SharedModule,
      providers: [
        StoreService
      ]
    };
  }
}
