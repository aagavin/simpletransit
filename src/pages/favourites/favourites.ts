import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';

import { FavouriteProvider } from "../../providers/favourite/favourite";


@Component({
  selector: 'favourites',
  templateUrl: 'favourites.html',
  providers: [SMS, FavouriteProvider]
})
export class FavouritesPage {

  constructor(private navCtrl: NavController, private toastController:ToastController, private sms:SMS) {

  }

}
