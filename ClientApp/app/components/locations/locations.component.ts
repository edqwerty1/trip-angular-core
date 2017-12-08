import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/RX';
import { LocationStoreService } from '../../services/location-store.service';
import { ILocation } from '../../models/locations';

@Component({
    selector: 'locations',
    templateUrl: './locations.component.html'
})
export class LocationsComponent implements OnInit {
    locations: Observable<ILocation[]>;

    constructor(private _locationsStore: LocationStoreService) {
    }

    ngOnInit() {
        this.locations = this._locationsStore.locations$;
        this._locationsStore.loadLocations();
        this.locations.subscribe(data => console.log(data));
    }
}