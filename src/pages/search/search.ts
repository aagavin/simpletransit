import { Component } from '@angular/core';
import { ModalController, Modal } from 'ionic-angular';
import { Http } from "@angular/http";

import { Route } from "../stop-pick/route/route";
import { Direction } from "../stop-pick/direction/direction";
import { Stop } from "../stop-pick/stop/stop";

import { ApiProvider } from "../../providers/api-provider";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [ApiProvider]
})
export class SearchPage {

  public route;
  public direction;
  public stop;
  public predictions;

  /**
   * Creates an instance of SearchPage.
   * @param {ModalController} modalController 
   * 
   * @memberOf SearchPage
   */
  constructor(public modalController: ModalController, private apiProvider: ApiProvider, private http: Http) {
    this.route = null;
    this.direction = null;
    this.stop = null;
    this.predictions = null;
  }

  /**
   * selectRoutes()
   */
  public selectRoutes(): void {

    this.direction = null;
    this.stop = null;
    this.predictions = null;

    let routeModal: Modal = this.modalController.create(Route);
    routeModal.present();
    routeModal.onDidDismiss(value => {
      this.route = value;
    })
  }


  /**
   * Opens the select direction modal
   * 
   * 
   * @memberof SearchPage
   */
  public selectDirection(): void {
    this.stop = null;
    this.predictions = null;

    let directionModal: Modal = this.modalController.create(Direction, { 'route': this.route });
    directionModal.present();
    directionModal.onDidDismiss(value => {
      console.log(value);
      this.direction = value;
    });

  }

  /**
   * Opens the select stop modal
   * 
   * 
   * @memberof SearchPage
   */
  public selectStop(): void {
    this.predictions = null;
    let stopModal: Modal = this.modalController.create(Stop, { 'stop': this.route, 'direction': this.direction });
    stopModal.present();
    stopModal.onDidDismiss(value => {
      console.log(value);
      this.stop = value;
      if(value!=null){this.getStopPrediction();}
    });
  }

  /**
   * Get stops predictions
   * 
   * 
   * @memberof SearchPage
   */
  public getStopPrediction(): void {
    let url: string = `http://restbus.info/api/agencies/ttc/routes/${this.route}/stops/${this.stop.id}/predictions`;
    this.http.get(url)
      .map(res => res.json())
      .subscribe(
      data => {
        console.log(data);
      },
      err => console.log(err),
      () => console.log('done getting predictions')
      );
  }

}
