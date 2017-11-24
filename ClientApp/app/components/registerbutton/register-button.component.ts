import { Component, OnInit } from '@angular/core';
import {UserStoreService} from './user.service';
import {Observable} from 'rxjs/RX';
import {IUser} from './models/user';
import {RegisterModalComponent} from './register-modal.component';

@Component({
    selector: 'register-button',
    templateUrl: 'app/register-button.component.html',
    directives: [RegisterModalComponent]
})
export class RegisterButtonComponent implements OnInit {
    user$: Observable<IUser>;
    user: IUser;
    modalOpen : boolean = false;
    showButton:boolean = true;
    constructor(private _userService: UserStoreService) {

    }

    openModal() {
        this.modalOpen = true;
    }

    ngOnInit() {
        this.user$ = this._userService.user$;
        this.user$.subscribe((data) => {
            this.user = data;
            this.showButton = false;
        });
    }
}