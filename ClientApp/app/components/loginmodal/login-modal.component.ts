import { Component, ViewChild, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/common';
import {UserStoreService} from './user.service';
import {Observable} from 'rxjs/RX';
import {Modal, IModalOptions} from './modal';

@Component({
    selector: 'login-modal',
    templateUrl: 'app/login-modal.component.html',
    directives: []
})
export class LoginModalComponent implements AfterViewInit {
    submitted = false;
    loginFormModel: any;
    modal: Modal;
    modalContent = ``;
  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

    constructor(private _userService: UserStoreService, private _formBuilder: FormBuilder) {
        this.loginFormModel = this._formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
        });
    }

ngAfterViewInit() {
var newDiv = document.getElementById('login-button-modal');
        var modalOptions: IModalOptions = {
            backdrop: true,
            keyboard: true,
            duration: 0,
            overlay: document.getElementById('login-button-modal-overlay')
            // content: this.modalContent
        };
        this.modal = new Modal(newDiv, modalOptions);
        this.modal.open();
        this.open.emit(null);
}

    closeModal() {
        this.modal.close();
         this.close.emit(null);
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

    login() {
        this.submitted = true;
        this._userService.login(this.loginFormModel.value.username, this.loginFormModel.value.password)
        .then(() => {
            this.modal.close();
            this.close.emit(null);
        }).catch(
            error => {
                alert(error.text());
                console.log(error.text());
            });
    }
}