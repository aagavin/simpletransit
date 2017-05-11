import { Component } from '@angular/core';

import { SearchPage } from "../search/search";
import { SettingPage } from "../setting/setting";
import { FavouritesPage } from "../favourites/favourites";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FavouritesPage;
  tab2Root = SearchPage;
  tab3Root = SettingPage;

  constructor() {

  }
}
