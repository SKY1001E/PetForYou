import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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
        private orderService: OrderService,
        private messageService: MessageService
    )
    {}

    ngOnInit(): void {
        this.userId = this.userService.getUserInfoFromToken().userId;
        this.orderService.getInputOrders(this.userId).subscribe({
            next: (response) => this.orderRequests = response
        })
    }

    acceptOrder(orderId: number) {
        var order: OrderRequest = {
            id: orderId,
            status: 'approved'
        }
        this.orderService.changeOrderStatus(order).subscribe({
            next: () => {
                this.messageService.add({severity:'success',summary:'Success',detail:"You have successfully approved order"});
                this.orderRequests = this.orderRequests?.filter((e) => {
                    return e.id != orderId
                })
            }
        })
    }

    rejectOrder(orderId: number) {
        var order: OrderRequest = {
            id: orderId,
            status: 'rejected'
        }
        this.orderService.changeOrderStatus(order).subscribe({
            next: () => {
                this.messageService.add({severity:'success',summary:'Success',detail:"You have successfully rejected order"});
                this.orderRequests = this.orderRequests?.filter((e) => {
                    return e.id != orderId
                })
            }
        })
    }
}
