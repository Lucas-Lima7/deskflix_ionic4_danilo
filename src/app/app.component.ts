import { Component, OnInit } from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  user: any;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'log-in'
    },
    {
      title: 'Configurações',
      url: '/my-settings',
      icon: 'settings'
    },
      {
      title: 'CPF',
      url: '/cpf',
      icon: 'settings'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private nav: NavController,
    private statusBar: StatusBar,
    public auth: AuthService
  ) {
    this.initializeApp();
    this.user = localStorage.getItem('desk_user');
    console.log('testando', this.user);
  }

  ngOnInit() {
      // this.user = localStorage.getItem('desk_user');
     this.auth.user().then(data => {
       this.user = localStorage.setItem('desk_user', this.user);
       // this.user = data;
       console.log('okk', data);
     });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        //this.nav.setRoot(page.component);
    }

    logout(){
        this.auth.logout().then(() => {
            //this.nav.setRoot('Login');
        }).catch(() => {
            //this.nav.setRoot('Login');
        })
    }

    goToMySettings() {
        //this.nav.setRoot('MySettingsPage')
    }
}
