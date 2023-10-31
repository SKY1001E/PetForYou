import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {ButtonModule} from "primeng/button";
import {UiControllerService} from "./services/ui-controller.service";
import {ACCESS_TOKEN_KEY, AuthService} from "./services/auth.service";
import {JwtModule} from "@auth0/angular-jwt";
import {environment} from "../../environments/environments";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import { ProfileComponent } from './modules/profile/components/profile.component';

const providers = [
    UiControllerService,
    AuthService,
    MessageService
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
                  path: 'sign',
                  loadChildren: () => import('./modules/sign-in-up/sign-in-up.module').then((m) => m.SignInUpModule)
                },
                {
                  path: 'profile',
                  loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
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
    ],
  declarations: [
    MainPageComponent
  ],
  exports: [],
  providers: providers
})
export class MainV1Module { }
