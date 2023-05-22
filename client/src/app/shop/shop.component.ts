import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { IPagination } from '../shared/models/pagination';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[] | undefined;
  brands: IBrand[];
  types: IType[];
  brandIdSelected: number=0;
  typeIdSelected: number=0;
  sortSelected='name';
  sortOptions=[
    {name:'Alphabetical',value:'name'},
    {name:'Price Low to High',value:'priceAsc'},
    {name:'Price High to Low',value:'priceDesc'}
  ];
  /**
   *
   */
  constructor(private ShopService: ShopService) { }

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.ShopService.getProducts(this.brandIdSelected, this.typeIdSelected,this.sortSelected).subscribe(response => {
      this.products = response?.data;
    }, error => {
      console.log(error);
    });
    console.log(1);
  }
  getBrands() {
    this.ShopService.getBrands().subscribe(response => {
      this.brands = [{ id: 0, name: 'All' }, ...response];

    }, error => { console.log(error); })
  }
  getTypes() {
    this.ShopService.getTypes().subscribe(response => {
      this.types = [{ id: 0, name: 'All' }, ...response];
    }, error => { console.log(error); })
  }
  onBrandSelected(brandId: number) {
    this.brandIdSelected = brandId;
    this.getProducts();
  }
  onTypeSelected(typeId: number) {
    this.typeIdSelected = typeId;
    this.getProducts();
  }
  onSortSelected(sort:string){
    this.sortSelected=sort;
    this.getProducts();
  }

}


