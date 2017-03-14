import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager} from 'ng-jhipster';
import { Appointment } from '../entities/appointment';
import { RestaurantService } from '../entities/restaurant';
import { PersonService } from '../entities/person';
import { AppointmentService } from '../entities/appointment';


import { Account, LoginModalService, Principal } from '../shared';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {
  lat = 48.875319;
  lng = 2.28882;
    account: Account;
    modalRef: NgbModalRef;
    public name;
    public evtType;
    public date;
    public time;
    public address;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: EventManager,
        private restaurantService: RestaurantService,
        private personService: PersonService,
        private appointmentService: AppointmentService
    ) {
        }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    onSubmit() {
        let appointment = new Appointment();
        appointment.title = this.name;
        appointment.time = this.date;
        this.restaurantService.find(1).subscribe(data1 => {
            appointment.restaurant = data1;
            this.personService.find(1).subscribe(data2 => {
                appointment.person = data2;

                console.log(appointment);
                this.appointmentService.create(appointment).subscribe(data3 => console.log(data3), error => console.log(error));
            });

        });
    }
}
