import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import {UiControllerService} from '../../../../services/ui-controller.service';

@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit, OnDestroy, AfterViewInit {

    destroy = new Subject<any>();

    constructor(private router: Router,
                private route: ActivatedRoute,
                public uiController: UiControllerService
                    ) {
    }

    ngOnDestroy() {
        this.destroy.next(null);
        this.destroy.complete();
    }

    ngOnInit() {
        this.uiController.showHeader = false;
    }

    ngAfterViewInit() {

    }
}
