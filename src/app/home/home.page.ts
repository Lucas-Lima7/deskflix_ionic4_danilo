import { Component } from '@angular/core';
import {NavController} from "@ionic/angular";
import {Router} from "@angular/router";
import {PlansPage} from "../plans/plans.page";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    user: any;
    constructor(private router: Router) {
        this.user = localStorage.getItem('desk_user');
        console.log('home', this.user);
    }
    goPlansPage () {
        //this.navCtrl.navigateForward('/plans');
        this.router.navigate(['plans'])
    }

}
