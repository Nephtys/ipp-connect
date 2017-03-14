import { Appointment } from '../appointment';
export class Restaurant {
    constructor(
        public id?: number,
        public name?: string,
        public latitude?: number,
        public longitude?: number,
        public appointment?: Appointment,
    ) {
    }
}
