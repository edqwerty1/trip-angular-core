import { Component, OnInit, Input } from '@angular/core';
import {Observable} from 'rxjs/RX';
import {LocationStoreService} from './location-store.service';
import {ILocation} from './models/locations';

@Component({
    selector: 'vote',
    templateUrl: 'app/vote.component.html',
    directives: [],
    styles: ['.cursor-fix { cursor: default; }']
})
export class VoteComponent implements OnInit {
    @Input() location: ILocation;
    score: number;
    upVoted: boolean;
    downVoted: boolean;
    constructor(private _locationsStore: LocationStoreService) {

    }

    ngOnInit() {
       this.score = this.location.upVotes.length - this.location.downVotes.length;
       this.upVoted = !this.location.upVotes.every((id) => id !== localStorage.getItem('userId'));
       this.downVoted = !this.location.downVotes.every((id) => id !== localStorage.getItem('userId'));
    }

    upVote() {
        this._locationsStore.upVote(this.location.id);
    }

    downVote() {
        this._locationsStore.downVote(this.location.id);
    }
}