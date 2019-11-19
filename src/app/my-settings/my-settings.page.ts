import { Component, OnInit } from '@angular/core';
import {UserResource} from '../services/resource/user.resource';
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

    async submit() {
        const toast = this.toastCtrl.create({
            duration: 3000,
            position: 'top',
            cssClass: 'toast-reverse',
        });
        this.userResource
            .updatePassword(this.user)
            .subscribe(() => {
                this.toastOk();
            }, (error) => {
                this.toastError()
            });
    }
    async toastOk(){
        const toast = await this.toastCtrl.create({
            message: 'Dados salvos com sucesso.',
        });
        toast.present();
    }
    async toastError(){
        const toast = await this.toastCtrl.create({
            message: 'Ops, dados inválios tente novamente.',
        });
        toast.present();
    }
}
