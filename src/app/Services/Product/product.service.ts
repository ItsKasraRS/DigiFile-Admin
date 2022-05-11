import { setProductFilters, AddProductDTO } from './../../DTOs/ProductDTO';
import { ProductListDTO, EditProductDTO } from 'src/app/DTOs/ProductDTO';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  filters: any;
  constructor(private http: HttpClient) {
  }

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
    return this.http.get('product/get-sub-categories/' + categoryId);
  }
  addProduct(model: FormData): Observable<any> {
    return this.http.post('product/add', model, {reportProgress: true, observe: 'events'});
  }
  getProductForEdit(id: number): Observable<any> {
    return this.http.get('product/get/' + id);
  }
  editProduct(model: FormData): Observable<any> {
    return this.http.post('product/edit', model, {reportProgress: true, observe: 'events'});
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.get('product/delete/' + id);
  }
}
