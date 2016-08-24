import {
  Component,
  ChangeDetectionStrategy, OnDestroy
} from '@angular/core';
import * as _ from 'lodash';
import { Observable, Subscription, Subscription } from 'rxjs';
import { StoreService } from '../shared/store.service';

@Component({
  selector: 'company-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <!-- Nav tabs -->
        <ul 
          class="nav nav-tabs"
          *ngIf="selected.length > 0"
        >
          <li
            [class.active]="clickedIndex === i"
            *ngFor="let sel of selected; let i = index"
          >
            <a 
              (click)="clicked(i)"
            ><strong>{{ sel }}</strong></a>
          </li>
        </ul>
      
        <!-- Tab panes -->
        <div 
          class="tab-content"
          *ngIf="details.length > 0"
        >
          <div
            class="tab-pane"
            [class.active]="clickedIndex === i"
            *ngFor="let detail of details; let i = index"
          >
            
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})
export class CompanyDetailsComponent implements OnDestroy {
  public _ = _; // lodash in templates
  public clickedIndex: number = 0;
  private filter$: Observable = this
    .store
    .observe$
    .filter(state => state.selected.length > 0);
  public selected = [];
  private selected$: Subscription = this
    .filter$
    .map(state => state.selected)
    .subscribe(state => this.selected = state);
  public details = [];
  private details$: Subscription = this
    .filter$
    .map(state => state.details)
    .subscribe(state => this.details = state);

  constructor(private store: StoreService) {}

  ngOnDestroy() {
    this.selected$.unsubscribe();
    this.details$.unsubscribe();
  }

  clicked(index) {
    this.clickedIndex = index;
  }
}
