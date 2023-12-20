import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UIPartsController} from "../../../services/ui-parts-controller.service";
import {UserService} from "../../../services/api/user.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { UpdateUserModel, User } from 'src/app/pet4you-v1/shared/others/models/user-models';
import { AuthService } from 'src/app/pet4you-v1/services/api/auth.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {

    destroy = new Subject<any>();
    private prevUIParts: any;
    user!: User;
    isLoading: boolean = true;
    isDialogOpened: boolean = false;
    changePasswordForm!: FormGroup;
    updateUserInfoForm!: FormGroup;
    sexs!: SelectItem[];

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        private uiParts: UIPartsController,
        private userService: UserService,
        private toastService: MessageService,
        private authService: AuthService,
        private confirmationService: ConfirmationService

    ) {
        this.sexs = [
            { label: '', value: null},
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Undefined', value: 'Undefined' },
          ];
    }

    ngOnInit(): void {
        this.prevUIParts = this.uiParts.storeValue();

        this.userService.getUser()
            .pipe(takeUntil(this.destroy),
                tap(() => this.isLoading = true))
            .subscribe(u => {
                this.user = u;
                this.renderChangePasswordForm();
                this.renderUpdateUserInfoForm();
                this.isLoading = false;
            })
    }


    ngOnDestroy() {
        this.destroy.next(null);
        this.destroy.complete();
        this.uiParts.restoreValue(this.prevUIParts);
    }

    renderChangePasswordForm() {
        this.changePasswordForm = new FormGroup(
            {
                oldPassword: new FormControl(null, [Validators.required]),
                newPassword: new FormControl(null, [Validators.required]),
                newPasswordConfirm: new FormControl(null, [Validators.required])
            }
        )
    }

    renderUpdateUserInfoForm() {
        this.updateUserInfoForm = new FormGroup({
            firstName: new FormControl(this.user.userInfo.firstName),
            lastName: new FormControl(this.user.userInfo.lastName),
            patronymicName: new FormControl(this.user.userInfo.patronymicName),
            sex: new FormControl(this.user.userInfo.sex),
            email: new FormControl(this.user.userInfo.email, [Validators.email]),
            phone: new FormControl(this.user.userInfo.phone),
            dateOfBirth: new FormControl(this.user.userInfo.dateOfBirth),
            biography: new FormControl(this.user.userInfo.biography),
        })
    }

    changePassword()
    {
        var oldPassword: string = this.changePasswordForm.get('oldPassword')?.value;
        var newPassword: string = this.changePasswordForm.get('newPassword')?.value;
        var newPasswordConfirm: string = this.changePasswordForm.get('newPasswordConfirm')?.value;
        if(newPassword !== newPasswordConfirm) {
            this.toastService.add({severity: 'error', summary: 'Password change', detail: 'Incorrect password confirmation' })
            return;
        }
        this.userService.changePassword(oldPassword, newPassword).subscribe({
            next: (response) => {
                this.toastService.add({severity: 'success', summary: 'Password change', detail: 'Password has changed'})
            },
            error: (error) => {
                this.toastService.add({severity: 'error', summary: 'Password change', detail: error.error})
            }
        });

    }

    logout() {
        this.authService.logout();
    }

    changeDialogState() {
        this.isDialogOpened = !this.isDialogOpened;
    }

    updateUser() {
        var updateUser: UpdateUserModel = {
            id: this.user.id,
            login: this.user.login,
            firstName: this.updateUserInfoForm.get('firstName')?.value ? this.updateUserInfoForm.get('firstName')?.value : this.user.userInfo.firstName,
            lastName: this.updateUserInfoForm.get('lastName')?.value ? this.updateUserInfoForm.get('lastName')?.value : this.user.userInfo.lastName,
            patronymicName: this.updateUserInfoForm.get('patronymicName')?.value ? this.updateUserInfoForm.get('patronymicName')?.value : this.user.userInfo.patronymicName,
            sex: this.updateUserInfoForm.get('sex')?.value ? this.updateUserInfoForm.get('sex')?.value : this.user.userInfo.sex,
            email: this.updateUserInfoForm.get('email')?.value ? this.updateUserInfoForm.get('email')?.value : this.user.userInfo.email,
            phone: this.updateUserInfoForm.get('phone')?.value ? this.updateUserInfoForm.get('phone')?.value : this.user.userInfo.phone,
            dateOfBirth: this.updateUserInfoForm.get('dateOfBirth')?.value ? this.updateUserInfoForm.get('dateOfBirth')?.value : this.user.userInfo.dateOfBirth,
            biography: this.updateUserInfoForm.get('biography')?.value ? this.updateUserInfoForm.get('biography')?.value : this.user.userInfo.biography
        }

        this.userService.updateUser(updateUser).subscribe({
            next: (response) => {
                this.toastService.add({severity: 'success', summary: 'Update info', detail: 'Information successfully updated'}),
                this.userService.getUser().subscribe(u => {
                    this.user = u;
                })
            },
            error: (error) => {
                this.toastService.add({severity: 'error', summary: 'Update info', detail: error.error})
    }});
        this.changeDialogState()
    }

    deleteCurrentUser() {
        this.userService.deleteUser(this.user.id).subscribe({
            next: (response) => {
                this.toastService.add({severity: 'success', summary: 'User deleting', detail: 'User successfully deleted'});
                this.authService.logout();
            },
            error: (error) => {
                this.toastService.add({severity: 'error', summary: 'User deleting', detail: error.error})
            }
        })

    }

    confirmDeletingAccount(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you really want to delete your account?',
            header: 'Delete account',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonStyleClass: "p-button-text",
            accept: () => {
                this.deleteCurrentUser();
            }
        });
    }
}
