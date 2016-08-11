import { Component } from '@angular/core';

import '../style/app.scss';


@Component({
  selector: '[my-app]',
  template: `
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" [routerLink]="['']">{{ title }}</a>
      </div>

      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li [routerLinkActive]="['active']"><a [routerLink]="['price-graph']">Price Graph</a></li>
          <li [routerLinkActive]="['active']"><a [routerLink]="['data-table']">Data Table</a></li>
          <li [routerLinkActive]="['active']"><a [routerLink]="['high-low-volume']">Daily Changes</a></li>
          <li [routerLinkActive]="['active']"><a [routerLink]="['company-details']">Company Details</a></li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
  
  <div class="container-fluid">
    <router-outlet></router-outlet>
  </div>
  <ng-content></ng-content>
  `
})
export class RootComponent {
  public title: string = 'Stock App';

  constructor() {}
}
