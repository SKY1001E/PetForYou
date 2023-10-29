import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {UiControllerService} from '../../../../services/ui-controller.service';
import {AuthService} from "../../../../services/auth.service";
import {AuthResponseModel} from "../../../../shared/others/models/auth-models";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit, OnDestroy, AfterViewInit {

    destroy = new Subject<any>();

    form!: FormGroup;

    constructor(private router: Router,
                private route: ActivatedRoute,
                public uiController: UiControllerService,
                private authService: AuthService) {
    }

    ngOnDestroy() {
        this.destroy.next(null);
        this.destroy.complete();
    }

    ngOnInit() {
        this.uiController.showHeader = false;

        this.buildForm()
    }

    ngAfterViewInit() {

    }

    private buildForm() {
        this.form = new FormGroup<any>({
            email: new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl(null, [
                Validators.required
            ])
        })
    }

    login() {
        const authInfo: AuthResponseModel = {
            email: 'tkacenkostas20@gmail.com',
            password: 'qwerty'
        }

        this.authService.login(authInfo)
            .pipe(takeUntil(this.destroy))
            .subscribe(() => {
            console.log(this.authService.isAuthenticated())
        });
    }
}
