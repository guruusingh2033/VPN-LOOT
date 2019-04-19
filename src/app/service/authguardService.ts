import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { CurrentUserService } from './currentUserService';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private _currentUser: CurrentUserService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const url = state.url;
    const params = <any>route.queryParams;
    const x = this._currentUser.getUser();
    if (x == null) {
      this.router.navigate(['/']);
      return new BehaviorSubject<boolean>(false);
    } else {
      return new BehaviorSubject<boolean>(true);
    }
  }
}
