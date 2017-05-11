import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'favourites',
  templateUrl: 'favourites.html',
  providers: []
})
export class FavouritesPage {

  constructor(public navCtrl: NavController, private toastController:ToastController) {

  }

}
