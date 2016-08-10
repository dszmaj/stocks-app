import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

import routes from './app.routes';


@NgModule({
  imports: [
    BrowserModule,
    // Http
    HttpModule,
    // Forms
    FormsModule,
    // Router
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
