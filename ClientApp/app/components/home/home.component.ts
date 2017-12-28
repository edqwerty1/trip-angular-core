import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../services/user.service';
import { Observable } from 'rxjs/RX';
import { IUser } from '../../models/user';
import { LoginModalComponent } from '../loginmodal/login-modal.component';
import { RegisterModalComponent } from '../registermodal/register-modal.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    user$: Observable<IUser>;
    user: IUser;

    constructor(private _userService: UserStoreService, private modalService: NgbModal) {
    }

    login() {
        const modalRef = this.modalService.open(LoginModalComponent);
    }

    register() {
        const modalRef = this.modalService.open(RegisterModalComponent);
    }

    logout() {
        this._userService.logout();
    }

    ngOnInit() {
        this.user$ = this._userService.user$;
        this.user$.subscribe((data) => {
            this.user = data;
        });
    }
}
