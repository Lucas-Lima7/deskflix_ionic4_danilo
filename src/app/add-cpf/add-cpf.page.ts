import { Component, OnInit } from '@angular/core';
import {UserResource} from "../services/resource/user.resource";
import {NavController, NavParams, ToastController} from "@ionic/angular";

@Component({
  selector: 'app-add-cpf',
  templateUrl: './add-cpf.page.html',
  styleUrls: ['./add-cpf.page.scss'],
})
export class AddCpfPage implements OnInit {

  cpf = null;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public userResource: UserResource,
      public toastCtrl: ToastController) { }

  ngOnInit() {
  }


  async toast(){
      const toast = await this.toastCtrl.create({
          message: 'CPF Inválido',
          duration: 3000,
          position: 'top',
          cssClass: 'toast-reverse'
      });
      toast.present();
}

    async submit(){
    this.userResource.addCpf(this.cpf)
        .subscribe(() => {
          this.navCtrl.navigateForward('/list')
        }, (error) => {
            this.toast()
        });
  }

}
