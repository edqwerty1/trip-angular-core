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
            'imageUrl': new FormControl('')
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
    get imageUrl() { return this.addLocationFormModel.get('imageUrl'); }

    addLocation() {

        let location: ILocation = {
            id: this.newGuid(),
            name: this.addLocationFormModel.get('name')!.value,
            address: null,
            price: this.addLocationFormModel.get('price')!.value,
            imageUrl: this.addLocationFormModel.get('imageUrl')!.value,
            nights: 3,
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