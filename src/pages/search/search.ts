import { Component } from '@angular/core';
import { ModalController, Modal } from 'ionic-angular';

import { Route } from "../stop-pick/route/route";
import { Direction } from "../stop-pick/direction/direction";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  public route;
  public direction;

  /**
   * Creates an instance of SearchPage.
   * @param {ModalController} modalController 
   * 
   * @memberOf SearchPage
   */
  constructor(public modalController: ModalController) {}

  /**
   * selectRoutes()
   */
  public selectRoutes():void {
    let routeModal:Modal = this.modalController.create(Route);
    routeModal.present();
    routeModal.onDidDismiss(value =>{
      this.route = value;
    })
  }

  
  public selectDirection():void {
    let directionModal:Modal = this.modalController.create(Direction, {'route':this.route});
    directionModal.present();
    directionModal.onDidDismiss(value =>{
      console.log(value);
      this.direction = value;
    });
  }

}
