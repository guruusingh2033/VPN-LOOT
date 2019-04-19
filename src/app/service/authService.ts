import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './apiservice';
import {CurrentUserService} from './currentUserService'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiService: ApiService,
    private http: Http,
    private currentUserService: CurrentUserService
  ) { }

 
  attemptAuth(credentials : any) {
    return this.apiService.post('/login',credentials).map(
      res => {
        this.currentUserService.setAuth(res);
        debugger
        return res;
      }
    )
  }

  getSubscription(credentials : any) {
    return this.apiService.post('/getsubscription',credentials).map(
      res => {
        return res;
      }
    )
  }
}