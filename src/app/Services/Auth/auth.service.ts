import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from 'src/app/DTOs/LoginDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  login(model: LoginDTO): Observable<any> {
    return this.http.post('account/login', model);
  }
  checkAuth(): Observable<any> {
    return this.http.post('account/check-auth', null);
  }
  getUserById(id: number) {
    return this.http.get('account/getUserById/'+id);
  }
  Authenticated(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
  setAuth(val: boolean) {
    this.isAuthenticated.next(val);
  }
}
