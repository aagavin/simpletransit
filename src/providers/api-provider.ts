import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';


/**
 * API Provider
 * 
 * @export
 * @class ApiProvider
 */
@Injectable()
export class ApiProvider {

  public baseUrl: string;

  /**
   * Creates an instance of ApiProvider.
   * @param {Http} http 
   * @param {Storage} storage 
   * 
   * @memberOf ApiProvider
   */
  constructor(public http: Http, private storage: Storage) {
    console.log('Hello ApiProvider Provider');
    this.baseUrl = 'http://restbus.info/api/';
  }

  /**
   * Update the storage list
   * 
   * @returns {Promise<boolean>} 
   * 
   * @memberOf ApiProvider
   */
  public updateStorage(): Promise<boolean> {
    let routes = null;

    return new Promise<boolean>((resolve, reject) => {
      this.http.get(this.baseUrl + 'agencies/ttc/routes/').map(res => res.json()).subscribe(
        data => {
          routes = data;
        },
        err => console.log(err),
        () => {
          this.storage.set('routes', routes).then(value => {
            this._updateStops(resolve);
            console.log('successfully set routes');
          }).catch(err => {
            console.log('error with routes');
            reject(false);
            console.log(err);
          });

        }
      );
    });
  }


  /**
   * Updates the route list
   * 
   * @private
   * @param {any} resolve 
   * 
   * @memberOf ApiProvider
   */
  private _updateStops(resolve): void {

    this.storage.get('routes').then(routes => {
      routes.forEach(route => {
        let id = route['id'];
        this.http.get(this.baseUrl + 'agencies/ttc/routes/' + id).map(res => res.json()).subscribe(
          data => {
            this.storage.set(id, data)
              .then(value => console.log('successfully set value'))
              .catch(err => console.log(err))

          },
          err => console.log(err),
          () => {
            console.log('done getting ' + id);
            if (id === '514') { resolve(true); }
          }
        );
      });
    }).catch(err => console.log(err));
  }


  /**
   * Gets a list of routes
   * 
   * @returns {Promise<Array<Object>>} 
   * 
   * @memberOf ApiProvider
   */
  public getRoutes(): Promise<Array<Object>> {
    return this.storage.get('routes');
  }


  /**
   * Returns a promise with an array of directions
   * 
   * @param {string} id 
   * @returns {Promise<Set<string>>} 
   * 
   * @memberOf ApiProvider
   */
  public getDirection(id:string): Promise<Array<string>> {
    return new Promise<Array<string>>((resolve, reject)=>{
      this.storage.get(id).then(route =>{
        let dirMap:Set<string> = new Set<string>();
        route.directions.forEach(direction => {
          dirMap.add(direction['shortTitle']);
        });
        resolve(Array.from(dirMap));
      });
    });
  }


}
