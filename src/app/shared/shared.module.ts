import {
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { StoreService } from './store.service';
import { UtilsService } from './utils.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule:  SharedModule,
      providers: [
        StoreService,
        UtilsService
      ]
    };
  }
}
