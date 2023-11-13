import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {ProfileComponent} from "./components/profile.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from 'primeng/inputtext';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';



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
        DialogModule,
        InputTextModule,
        DropdownModule,
        CalendarModule
    ],
    declarations: [
        ProfileComponent
    ],
    exports: [],
    providers: []
})
export class ProfileModule { }
