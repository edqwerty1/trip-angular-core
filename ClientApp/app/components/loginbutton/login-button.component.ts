import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../services/user.service';
import { Observable } from 'rxjs/RX';
import { IUser } from '../../models/user';
import { LoginModalComponent } from '../loginmodal/login-modal.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'login-button',
    templateUrl: './login-button.component.html',
})
export class LoginButtonComponent implements OnInit {
    user$: Observable<IUser>;
    user: IUser;

    constructor(private _userService: UserStoreService, private modalService: NgbModal) {
    }

    openModal() {
        const modalRef = this.modalService.open(LoginModalComponent);
    }

    ngOnInit() {
        this.user$ = this._userService.user$;
        this.user$.subscribe((data) => {
            this.user = data;
            console.log(data);
        });
    }
}