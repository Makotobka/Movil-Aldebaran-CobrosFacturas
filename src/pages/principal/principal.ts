import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SqlManagerProvider } from '../../providers/sql-manager/sql-manager';
import { CobroFacturaPage } from '../cobro-factura/cobro-factura';
import { LoginPage } from '../login/login';
import { Usuarios } from '../../Estructuras/Usuarios';
import { ConfiguracionPage } from '../configuracion/configuracion';
import { CtasCobrar } from '../../Estructuras/CtasCobrar';

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


  constructor(private modal:ModalController,private sqlMan:SqlManagerProvider ,public navCtrl: NavController, public navParams: NavParams) {
    
  }

  async ionViewDidLoad() {
    let listaCobrado = await this.sqlMan.selectData("CtasCobrar","CTA","CTA.saveMovil==true");
    let listaFacturas=[];
    for (let i = 0; i < listaCobrado.length; i++) {
      const element:any = listaCobrado[i];
      listaFacturas.push((await this.sqlMan.selectData("Facturas","F","F.IDFV="+element.IDFV))[0])
    }
    let listaClientes = await this.unirClientes(listaFacturas);
    console.log(listaCobrado);
    console.log(listaFacturas);
    console.log(listaClientes);
  }

  private unirClientes(resData:any[]){
    let temp=[]
    for (let i = 0; i < resData.length; i++) {
      const element = resData[i];
      if(temp.length===0){
        temp.push({
          IDCT:element.IDCT,
          CLIENTE: element.CLIENTE,
          Saldo:element.Saldo,
          Total:element.Total
        })
      }else{
        let exist:boolean=false;
        for (let j = 0; j < temp.length; j++) {
          const item = temp[j];
          if(element.IDCT === item.IDCT){            
            item.Saldo=item.Saldo.valueOf()+element.Saldo.valueOf();
            item.Total=item.Total.valueOf()+element.Total.valueOf();
            exist=true;
            break;
          }          
        }
        if(!exist){
          temp.push({
            IDCT:element.IDCT,
            CLIENTE: element.CLIENTE,
            Saldo:element.Saldo,
            Total:element.Total
          })
        }
      }
    }
    return temp;
  }

}
