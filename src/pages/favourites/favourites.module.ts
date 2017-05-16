import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { FavouritesPage } from './favourites';

import { TimeDifferencePipeModule } from "../../pipes/relative.module";

@NgModule({
	declarations: [FavouritesPage],
	imports: [IonicPageModule.forChild(FavouritesPage), TimeDifferencePipeModule],
	exports: [FavouritesPage]
})
export class AboutPageModule { }