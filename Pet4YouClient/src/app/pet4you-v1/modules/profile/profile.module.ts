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
            }, 
            { 
                path:"seller", 
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