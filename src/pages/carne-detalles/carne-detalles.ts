import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController  } from 'ionic-angular';
import { CarneProvider } from '../../providers/carne-provider';
import { Carne } from '../../models/carne'
import { ModalEdit } from '../modal-edit/modal-edit';

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
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
    ){

  	this.id = navParams.get('id');
    this.getDetalles()
  }

  getDetalles(){

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();

      this.carneProvider.findByID(this.id)
      .subscribe(carne => {
        this.carne = carne;
        loading.dismiss();
      },  
      error =>  this.errorMessage = <any>error );
  }

  edit(){

    let modal = this.modalCtrl.create(ModalEdit, {idCarne: this.id});
    
    modal.onDidDismiss(carne => {
      if(carne!=null){
          this.carne = carne;
      }
    });

    modal.present();

  }
}

