import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  userList(): Observable<any> {
    return this.http.get('admin/user/user-list');
  }
  getRoles(): Observable<any> {
    return this.http.get('admin/user/get-roles');
  }
  addUser(model: any): Observable<any> {
    return this.http.post('admin/user/add', model);
  }
  getUserRoles(): Observable<any> {
    return this.http.get('admin/user/user-roles');
  }
}
