import { Component } from '@angular/core';
import {Observable} from 'rxjs/RX';
import {LocationStoreService} from '../../services/location-store.service';
import {ILocation} from '../../models/locations';
import {VoteComponent} from '../vote/vote.component';

@Component({
    selector: 'location-thumbnail',
    templateUrl: './location-thumbnail.component.html',
    inputs: ['location'],
})
export class LocationThumbnailComponent  {   ;

    constructor(private _locationsStore: LocationStoreService) {
    }

}