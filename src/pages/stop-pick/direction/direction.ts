import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { ApiProvider } from "../../../providers/api-provider";

@Component({
  selector: 'page-direction',
  templateUrl: 'direction.html',
  providers: [ApiProvider]
})
export class Direction {

  public directions: Array<Object>;
  public directionsFiltered: Array<Object>;
  public searchValue;

  constructor(private viewController: ViewController, private apiProvider: ApiProvider, private navParams: NavParams) {
    this.searchValue = '';

    this.apiProvider.getDirection(this.navParams.get('route'))
      .then(directions => {
        this.directions = directions;
        this.directionsFiltered = directions;
      })
      .catch(err => console.log(err));
  }

  public dismiss(item?) {
    if (typeof item === 'undefined') {
      this.viewController.dismiss(null);
    }
    else {
      this.viewController.dismiss(item);
    }

  }

  public onInput(event): void {
    // console.log(this.searchValue);
    this.directionsFiltered = this.directions.filter(value => {
      if ((value['title'].toLocaleLowerCase()).includes(this.searchValue)) {
        return value;
      }
    });
  }

  public onCancel(): void {
    console.log('cancelled !');
    this.directionsFiltered = this.directions;
  }

  public ionViewDidLoad() { console.log('ionViewDidLoad Route'); }

}
