import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Subject, takeUntil} from 'rxjs';
import {UiControllerService} from '../../../../services/ui-controller.service';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";
import {AuthResponseModel} from "../../../../shared/others/models/auth-models";
import {MessageService} from "primeng/api";

@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit, OnDestroy, AfterViewInit {

    destroy = new Subject<any>();

    form!: FormGroup;

    constructor(private router: Router,
                private route: ActivatedRoute,
                public uiController: UiControllerService,
                private authService: AuthService,
                private toastService: MessageService
                    ) {
    }

    ngOnDestroy() {
        this.destroy.next(null);
        this.destroy.complete();
    }

    ngOnInit() {
        this.uiController.showHeader = false;

        this.buildForm();
    }

    ngAfterViewInit() {

    }

    private buildForm() {
        this.form = new FormGroup<any>({
            email: new FormControl(null, [
                Validators.email,
                Validators.required
            ]),
            password: new  FormControl(null, [
                Validators.required,
                Validators.minLength(6),
            ]),
            confirmPassword: new FormControl(null, [
                Validators.required,
                Validators.pattern('^\\S+$')
            ], [
                this.matchPasswordAsync.bind(this)
            ]),
        })
    }

    matchPasswordAsync(control: AbstractControl): Promise<{ [key: string]: any } | null> | Observable<{ [key: string]: any } | null> {
        const password = control.parent?.get('password')!.value;
        const confirmPassword = control.value;

        return password !== confirmPassword
            ? Promise.resolve({ passwordMismatch: true })
            : Promise.resolve(null);
    }

    register() {
        const authInfo: AuthResponseModel = {
            email: this.form.get('email')?.value,
            password: this.form.get('confirmPassword')?.value
        }

        this.authService.register(authInfo)
            .pipe(takeUntil(this.destroy))
            .subscribe((res) => {
                this.toastService.add({ severity: 'success', summary: 'Success', detail: 'You are successfully registered' });
            });
    }
}
