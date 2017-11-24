import { Component } from '@angular/core';
import {Observable} from 'rxjs/RX';
import {LocationStoreService} from './location-store.service';
import {ILocation} from './models/locations';
import {VoteComponent} from './vote.component';

@Component({
    selector: 'location-thumbnail',
    templateUrl: 'app/location-thumbnail.component.html',
    inputs: ['location'],
    directives: [VoteComponent]
})
export class LocationThumbnailComponent  {   ;

    constructor(private _locationsStore: LocationStoreService) {
    }

}