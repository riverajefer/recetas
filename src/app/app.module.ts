import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { CarnesPage } from '../pages/carnes/carnes';
import { CarneDetallesPage } from '../pages/carne-detalles/carne-detalles';
import { ModalPage } from '../pages/modal/modal';
import { ModalEdit } from '../pages/modal-edit/modal-edit';
import { CarneProvider } from '../providers/carne-provider';


@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    CarnesPage,
    ModalPage,
    CarneDetallesPage,
    ModalEdit
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    CarnesPage,
    ModalPage,
    CarneDetallesPage,
    ModalEdit
  ],
  providers: [CarneProvider]
})
export class AppModule {}
