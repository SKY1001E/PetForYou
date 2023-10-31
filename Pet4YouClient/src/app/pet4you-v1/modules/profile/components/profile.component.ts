import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {

    destroy = new Subject<any>();

    constructor() { }

    ngOnDestroy() {
        this.destroy.next(null);
        this.destroy.complete();
    }

    ngOnInit(): void {
    }

}
