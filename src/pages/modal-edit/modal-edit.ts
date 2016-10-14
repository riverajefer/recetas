import { Component } from '@angular/core';
import { NavController, ViewController, NavParams  } from 'ionic-angular';
import { CarneProvider } from '../../providers/carne-provider';
import { Carne } from '../../models/carne'

@Component({
  selector: 'page-modal-edit',
  templateUrl: 'modal-edit.html',
  providers: [CarneProvider]
})

export class ModalEdit {

  errorMessage: any = null;
  modelCarne: Carne = new Carne;
  id:any;

  constructor(public navCtrl: NavController,
  public viewCtrl: ViewController, 
  private carneProvider:CarneProvider,
  params: NavParams){
    this.id = params.get('idCarne');
    this.start()
  }

  ionViewDidLoad() {
    console.log('Hello ModalEdit Page');
  }

  start(){
    this.carneProvider.findByID(this.id).subscribe(
      carne => { this.modelCarne = carne; },  
      error => this.errorMessage = <any> error 
    );   
  }

  cerrar() {
   this.viewCtrl.dismiss(this.modelCarne); 
  }

  Edit(){
    this.carneProvider.updateCarne(this.id, this.modelCarne).subscribe(
      carne =>{this.modelCarne = carne; },  
      error => this.errorMessage = <any>error 
      );
    this.cerrar()
  }

}
