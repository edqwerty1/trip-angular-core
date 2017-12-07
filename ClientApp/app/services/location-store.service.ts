import { ILocations, ILocation } from '../models/locations';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable, Observer } from 'rxjs/RX';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import { Hosts } from './hosts';
import {UserStoreService} from './user.service';

@Injectable()
export class LocationStoreService {
    locations$: Observable<ILocation[]>;
    private _locationsObserver: Observer<ILocation[]>;
    private _dataStore: {
        locations: ILocation[];
    };

    constructor(private _http: Http, private _userService: UserStoreService) {
        this._dataStore = { locations: [] };

        this.locations$ = new Observable<ILocation[]>(observer => this._locationsObserver = observer)
            .startWith(this._dataStore.locations)
            .share();
};

    addLocation(location: ILocation) {
        let body = JSON.stringify(location);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', this._userService.user.token);
        return this._http.put(`${Hosts.Host}/Location/Location`, body, { headers: headers })

            .toPromise()
            .then(() => {
                this.loadLocations();
            });
    }

    editLocation(location: ILocation) {
        let body = JSON.stringify(location);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', this._userService.user.token);
        return this._http.put(`${Hosts.Host}/Location/Location`, body, { headers: headers })

            .toPromise()
            .then(() => {
                this.loadLocations();
            });
    }

    loadLocations() {
        console.log(Hosts.Host);
        this._http.get(`${Hosts.Host}/location/locations`)
            .map((res: Response) => res.json())
            .subscribe(data => {
                this._dataStore.locations = data;
                this._locationsObserver.next(this._dataStore.locations);
            },
            error => console.log(error)
            );
    };

    upVote(locationId: string) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', this._userService.user.token); 
        this._http.post(`${Hosts.Host}/location/${locationId}/upVote`,
            JSON.stringify({ 'userId': this._userService.user.id }),
            { headers: headers })
            .subscribe(data => {
                this.loadLocations();
            }, error => console.log(error));

    }

    downVote(locationId: string) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', this._userService.user.token); 
        this._http.post(`${Hosts.Host}/location/${locationId}/downVote`,
            JSON.stringify({ 'userId': this._userService.user.id }),
            { headers: headers })
            .subscribe(data => {
                this.loadLocations();
            }, error => console.log(error));

    }
}
