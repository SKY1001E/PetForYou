import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListPageComponent } from './pages/order-list-page/order-list-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    OrderListPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
            path: '', 
            redirectTo: 'list', 
            pathMatch: 'full'
        },
        {
            path: 'list',
            component: OrderListPageComponent
        },
    ])
  ]
})
export class OrderModule { }
