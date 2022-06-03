/// <reference types="@types/google.maps" />
// instruction to every other class 
// on how they can be an argument to 'addMarker'
export interface Mappable {
    location: {
        lat: number;
        lng: number;
    }
    markerContent(): string;
}

export class CustomMap {
    private googleMap: google.maps.Map;

    constructor(divId: string){
        this.googleMap = new google.maps.Map(document.getElementById(divId), {
            zoom: 1,
            center: {
                lng: 0,
                lat: 0,
            },
        });        
    }

    addMarker(mappable: Mappable){
        const marker = new google.maps.Marker({
            map: this.googleMap,
            position:{
                lat: mappable.location.lat,
                lng: mappable.location.lng,
            } 
        });
        console.log( mappable.markerContent())
        marker.addListener('click', () => {
            const infoWindow = new google.maps.InfoWindow({
                content: mappable.markerContent()
            });

            infoWindow.open(this.googleMap, marker)
        })
    }
}

