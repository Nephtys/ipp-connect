import { Component, OnInit, NgModule } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager} from 'ng-jhipster';
import { Appointment } from '../entities/appointment';
import { RestaurantService } from '../entities/restaurant';
import { PersonService } from '../entities/person';
import { AppointmentService } from '../entities/appointment';

import {
  BrowserModule
} from '@angular/platform-browser';

import {
  AgmCoreModule
} from 'angular2-google-maps/core';

import { Account, LoginModalService, Principal } from '../shared';

@Component({
    selector: 'jhi-answer',
    templateUrl: './answer.component.html',
    styleUrls: [
        'answer.css'
    ]

})

export class AnswerComponent implements OnInit {
    public appointment;
    public me;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: EventManager,
        private restaurantService: RestaurantService,
        private personService: PersonService,
        private appointmentService: AppointmentService
    ) { }

    ngOnInit() {
        this.appointmentService.find(1).subscribe(data => this.appointment = data);
                this.personService.find(7).subscribe(data => this.me = data);

    }
}
