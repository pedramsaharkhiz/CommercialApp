import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';
import { IOrder } from 'src/app/shared/models/Order';
import { parse } from 'uuid';

@Component({
  selector: 'app-orders-detailed',
  templateUrl: './orders-detailed.component.html',
  styleUrls: ['./orders-detailed.component.scss']
})
export class OrdersDetailedComponent implements OnInit {
  order:IOrder;
  /**
   *
   */
  constructor(private route: ActivatedRoute, private breadcrumbService: BreadcrumbService, private ordersService: OrdersService) {
    this.breadcrumbService.set('@OrderDetailed', '');
  }
  ngOnInit() {
    this.ordersService.getOrderDetailed(parseInt(this.route.snapshot.paramMap.get('id')!))
    .subscribe((order:any)=>{
      this.order=order;
      this.breadcrumbService.set('@OrderDetailed',`Order# ${order.id} - ${order.status}`);
    },error=>{
      console.log(error);
    });
  }

}
