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
  private margin = {top: 10, right: 10, bottom: 100, left: 40};
  private margin2 = {top: 430, right: 10, bottom: 20, left: 40};
  private width: number       = 700 - this.margin.left - this.margin.right;
  private height: number      = 500 - this.margin.top - this.margin.bottom;
  private brushHeight: number = 500 - this.margin2.top - this.margin2.bottom;

  private parseDate = d3.timeParse('%X');

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
    .extent([[0, 0], [this.width, this.brushHeight]])
    .on("brush end", this.brushed);

  private area = d3.area()
    .curve(d3.curveMonotoneX)
    .x(d => this.x_scale(d.Date))
    .y0(this.height)
    .y1(d => this.y_scale(d.Adj_Close));

  private area2 = d3.area()
    .curve(d3.curveMonotoneX)
    .x(d => this.x2_scale(d.Date))
    .y0(this.brushHeight)
    .y1(d => this.y2_scale(d.Adj_Close));

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

    this.focus
      .append('path')
      .datum(data[0].Adj_Close)
      .attr('class', 'area')
      .attr('d', this.area);

    this.context
      .append('path')
      .datum(data[0].Adj_Close)
      .attr('class', 'area')
      .attr('d', this.area2);

    this.focus
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,'+ this.height +')')
      .call(this.x_axis);

    this.context
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,'+ this.brushHeight +')')
      .call(this.x2_axis);

    this.focus
      .append('g')
      .attr('class', 'y axis')
      .call(this.y_axis);

    this.context
      .append("g")
      .attr("class", "brush")
      .call(this.brush)
      .call(this.brush.move, this.x_scale.range());

    this.context
      .append('g')
      .attr('class', 'x brush')
      .call(this.brush)
      .selectAll('rect')
      .attr('y', -6)
      .attr('height', this.brushHeight);
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

  brushed() {
    let s = d3.event.selection || this.x2_scale.range();
    this.x_scale
      .domain(s.map(this.x2_scale.invert, this.x2_scale));
    this.focus
      .select(".area")
      .attr("d", this.area);
    this.focus
      .select(".axis--x")
      .call(this.x_axis);
  }
}
