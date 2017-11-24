import { Component, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/common';
import {UserStoreService} from './user.service';
import {Observable} from 'rxjs/RX';
import {Modal, IModalOptions} from './modal';

@Component({
    selector: 'register-modal',
    templateUrl: 'app/register-modal.component.html',
    directives: []
})
export class RegisterModalComponent implements AfterViewInit {
    submitted = false;
    registerFormModel: any;
    modal: Modal;
    modalContent = ``;
  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

    constructor(private _userService: UserStoreService, private _formBuilder: FormBuilder) {
        this.registerFormModel = this._formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required],
             'displayname': ['', Validators.required],
        });
    }

ngAfterViewInit() {
var newDiv = document.getElementById('register-button-modal');
        var modalOptions: IModalOptions = {
            backdrop: true,
            keyboard: true,
            duration: 0,
            overlay: document.getElementById('register-button-modal-overlay')
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
        this.registerFormModel.markAsDirty();
        for (let control in this.registerFormModel.controls) {
            if (this.registerFormModel.controls.hasOwnProperty(control)) {
                this.registerFormModel.controls[control].markAsDirty();
            }
        };

        if (this.registerFormModel.dirty && this.registerFormModel.valid) {
            this.register();
            this.modal.close();
            this.close.emit(null);
        }
    }

    register() {
        this.submitted = true;
        this._userService.register(this.registerFormModel.value.username,
                    this.registerFormModel.value.password, this.registerFormModel.value.displayname)
        .then(() => {
            this.modal.close();
            this.close.emit(null);
        })
        .catch(
            error => {
                alert(error.text());
                console.log(error.text());
            });
    }
}