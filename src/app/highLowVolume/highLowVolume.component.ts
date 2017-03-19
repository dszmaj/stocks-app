import {
  OnInit,
  Component,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  Subscription,
  Observable
} from 'rxjs';
import {
  State,
  StoreService
} from '../shared/store.service';

@Component({
    selector: 'high-low-volume',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
      <div class="container">
          <div class="row">
            <div class="col-md-8">
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
                  >
                    <strong>{{ sel }}</strong>
                  </a>
                </li>
              </ul>
              
              <div 
                class="tab-content" 
                *ngIf="data.length > 0"
              >
                <div
                  class="tab-pane"
                  [class.active]="clickedIndex === i"
                  *ngFor="let dataSet of data; let i = index"
                >
                  <chart [chart_data]="dataSet"></chart>
                </div>
              </div>
            </div>
          </div>
        </div>
`
})
export class HighLowVolumeComponent implements OnInit, OnDestroy {
  public clickedIndex: number        = 0;
  private filter$: Observable<State> = this
    .store
    .observe$
    .filter(state => state.selected.length > 0 && state.results.length > 0);
  public selected                 = [];
  private selected$: Subscription = this
    .filter$
    .map(state => state.selected)
    .subscribe(selected => {
      this.selected = selected
    });
  public data                 = []; // can't use async pipe in root route component
  private data$: Subscription = this
    .filter$
    .map(state => state.results)
    .subscribe(data => {
      this.data = data
    });

  constructor(private store: StoreService) {}

  ngOnDestroy() {
    this.selected$.unsubscribe();
    this.data$.unsubscribe();
  }

  ngOnInit() {}

  clicked(index) {
    this.clickedIndex = index;
  }
}
