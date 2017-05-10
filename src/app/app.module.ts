import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { TimeDifference } from "../pipes/relative-seconds";

import { MyApp } from './app.component';

import { SearchPage } from '../pages/search/search';
import { SettingPage } from '../pages/setting/setting';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';

import { Route } from '../pages/stop-pick/route/route';
import { Direction } from "../pages/stop-pick/direction/direction";
import { Stop } from "../pages/stop-pick/stop/stop";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    TimeDifference,
    MyApp,
    SearchPage,
    SettingPage,
    TabsPage,
    Route,
    Direction,
    AboutPage,
    Stop
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    SettingPage,
    TabsPage,
    Route,
    Direction,
    AboutPage,
    Stop
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
