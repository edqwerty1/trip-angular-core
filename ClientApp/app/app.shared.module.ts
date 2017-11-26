import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import {NgbModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';

import { TripComponent } from './components/trip/trip.component';
import { BannerComponent } from './components/banner/banner.component';
import { LoginButtonComponent } from './components/loginbutton/login-button.component';
import { RegisterButtonComponent } from './components/registerbutton/register-button.component';
import { AddLocationButtonComponent } from './components/addlocation/add-location.component';
import { LoginModalComponent } from './components/loginmodal/login-modal.component';
import { AddLocationModalComponent } from './components/addlocationmodal/add-location-modal.component';
import { RegisterModalComponent } from './components/registermodal/register-modal.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LocationThumbnailComponent } from './components/locationthumbnail/location-thumbnail.component';
import { VoteComponent } from './components/vote/vote.component';
import { MapComponent } from './components/map/map.component';
import { ShowMapComponent } from './components/showmap/show-map.component';


import { UserStoreService } from './services/user.service';
import { LocationStoreService } from './services/location-store.service';
import { MapService } from './services/map.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        TripComponent,
        BannerComponent,
        LoginButtonComponent,
        RegisterButtonComponent,
        LoginModalComponent,
        RegisterModalComponent,
        LocationsComponent,
        LocationThumbnailComponent,
        VoteComponent,
        AddLocationButtonComponent,
        AddLocationModalComponent,
        MapComponent,
ShowMapComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'trip', component: TripComponent },
            { path: '**', redirectTo: 'home' }
        ]),
        NgbModule.forRoot(),
       // NgbModalModule.forRoot()
    ],
    bootstrap: [AppComponent],
    providers:[UserStoreService, 
                LocationStoreService,
                MapService],
    entryComponents: [
        LoginModalComponent,
        RegisterModalComponent,
        AddLocationModalComponent
    ]

})
export class AppModuleShared {
}
