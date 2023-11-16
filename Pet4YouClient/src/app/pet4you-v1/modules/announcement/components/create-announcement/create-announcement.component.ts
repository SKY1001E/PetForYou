import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UIPartsController} from "../../../../services/ui-parts-controller.service";

@Component({
    selector: 'create-announcement',
    templateUrl: './create-announcement.component.html',
})
export class CreateAnnouncementComponent implements OnInit, OnDestroy {

    destroy = new Subject<any>();

    private prevUIParts: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private uiParts: UIPartsController,
    ) { }

    ngOnDestroy() {
        this.destroy.next(null);
        this.destroy.complete();

        this.uiParts.restoreValue(this.prevUIParts);
    }

    ngOnInit(): void {
        this.prevUIParts = this.uiParts.storeValue();
    }

}
