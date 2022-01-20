import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomainName } from '../ApiPath';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const myRequest = req.clone({
      url: DomainName + req.url,
      headers: req.headers.append('Authorization', 'Bearer ' + token)
    });
    return next.handle(myRequest);

  }
}