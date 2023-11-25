import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from 'primeng/inputtext';
import {CreateAnnouncementComponent} from "./components/create-announcement/create-announcement.component";
import { DropdownModule } from 'primeng/dropdown';
import {AnnouncementViewPageComponent} from "./pages/announcement-view-page/announcement-view-page.component";
import { TreeSelectModule } from 'primeng/treeselect';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { AvatarModule } from 'primeng/avatar';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        DropdownModule,
        TreeSelectModule,
        ButtonModule,
        GalleriaModule,
        AvatarModule,
        RouterModule.forChild([
            {path: '', redirectTo: 'create', pathMatch: 'full'},
            {
                path: 'create',
                component: CreateAnnouncementComponent
            },
            {
                path: 'view/:id',
                component: AnnouncementViewPageComponent
            }
        ]),
        ProgressSpinnerModule,
        DialogModule,
        InputTextModule,
    ],
    declarations: [
        CreateAnnouncementComponent,
        AnnouncementViewPageComponent
    ],
    exports: [],
    providers: []
})
export class AnnouncementModule { }
