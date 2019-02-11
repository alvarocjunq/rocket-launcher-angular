import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    /*
     * Do authentication for any call made to our API.
     * Define JSON as content-type.
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (!request.url.startsWith('http')) {
        const contentType: string = request.headers.get('Content-Type');
        const token: string = localStorage.getItem(environment.api.tokenKey);

        request = request.clone({
          url: `${environment.api.url}${request.url}`,
          setHeaders: {
            Authorization: token ? `Token ${token}` : '',
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
      }
      return next.handle(request);
  }
}
