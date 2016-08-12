import {
  OnInit,
  Component
} from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from '../shared/store.service';
import { StoreActions } from '../shared/store.actions';

declare const d3;
declare const fc;

interface QueryParams {
  symbols: string[];
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'price-graph',
  template: `
  <div class="container">
    <div class="row">
      <div class="chart col-md-8 col-md-offset-2">
        <form>
          <stock-datepicker></stock-datepicker>
        </form> 
      </div>
    </div>
  </div>
  `
})
export class PriceGraphComponent implements OnInit {
  private data: Object;
  private getD3Observable = Observable.bindCallback(d3.json);
  private init$: Observable = this.getD3Observable({
    symbols:   ['YHOO', 'CSCO', 'MSFT'],
    startDate: '2010-01-01',
    endDate:   '2010-06-01'
  });

  private border: number = 1;
  private width: number = 700;
  private height: number = 300;
  private borderColor: string = 'black';

  constructor(private store: StoreService) {}

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

  private makeQuery(params: QueryParams): string {
    let symbolPart: string;
    let query: string;

    if (params.symbols.length === 1) {
      symbolPart = '= "' + params.symbols[0] + '"'
    } else if (params.symbols.length > 1) {
      symbolPart = 'in ("' + params.symbols.join('", "') + '")'
    }
    query = 'symbol '
      + symbolPart +
      ' and startDate = "'
      + params.startDate +
      '" and endDate = "'
      + params.endDate +
      '"';
    return 'https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.historicaldata where ' + query +
      '&format=json&diagnostics=false&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
  }
}
