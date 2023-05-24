import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  ngOnInit() {
    this.loadProduct();
  }

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute) {

  }
  product: IProduct;
  loadProduct() {
    this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get("id")!).subscribe(product => { //+ sign is for casting to integer
      this.product = product;
    }, error => {
      console.log(error);
    })
  }

}
