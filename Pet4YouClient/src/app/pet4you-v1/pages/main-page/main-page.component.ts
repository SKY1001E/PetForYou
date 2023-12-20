import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import {UIPartsController} from '../../services/ui-parts-controller.service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit, OnDestroy, AfterViewInit {

    destroy = new Subject<any>();

    title = 'Pet4YouClient';

    constructor(private router: Router,
                private route: ActivatedRoute,
                private location: Location,
                public uiParts: UIPartsController) {
    }

    ngOnDestroy() {
        this.destroy.next(null);
        this.destroy.complete();
    }

    ngOnInit() {
    }

    ngAfterViewInit() {

    }

    back() {
        this.location.back();
    }
}
