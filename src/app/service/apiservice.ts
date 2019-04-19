// import { Injectable } from '@angular/core';
// import { AppConfig } from '../../environments/environment';
// // import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Headers, Http, Response, URLSearchParams } from '@angular/http';

// // import { JwtService } from './jwt.service';
// import { throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { ResponseContentType } from '@angular/http';
// import { JwtService } from '../service/jwtService';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {
//   constructor(
//     private http: Http,
//     private jwtService: JwtService
//   ) {}

//   private formatErrors(error: any) {
//     return  throwError(error.error);
//   }

//   private setHeaders(): HttpHeaders {
//     const headersConfig = {
//       'Content-Type': 'application/json'
//     };

//     if (this.jwtService.getToken()) {
//       headersConfig['Authorization'] = `Token ${this.jwtService.getToken()}`;
//     }
//     return new HttpHeaders(headersConfig);
//   }

  

//   get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
//     return this.http.get(`${AppConfig.api_url}${path}`)
//       .pipe(catchError(this.formatErrors));
//   }

//   put(path: string, body: Object = {}): Observable<any> {
//     return this.http.put(
//       `${AppConfig.api_url}${path}`,
//       JSON.stringify(body)
//     ).pipe(catchError(this.formatErrors));
//   }

//   post(path: string, body: Object = {}): Observable<any> {
//     return this.http.post(
//       `${AppConfig.api_url}${path}`,
//       JSON.stringify(body),
//       { headers: this.setHeaders() }
//     )
//       .catch(this.formatErrors)
//       .map((res: Response) => res.json());
//   }

//   delete(path): Observable<any> {
//     return this.http.delete(
//       `${AppConfig.api_url}${path}`
//     ).pipe(catchError(this.formatErrors));
//   }
// }



import { Injectable } from '@angular/core';
 import { AppConfig } from '../../environments/environment';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

 import { JwtService } from '../service/jwtService';

@Injectable()
export class ApiService {
  constructor(
    private http: Http,
    private jwtService: JwtService
  ) { }

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json'
    };

    // if (this.jwtService.getToken()) {
    //   headersConfig['Authorization'] = `Token ${this.jwtService.getToken()}`;
    // }
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

  files(path: string, body): Observable<any> {
    return this.http.post(`${AppConfig.api_url}${path}`, body).map(
      res => {
        return res;
      },
      (error) => { }
    );
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${AppConfig.api_url}${path}`, { headers: this.setHeaders() })
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${AppConfig.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${AppConfig.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${AppConfig.api_url}${path}`,
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }



}

