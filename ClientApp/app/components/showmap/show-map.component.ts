import { Component } from '@angular/core';

@Component({
    selector: 'show-map',
    template: `
    <button type="button" class="btn btn-default" (click)="showMaps = !showMaps">
    Show Map
</button>
<maps *ngIf="showMaps"></maps>
    `,
})
export class ShowMapComponent {
    showMaps: boolean;
}