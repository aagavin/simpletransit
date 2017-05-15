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
  ) {}
  
  private _getFavouriteById(id: number):object {
    for(let i=0; i<this.favouritesArr.length;i++){
      if(this.favouritesArr[i]['favInfo']['id']===id){
        return {object: this.favouritesArr[i], index:i};
      }
    }
  }
  
  private _getPredictionUrl(route:string, id:number):string{
    return `http://restbus.info/api/agencies/ttc/routes/${route}/stops/${id}/predictions`;
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
      let object = this._getFavouriteById(id);
      this.favouritesArr.splice(object['id'], 1)
    })
      .catch(err => {
        console.log(err);
      });

  }
  
  public getStopTimes(favourites: object[]): void {
    let favObj: Observable<object>[] = []

    favourites.forEach(favourite => {
      let url: string = this._getPredictionUrl(favourite['route'], favourite['id']);
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
  
  public getStopPrediction(id: number):void{

    let favourite = this._getFavouriteById(id);
    let url: string = this._getPredictionUrl(favourite['object']['favInfo']['route'], favourite['object']['favInfo']['id']);
    this.http.get(url).map(res => res.json()).subscribe
    (
      data=> this.favouritesArr[favourite['index']]['jsonInfo']=data,
      err=>console.log(err),
      ()=>console.log('done updating')
    );

  }

}
