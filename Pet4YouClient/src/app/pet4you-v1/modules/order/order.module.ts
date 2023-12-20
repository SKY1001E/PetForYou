import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListInComponent } from './pages/order-list-in/order-list-in.component';
import { RouterModule } from '@angular/router';
import { OrderListOutComponent } from './pages/order-list-out/order-list-out.component';
import { OrderListArchiveComponent } from './pages/order-list-archive/order-list-archive.component';



@NgModule({
  declarations: [
    OrderListInComponent,
    OrderListOutComponent,
    OrderListArchiveComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
            path: '', 
            redirectTo: 'in', 
            pathMatch: 'full'
        },
        {
            path: 'in',
            component: OrderListInComponent
        },
        {
            path: 'out',
            component: OrderListOutComponent
        },
        {
            path: 'archive',
            component: OrderListArchiveComponent
        },
    ])
  ]
})
export class OrderModule { }
