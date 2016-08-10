import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { CompanyDetailsComponent } from './companyDetails.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CompanyDetailsComponent
  ],
  exports: [
    CompanyDetailsComponent
  ]
})
export class CompanyDetailsModule {}
