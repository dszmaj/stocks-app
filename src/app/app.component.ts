import { Component } from '@angular/core';

import '../style/app.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'my-app',
  template: '<router-outlet></router-outlet>'
})
export class RootComponent {}
