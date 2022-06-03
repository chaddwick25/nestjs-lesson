import faker from 'faker';
import { Mappable } from './CustomMap';


// direct dependency on the from the CustomMaps #best_practices 
export class User implements Mappable {
    name: string;
    location: {
        lat: number;
        lng: number;
    };

    constructor (){
        this.name = faker.name.firstName();
        this.location = {
            lat: parseFloat(faker.address.latitude()),
            lng: parseFloat(faker.address.longitude()),
        }
    }

    markerContent(): string {
        return ` <h1>User Name : ${this.name}</h2>`;
    }
}