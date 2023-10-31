import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
    imports: [
        
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,

        RouterModule.forChild([
            {path: '', redirectTo: 'in', pathMatch: 'full'},
            { path: 'in', component: SignInComponent },
            { path: 'up', component: SignUpComponent },
            { path: 'profile', component: ProfileComponent}
        ]),
    ],
    declarations: [
        SignInComponent,
        SignUpComponent
    ],
    exports: [],
    providers: []
})
export class SignInUpModule { }
