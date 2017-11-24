import { Component } from '@angular/core';
import {document, window } from '@angular/platform-browser/src/facade/browser';
import {LoginButtonComponent} from './login-button.component';
import {RegisterButtonComponent} from './register-button.component';
@Component({
    selector: 'banner-shrink',
    templateUrl: 'app/banner.component.html',
    styleUrls: ['app/banner.component.css'],
    directives: [LoginButtonComponent, RegisterButtonComponent]
})
export class BannerComponent {
    shrink: boolean = false;
    onScroll(event) {
        this.shrink = document.body.scrollTop > 50;

  }
}