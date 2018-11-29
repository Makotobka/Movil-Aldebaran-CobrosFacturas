import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SqlManagerProvider } from '../../providers/sql-manager/sql-manager';
import { CobroFacturaPage } from '../cobro-factura/cobro-factura';
import { LoginPage } from '../login/login';
import { Usuarios } from '../../Estructuras/Usuarios';
import { ConfiguracionPage } from '../configuracion/configuracion';
import { PrincipalPage } from '../principal/principal';
import { ShowProvider } from '../../providers/show/show';

@IonicPage()
@Component({
  selector: 'page-lista-cobros',
  templateUrl: 'lista-cobros.html',
})
export class ListaCobrosPage {

  public listaClientes:any[]=[];
  public listaFiltro:any[]=[];
  public FraseFiltro:string;

  constructor( private show:ShowProvider,private modal:ModalController,private sqlMan:SqlManagerProvider ,public navCtrl: NavController, public navParams: NavParams) {
    
  }

  async ionViewDidLoad() {
    let isFacCero:any = (await this.sqlMan.selectData("Configuracion","C",'C.Tipo="VerFacturasCero"'))[0];  
    this.listaClientes = await this.sqlMan.selectGrupCliente(isFacCero.Estado);
    this.listaFiltro = await JSON.parse(JSON.stringify(this.listaClientes));  
    this.ordernarLista();  
  }

  goDetalleCobro(dataRow){
    let ventanaCobro = this.modal.create(CobroFacturaPage,{data:dataRow});
    ventanaCobro.present();
    ventanaCobro.onDidDismiss(()=>{
      this.FraseFiltro=undefined;
      this.ionViewDidLoad();
    })
  }

  goPrincipal(){
    this.navCtrl.setRoot(PrincipalPage);
  }

  

  async opciones(){
    let EstadoVF:any = (await this.sqlMan.selectData("Configuracion","C",'C.Tipo = "VerFacturasCero"'))[0]
    console.log(EstadoVF)
    let Botones:any[]=[];
    if(!EstadoVF.Estado){
      Botones= await [
        {
          text: 'Activar Vista Facturas 0',
          icon: "radio-button-off",
          handler: () => {
            EstadoVF.Estado = !EstadoVF.Estado;
            this.sqlMan.insertarDatos("Configuracion",EstadoVF).then(()=>{
              this.ionViewDidLoad();
            })
            
          }
        }
      ]
    }else{
      Botones= await [
        {
          text: 'Desactivar Vista Facturas 0',
          icon: "radio-button-on",
          handler: () => {
            EstadoVF.Estado = !EstadoVF.Estado;
            this.sqlMan.insertarDatos("Configuracion",EstadoVF).then(()=>{
              this.ionViewDidLoad();
            })
          }
        }
      ]
    }
    this.show.showAccionSheet("Opciones",Botones);
  }

  onInput(event){
    
    if(this.FraseFiltro!=="" && this.FraseFiltro!==undefined){
      let val = this.FraseFiltro
      this.listaFiltro = this.listaClientes.filter(function(item) {
        return item.CLIENTE.toLowerCase().includes(val.toLowerCase());
      });
    }else{
      this.listaFiltro = JSON.parse(JSON.stringify(this.listaClientes));
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
