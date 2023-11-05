import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {ProfileComponent} from "./components/profile.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,

        RouterModule.forChild([
            {path: '', redirectTo: 'my', pathMatch: 'full'},
            {
                path: 'my',
                component: ProfileComponent
            }
        ]),
        ProgressSpinnerModule,
    ],
    declarations: [
        ProfileComponent
    ],
    exports: [],
    providers: []
})
export class ProfileModule { }
