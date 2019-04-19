import { Injectable } from '@angular/core';
import {JwtService} from './jwtService'
// import { User } from 'app/shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';


@Injectable()
export class CurrentUserService {
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private jwtservice: JwtService)
  {

  };
  // Get User Object from local storage
  getUser(): any {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user;
  }
  // Save User Object in local storage
  saveUser(currentUser: any) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }
  // Remove User Object in local storage
  destroyUser() {
    localStorage.removeItem('currentUser');
  }

  setAuth(user: any) {
    debugger;
    // Save Current User sent from server in local storage
    this.saveUser(user.user);
    // Save JWT sent from server in local storage
    this.jwtservice.saveToken(user.token);
    // Set current user data into observable
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from local storage
    this.jwtservice.destroyToken();
    // Set current user to an empty object
    this.destroyUser();
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

}
