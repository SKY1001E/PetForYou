import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/pet4you-v1/services/api/order.service';
import { UserService } from 'src/app/pet4you-v1/services/api/user.service';
import { OrderRequest } from 'src/app/pet4you-v1/shared/others/models/order-request';

@Component({
  selector: 'app-order-list-in',
  templateUrl: './order-list-in.component.html'
})
export class OrderListInComponent implements OnInit {
    currentChosenTypeTitle: string = "Received orders"; 
    orderRequests?: OrderRequest[];
    isLoading: boolean = true;
    userId!: number;
    constructor(
        private userService: UserService,
        private orderService: OrderService
    )
    {}

    ngOnInit(): void {
        this.userId = this.userService.getUserInfoFromToken().userId;
        this.orderService.getInputOrders(this.userId).subscribe({
            next: (response) => this.orderRequests = response
        })
    }
}
