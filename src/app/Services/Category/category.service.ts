import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCategoryDTO, AddSubCategoryDTO, CategoryDTO } from 'src/app/DTOs/CategoryDTO';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  category: BehaviorSubject<any>;
  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get('category/list');
  }
  getItem() {
    return this.category;
  }
  setItem(item: any): void {
    this.category.next(item);
  }
  addCategory(model: AddCategoryDTO): Observable<any> {
    return this.http.post('category/add', model);
  }
  getCategory(id: number): Observable<any> {
    return this.http.get('category/get/' + id);
  }
  editCategory(model: CategoryDTO) {
    return this.http.post('category/edit', model);
  }
  deleteCategory(id: number): Observable<any> {
    return this.http.get('category/delete/' + id);
  }
  addSubCategory(category: AddSubCategoryDTO): Observable<any> {
    return this.http.post('category/addSub', category);
  }
}
