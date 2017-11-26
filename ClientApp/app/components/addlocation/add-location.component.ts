import { Component, OnInit } from '@angular/core';
import {UserStoreService} from '../../services/user.service';
import {Observable} from 'rxjs/RX';
import {IUser} from '../../models/user';
import {AddLocationModalComponent} from '../addlocationmodal/add-location-modal.component';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'add-location-button',
    templateUrl: './add-location.component.html',
})
export class AddLocationButtonComponent  {
    constructor(private modalService: NgbModal) {
    }

    openModal() {

        const modalRef = this.modalService.open(AddLocationModalComponent);
  
    }

}