import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import {CarneProvider} from '../../providers/carne-provider'
import { Carne } from '../../models/carne'
import { ModalPage } from '../modal/modal';
import { CarneDetallesPage } from '../carne-detalles/carne-detalles';

@Component({
  selector: 'page-carnes',
  templateUrl: 'carnes.html',
  providers:[CarneProvider]
})


export class CarnesPage {

  carnes: Carne[];
  errorMessage:any;
 
  constructor(
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController, 
    private carneProvider: CarneProvider,
    public modalCtrl: ModalController) {}

  ionViewDidLoad() {
    console.log('Hello Carnes Page');
    this.getCarnes();
  }

  getCarnes() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.carneProvider.getCarnes()
    .subscribe(carnes => {
      this.carnes = carnes; 
      loading.dismiss();
    },  
    error =>  this.errorMessage = <any>error );
  }

  presentModal() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    let modal = this.modalCtrl.create(ModalPage);
    
    modal.present(); 
    
    modal.onDidDismiss(carne => {

      if(carne!=null){
          loading.present();
          this.carneProvider.addCarne(carne)
          .subscribe(
            carne  =>{
              this.carnes.unshift(carne);
              loading.dismiss();
            },
            error =>  this.errorMessage = <any>error,
            ()=>{
              setTimeout(() => this.oksave(), 250);
            }
 
           );    
      }

    }); 

  }

  oksave(){
    //aca va el toast
  }


  goToDetalles(event, id){
    this.navCtrl.push(CarneDetallesPage,{
      id:id
    });
  }

   sendData(){
    //send data
    console.log("send data")

  }

}
