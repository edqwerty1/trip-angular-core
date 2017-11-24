import {IUser} from './models/user';
import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable, Observer} from 'rxjs/RX';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import {Hosts} from './hosts';
@Injectable()
export class UserStoreService {
    user$: Observable<IUser>;
    private _userObserver: Observer<IUser>;
    private _dataStore: {
        user: IUser;
    };

    constructor(private _http: Http) {
        this._dataStore = {user: { displayName: null, id: null, username: null}};

        this.user$ = new Observable<IUser>(observer => this._userObserver = observer)
            .startWith(this._dataStore.user)
            .share();
    };

    login(username: string, password: string): Promise<void> {
        let body = JSON.stringify({ 'username': username, 'password': password });
         var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(`${Hosts.Host}/user/login`, body, { headers: headers })
            .map((res: Response) => res.json())
            .toPromise()
            .then(response => {
                localStorage.setItem('jwt', response.token);
                localStorage.setItem('userId', response.id);

                this._dataStore.user.displayName = response.displayName;
                this._dataStore.user.username = response.username;
                this._dataStore.user.id = response.id;
                this._userObserver.next(this._dataStore.user);
            });
    }

    register(username: string, password: string, displayName: string): Promise<void> {
        let body = JSON.stringify({ 'username': username, 'password': password, 'displayName': displayName });
         var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(`${Hosts.Host}/user/create`, body, { headers: headers })
            .map((res: Response) => res.json())
            .toPromise()
            .then(response => {
                localStorage.setItem('jwt', response.token);
                localStorage.setItem('userId', response.id);

                this._dataStore.user.displayName = response.displayName;
                this._dataStore.user.username = response.username;
                this._dataStore.user.id = response.id;
                this._userObserver.next(this._dataStore.user);
            }
            );
    }
}
