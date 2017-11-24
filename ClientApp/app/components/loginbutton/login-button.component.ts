import { Component, OnInit } from '@angular/core';
import {UserStoreService} from './user.service';
import {Observable} from 'rxjs/RX';
import {IUser} from './models/user';
import {LoginModalComponent} from './login-modal.component';

@Component({
    selector: 'login-button',
    templateUrl: 'app/login-button.component.html',
    directives: [LoginModalComponent]
})
export class LoginButtonComponent implements OnInit {
    user$: Observable<IUser>;
    user: IUser;
    modalOpen: boolean = false;
    constructor(private _userService: UserStoreService) {
    }

    openModal() {
        this.modalOpen = true;
    }

    ngOnInit() {
        this.user$ = this._userService.user$;
        this.user$.subscribe((data) => {
            this.user = data;
            console.log(data);
        });
    }
}