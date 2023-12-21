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
import { SellerProfileComponent } from './seller-profile/seller-profile.component'; 
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';

 
 
@NgModule({ 
    imports: [ 
        CommonModule, 
        FormsModule, 
        ConfirmDialogModule,
        HttpClientModule, 
        ReactiveFormsModule,
        InputTextareaModule, 
        RouterModule.forChild([ 
            {path: '', redirectTo: 'my', pathMatch: 'full'}, 
            { 
                path: 'my', 
                component: ProfileComponent 
            }, 
            { 
                path:":id", 
                component: SellerProfileComponent 
            } 
        ]), 
        ProgressSpinnerModule, 
        DialogModule, 
        InputTextModule, 
        DropdownModule, 
        CalendarModule 
    ], 
    declarations: [ 
        ProfileComponent, 
        SellerProfileComponent 
    ], 
    exports: [], 
    providers: [] 
}) 
export class ProfileModule { }