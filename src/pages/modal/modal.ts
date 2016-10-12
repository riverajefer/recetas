import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Carne } from '../../models/carne';

@Component({
  templateUrl: 'modal.html',
})
export class ModalPage {

  newCarne: Carne = new Carne();

  constructor(private navCtrl: NavController,  
  	public viewCtrl: ViewController){

    this.newCarne.id = 5;
    this.newCarne.titulo = "Jamon ok 8";
    this.newCarne.descripcion = "Lorem ipsum dolor sit amet";
    this.newCarne.valor = 3;
  }

  addNow(event){
    event.preventDefault();
    this.dismiss(this.newCarne);
  }

  dismiss(envioCarne:Carne) {
    this.viewCtrl.dismiss(envioCarne);
  }

  cerrar() {
   this.viewCtrl.dismiss(null); 
  }

}
