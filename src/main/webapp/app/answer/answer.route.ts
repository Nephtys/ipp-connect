import { Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { AnswerComponent } from './';

export const ANSWER_ROUTE: Route = {
  path: 'answer',
  component: AnswerComponent,
  data: {
    authorities: [],
    pageTitle: 'Appointment answer'
  },
  canActivate: [UserRouteAccessService]
};
