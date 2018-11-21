import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SqlManagerProvider } from '../../providers/sql-manager/sql-manager';
import { Facturas } from '../../Estructuras/Facturas';

/**
 * Generated class for the CobroFacturaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cobro-factura',
  templateUrl: 'cobro-factura.html',
})
export class CobroFacturaPage {

  public dataCliente:any
  public listaFactura:Facturas[];

  constructor(private sqlMan:SqlManagerProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.dataCliente = this.navParams.get("data");
    
  }

  async ionViewDidLoad() {
    this.listaFactura = await this.sqlMan.selectFacCliente(this.dataCliente.IDCT);
    console.log(this.listaFactura)
    console.log(this.dataCliente)
  }

}
