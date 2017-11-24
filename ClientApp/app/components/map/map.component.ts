import { Component, AfterViewInit, OnInit } from '@angular/core';
import {Observable} from 'rxjs/RX';
import {MapService} from './map.service';
import {LocationStoreService} from './location-store.service';
import {ILocation} from './models/locations';
@Component({
    selector: 'maps',
    templateUrl: 'app/map.component.html',
    directives: [],
    styles: ['#map { height: 100%; }']
})
export class MapComponent implements AfterViewInit, OnInit {
    map;
    locations: Observable<ILocation[]>;

    constructor(private _mapService: MapService, private _locationStore: LocationStoreService) {

    }

    ngOnInit() {
        this.locations = this._locationStore.locations$;
        var map;
        this._mapService.loadAPI.then((mapsAPi) => {
            this.map = map = new mapsAPi.Map(document.getElementById('map'), {
                center: { lat: 52.12, lng: -1.24 },
                zoom: 8
            });

            var geocoder = new mapsAPi.Geocoder();
            this.locations.subscribe(locations => {
                for (let loc in locations) {
                    if (locations.hasOwnProperty(loc)) {
                        let location = locations[loc];

                        geocoder.geocode({ 'address': `${location.address.address1}, ${location.address.postCode}` }, (results, status) => {
                            if (status === mapsAPi.GeocoderStatus.OK) {

                                let contentString = `
                            <div>
                                <h3>${location.name}</h3>
                                <p>Price £${location.price}}</p>
                                <p>Nights ${location.nights}</p>
                            </div>`;
                                let infowindow = new mapsAPi.InfoWindow({
                                    content: contentString,
                                    maxWidth: 200
                                });

                                let marker = new mapsAPi.Marker({
                                    position: results[0].geometry.location,
                                    map: this.map,
                                    title: location.name
                                });
                                marker.addListener('click', function() {
                                    infowindow.open(this.map, marker);
                                });
                                infowindow.open(this.map, marker);

                            } else {
                                alert('Geocode was not successful for the following reason: ' + status);
                            }
                        });
                    }
                }
            }
            );

            this._locationStore.loadLocations();
        });
    }

    ngAfterViewInit() {

        this._mapService.initialise();

    }
}