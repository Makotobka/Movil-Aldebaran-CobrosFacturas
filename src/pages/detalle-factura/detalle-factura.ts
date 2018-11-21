import { CtasCobrar } from './../../Estructuras/CtasCobrar';
import { SqlManagerProvider } from './../../providers/sql-manager/sql-manager';
import { Facturas } from './../../Estructuras/Facturas';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetalleFacturaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-factura',
  templateUrl: 'detalle-factura.html',
})
export class DetalleFacturaPage {

  public Factura:Facturas
  public ListaCobros:CtasCobrar[];

  constructor(private sqlman:SqlManagerProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.Factura = this.navParams.get("Fact");
    console.log(this.Factura);
  }

  async ionViewDidLoad() {
    this.ListaCobros = await this.sqlman.selectDetalleCobro(this.Factura.IDFV);
    console.log(this.ListaCobros);
  }

}
