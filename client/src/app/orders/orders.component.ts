import { Component, OnInit } from '@angular/core';
import { IOrder } from '../shared/models/Order';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders:IOrder[];
  /**
   *
   */
  constructor(private ordersService:OrdersService) {
    
  }
  ngOnInit(){
    this.getOrders();
  }
  getOrders(){
    this.ordersService.getOrdersForUsers().subscribe((orders:any)=>{
      this.orders=orders;
    },error=>{
      console.log(error);
    });
  }

}
