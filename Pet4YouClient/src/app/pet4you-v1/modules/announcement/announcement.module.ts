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
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipsModule } from 'primeng/chips';
import { AllAnnouncementsPageComponent } from './pages/all-announcements-page/all-announcements-page.component';
import { AnnouncementFiltersComponent } from './components/announcement-filters/announcement-filters.component';
import { UserAnnouncementsPageComponent } from './pages/user-announcements-page/user-announcements-page.component';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';
import { EditAnnouncementComponent } from './pages/edit-announcement/edit-announcement';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        DropdownModule,
        TreeSelectModule,
        ButtonModule,
        ConfirmDialogModule,
        GalleriaModule,
        AvatarModule,
        MultiSelectModule,
        InputNumberModule,
        ChipsModule,
        InputTextareaModule,
        RouterModule.forChild([
            {
                path: '', 
                redirectTo: 'all', 
                pathMatch: 'full'
            },
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
            },
            {
                path: 'my',
                component: UserAnnouncementsPageComponent
            },
            {
                path:'edit/:id',
                component:EditAnnouncementComponent
            }
        ]),
        ProgressSpinnerModule,
        DialogModule,
        InputTextModule,
    ],
    declarations: [
        CreateAnnouncementComponent,
        AnnouncementViewPageComponent,
        AllAnnouncementsPageComponent,
        AnnouncementFiltersComponent,
        UserAnnouncementsPageComponent,
        AdvertisementComponent,
        EditAnnouncementComponent,
    ],
    exports: [],
    providers: []
})
export class AnnouncementModule { }
