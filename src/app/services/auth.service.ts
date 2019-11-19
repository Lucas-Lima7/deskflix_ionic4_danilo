import { Injectable } from '@angular/core';
import {JwtClientService} from './jwt-client.service';
import {JwtPayload} from '../../models/jwt-payload';

import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import {UserResource} from "./resource/user.resource";

@Injectable()
export class AuthService {

  private _user;

  constructor(public jwtClient: JwtClientService,
              public userResource: UserResource) {
    this.user().then((user) => {
      console.log(user);
    });
  }

  user(): Promise<Object> {
      return new Promise((resolve) => {
          if (this._user != null) {
              resolve(this._user);
          }
          this.jwtClient.getPayload().then((payload: JwtPayload) => {
              if(payload) {
                  this._user = payload.user;
              }
              resolve(this._user);
              localStorage.setItem('desk_user', JSON.stringify(this._user));
          }, error => {
              console.log(error);
              resolve(null);
          });
      });
  }

  check(): Promise<boolean>{
      return this.user().then(user => {
          return user !== null;
      });
  }

  /*login({email, password}): Promise<Object> {*/
    login({email, password}): Observable<Object> {
    return this.jwtClient.accessToken({email, password})
        .pipe( map(data => this.user()));
        /*.then(()=>{
          return this.user();
        })*/
  }

  logout(){
    return this.jwtClient
        .revokeToken()
        .then(()=> {
          this._user = null;
        });
  }
}
