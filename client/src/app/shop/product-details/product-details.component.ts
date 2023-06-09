import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity = 1;

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute,
    private bcService: BreadcrumbService, private basketService: BasketService) {
    this.bcService.set('@productDetails', ' ');//for not display product id instead of it's name during loading process
  }
  ngOnInit() {
    this.loadProduct();
  }

  addItemToBakset() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }
  incrementQuantity() {
    this.quantity++;
  }
  decrementQuantity() {
    if (this.quantity > 1)
      this.quantity--;
  }
  loadProduct() {
    this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get("id")!).subscribe(product => { //+ sign is for casting to integer
      this.product = product;
      this.bcService.set('@productDetails', product.name);
    }, error => {
      console.log(error);
    })
  }

}
