import { Component, ViewChild, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationStoreService } from '../../services/location-store.service';
import { Observable } from 'rxjs/RX';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ILocation } from '../../models/locations';

@Component({
    selector: 'edit-location-modal',
    templateUrl: './edit-location-modal.component.html',
})
export class EditLocationModalComponent implements OnInit {
    editLocationFormModel: FormGroup;
    
    @Input() location : ILocation;
    constructor(private _locationService: LocationStoreService, public activeModal: NgbActiveModal) {

    }

    ngOnInit(): void {
        this.editLocationFormModel = new FormGroup({
            'name': new FormControl(this.location.name, [
                Validators.required,
                Validators.minLength(2)
            ]),
            'price': new FormControl(this.location.price, [
                Validators.required,
                Validators.minLength(2)
            ]),
            'imageUrl': new FormControl(this.location.imageUrl),
            'nights': new FormControl(this.location.nights),
            'address1': new FormControl(this.location.address.address1),
            'address2': new FormControl(this.location.address.address2),
            'address3': new FormControl(this.location.address.address3),
            'address4': new FormControl(this.location.address.address4),
            'address5': new FormControl(this.location.address.address5),
            'postCode': new FormControl(this.location.address.postCode)
        });
    }


    onSubmit() {
        this.editLocationFormModel.markAsDirty();
        for (let control in this.editLocationFormModel.controls) {
            if (this.editLocationFormModel.controls.hasOwnProperty(control)) {
                this.editLocationFormModel.controls[control].markAsDirty();
            }
        };

        if (this.editLocationFormModel.dirty && this.editLocationFormModel.valid) {
            this.editLocation();
        }
    }
    get name() { return this.editLocationFormModel.get('name'); }
    get price() { return this.editLocationFormModel.get('price'); }
    get nights() { return this.editLocationFormModel.get('nights'); }
    get address1() { return this.editLocationFormModel.get('address1'); }
    get address2() { return this.editLocationFormModel.get('address2'); }
    get address3() { return this.editLocationFormModel.get('address3'); }
    get address4() { return this.editLocationFormModel.get('address4'); }
    get address5() { return this.editLocationFormModel.get('address5'); }
    get postCode() { return this.editLocationFormModel.get('postCode'); }

    editLocation() {

        let location: ILocation = {
            id: this.newGuid(),
            name: this.editLocationFormModel.get('name')!.value,
            address: {
                address1: this.editLocationFormModel.get('address1')!.value,
                address2: this.editLocationFormModel.get('address2')!.value,
                address3: this.editLocationFormModel.get('address3')!.value,
                address4: this.editLocationFormModel.get('address4')!.value,
                address5: this.editLocationFormModel.get('address5')!.value,
                postCode: this.editLocationFormModel.get('postCode')!.value,
            },
            price: this.editLocationFormModel.get('price')!.value,
            imageUrl: this.editLocationFormModel.get('imageUrl')!.value,
            nights: this.editLocationFormModel.get('nights')!.value,
            upVotes: [],
            downVotes: []
        };

        this._locationService.editLocation(location)
            .then(() => {
                this.activeModal.dismiss("Saved");
            }).catch(
            error => {
                alert(error);
                console.log(error);
            });
    }

    closeModal() {
        this.activeModal.dismiss("Closed");
    }

    newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}