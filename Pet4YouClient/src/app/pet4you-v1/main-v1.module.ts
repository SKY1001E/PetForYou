import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {ButtonModule} from "primeng/button";
import {UiControllerService} from "./services/ui-controller.service";


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
                    }
                ]
            },
        ]),
        ButtonModule,
    ],
  declarations: [
    MainPageComponent
  ],
  exports: [],
  providers: [
      UiControllerService
  ]
})
export class MainV1Module { }
