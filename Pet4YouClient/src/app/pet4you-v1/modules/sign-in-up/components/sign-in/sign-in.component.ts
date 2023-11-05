import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {UIPartsController} from '../../../../services/ui-parts-controller.service';
import {AuthService} from "../../../../services/api/auth.service";
import {AuthResponseModel} from "../../../../shared/others/models/auth-models";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit, OnDestroy, AfterViewInit {

    destroy = new Subject<any>();

    form!: FormGroup;
    private prevUiParts: any;

    constructor(private router: Router,
                private route: ActivatedRoute,
                public uiParts: UIPartsController,
                private authService: AuthService,
                private toastService: MessageService
    ) {
    }

    ngOnDestroy() {
        this.destroy.next(null);
        this.destroy.complete();

        this.uiParts.restoreValue(this.prevUiParts);
    }

    ngOnInit() {
        this.prevUiParts = this.uiParts.storeValue();
        this.uiParts.showHeader = false;

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
            email: this.form.get('email')?.value,
            password: this.form.get('password')?.value
        }

        this.authService.login(authInfo)
            .pipe(takeUntil(this.destroy))
            .subscribe(() => {
                this.toastService.add({ severity: 'success', summary: 'Success', detail: 'You are successfully login' });
                this.router.navigate(['/']).then();
            });
    }
}
