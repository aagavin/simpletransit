import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, HttpModule } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';


@Injectable()
export class ApiProvider {

  public baseUrl:string;

  /**
   * 
   * @param http 
   * @param storage 
   */
  constructor(public http: Http, private storage: Storage) {
    console.log('Hello ApiProvider Provider');
    this.baseUrl = 'http://restbus.info/api/';
  }


  public updateStorage():Promise<boolean> {
    let routes = null;
    
    return new Promise<boolean>((resolve,reject)=>{
      this.http.get(this.baseUrl+'agencies/ttc/routes/').map(res => res.json()).subscribe(
        data => {
          routes = data;
        },
        err => console.log(err),
        ()=>{
          this.storage.set('routes', routes).then(value=>{
            this._updateStops();
            console.log('successfully set routes');
          }).catch(err=>{
            console.log('error with routes');
            console.log(err);
          });

        }
      );
    });
  }

  private _updateStops():void{
    this.storage.get('routes').then(routes=>{
      routes.forEach(route => {
        let id = route['id'];
        this.http.get(this.baseUrl+'agencies/ttc/routes/'+id).map(res => res.json()).subscribe(
           data => {
             console.log(data.directions);
           },
           err => console.log(err),
           ()=>{console.log('done getting '+id);
           }
        );
      });
    }).catch(err => console.log(err));
  }  

  /**
   * getRoutes
   */
  public getRoutes():Observable<Object> {
    return this.http.get(this.baseUrl+'agencies/ttc/routes/');
  }

}
