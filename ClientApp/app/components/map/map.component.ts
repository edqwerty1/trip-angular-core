import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Observable } from 'rxjs/RX';
import { MapService } from '../../services/map.service';
import { LocationStoreService } from '../../services/location-store.service';
import { ILocation } from '../../models/locations';

@Component({
    selector: 'maps',
    templateUrl: './map.component.html',
    styles: ['#map { height: 100%; }']
})
export class MapComponent implements AfterViewInit, OnInit {
    map: any;
    locations: Observable<ILocation[]>;

    constructor(private _mapService: MapService, private _locationStore: LocationStoreService) {
    }

    ngOnInit() {
        this.locations = this._locationStore.locations$;
        var map: any;
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

                        geocoder.geocode({ 'address': `${location.address.address1}, ${location.address.postCode}` },
                            (results: any, status: any) => {
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
                                    marker.addListener('click', function () {
                                        infowindow.open(map, marker);
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