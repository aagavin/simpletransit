import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';

import { Http } from "@angular/http";

import { FavouriteProvider } from "../../providers/favourite/favourite";
import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'favourites',
  templateUrl: 'favourites.html',
  providers: [SMS, FavouriteProvider]
})
export class FavouritesPage {

  private favArr: object[];

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private sms: SMS,
    private favouriteProvider: FavouriteProvider,
    private http: Http
  ) {

  }

  public ionViewDidLoad() {
    console.log('loads favourite');

    this.favouriteProvider.getAllFavourites()
      .then(favourites => {
        console.log(favourites);
        this.getStopTimes(favourites);
      })
      .catch(err => {
        console.log(err);
      });

  }

  public getStopTimes(favourites: object[]): void {
    let favObj: Observable<object>[] = []

    favourites.forEach(favourite => {
      let url: string = `http://restbus.info/api/agencies/ttc/routes/${favourites['route']}/stops/${favourites['id']}/predictions`;
      favObj.push(this.http.get(url).map(res => res.json()));
    });

    Observable.forkJoin(favObj).subscribe(value =>{
      console.log(value);
    })
  }

}
