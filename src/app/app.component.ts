import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppVersion } from '@ionic-native/app-version';

import { Http } from "@angular/http";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'TabsPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private appVersion: AppVersion, private http: Http, private alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this._checkVersionUpdate();
    });
  }

  private async _checkVersionUpdate() {
    const version = await this.appVersion.getVersionNumber();
    this.http.get('https://aagavin.ca/update/simpletransit.json').map(res => res.json()).subscribe(
      data => {
        if (data['currentVersion'] !== version) {
          this.alertCtrl.create({
            title: 'A new version is available ',
            subTitle: `<a href="https://aagavin.ca/update/apk/simpletransit.apk">click here to update</a>`,
            buttons: ['OK']
          }).present();
        }
      },
      err => console.log(err),
      () => console.log('done update check')
    )
    return version;
  }
}
