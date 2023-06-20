import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDeliveryMethod } from '../shared/models/DeliveryMethod';
import { map } from 'rxjs';
import { IOrderToCreate } from '../shared/models/Order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = "https://localhost:5001/api/";

  constructor(private http: HttpClient) { }
  createOrder(order: IOrderToCreate) {
    return this.http.post(this.baseUrl + 'orders', order);
  }
  getDeliveryMethods() {
    return this.http.get<IDeliveryMethod[]>(this.baseUrl + 'orders/deliveryMethods').pipe(
      map((dm: IDeliveryMethod[]) => {
        return dm.sort((a, b) => b.price - a.price);
      })
    );
  }
}
