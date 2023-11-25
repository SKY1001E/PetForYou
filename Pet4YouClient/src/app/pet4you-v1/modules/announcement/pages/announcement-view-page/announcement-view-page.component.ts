import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
    selector: 'announcement-view-page',
    templateUrl: './announcement-view-page.component.html',
})
export class AnnouncementViewPageComponent implements OnInit, OnDestroy, AfterViewInit {

    destroy = new Subject<any>();

    constructor(private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnDestroy() {
        this.destroy.next(null);
        this.destroy.complete();
    }

    ngOnInit() {
    }

    ngAfterViewInit() {

    }
}
