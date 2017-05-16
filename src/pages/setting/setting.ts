import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { IonicPage, NavController, LoadingController, Loading } from 'ionic-angular';
import { ApiProvider } from "../../providers/api-provider";
import { FavouriteProvider } from "../../providers/favourite/favourite";

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
  providers: [ApiProvider, FavouriteProvider]
})
export class SettingPage {

  constructor(
    public navCtrl: NavController,
    private apiProvider: ApiProvider,
    private http: Http,
    private loadingCtrl: LoadingController,
    private favouriteProvider: FavouriteProvider
  ) { }

  public updateRouteList(): void {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Loading routes'
    });
    loading.present();

    console.log('clicked update Route List');

    this.apiProvider.updateStorage().then(value => {
      loading.dismiss();
    });
  }


  public removeAllFavourites(): void {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Removing All Favourites'
    });
    loading.present();
    this.favouriteProvider.removeAllFavourites()
      .then(value => loading.dismiss())
      .catch(err => {
        console.log(err);
        loading.dismiss();
      });
  }

}
