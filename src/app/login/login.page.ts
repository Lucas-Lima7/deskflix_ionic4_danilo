import { Component, OnInit } from '@angular/core';
import {MenuController, NavController, ToastController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
        email: 'admin@user.com',
        password: 'secret'
    };
  constructor(
      public navCtrl: NavController,
      public menuCtrl: MenuController,
      public toastCtrl: ToastController,
      private auth: AuthService,
  ) {
      this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

    login() {
        this.auth.login(this.user)
            .subscribe(() => {
                this.afterLogin(this.user);
            }, (error) => {

                this.toast();
            });
    }

    afterLogin(user) {
        this.menuCtrl.enable(true);
        this.navCtrl.navigateForward(user.subscription_valid ? '/my-settings' : '/home');
    }

    irParaHome(){
        this.menuCtrl.enable(true);
        this.navCtrl.navigateForward('/home');
    }

    async toast(){
        const toast = await this.toastCtrl.create({
            message: 'Email e/ou senha inválidos.',
            duration: 3000,
            position: 'top',
            cssClass: 'toast-reverse'
        });
        toast.present();
    }
}
