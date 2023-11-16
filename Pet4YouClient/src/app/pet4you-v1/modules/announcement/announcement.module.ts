import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from 'primeng/inputtext';
import {CreateAnnouncementComponent} from "./components/create-announcement/create-announcement.component";



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: '', redirectTo: 'create', pathMatch: 'full'},
            {
                path: 'create',
                component: CreateAnnouncementComponent
            }
        ]),
        ProgressSpinnerModule,
        DialogModule,
        InputTextModule,
    ],
    declarations: [
        CreateAnnouncementComponent
    ],
    exports: [],
    providers: []
})
export class AnnouncementModule { }
