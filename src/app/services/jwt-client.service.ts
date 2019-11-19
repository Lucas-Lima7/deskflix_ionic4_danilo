import { Injectable } from '@angular/core';
import {JwtCredentials} from '../../models/jwt-credentials';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {JwtHelperService} from '@auth0/angular-jwt';

import {tap} from 'rxjs/operators';
import { Observable } from 'rxjs';

/*const helper = new JwtHelperService();*/

@Injectable()
export class JwtClientService {

    private _token = null;
    private _payload = null;


    constructor(
        private authHttp: HttpClient,
        public storage: Storage,
        public jwtHelper: JwtHelperService) {
        this.getToken();
        /*this.getPayload().then((payload)=>{
            console.log(payload);
        })*/
    }

    getPayload(): Promise<Object> {
        return new Promise((resolve, reject) => {
            if (this._payload) {
                resolve(this._payload);
            }
            try {
                this.getToken().then(token => {
                    if (token) {
                        // this._payload = this.jwtHelper.decodeToken(token['token']);
                        this._payload = this.jwtHelper.decodeToken(token);
                    }
                    resolve(this._payload);
                });
            } catch (e) {
                reject(e)
            }
        });
    }

    getToken(): Promise<string>{
        return new Promise((resolve) => {
            if(this._token){
                resolve(this._token);
            }
            this.storage.get('token').then((token) => {
                this._token = token;
                resolve(this._token);
            });
        });
    }

    /* LEMBRAR DE COLOCAR ISSO AQUI DEPOIS, CODIGO MANDADO PELO LUIZ CARLOS
    accessToken(jwtCredentials: JwtCredentials): Promise<string>{
        return this.http.post<{token: string}>('http://localhost:8000/api/access_token',jwtCredentials)
            .toPromise()
            .then((data) =>{
                this._token = data.token;
                this.storage.set('token',this._token);
                return this._token;
            });
*/
    accessToken(jwtCredentials: JwtCredentials): Observable<string>{
        return this.authHttp.post<any>('http://localhost:8000/api/access_token',jwtCredentials)
            .pipe(
                tap(data => {
                    let token = data.token;
                this._token = token;
                // this.storage.set('token', this._token);
                    localStorage.setItem('token', this._token);
                return token;
                })
            )
    } //COMENTEI DIA 03/09/2019

    /*accessToken(jwtCredentials: JwtCredentials):Promise<string> {
        return this.http.post('http://localhost:8000/api/access_token',jwtCredentials)
            .toPromise()
            .then((response: HttpResponse<{token: string}>) =>{
                let token  = response.body.token;
                this._token = token;
                this.storage.set('token',this._token);
                this.storage.get('token').then((token) => {
                    console.log(response.body);
                });
                return token;
            });
    }*/

    revokeToken():Promise<null>{
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this._token}`
                })
            };
        /*let headers = new HttpHeaders();
        headers.set('Authorization', `Bearer ${this._token}`);*/
        return this.authHttp.post('http://localhost:8000/api/logout', {}, httpOptions)
            .toPromise()
            .then( (response: Response) => {
                this.clear();
                return null;
            });
    }

    private clear() {
        this._token = null;
        this._payload = null;
        this.storage.clear();
    }

    /*accessToken(jwtCredentials: JwtCredentials){
      this.http.post('http://localhost:8000/api/access_token',jwtCredentials)
          .subscribe( (data: JwtCredentials) => {
              //console.log(data)
              let token = data.json().token;
              return token;
          });
  }*/

    /*accessToken(jwtCredentials: JwtCredentials){
        this.http.post('http://localhost:8000/api/access_token',  jwtCredentials    )
            .subscribe( data => {
                let token = data.token;
                console.log(token);
            });
    }*/
}
