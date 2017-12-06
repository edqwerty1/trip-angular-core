import { Component, AfterViewInit } from '@angular/core';
import { UserStoreService } from '../../services/user.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

    constructor(private _userService: UserStoreService){

    }

    ngAfterViewInit(){
   
    }
}
