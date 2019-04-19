import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CurrentUserService } from './currentUserService';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private _currentUser: CurrentUserService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // return new BehaviorSubject<boolean>(false);
    // return this.userService.isAuthenticated.take(1).map(bool => false);
    const url = state.url;
    const params = <any>route.queryParams;
    const x = this._currentUser.getUser();
    if (x == null) {
      // console.log('logged out');
      return new BehaviorSubject<boolean>(true);
    } else {
      this.router.navigate(['/home']);
      return new BehaviorSubject<boolean>(false);
    }
  }
}
