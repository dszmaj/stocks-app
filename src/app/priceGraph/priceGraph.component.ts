import {
  OnInit,
  Component
} from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'price-graph',
  template: `
  <div class="container">
    <div class="row">
      <full-list 
        (currentSelection)="renderChart($event)"
      ></full-list>
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
  private svg;
  private border;

  private width: number       = 700;
  private height: number      = 300;
  private borderColor: string = 'black';

  ngOnInit() {
    this.svg = this.createSVG();
    this.border = this.createBorder(this.svg);
  }

  renderChart(event) {}

  createSVG() {
    return d3
      .select('.chart')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);
  }

  createBorder(svg) {
    return svg
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('height', this.height)
      .attr('width', this.width)
      .style('stroke', this.borderColor)
      .style('fill', "gray")
      .style('stroke-width', this.border);
  }
}
