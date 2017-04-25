import { Component } from '@angular/core';
import { ModalController, Modal } from 'ionic-angular';

import { Route } from "../stop-pick/route/route";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  constructor(public modalController: ModalController) {}

  /**
   * selectRoutes()
   */
  public selectRoutes():void {
    let routeModal:Modal = this.modalController.create(Route);
    routeModal.present();
  }

}
