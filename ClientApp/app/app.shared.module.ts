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
import { LoginModalComponent } from './components/loginmodal/login-modal.component';
import { RegisterModalComponent } from './components/registermodal/register-modal.component';


import { UserStoreService } from './services/user.service';

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
    providers:[UserStoreService],
    entryComponents: [
        LoginModalComponent,
        RegisterModalComponent
    ]

})
export class AppModuleShared {
}
