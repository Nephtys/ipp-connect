import { Appointment } from '../appointment';
export class Person {
    constructor(
        public id?: number,
        public username?: string,
        public password?: string,
        public firstname?: string,
        public lastname?: string,
        public latitude?: number,
        public longitude?: number,
        public appointment?: Appointment,
    ) {
    }
}
