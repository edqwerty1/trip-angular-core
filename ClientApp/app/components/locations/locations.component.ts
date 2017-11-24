import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/RX';
import {LocationStoreService} from './location-store.service';
import {ILocation} from './models/locations';
import {LocationThumbnailComponent} from './location-thumbnail.component';

@Component({
    selector: 'locations',
    templateUrl: 'app/locations.component.html',
    directives: [LocationThumbnailComponent]
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