import { Component, ViewChild, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationStoreService } from '../../services/location-store.service';
import { Observable } from 'rxjs/RX';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ILocation } from '../../models/locations';

@Component({
    selector: 'add-location-modal',
    templateUrl: './add-location-modal.component.html',
})
export class AddLocationModalComponent implements OnInit {
    addLocationFormModel: FormGroup;

    constructor(private _locationService: LocationStoreService, public activeModal: NgbActiveModal) {

    }

    ngOnInit(): void {
        this.addLocationFormModel = new FormGroup({
            'name': new FormControl('', [
                Validators.required,
                Validators.minLength(2)
            ]),
            'price': new FormControl('', [
                Validators.required,
                Validators.minLength(2)
            ]),
            'imageUrl': new FormControl(''),
            'nights': new FormControl(''),
            'address1': new FormControl(''),
            'address2': new FormControl(''),
            'address3': new FormControl(''),
            'address4': new FormControl(''),
            'address5': new FormControl(''),
            'postcode': new FormControl('')
        });
    }


    onSubmit() {
        this.addLocationFormModel.markAsDirty();
        for (let control in this.addLocationFormModel.controls) {
            if (this.addLocationFormModel.controls.hasOwnProperty(control)) {
                this.addLocationFormModel.controls[control].markAsDirty();
            }
        };

        if (this.addLocationFormModel.dirty && this.addLocationFormModel.valid) {
            this.addLocation();
        }
    }
    get name() { return this.addLocationFormModel.get('name'); }
    get price() { return this.addLocationFormModel.get('price'); }
    get nights() { return this.addLocationFormModel.get('nights'); }
    get address1() { return this.addLocationFormModel.get('address1'); }
    get address2() { return this.addLocationFormModel.get('address2'); }
    get address3() { return this.addLocationFormModel.get('address3'); }
    get address4() { return this.addLocationFormModel.get('address4'); }
    get address5() { return this.addLocationFormModel.get('address5'); }
    get postcode() { return this.addLocationFormModel.get('postcode'); }

    addLocation() {

        let location: ILocation = {
            id: this.newGuid(),
            name: this.addLocationFormModel.get('name')!.value,
            address: {
                address1: this.addLocationFormModel.get('address1')!.value,
                address2: this.addLocationFormModel.get('address2')!.value,
                address3: this.addLocationFormModel.get('address3')!.value,
                address4: this.addLocationFormModel.get('address4')!.value,
                address5: this.addLocationFormModel.get('address5')!.value,
                postcode: this.addLocationFormModel.get('postcode')!.value,
            },
            price: this.addLocationFormModel.get('price')!.value,
            imageUrl: this.addLocationFormModel.get('imageUrl')!.value,
            nights: this.addLocationFormModel.get('nights')!.value,
            upVotes: [],
            downVotes: []
        };

        this._locationService.addLocation(location)
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