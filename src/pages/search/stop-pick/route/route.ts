import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { ApiProvider } from "../../../../providers/api-provider";

@Component({
  selector: 'page-route',
  templateUrl: 'route.html',
  providers: [ApiProvider]
})
export class Route {

  public routes: Array<Object>;
  public routesFiltered: Array<Object>;
  public searchValue;

  constructor(private viewController: ViewController, private apiProvider: ApiProvider) {
    this.searchValue = '';
    this.apiProvider.getRoutes()
      .then(routes => {
        this.routes = routes
        this.routesFiltered = routes;
      })
      .catch(err => console.log(err))
  }

  public dismiss(item?) {
    if (typeof item === 'undefined') {
      this.viewController.dismiss(null);  
    }
    else{
      this.viewController.dismiss(item);
    }
    
  }

  public onInput(event): void {

    this.routesFiltered = this.routes.filter(value => {
      if ((value['title'].toLocaleLowerCase()).includes((this.searchValue.toLocaleLowerCase()))) {
        return value;
      }
    });
  }

  public onCancel(): void {
    console.log('cancelled !');
    this.routesFiltered = this.routes;
  }

  public ionViewDidLoad() { console.log('ionViewDidLoad Route'); }

}
