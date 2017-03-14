import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';

import {
    LangCountService,
    LangCountPopupService,
    LangCountComponent,
    LangCountDetailComponent,
    LangCountDialogComponent,
    LangCountPopupComponent,
    LangCountDeletePopupComponent,
    LangCountDeleteDialogComponent,
    langCountRoute,
    langCountPopupRoute,
} from './';

let ENTITY_STATES = [
    ...langCountRoute,
    ...langCountPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LangCountComponent,
        LangCountDetailComponent,
        LangCountDialogComponent,
        LangCountDeleteDialogComponent,
        LangCountPopupComponent,
        LangCountDeletePopupComponent,
    ],
    entryComponents: [
        LangCountComponent,
        LangCountDialogComponent,
        LangCountPopupComponent,
        LangCountDeleteDialogComponent,
        LangCountDeletePopupComponent,
    ],
    providers: [
        LangCountService,
        LangCountPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterLangCountModule {}
