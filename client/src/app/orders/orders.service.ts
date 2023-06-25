import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = "https://localhost:5001/api/";

  constructor(private http: HttpClient) { }
  getOrdersForUsers() {
    return this.http.get(this.baseUrl + 'orders');
  }
  getOrderDetailed(id: number) {
    return this.http.get(this.baseUrl + 'orders/' + id);
  }
}
