import {
  OnInit,
  OnDestroy,
  Component,
  ChangeDetectionStrategy,
  ElementRef, Input
} from '@angular/core';
import * as d3 from 'd3';
import { StoreService } from '../shared/store.service';


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
export class ChartComponent implements OnInit, OnDestroy {
  @Input() public chart_data;

  // general chart area helper variables
  private margin         = {top: 10, right: 10, bottom: 100, left: 40};
  private width: number  = 700 - this.margin.left - this.margin.right;
  private height: number = 500 - this.margin.top - this.margin.bottom;

  constructor(
    private store: StoreService,
    private element: ElementRef
  ) {}

  ngOnInit() {
    this.createSVG();
  }

  ngOnDestroy() {}

  createSVG() {
    let chart = d3.select(this.element.nativeElement);
    chart.select('svg').remove();
    return chart
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);
  }
}
