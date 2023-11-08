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
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {AuthRequiredGuard} from "./guards/auth-required.guard";
import {UserService} from "./services/api/user.service";
import {HomePageComponent} from "./pages/home-page/home-page.component";

const providers = [
    UIPartsController,
    AuthService,
    MessageService,
    UserService,
    AuthRequiredGuard
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
              path: '', redirectTo: 'home', pathMatch: 'full', component: MainPageComponent,
              children: [
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
    MainPageComponent,
    HomePageComponent
  ],
  exports: [],
  providers: providers
})
export class MainV1Module { }
