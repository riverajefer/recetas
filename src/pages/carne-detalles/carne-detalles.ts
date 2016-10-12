import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController  } from 'ionic-angular';
import { CarneProvider } from '../../providers/carne-provider';
import {Carne} from '../../models/carne'

@Component({
  templateUrl: 'carne-detalles.html',
  providers: [CarneProvider]
})
export class CarneDetallesPage {

  carne: Carne = new Carne;	
  id: number;
  errorMessage: any = null;

  constructor(
    private navCtrl: NavController, 
    navParams: NavParams, 
    private carneProvider:CarneProvider, 
    public loadingCtrl: LoadingController){

  	this.id = navParams.get('id');
    this.getDetalles()
  }

  getDetalles(){

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      this.carneProvider.loadDetalles(this.id)
      .subscribe(carne => {
        this.carne = carne;
        console.log(this.carne) 
        loading.dismiss();
      },  
      error =>  this.errorMessage = <any>error );
  }

}
