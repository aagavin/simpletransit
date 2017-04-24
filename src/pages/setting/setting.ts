import { Component } from '@angular/core';
import { Http, HttpModule, ConnectionBackend } from "@angular/http";
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { ApiProvider } from "../../providers/api-provider";

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
  providers: [ApiProvider]
})
export class SettingPage {

  constructor(public navCtrl: NavController, private apiProvider: ApiProvider, private http: Http, private loadingCtrl: LoadingController) { }

  public updateRouteList(): void {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Loading routes'
    });
    loading.present();
    console.log('clicked update Route List');
    this.apiProvider.updateStorage().then(value =>{
      loading.dismiss();
    });
  }

}
