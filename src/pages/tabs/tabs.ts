import { Component } from '@angular/core';

import { SearchPage } from "../search/search";
import { SettingPage } from "../setting/setting";
import { AboutPage } from "../about/about";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AboutPage;
  tab2Root = SearchPage;
  tab3Root = SettingPage;

  constructor() {

  }
}
