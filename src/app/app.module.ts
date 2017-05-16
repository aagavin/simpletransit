import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { Route } from '../pages/stop-pick/route/route';
import { Direction } from "../pages/stop-pick/direction/direction";
import { Stop } from "../pages/stop-pick/stop/stop";

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
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FavouriteProvider
  ]
})
export class AppModule { }
