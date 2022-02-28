import { setProductFilters, AddProductData } from './../../DTOs/ProductDTO';
import { ProductListDTO, EditProductData } from 'src/app/DTOs/ProductDTO';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  filters: any;
  constructor(private http: HttpClient) { }

  getProducts(filter: setProductFilters): Observable<any> {
    let params;
    if (filter !== null) {
      if (filter.pageId === null) {
        filter.pageId = 1;
      }
      params = new HttpParams().set('pageId', filter.pageId.toString()).set('q', filter.title.toString());
    }
    return this.http.get<any>('product/list', { params });
  }

  getCategories(): Observable<any> {
    return this.http.get('product/get-categories');
  }

  getSubCategories(categoryId: number): Observable<any> {
    return this.http.get('product/get-sub-categories/'+categoryId);
  }
  addProduct(product: AddProductData): Observable<any> {
    return this.http.post('product/add', product);
  }
  getProductForEdit(id: number): Observable<any> {
    return this.http.get('product/get/' + id);
  }
  editProduct(product: EditProductData): Observable<any> {
    return this.http.post('product/edit', product);
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.get('product/delete/' + id);
  }
}
