import {
  OnInit,
  Component
} from '@angular/core';
import * as d3 from 'd3';
import { StoreService } from '../shared/store.service';


@Component({
  selector: 'price-graph',
  styles: [
    `svg {font: 10px sans-serif;}`,
    `.area {fill: steelblue; clip-path: url(#clip);}`,
    `.axis path .axis line {fill: none; stroke: #000; shape-rendering: crispEdges;}`,
    `.brush .extent {stroke: #fff; fill-opacity: .125; shape-rendering: crispEdges;}`
  ],
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
  // active use elements
  private x;
  private y;
  private x2;
  private y2;
  private svg;
  private axis;
  private defs;
  private focus;
  private brush;
  private x_axis;
  private y_axis;
  private context;
  private x2_axis;

  // general chart area helper variables
  private margin              = {top: 10, right: 10, bottom: 100, left: 40};
  private margin2             = {top: 430, right: 10, bottom: 20, left: 40};
  private width: number       = 700 - this.margin.left - this.margin.right;
  private height: number      = 500 - this.margin.top - this.margin.bottom;

  private brushHeight: number = 500 - this.margin2.top - this.margin2.bottom;

  private parseDate = d3.timeParse('%X');

  private area = d3.area().curve(d3.curveMonotoneX);
  private area2 = d3.area().curve(d3.curveMonotoneX);

  constructor(private store: StoreService) {}

  ngOnInit() {
    this.svg = this.createSVG();
    this.defs = this.createDefs(this.svg);
    this.focus = this.createFocus(this.svg);
    this.context = this.createContext(this.svg);

    this.store.observe$
      .filter(state => state.preparedResults.length > 0)
      .subscribe(state => this.renderChart(state.preparedResults))
  }

  renderChart(data) {
    console.log('Chart data: ', data);
    let x = d3.extent(data[0].Date);
    let y = [d3.min(data[0].Adj_Close), d3.max(data[0].Adj_Close)];

    this.createScale(x, y);
    this.createAxis();
    this.createBrush();

    this.focus
      .select('path')
      .data(data[0].Adj_Close)
      .enter()
      .append('path')
      .attr('class', 'area')
      .attr('d', this.area);

    this.context
      .select('path')
      .data(data[0].Adj_Close)
      .enter()
      .append('path')
      .attr('class', 'area')
      .attr('d', this.area2);
  }

  createScale(x, y) {
    this.x = d3.scaleTime().domain(x).range([0, this.width]);
    this.y = d3.scaleLinear().domain(y).range([this.height, 0]);
    this.x2 = d3.scaleTime().domain(x).range([0, this.width]);
    this.y2 = d3.scaleLinear().domain(y).range([this.brushHeight, 0]);
  }

  createBrush() {
    this.brush = d3.brushX(this.x2)
      .extent([[0, 0], [this.width, this.brushHeight]])
      .on("brush", () => {
        this.x.domain(
          d3.brushSelection(this.brush) !== null
            ? this.x2.domain()
            : this.brush.extent()
        );
        this.focus
          .select(".area")
          .attr("d", this.area);
        this.focus
          .select(".axis--x")
          .call(this.x_axis);
      });

    this.context
      .append('g')
      .attr('class', 'x brush')
      .call(this.brush)
      .selectAll('rect')
      .attr('y', -6)
      .attr('height', this.brushHeight);
  }

  createAxis() {
    this.x_axis = d3.axisBottom(this.x);
    this.x2_axis = d3.axisBottom(this.x2);
    this.y_axis = d3.axisLeft(this.y);

    this.focus
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(this.x_axis);

    this.context
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + this.brushHeight + ')')
      .call(this.x2_axis);

    this.focus
      .append('g')
      .attr('class', 'y axis')
      .call(this.y_axis);
  }

  createDefs(svg) {
    return svg
      .append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', this.width)
      .attr('height', this.height);
  }

  createFocus(svg) {
    return svg
      .append('g')
      .attr('class', 'focus')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  createContext(svg) {
    return svg
      .append('g')
      .attr('class', 'context')
      .attr('transform', 'translate(' + this.margin2.left + ',' + this.margin2.top + ')');
  }

  createSVG() {
    return d3
      .select('.chart')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);
  }
}
