import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient) { }

  getRoles(): Observable<any> {
    return this.http.get('roles/list');
  }
  getPermissions(): Observable<any> {
    return this.http.get('roles/get-permissions');
  }
  addRole(model): Observable<any> {
    return this.http.post('roles/add', model);
  }
}
