import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Subject, takeUntil} from 'rxjs';
import {UIPartsController} from '../../../../services/ui-parts-controller.service';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/api/auth.service";
import {AuthResponseModel} from "../../../../shared/others/models/auth-models";
import {MessageService} from "primeng/api";

@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit, OnDestroy, AfterViewInit {

    destroy = new Subject<any>();

    form!: FormGroup;
    private prevUIParts: any;

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

        this.uiParts.restoreValue(this.prevUIParts);
    }

    ngOnInit() {
        this.prevUIParts = this.uiParts.storeValue();
        this.uiParts.showHeader = false;

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
