import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';

import 'ts-helpers';
import 'web-animations-js';

declare const process, require;

if (process.env.ENV === 'build') {
  // Production

} else {
  // Development

  Error['stackTraceLimit'] = Infinity;

  require('zone.js/dist/long-stack-trace-zone');
}
