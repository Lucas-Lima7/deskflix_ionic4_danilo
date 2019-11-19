import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map }from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
/*import {AuthService} from "../../services/auth.service";*/

import {tap} from 'rxjs/operators';
import {AuthService} from "../auth.service";
import {JwtClientService} from "../jwt-client.service";

/*import {} from "@auth0/angular-jwt"*/


@Injectable()
export class PlanResource {
    options;
    private _token = null ;

  constructor(public http: HttpClient,
              public jwt: JwtClientService) {
  }

    all(): Observable<Array<Object>> {
      this._token = localStorage.getItem('token');
      console.log(this._token);
      const httpOptions = {
          headers: new HttpHeaders({
              'Authorization': `Bearer ${this._token}`
          })
      };
      return this.http.get('http://localhost:8000/api/plans', httpOptions)
          .pipe(map((response: any) => response.plans));
  }
}
