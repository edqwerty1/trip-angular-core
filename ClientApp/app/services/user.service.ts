import { IUser } from '../models/user';
import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable, Observer } from 'rxjs/RX';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import { Hosts } from './hosts';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';

@Injectable()
export class UserStoreService {
    user$: Observable<IUser>;
    private _userObserver: Observer<IUser>;
    private _dataStore: {
        user: IUser;
    };

    constructor(private _http: Http, @Inject(PLATFORM_ID) private platformId: Object) {


        var newUser: IUser =
            {
                displayName: "",
                id: "",
                username: "",
                token: ""
            };

        if (isPlatformBrowser(this.platformId)) {
            this._dataStore = { user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : newUser }
        }
        else {
            this._dataStore = {
                user: {
                    displayName: "",
                    id: "",
                    username: "",
                    token: ""
                }
            };
        }
        this.user$ = new Observable<IUser>(observer => { this._userObserver = observer })
            .startWith(this._dataStore.user)
            .share();
    };

    get user() { return this._dataStore.user; };


    login(username: string, password: string): Promise<void> {
        let body = JSON.stringify({ 'username': username, 'password': password });
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(`${Hosts.Host}/user/login`, body, { headers: headers })
            .map((res: Response) => res.json())
            .toPromise()
            .then(response => {
                this.updateUser(response);
            });
    }

    private updateUser(user: IUser) {
        localStorage.setItem('user', JSON.stringify(user));

        this._dataStore.user.displayName = user.displayName;
        this._dataStore.user.username = user.username;
        this._dataStore.user.id = user.id;
        this._dataStore.user.token = user.token;
        this._userObserver.next(this._dataStore.user);
    }

    register(username: string, password: string, displayName: string): Promise<void> {
        let body = JSON.stringify({ 'username': username, 'password': password, 'displayName': displayName });
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(`${Hosts.Host}/user/create`, body, { headers: headers })
            .map((res: Response) => res.json())
            .toPromise()
            .then(response => {
                this.updateUser(response);
            }
            );
    }

    logout(): Promise<void> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', this.user.token);
        return this._http.post(`${Hosts.Host}/user/logout`, null, { headers: headers })

            .toPromise()
            .then(response => {
                var newUser: IUser =
                    {
                        displayName: "",
                        id: "",
                        username: "",
                        token: ""
                    };
                this.updateUser(newUser);
                localStorage.removeItem('user');
            }
            );
    }
}
