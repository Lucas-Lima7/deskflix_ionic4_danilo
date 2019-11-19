import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*import {AuthService} from "../../services/auth.service";*/
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
/*import {} from "@auth0/angular-jwt"*/


/*
  Generated class for the ResourceUserResourceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
    providedIn: 'root',
})
export class UserResource {

  constructor(public http: HttpClient,
  ) {
  }

  /*register(accessToken: string):Observable<string>{
    let headers = new Headers();
    headers.set('Authorization', `Bearer ${accessToken}`);
    return this.http
        .post(`http://localhost:8000/register`, {}, new HttpRequest({headers})))
  }*/

  updatePassword({password, password_confirmation}): Observable<any>{
    return this.http.patch<any>('http://localhost:8000/api/user/settings', {password, password_confirmation})
        .pipe(
            tap(data => {
                let token = data.user;
            })
        )
  }

  addCpf(cpf:string){
      return this.http.patch('http://localhost:8000/api/user/cpf', {cpf})
          .pipe(
              tap(data => {
                  //let token = data.user;
                  let token = data;
              })
          )
  }

}
