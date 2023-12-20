import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {ButtonModule} from "primeng/button";
import {UIPartsController} from "./services/ui-parts-controller.service";
import {ACCESS_TOKEN_KEY, AuthService} from "./services/api/auth.service";
import {JwtModule} from "@auth0/angular-jwt";
import {environment} from "../../environments/environments";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {AuthRequiredGuard} from "./guards/auth-required.guard";
import {UserService} from "./services/api/user.service";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {AnnouncementService} from "./services/api/announcement.service";
import { ConfirmDialogModule } from 'primeng/confirmdialog';

const providers = [
    UIPartsController,
    AuthService,
    MessageService,
    UserService,
    AnnouncementService,
    AuthRequiredGuard,
    ConfirmationService
]

export function tokenGetter() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,

        RouterModule.forChild([
            {
                path: '', component: MainPageComponent,
                children: [
                    {
                        path: '', redirectTo: 'home', pathMatch: 'full'
                    },
                    {
                        path: 'home',
                        component: HomePageComponent
                    },
                    {
                        path: 'sign',
                        loadChildren: () => import('./modules/sign-in-up/sign-in-up.module').then((m) => m.SignInUpModule)
                    },
                    {
                        path: 'profile',
                        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
                        canActivate: [AuthRequiredGuard]
                    },
                    {
                        path: 'announcement',
                        loadChildren: () => import('./modules/announcement/announcement.module').then(m => m.AnnouncementModule),
                        canActivate: [AuthRequiredGuard]
                    }
              ]
            },
          ]),

        JwtModule.forRoot({
            config: {
                tokenGetter,
                allowedDomains: environment.tokenWhiteListedDomains
            }
        }),
        ButtonModule,
        ToastModule,
        ConfirmDialogModule
    ],
  declarations: [
    MainPageComponent,
    HomePageComponent
  ],
  exports: [],
  providers: providers
})
export class MainV1Module { }
