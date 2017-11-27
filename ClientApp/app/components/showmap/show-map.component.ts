import { Component } from '@angular/core';

@Component({
    selector: 'show-map',
    template: `
    <button type="button" class="btn btn-default" (click)="showMaps = !showMaps">
    Show Map
</button>
<div *ngIf="showMaps" style="height:400px; width:50%;">
<maps ></maps>
</div>
    `,
})
export class ShowMapComponent {
    showMaps: boolean;
}