import { Component, ViewChild, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserStoreService } from '../../services/user.service';
import { Observable } from 'rxjs/RX';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'register-modal',
    templateUrl: './register-modal.component.html'
})
export class RegisterModalComponent implements OnInit {
    registerFormModel: FormGroup;

    constructor(private _userService: UserStoreService, public activeModal: NgbActiveModal) {
    }
    get username() { return this.registerFormModel.get('username'); }

    get password() { return this.registerFormModel.get('password'); }
    get displayname() { return this.registerFormModel.get('displayname'); }
    ngOnInit(): void {
        this.registerFormModel = new FormGroup({
            'username': new FormControl('', [
                Validators.required,
                Validators.minLength(2)
            ]),
            'password': new FormControl('', [
                Validators.required,
                Validators.minLength(2)
            ]),
            'displayname': new FormControl('', [
                Validators.required,
                Validators.minLength(2)
            ])
        });
    }

    closeModal() {
        this.activeModal.dismiss("Closed");
    }

    onSubmit() {
        this.registerFormModel.markAsDirty();
        for (let control in this.registerFormModel.controls) {
            if (this.registerFormModel.controls.hasOwnProperty(control)) {
                this.registerFormModel.controls[control].markAsDirty();
            }
        };

        if (this.registerFormModel.dirty && this.registerFormModel.valid) {
            this.register();
        }
    }

    register() {
        this._userService.register(this.registerFormModel.value.username,
            this.registerFormModel.value.password, this.registerFormModel.value.displayname)
            .then(() => {
                this.activeModal.dismiss("Saved");
            })
            .catch(
            error => {
                alert(error);
            });
    }
}