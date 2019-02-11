import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoginService } from './login.service';


@Injectable()
export class IsAuthenticated implements CanActivate, CanActivateChild {
  constructor(protected router: Router, private loginService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.loginService.isAuthenticated().pipe(
      map(response => {
        const isAuthenticated: boolean = response.authenticated;

        if (!isAuthenticated) {
          this.router.navigate(['/login']);
        }
        return isAuthenticated;
      }),
    );
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }
}


@Injectable()
export class IsGuest implements CanActivate, CanActivateChild {
  constructor(protected router: Router, private loginService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.loginService.isAuthenticated().pipe(
      map(response => {
        const isAuthenticated: boolean = response.authenticated;

        if (isAuthenticated) {
          this.router.navigate(['/']);
        }
        return !isAuthenticated;
      }),
    );
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
