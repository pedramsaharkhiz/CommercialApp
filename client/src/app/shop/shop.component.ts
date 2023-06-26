import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm: ElementRef;
  products: IProduct[] | undefined;
  brands: IBrand[];
  types: IType[];
  shopParams: ShopParams;
  totalCount: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price Low to High', value: 'priceAsc' },
    { name: 'Price High to Low', value: 'priceDesc' }
  ];
  /**
   *
   */
  constructor(private ShopService: ShopService) {
    this.shopParams = this.ShopService.getShopParams();
  }

  ngOnInit() {
    this.getProducts(true);
    this.getBrands();
    this.getTypes();
  }

  getProducts(useCache=false) {
    this.ShopService.getProducts(useCache).subscribe(response => {
      this.products = response?.data;
      this.totalCount = response?.count!;
    }, error => {
      console.log(error);
    });
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
    const params = this.ShopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.ShopService.setShopParams(params);
    this.getProducts();
  }
  onTypeSelected(typeId: number) {
    const params = this.ShopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1
    this.ShopService.setShopParams(params);
    this.getProducts();
  }
  onSortSelected(sort: string) {
    const params = this.ShopService.getShopParams();
    params.sort = sort;
    this.ShopService.setShopParams(params);
    this.getProducts();
  }
  onPageChanged(event: any) {
    const params = this.ShopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.ShopService.setShopParams(params);
      this.getProducts(true);
    }
  }
  onSearch() {
    const params = this.ShopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1
    this.ShopService.setShopParams(params);
    this.getProducts();
  }
  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.ShopService.setShopParams(this.shopParams);
    this.getProducts();
  }

}


