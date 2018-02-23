import { IUser } from '../models/user';
import { IList, ILists } from '../models/list';
import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable, Observer } from 'rxjs/RX';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import { Hosts } from './hosts';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import {UserStoreService} from './user.service';

@Injectable()
export class listStoreService {
    lists$: Observable<IList[]>;
    private _listsObserver: Observer<IList[]>;
    private _dataStore: {
        lists: IList[];
    };

    constructor(private _http: Http, private _userService: UserStoreService) {
        this._dataStore = { lists: [] };

        this.lists$ = new Observable<IList[]>(observer => this._listsObserver = observer)
            .startWith(this._dataStore.lists)
            .share();
};

    addlist(list: IList) {
        let body = JSON.stringify(list);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', this._userService.user.token);
        return this._http.put(`${Hosts.Host}/list/list`, body, { headers: headers })

            .toPromise()
            .then(() => {
                this.loadlists();
            });
    }

    loadlists() {
        this._http.get(`${Hosts.Host}/list/lists`)
            .map((res: Response) => res.json())
            .subscribe(data => {
                this._dataStore.lists = data;
                this._listsObserver.next(this._dataStore.lists);
            },
            error => console.log(error)
            );
    };


}
