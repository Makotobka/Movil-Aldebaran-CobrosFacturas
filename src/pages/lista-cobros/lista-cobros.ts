import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SqlManagerProvider } from '../../providers/sql-manager/sql-manager';
import { CobroFacturaPage } from '../cobro-factura/cobro-factura';
import { LoginPage } from '../login/login';
import { Usuarios } from '../../Estructuras/Usuarios';
import { ConfiguracionPage } from '../configuracion/configuracion';

@IonicPage()
@Component({
  selector: 'page-lista-cobros',
  templateUrl: 'lista-cobros.html',
})
export class ListaCobrosPage {

  public listaClientes:any[]=[];
  public listaFiltro:any[]=[];
  public FraseFiltro:string;

  constructor(private modal:ModalController,private sqlMan:SqlManagerProvider ,public navCtrl: NavController, public navParams: NavParams) {
    
  }

  async ionViewDidLoad() {
    let isFacCero = await this.sqlMan.selectData("Configuracion","CONF",'CONF.Tipo="VerFacturasCero"');  
    console.log("<=>",isFacCero)
    this.listaClientes = await this.sqlMan.selectGrupCliente(isFacCero[0].Estado);
    if(this.FraseFiltro!=="" && this.FraseFiltro!==undefined){
      let val = this.FraseFiltro
      this.listaClientes = this.listaClientes.filter(function(item) {
        return item.CLIENTE.toLowerCase().includes(val.toLowerCase());
      });
    }
    this.listaFiltro = JSON.parse(JSON.stringify(this.listaClientes));
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

  goDetalleCobro(dataRow){
    let ventanaCobro = this.modal.create(CobroFacturaPage,{data:dataRow});
    ventanaCobro.present();
    ventanaCobro.onDidDismiss(()=>{
      this.FraseFiltro=undefined;
      this.ionViewDidLoad();
    })
  }

  logout(){    
    this.sqlMan.selectData("Usuarios","U",'U.isLogin='+true).then((res)=>{      
      res[0].isLogin=false;
      this.sqlMan.insertarDatos("Usuarios",res[0]);
      this.navCtrl.setRoot(LoginPage);
    });
  }

  goConfiguracion(){
    let ventana = this.modal.create(ConfiguracionPage);
    ventana.present();
    ventana.onDidDismiss(()=>{
      this.FraseFiltro=undefined;
      this.ionViewDidLoad();
    })
  }

  onInput(event){
    this.ionViewDidLoad();
  }
}
