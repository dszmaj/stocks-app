import {
  OnInit,
  Component,
  ChangeDetectionStrategy,
  Input,
  ElementRef
} from '@angular/core';
import {
  StoreService,
  Prepared
} from '../shared/store.service';
import * as d3 from 'd3';


@Component({
  selector: 'chart',
  styles: [
    `svg {font: 10px sans-serif;}`,
    `.axis .axis line {fill: none; stroke: #000; shape-rendering: crispEdges;}`,
    `.brush .extent {stroke: #fff; fill-opacity: .125; shape-rendering: crispEdges;}`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ``
})
export class ChartComponent implements OnInit {
  @Input() public chart_data;

  private x;
  private y;
  private x2;
  private y2;
  private svg;
  private axis;
  private defs;
  private area;
  private area2;
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

  constructor(
    private store: StoreService,
    private element: ElementRef
  ) {}

  ngOnInit() {
    this.renderChart(this.chart_data);
  }

  renderChart(data: Array<Prepared>) {
    this.svg     = this.createSVG();
    this.defs    = this.createDefs();
    this.focus   = this.createFocus();
    this.context = this.createContext();

    let extent = () => d3.extent(data.map(d => d.Date)),
        min    = () => 0.95 * d3.min(data.map(d => d.Close)),
        max    = () => 1.05 * d3.max(data.map(d => d.Close)),
        x      = extent(),
        y      = [min(), max()];

    this.createScale(x, y);
    this.drawChartArea(data);
    this.createAxis();
    this.createBrush();
  }

  drawChartArea(data: Array<Prepared>) {
    let color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
        style = `fill: ${color}; clip-path: url(#clip);`;

    this.area  = d3.area()
      .curve(d3.curveMonotoneX)
      .x((d: Prepared): number => this.x(d.Date))
      .y0(this.height)
      .y1((d: Prepared): number => this.y(d.Close));
    this.area2 = d3.area()
      .curve(d3.curveMonotoneX)
      .x((d: Prepared): number => this.x2(d.Date))
      .y0(this.brushHeight)
      .y1((d: Prepared): number => this.y2(d.Close));

    this.focus
      .append('path')
      .datum(data)
      .attr('style', style)
      .attr('d', this.area);

    this.context
      .append('path')
      .datum(data)
      .attr('style', style)
      .attr('d', this.area2);
  }

  createScale(x, y) {
    this.x  = d3.scaleTime().domain(x).range([0, this.width]);
    this.y  = d3.scaleLinear().domain(y).range([this.height, 0]);
    this.x2 = d3.scaleTime().domain(x).range([0, this.width]);
    this.y2 = d3.scaleLinear().domain(y).range([this.brushHeight, 0]);
  }

  createBrush() {
    this.brush = d3.brushX()
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
    this.x_axis  = d3.axisBottom(this.x);
    this.x2_axis = d3.axisBottom(this.x2);
    this.y_axis  = d3.axisLeft(this.y);

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

  createDefs() {
    return this.svg
      .append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', this.width)
      .attr('height', this.height);
  }

  createFocus() {
    return this.svg
      .append('g')
      .attr('class', 'focus')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  createContext() {
    return this.svg
      .append('g')
      .attr('class', 'context')
      .attr('transform', 'translate(' + this.margin2.left + ',' + this.margin2.top + ')');
  }

  createSVG() {
    let chart = d3.select(this.element.nativeElement);
    chart.select('svg').remove();
    return chart
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);
  }
}
