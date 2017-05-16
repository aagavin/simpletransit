import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SearchPage } from './search';

import { TimeDifferencePipeModule } from "../../pipes/relative.module";

@NgModule({
	declarations: [SearchPage],
	imports: [IonicPageModule.forChild(SearchPage), TimeDifferencePipeModule],
	exports: [SearchPage]
})
export class AboutPageModule { }
