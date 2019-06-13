import { Component, OnInit } from '@angular/core';
import {UserResource} from '../services/resource/user-resource';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-my-settings',
  templateUrl: './my-settings.page.html',
  styleUrls: ['./my-settings.page.scss'],
})
export class MySettingsPage implements OnInit {

    user = {
        password: '',
        password_confirmation: ''
    };
  constructor(
      public toastCtrl: ToastController,
      public userResource: UserResource
  ) { }

  ngOnInit() {
  }

    submit() {
        const toast = this.toastCtrl.create({
            duration: 3000,
            position: 'top',
            cssClass: 'toast-reverse'
        });
        this.userResource
            .updatePassword(this.user)
            .subscribe(() => {
                toast.setMessage('Dados salvos com sucesso.');
                toast.present();
            }, (error) => {
                toast.setMessage('Ops, dados inválios tente novamente.');
                toast.present();
            });
    }
}
