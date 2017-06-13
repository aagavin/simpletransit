import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppVersion } from '@ionic-native/app-version';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { Route } from '../pages/search/stop-pick/route/route';
import { Direction } from "../pages/search/stop-pick/direction/direction";
import { Stop } from "../pages/search/stop-pick/stop/stop";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FavouriteProvider } from '../providers/favourite/favourite';

@NgModule({
  declarations: [
    MyApp,

    Route,
    Direction,
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
    Route,
    Direction,
    Stop
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppVersion,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FavouriteProvider
  ]
})
export class AppModule { }
