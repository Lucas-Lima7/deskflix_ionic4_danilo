import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {LoadingController, NavController, NavParams} from "@ionic/angular";
import {PlanResource} from "../services/resource/plan.resource";
import { map }from 'rxjs/operators';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit {

  // @ts-ignore
    plans:Observable<Array<Object>>;

    constructor(public navCtrl: NavController,
                public planResource: PlanResource,
                public loadingCtrl: LoadingController,
                // public navParams: NavParams
                ) {
    }

    async ngOnInit() {
      const loading = await this.loadingCtrl.create({
          spinner: 'circles',
          message: 'Carregando...'
      });
      await loading.present();
      this.plans = this.planResource.all()
          .pipe(map(plans => {
              loading.dismiss();
              return plans;
          }));
  }

  /*ionViewDidLoad(){
      this.plans = this.planResource.all();
  }*/


}
