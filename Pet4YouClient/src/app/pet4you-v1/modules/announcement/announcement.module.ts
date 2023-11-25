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
<<<<<<< HEAD
import { TreeSelectModule } from 'primeng/treeselect';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { AvatarModule } from 'primeng/avatar';
=======
import { AllAnnouncementsPageComponent } from './pages/all-announcements-page/all-announcements-page.component';

>>>>>>> bf5515a (added all announcements page)

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
            {path: '', redirectTo: 'all', pathMatch: 'full'},
            {
                path: 'create',
                component: CreateAnnouncementComponent
            },
            {
                path: 'view/:id',
                component: AnnouncementViewPageComponent
            },
            {
                path: 'all',
                component: AllAnnouncementsPageComponent
            }
        ]),
        ProgressSpinnerModule,
        DialogModule,
        InputTextModule,
    ],
    declarations: [
        CreateAnnouncementComponent,
<<<<<<< HEAD
        AnnouncementViewPageComponent
=======
        AllAnnouncementsPageComponent
>>>>>>> bf5515a (added all announcements page)
    ],
    exports: [],
    providers: []
})
export class AnnouncementModule { }
