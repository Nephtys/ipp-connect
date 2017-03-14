import { Person } from '../person';
import { Restaurant } from '../restaurant';
export class Appointment {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public time?: any,
        public person?: Person,
        public restaurant?: Restaurant,
    ) {
    }
}
