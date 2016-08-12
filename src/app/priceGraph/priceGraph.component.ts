import {
  OnInit,
  Component
} from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from '../shared/store.service';
import { StoreActions } from '../shared/store.actions';
import { UtilsService } from '../shared/utils.service';

declare const d3;
declare const fc;


@Component({
  selector: 'price-graph',
  template: `
  <div class="container">
    <div class="row">
      <full-list></full-list>
      <div class="chart col-md-8">
        <form class="form-inline">
          <div class="form-group">
            <label for="startDate">Start Date</label>
            <input 
              type="text" 
              class="form-control" 
              id="startDate" 
              placeholder="2010-01-01"
            >
          </div>
          <div class="form-group">
            <label for="endDate">End Date</label>
            <input 
              type="text" 
              class="form-control" 
              id="endDate" 
              placeholder="2010-06-01"
            >
          </div>
          <button type="submit" class="btn btn-default">Change Chart</button>
        </form> 
      </div>
    </div>
  </div>
  `
})
export class PriceGraphComponent implements OnInit {
  private getD3Observable = Observable.bindCallback(d3.json);
  private init$: Observable<Object> = this.getD3Observable(
    this.utils.makeQuery({
      symbols:   ['YHOO', 'CSCO', 'MSFT'],
      startDate: '2010-01-01',
      endDate:   '2010-06-01'
    })
  );

  private border: number = 1;
  private width: number = 700;
  private height: number = 300;
  private borderColor: string = 'black';

  constructor(
    private store: StoreService,
    private utils: UtilsService
  ) {}

  ngOnInit() {}

  renderChart(data) {
    this.store.dispatch(StoreActions.loadToStore(data));

    let svg    = this.createSVG();
    let border = this.createBorder(svg);

  }

  createSVG() {
    return d3
      .select(".chart")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("border", this.border);
  }

  createBorder(svg) {
    return svg
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", this.height)
      .attr("width", this.width)
      .style("stroke", this.borderColor)
      .style("fill", "gray")
      .style("stroke-width", this.border);
  }
}
