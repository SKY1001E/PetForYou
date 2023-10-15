import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    RouterModule.forChild([
      {path: '', redirectTo: 'main', pathMatch: 'full'},
      {
        path: 'main', component: MainPageComponent,
      },
    ]),
  ],
  declarations: [
    MainPageComponent
  ],
  exports: [],
  providers: []
})
export class MainV1Module { }
