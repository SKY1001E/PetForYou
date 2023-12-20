import { Component } from '@angular/core';
import { OrderService } from 'src/app/pet4you-v1/services/api/order.service';
import { UserService } from 'src/app/pet4you-v1/services/api/user.service';
import { OrderRequest } from 'src/app/pet4you-v1/shared/others/models/order-request';

@Component({
  selector: 'app-order-list-out',
  templateUrl: './order-list-out.component.html'
})
export class OrderListOutComponent {
    currentChosenTypeTitle: string = "Sent unprocessed orders"; 
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
        this.orderService.getOutputOrders(this.userId).subscribe({
            next: (response) => this.orderRequests = response
        })
    }
}
