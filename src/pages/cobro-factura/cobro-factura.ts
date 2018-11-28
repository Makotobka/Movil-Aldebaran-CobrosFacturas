import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';
import { SqlManagerProvider } from '../../providers/sql-manager/sql-manager';
import { Facturas } from '../../Estructuras/Facturas';
import { DetalleFacturaPage } from '../detalle-factura/detalle-factura';

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
  public datalistView:any=[];
  public listaFiltro:any[]=[];
  public FraseFiltro:string;

  constructor(private modal:ModalController,private sqlMan:SqlManagerProvider,public navCtrl: NavController, public navParams: NavParams,public app:App) {
    this.dataCliente = this.navParams.get("data");
    
  }

  async ionViewDidLoad() {
    this.listaFactura = await this.sqlMan.selectFacCliente(this.dataCliente.IDCT);
    this.listaFiltro = await JSON.parse(JSON.stringify(this.listaFactura));
    this.datalistView = this.listaFactura[0];
    this.ordernarLista();
  }

  goDetalleCobro(Factura){
    let ventana = this.modal.create(DetalleFacturaPage,{Fact:Factura})
    ventana.present();
    ventana.onDidDismiss(()=>{
        this.ionViewDidLoad();   
    })
  }

  onInput(event){
    
    if(this.FraseFiltro!=="" && this.FraseFiltro!==undefined){
      let val = this.FraseFiltro
      this.listaFiltro = this.listaFactura.filter(function(item) {
        return item.Numero.toLowerCase().includes(val.toLowerCase());
      });
    }else{
      this.listaFiltro = JSON.parse(JSON.stringify(this.listaFactura));
    }
    this.ordernarLista();

  }

  ordernarLista(){
    for (let i = 0; i < this.listaFiltro .length; i++) {
      for (let j = i+1; j < this.listaFiltro.length; j++) {
        if(this.listaFiltro[i].Total < this.listaFiltro[j].Total){
          let temp = this.listaFiltro[i];
          this.listaFiltro [i] = this.listaFiltro[j];
          this.listaFiltro[j] = temp;
        }
      }
    }    
  }


}
