import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { SearchPage } from "../search/search";
import { FavouritesPage } from "../favourites/favourites";

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FavouritesPage;
  tab2Root = SearchPage;
  tab3Root = 'SettingPage';

  constructor() {

  }
}
