import { Component } from '@angular/core';
import { Observable } from 'rxjs/RX';
import { LocationStoreService } from '../../services/location-store.service';
import { ILocation } from '../../models/locations';
import { VoteComponent } from '../vote/vote.component';
import { EditLocationModalComponent } from '../editlocationmodal/edit-location-modal.component';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'location-thumbnail',
    templateUrl: './location-thumbnail.component.html',
    inputs: ['location'],
})
export class LocationThumbnailComponent {

    constructor(private _locationsStore: LocationStoreService, private modalService: NgbModal) {
    }

     editLocation() {
        const modalRef = this.modalService.open(EditLocationModalComponent);
        modalRef.componentInstance.location = location;
    }
}