import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

constructor(private http: HttpClient) { }

getOrderChart(): Observable<any> {
  return this.http.get('admin/dashboard/orders-chart');
}
}
