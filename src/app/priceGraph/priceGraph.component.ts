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
  private svg;
  private defs;
  private focus;
  private context;

  // general chart area helper variables
  private width: number           = 700;
  private height: number          = 400;
  private brushHeight: number     = 75;

  private parseDate = d3.timeFormat('%b %Y');

  // underscore naming convention for better reading
  // lots of very short variable names
  private x_scale = d3.scaleTime()
    .range([0, this.width]);
  private x2_scale = d3.scaleTime()
    .range([0, this.width]);
  private y_scale = d3.scaleLinear()
    .range([this.height, 0]);
  private y2_scale = d3.scaleLinear()
    .range([this.brushHeight, 0]);

  private x_axis = d3.axisBottom(this.x_scale);
  private x2_axis = d3.axisBottom(this.x2_scale);
  private y_axis = d3.axisLeft(this.y_scale);

  private brush = d3.brushX(this.x2_scale)
    .on('brush', this.brushed);

  private area = d3.area()
    .x(d => this.x_scale(d.date))
    .y0(this.height)
    .y1(d => this.y_scale(d.price));

  private area2 = d3.area()
    .x(d => this.x2_scale(d.date))
    .y0(this.brushHeight)
    .y1(d => this.y2_scale(d.price));

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
    console.log('chart: ', data);
    this.x_scale.domain(d3.extent(data[0].Date));
    this.y_scale.domain([0, d3.max(data[0].Adj_Close)]);
    this.x2_scale.domain(this.x_scale.domain());
    this.y2_scale.domain(this.y_scale.domain());

    this.focus.append('path')
      .datum(data)
      .attr('class', 'area')
      .attr('d', this.area);

    this.focus.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(this.x_axis);

    this.focus.append('g')
      .attr('class', 'y axis')
      .call(this.y_axis);

    this.context.append('path')
      .datum(data)
      .attr('class', 'area')
      .attr('d', this.area2);

    this.context.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + this.brushHeight + ')')
      .call(this.x2_axis);

    this.context.append('g')
      .attr('class', 'x brush')
      .call(this.brush)
      .selectAll('rect')
      .attr('y', -6)
      .attr('height', this.brushHeight + 7);
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
      .attr('transform', 'translate(10,10)');
  }

  createContext(svg) {
    return svg
      .append('g')
      .attr('class', 'context')
      .attr('transform', 'translate(10,10)');
  }

  createSVG() {
    return d3
      .select('.chart')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);
  }

  brushed() {
    this.x_scale
      .domain(this.brush.empty()
        ? this.x2_scale.domain()
        : this.brush.extent()
      );
    this.focus
      .select(".area")
      .attr("d", this.area);
    this.focus
      .select(".x.axis")
      .call(this.x_axis);
  }

  type(d) {
    d.date  = this.parseDate(d.date);
    d.price = +d.price;
    return d;
  }
}
