import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Carne } from '../models/carne'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class CarneProvider {

  carnes: any = null;
  URL:string = 'https://blooming-retreat-58545.herokuapp.com/carne';

  constructor(public http: Http) {
    console.log('Hello CarneProvider Provider');
  }

  getCarnes():Observable<Carne[]>{
    if(this.carnes){
      return Observable.of(this.carnes);
    }
    return this.http.get(this.URL).map(this.extractData).catch(this.handleError);
  }

  addCarne(carne:Object): Observable<Carne> {
    return this.http.post(this.URL, carne).map(this.extractData).catch(this.handleError);
  }

  findByID(id:number):Observable<Carne>{
      return this.http.get(this.URL+'/'+id).map(this.extractData).catch(this.handleError);
  }

  updateCarne(id:number, carne:Object): Observable<Carne> {
    return this.http.post(this.URL+'/'+id, carne).map(this.extractData).catch(this.handleError);
  }  

  private extractData(res: Response){
      let body = res.json();
      return body.data || {};
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}


