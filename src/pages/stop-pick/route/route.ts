import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { ApiProvider } from "../../../providers/api-provider";

@Component({
  selector: 'page-route',
  templateUrl: 'route.html',
  providers: [ApiProvider]
})
export class Route {

  public routes;
  public searchValue;

  constructor(private viewController: ViewController, private apiProvider: ApiProvider) {
    this.searchValue='';
    this.apiProvider.getRoutes()
      .then(routes => this.routes = routes)
      .catch(err => console.log(err))
  }

  public dismiss(item?) {
    console.log(item);
    // this.viewController.dismiss(null);
  }

  public onInput(event):void{
    console.log(event);
  }

  public onCancel():void{
    this.searchValue='';
  }

  public ionViewDidLoad() { console.log('ionViewDidLoad Route'); }

}
