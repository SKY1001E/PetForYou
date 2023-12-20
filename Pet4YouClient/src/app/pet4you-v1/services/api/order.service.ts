import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Announcement, AnnouncementFilterModel} from "../../shared/others/models/announcement";
import {Observable} from "rxjs";
import { OrderRequest } from "../../shared/others/models/order-request";

@Injectable()
export class OrderService {

    constructor(
        private http: HttpClient,
        @Inject('API_URL') private apiUrl: string,
    ) 
    { }

    addOrderRequest(order: OrderRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}api/Order`, order);
    }

    getInputOrders(userId: number) : Observable<any> {
        return this.http.get(`${this.apiUrl}api/Order/in/${userId}`);
    }

    getOutputOrders(userId: number) : Observable<any> {
        return this.http.get(`${this.apiUrl}api/Order/out/${userId}`);
    }

    getCompletedOrders(userId: number) : Observable<any> {
        return this.http.get(`${this.apiUrl}api/Order/completed/${userId}`);
    }

    changeOrderStatus(order: OrderRequest) : Observable<any> {
        return this.http.patch(`${this.apiUrl}api/Order`, order);
    }
}
