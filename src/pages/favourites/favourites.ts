import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';

import { Http } from "@angular/http";

import { FavouriteProvider } from "../../providers/favourite/favourite";
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'favourites',
  templateUrl: 'favourites.html',
  providers: [SMS, FavouriteProvider]
})
export class FavouritesPage {

  private favouritesArr: object[];

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private sms: SMS,
    private favouriteProvider: FavouriteProvider,
    private http: Http
  ) {

  }

  public ionViewDidEnter() {
    console.log('loads favourite');
    this.favouritesArr = [];

    this.favouriteProvider.getAllFavourites()
      .then(favourites => {
        this.getStopTimes(favourites);
      })
      .catch(err => {
        console.log(err);
      });

  }

  public removeFavourite(id: number): void {
    this.favouriteProvider.removeFromFavourites(id).then(value => {
      this.ionViewDidEnter();
    })
      .catch(err => {
        console.log(err);
      });

  }

  public getStopTimes(favourites: object[]): void {
    let favObj: Observable<object>[] = []

    favourites.forEach(favourite => {
      let url: string = `http://restbus.info/api/agencies/ttc/routes/${favourite['route']}/stops/${favourite['id']}/predictions`;
      favObj.push(this.http.get(url).map(res => res.json()));
    });

    Observable.forkJoin(favObj)
      .subscribe(value => {
        value.forEach((res, index) => {
          this.favouritesArr.push({
            'favInfo': favourites[index],
            'jsonInfo': res
          });
        });

        console.log(this.favouritesArr);
      },
      err => {
        for (var i = 0; i < favourites.length; i++) {
          this.favouritesArr.push({
            'favInfo': favourites[i]
          });
        }
      },
      () => console.log('done getting favourites')
      );
  }


  public sendSMS(code: string): void {
    this.sms.send('898882', code)
      .then(value => console.log('sent sms'))
      .catch(err => console.log(err));
  }

}
