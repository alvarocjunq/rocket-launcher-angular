import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';


@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  isAuthenticated(): Observable<any> {
    const token: string = localStorage.getItem(environment.api.tokenKey);
    if (token) {
      return this.http.get<any>(`/authenticated/`).pipe(
        catchError(error => {
          if (error.error && error.error.detail === 'Invalid token.') {
            localStorage.removeItem(environment.api.tokenKey);
          }
          return of({authenticated: false});
        }),
      );
    }
    return of({authenticated: false});
  }

  login(username: string): Observable<string> {
    return this.http.post<any>(`/login/`, {username}).pipe(
      map(response => {
        const token: string = response.token;
        localStorage.setItem(environment.api.tokenKey, token);
        return token;
      }),
    );
  }

  logout(): Observable<any> {
    return this.http.post(`/logout/`, {}).pipe(
      map(response => {
        localStorage.removeItem(environment.api.tokenKey);
        return response;
      }),
    );
  }
}
