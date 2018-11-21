import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SqlManagerProvider } from '../../providers/sql-manager/sql-manager';
import { ConexionHttpProvider } from '../../providers/conexion-http/conexion-http';
import { PrincipalPage } from '../principal/principal';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private con:ConexionHttpProvider ,private sqlMan:SqlManagerProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.sqlMan.abrirConexion().then((res)=>{
      this.descargarInsertar();      
    })
  }

  descargarInsertar(){
    this.con.getFacturas().then(resFac=>{
      this.sqlMan.insertarDatos("Facturas",resFac).then(()=>{
        this.con.getCtaCobrar().then(resCtaCobrar=>{
          console.log(resCtaCobrar);
          this.sqlMan.insertarDatos("CtasCobrar",resCtaCobrar).then(()=>{
            this.goPrincipal();
          })
        })
      });
    })
  }

  goPrincipal(){
    this.navCtrl.setRoot(PrincipalPage);
  }

}
