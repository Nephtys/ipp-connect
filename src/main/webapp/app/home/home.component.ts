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
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {

    account: Account;
    modalRef: NgbModalRef;
    public name;
    public evtType;
    public date = "2017/03/15";
    public time = "12:00";
    public address;
    public me;

      zoom: number = 15;

      // initial center position for the map
      lat: number = 48.8753186;
      lng: number = 2.2888202999999976;

    markers: any[] = [];

      clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
      }

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

        this.personService.find(3).subscribe(data => this.me = data);

        this.restaurantService.query().subscribe(data => {
            for (let restaurant of data.json()) {
                let marker = {
                                 		 lat: restaurant.latitude,
                                 		 lng: restaurant.longitude,
                                 		 label: restaurant.name,
                                 		 draggable: false,
                                 		 icon: 'http://maps.google.com/mapfiles/ms/micons/blue.png'
                                 	 };
                                 	 console.log(marker);
                this.markers.push(marker);
                }
            }
        );

        this.personService.query().subscribe(data => {
            for (let person of data.json()) {
                let marker = {
                                 		 lat: person.latitude,
                                 		 lng: person.longitude,
                                 		 label: person.username,
                                 		 draggable: false,
                                 		 icon: 'http://maps.google.com/mapfiles/ms/micons/red-dot.png'
                                 	 };
                                 	 console.log(marker);
                this.markers.push(marker);
                }
            }
        );
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
