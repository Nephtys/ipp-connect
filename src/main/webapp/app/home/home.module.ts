import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import { AgmCoreModule } from 'angular2-google-maps/core';


@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true }),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDFNpgTK9KDFCNpr37ObbYvDsrCr329ykk'
        })
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterHomeModule {}
