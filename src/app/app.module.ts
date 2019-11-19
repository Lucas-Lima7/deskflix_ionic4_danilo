import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {IonicStorageModule, Storage} from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {UserResource} from './services/resource/user.resource';
import {PlanResource} from './services/resource/plan.resource';
import {HttpClientModule} from '@angular/common/http';
import {JwtClientService} from './services/jwt-client.service';
import {JwtModule, JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import {AuthService} from './services/auth.service';
import {LoginPage} from './login/login.page';
import {HomePage} from './home/home.page';
import {MySettingsPage} from './my-settings/my-settings.page';
import {ListPage} from './list/list.page';

/*export function tokenGetter() {
    return localStorage.getItem('access_token');
}*/

export function jwtFactory() {
    return {
        whitelistedDomains: [
            new RegExp('localhost:8000/*'), //domínios válidos para enviar o token
        ],
        tokenGetter: () => {
            return localStorage.getItem('access_token'); //colocar código para pegar o token do local storage
        }
    }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
      HttpClientModule,
      IonicModule.forRoot(),
    AppRoutingModule,
      IonicStorageModule.forRoot({
          driverOrder: ['localstorage']
      }),
      JwtModule.forRoot({
          /*config: {
              tokenGetter: tokenGetter,
              whitelistedDomains: ['localhost:8000'],
          }*/
          jwtOptionsProvider: {
              provide: JWT_OPTIONS,
              useFactory: jwtFactory
          }
      })
  ],
  providers: [
    StatusBar,
    SplashScreen,
      JwtClientService,
      JwtHelperService,
      AuthService,
      UserResource,
      PlanResource,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
