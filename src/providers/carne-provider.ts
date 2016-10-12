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

  addCarne (carne:Object): Observable<Carne> {
    return this.http.post(this.URL, carne)
    .map(this.extractDataAdd)
    .catch(this.handleError);
  }

  private extractDataAdd(res: Response) {
    let body = res.json();
    return body || { };
  }  

  private extractData(res: Response){
      let body = res.json();
      this.carnes = body.data;
      return body.data || {};
  }

  private extractDataD(res: Response){
      let body = res.json();
      console.log(body)
      console.log(body.data)
      return body.data || {};
  }

  loadDetalles(id:number):Observable<Carne>{
      return this.http.get(this.URL+'/'+id).map(this.extractDataAdd).catch(this.handleError);
  }

  loadDetallesw(id:number){

    return new Promise<Carne>(resolve =>{
      
      this.http.get(this.URL+'/'+id)
      .map(res => <Carne>(res.json()))
      .subscribe(carne=>{
        resolve(carne);
        },
		    function(error) { console.log("Error happened" + error)},
		    function() { 
          console.log("the subscription is completed"); 
        }
      );
    });
  }



  loadDetalles2(id:number){

    return new Promise<Carne>(resolve =>{

      this.http.get(this.URL+'/'+id)
      .map(res => <Carne>(res.json()))
      .subscribe(carne=>{
        resolve(carne);
        },
		    function(error) { console.log("Error happened" + error)},
		    function() { 
          console.log("the subscription is completed"); 
        }
      );
    });
  }




  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }


}


