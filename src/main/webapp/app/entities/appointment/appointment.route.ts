import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { AppointmentComponent } from './appointment.component';
import { AppointmentDetailComponent } from './appointment-detail.component';
import { AppointmentPopupComponent } from './appointment-dialog.component';
import { AppointmentDeletePopupComponent } from './appointment-delete-dialog.component';

import { Principal } from '../../shared';


export const appointmentRoute: Routes = [
  {
    path: 'appointment',
    component: AppointmentComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Appointments'
    }
  }, {
    path: 'appointment/:id',
    component: AppointmentDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Appointments'
    }
  }
];

export const appointmentPopupRoute: Routes = [
  {
    path: 'appointment-new',
    component: AppointmentPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Appointments'
    },
    outlet: 'popup'
  },
  {
    path: 'appointment/:id/edit',
    component: AppointmentPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Appointments'
    },
    outlet: 'popup'
  },
  {
    path: 'appointment/:id/delete',
    component: AppointmentDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Appointments'
    },
    outlet: 'popup'
  }
];
