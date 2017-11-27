import { Component, ViewChild, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserStoreService } from '../../services/user.service';
import { Observable } from 'rxjs/RX';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'login-modal',
    templateUrl: './login-modal.component.html',
})
export class LoginModalComponent implements OnInit {
    loginFormModel: FormGroup;

    constructor(private _userService: UserStoreService, public activeModal: NgbActiveModal) {

    }

    ngOnInit(): void {
        this.loginFormModel = new FormGroup({
            'username': new FormControl('', [
                Validators.required,
                Validators.minLength(2)
            ]),
            'password': new FormControl('', [
                Validators.required,
                Validators.minLength(2)
            ])
        });
    }


    onSubmit() {
        this.loginFormModel.markAsDirty();
        for (let control in this.loginFormModel.controls) {
            if (this.loginFormModel.controls.hasOwnProperty(control)) {
                this.loginFormModel.controls[control].markAsDirty();
            }
        };

        if (this.loginFormModel.dirty && this.loginFormModel.valid) {
            this.login();
        }
    }
    get username() { return this.loginFormModel.get('username'); }

    get password() { return this.loginFormModel.get('password'); }

    login() {

        this._userService.login(this.loginFormModel.get('username')!.value, this.loginFormModel.get('password')!.value)
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
}