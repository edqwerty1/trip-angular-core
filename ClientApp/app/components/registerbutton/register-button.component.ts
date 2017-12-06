import { Component, OnInit } from '@angular/core';
import {UserStoreService} from '../../services/user.service';
import {Observable} from 'rxjs/RX';
import {IUser} from '../../models/user';
import {RegisterModalComponent} from '../registermodal/register-modal.component';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'register-button',
    templateUrl: './register-button.component.html',
})
export class RegisterButtonComponent implements OnInit {
    user$: Observable<IUser>;
    showButton:boolean = true;
    constructor(private _userService: UserStoreService, private modalService: NgbModal) {

    }

    openModal() {
        const modalRef = this.modalService.open(RegisterModalComponent);
    }

    ngOnInit() {
        this.showButton = this._userService.user.username === "";
        console.log(this._userService.user);
        this.user$ = this._userService.user$;
        this.user$.subscribe((data) => {
            this.showButton = false;
        });
    }
}