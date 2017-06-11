import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { ApiProvider } from "../../../providers/api-provider";

@Component({
  selector: 'page-stop',
  templateUrl: 'stop.html',
  providers: [ApiProvider]
})
export class Stop {

  private stops: object[];
  private stopsFiltered: object[];
  public searchValue;

  /**
   * Creates an instance of Stop.
   * @param {ViewController} viewController 
   * @param {NavParams} navParams 
   * @param {ApiProvider} apiProvider 
   * 
   * @memberof Stop
   */
  constructor(private viewController: ViewController, private navParams: NavParams, private apiProvider: ApiProvider) {
    this.searchValue = '';
    let stop = this.navParams.get('stop');
    let direction = this.navParams.get('direction');

    this.apiProvider.getStopsByDirection(stop, direction)
      .then(value => {
        this.stops = value;
        this.stopsFiltered = value
      })
      .catch(err => {
        console.log(err);
      })
  }

  public ionViewDidLoad() { console.log('ionViewDidLoad Stop'); }

  /**
   * Closes the modal and passes data back
   * 
   * @param {any} [item] 
   * 
   * @memberof Stop
   */
  public dismiss(item?) {
    if (typeof item === 'undefined') {
      this.viewController.dismiss(null);
    }
    else {
      this.viewController.dismiss(item);
    }
  }

  /**
   * Filters the results based on the search query
   * 
   * @param {any} event 
   * 
   * @memberof Stop
   */
  public onInput(event): void {
    this.stopsFiltered = this.stops.filter(value => {
      if (value['title'].toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase())) {
        return value;
      }
    })
  }

  /**
   * Clears the search key
   * 
   * 
   * @memberof Stop
   */
  public onCancel(): void { this.stopsFiltered = this.stops; }

}
