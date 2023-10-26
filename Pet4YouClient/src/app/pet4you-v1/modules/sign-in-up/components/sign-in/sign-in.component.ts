import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HeaderService } from '../../../../../HeaderState'; 

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit, OnDestroy, AfterViewInit {

    destroy = new Subject<any>();

    constructor(private router: Router,
                private route: ActivatedRoute,
                public headerService: HeaderService) {
    }

    ngOnDestroy() {
        this.destroy.next(null);
        this.destroy.complete();
    }

    ngOnInit() {
        this.headerService.hideHeader = true; 
    }

    ngAfterViewInit() {

    }
}
