import 'es6-shim';
import 'reflect-metadata';
import 'zone.js';

import 'ts-helpers';
import 'web-animations-js';

if (process.env.ENV === 'build') {
  // Production

} else {
  // Development

  Error['stackTraceLimit'] = Infinity;

  require('zone.js/dist/long-stack-trace-zone');
}
