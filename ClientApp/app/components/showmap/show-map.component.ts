import { Component } from '@angular/core';

import {MapComponent} from './map.component';

@Component({
    selector: 'show-map',
    template: `
    <button type="button" class="btn btn-default" (click)="showMaps = !showMaps">
    Show Map
</button>
<maps *ngIf="showMaps"></maps>
    `,
    directives: [MapComponent]
})
export class ShowMapComponent {
showMaps:boolean;
}