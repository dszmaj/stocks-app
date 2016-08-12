import { Injectable } from '@angular/core';


interface QueryParams {
  symbols: string[];
  startDate: string;
  endDate: string;
}

@Injectable()
export class UtilsService {
  public makeQuery(params: QueryParams): string {
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
