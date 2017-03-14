import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { LangCountComponent } from './lang-count.component';
import { LangCountDetailComponent } from './lang-count-detail.component';
import { LangCountPopupComponent } from './lang-count-dialog.component';
import { LangCountDeletePopupComponent } from './lang-count-delete-dialog.component';

import { Principal } from '../../shared';


export const langCountRoute: Routes = [
  {
    path: 'lang-count',
    component: LangCountComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'LangCounts'
    }
  }, {
    path: 'lang-count/:id',
    component: LangCountDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'LangCounts'
    }
  }
];

export const langCountPopupRoute: Routes = [
  {
    path: 'lang-count-new',
    component: LangCountPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'LangCounts'
    },
    outlet: 'popup'
  },
  {
    path: 'lang-count/:id/edit',
    component: LangCountPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'LangCounts'
    },
    outlet: 'popup'
  },
  {
    path: 'lang-count/:id/delete',
    component: LangCountDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'LangCounts'
    },
    outlet: 'popup'
  }
];
