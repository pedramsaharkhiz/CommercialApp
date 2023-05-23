import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getProducts(ShopParams: ShopParams) {
    let params = new HttpParams();
    if (ShopParams.brandId !== 0) {
      params = params.append('brandId', ShopParams.brandId.toString());
    }
    if (ShopParams.typeId !== 0) {
      params = params.append('typeId', ShopParams.typeId.toString());
    }
    if (ShopParams.search) {
      params = params.append('search', ShopParams.search);
    }
    params = params.append('sort', ShopParams.sort);
    params = params.append('pageIndex', ShopParams.pageNumber.toString());
    params = params.append('pageIndex', ShopParams.pageSize.toString());


    return this.http.get<IPagination>(this.baseUrl + 'products', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }
  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }
  getTypes() {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }
}
