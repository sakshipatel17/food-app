import { Component } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  animateChild,
  group,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%',
            opacity: 0,
          }),
        ], { optional: true }),
        query(':enter', [
          style({
            transform: 'translateY(12px)',
            opacity: 0,
          }),
        ], { optional: true }),
        group([
          query(':leave', [
            animate('150ms ease-out', style({
              opacity: 0,
            })),
          ], { optional: true }),
          query(':enter', [
            animate('250ms var(--ease-out)', style({
              transform: 'translateY(0)',
              opacity: 1,
            })),
          ], { optional: true }),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'frontend';

  prepareRoute(outlet: any) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
