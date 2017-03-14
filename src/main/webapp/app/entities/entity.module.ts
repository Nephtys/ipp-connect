import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterLangCountModule } from './lang-count/lang-count.module';
import { JhipsterAppointmentModule } from './appointment/appointment.module';
import { JhipsterPersonModule } from './person/person.module';
import { JhipsterRestaurantModule } from './restaurant/restaurant.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterLangCountModule,
        JhipsterAppointmentModule,
        JhipsterPersonModule,
        JhipsterRestaurantModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterEntityModule {}
