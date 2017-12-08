import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/RX';
import { LocationStoreService } from '../../services/location-store.service';
import { UserStoreService } from '../../services/user.service';
import { ILocation } from '../../models/locations';

@Component({
    selector: 'vote',
    templateUrl: './vote.component.html',
    styles: ['.cursor-fix { cursor: default; }']
})
export class VoteComponent implements OnInit {
    @Input() location: ILocation;
    score: number;
    upVoted: boolean;
    downVoted: boolean;
    constructor(private _locationsStore: LocationStoreService, private _userStore: UserStoreService ) {

    }

    ngOnInit() {
        this.score = this.location.upVotes.length - this.location.downVotes.length;
        this.upVoted = !this.location.upVotes.every((id) => id !== this._userStore.user.id);
        this.downVoted = !this.location.downVotes.every((id) => id !== this._userStore.user.id);
    }

    upVote() {
        this._locationsStore.upVote(this.location.id);
    }

    downVote() {
        this._locationsStore.downVote(this.location.id);
    }
}