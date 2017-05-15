import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from "@ionic/storage";

@Injectable()
export class FavouriteProvider {

  constructor(private http: Http, private storage: Storage) {
    console.log('Hello FavouriteProvider Provider');
  }


  /**
   * Add to list of favorites
   * 
   * @param {number} route 
   * @param {string} title 
   * @param {number} code 
   * @param {number} id 
   * 
   * @memberof FavouriteProvider
   */
  public addToFavourites(route: number,direction:string, title: string, code: number, id: number): void {
    // FavouriteProvider
    this.storage.get('favourites')
      .then((favourites: Set<string>) => {

        if (favourites==null) {
          favourites = new Set<string>();
        }

        favourites.add(JSON.stringify(
          {
            'route': route,
            'direction': direction,
            'title': title,
            'code': code,
            'id': id
          }
        ));


        this.storage.set('favourites', favourites)
          .then(value => {
            console.log('set favourites');
          })
          .catch(err => {
            console.log('error with favourites');
            console.log(err);
          })


      })
      .catch(err => {
        console.log(err);
      });
  }


  /**
   * Removes an object from favourites
   * 
   * @param {number} id 
   * @returns {Promise<boolean>} 
   * 
   * @memberof FavouriteProvider
   */
  public removeFromFavourites(id: number):Promise<boolean> {
    return new Promise<boolean>((resolve, reject)=>{

    this.storage.get('favourites')
    .then((favourites: Set<string>)=>{
      if (favourites==null) {
        favourites = new Set<string>();
      }

      favourites.forEach(favourite => {
        if(JSON.parse(favourite)['id']===id){
          favourites.delete(favourite);
          console.log('removed' + JSON.stringify(favourite));
          return;
        }
      });

      this.storage.set('favourites',favourites)
      .then(value => {
        resolve(true);
      })
      .catch(err =>{
        console.log(err);
        reject(false);
      });
    })
    .catch(err => {
      reject(false);
    });
      
    });

  }

  /**
   * Gets an array of favourites objects
   * 
   * @returns {Promise<Object[]>} 
   * 
   * @memberof FavouriteProvider
   */
  public getAllFavourites():Promise<Object[]>{
    return new Promise<Object[]>((resolve, reject)=>{
      this.storage.get('favourites')
      .then((favourites: Set<String>) => {
        let favArr=[];
        
        Array.from(favourites).forEach((favourite:string)=>{
          favArr.push(JSON.parse(favourite));
        });

        resolve(favArr);
      })
      .catch(err =>{
        reject(err);
      })
    });
  }


  public removeAllFavourites():Promise<boolean>{
    return new Promise<boolean>((resolve, reject)=>{
      this.storage.set('favourites', new Set())
      .then(vaule =>{ resolve(true)})
      .catch(err =>{ reject(false)});
    });
  }





}
