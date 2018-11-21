import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SqlManagerProvider } from '../../providers/sql-manager/sql-manager';
import { CobroFacturaPage } from '../cobro-factura/cobro-factura';

/**
 * Generated class for the PrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

  public listaClientes:any[]=[]

  constructor(private modal:ModalController,private sqlMan:SqlManagerProvider ,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.agruparDatosFacturas();
  }

  async agruparDatosFacturas(){
    this.listaClientes = await this.sqlMan.selectGrupCliente();
    console.log(this.listaClientes);
    //Ordenacion
    for (let i = 0; i < this.listaClientes .length; i++) {
      for (let j = i+1; j < this.listaClientes.length; j++) {
        if(this.listaClientes[i].Saldo < this.listaClientes[j].Saldo){
          let temp = this.listaClientes[i];
          this.listaClientes [i] = this.listaClientes[j];
          this.listaClientes[j] = temp;
        }
      }
    }
  }

  goDetalleCobro(dataRow){
    let ventanaCobro = this.modal.create(CobroFacturaPage,{data:dataRow});
    ventanaCobro.present();
  }

}
