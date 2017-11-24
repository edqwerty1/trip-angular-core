import { Injectable } from '@angular/core';
const url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCcGzz_tZMrgkoArtY3GmnsWoJsAoNJ8fM&callback=_initMap&region=GB';
@Injectable()
export class MapService {
    loadAPI: Promise<any>;
    initialised: boolean;
    constructor() {
        this.loadAPI = new Promise((resolve) => {
            window['_initMap'] = (ev) => {
                resolve((window as any).google.maps);
            };
        });
    }

    initialise() {
        if (this.initialised) {
            return;
        }

        this.loadScript();
        this.initialised = true;
    }

    loadScript() {
        let node = document.createElement('script');
        node.src = url;
        node.async = true;
        node.defer = true;
        document.getElementsByTagName('head')[0].appendChild(node);

    }

}
