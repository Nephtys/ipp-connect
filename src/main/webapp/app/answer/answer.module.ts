import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../shared';

import { ANSWER_ROUTE, AnswerComponent } from './';


@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forRoot([ ANSWER_ROUTE ], { useHash: true })
    ],
    declarations: [
        AnswerComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAnswerModule {}
