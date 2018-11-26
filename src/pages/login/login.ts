import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SqlManagerProvider } from '../../providers/sql-manager/sql-manager';
import { ConexionHttpProvider } from '../../providers/conexion-http/conexion-http';
import { PrincipalPage } from '../principal/principal';
import { Facturas } from '../../Estructuras/Facturas';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Usuarios } from '../../Estructuras/Usuarios';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ShowProvider } from '../../providers/show/show';
import { SeguridadProvider } from '../../providers/seguridad/seguridad';

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

  formData = { customers_usuario: '', customers_password: '' };
  errorMessage = '';

  constructor(private seguridad:SeguridadProvider,private show:ShowProvider,private con:ConexionHttpProvider ,private sqlMan:SqlManagerProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {    
    this.sqlMan.abrirConexion().then(async (res)=>{      
      let counUser = await this.sqlMan.selectData("Usuarios","U");
      if(counUser.length === 0){
        this.descargarNecesario();
      }else{
        this.sqlMan.selectData("Usuarios","U",'U.isLogin='+true).then((res)=>{
          if(res.length>0){
            this.goPrincipal();
          }
        });
      }      
    })
  }

  descargarNecesario(){
    this.show.detenerTiempo("Descargar Usuarios");
    this.con.getUsuarios().then((resUsuario=>{
      this.sqlMan.insertarDatos("Usuarios",resUsuario).then(()=>{
        this.show.continuarTiempo();
      })
    }))      
  }

  descargarInsertar(isPrimeraVez:boolean){
    console.log(isPrimeraVez)
    if(isPrimeraVez){
      this.show.detenerTiempo("Descargar Facturas");
      this.con.getFacturas().then(resFac=>{
        this.show.changeContentLoading("Guardando Registros de Facturas")
        this.sqlMan.insertarDatos("Facturas",resFac).then(()=>{     
          this.sqlMan.selectData("Facturas","F").then((resSelecFac:Facturas[])=>{
            let IDFV_min=1000000;
            for (let i = 0; i < resSelecFac.length; i++) {
              const element = resSelecFac[i];
              if(IDFV_min.valueOf()>element.IDFV.valueOf())            {
                IDFV_min = element.IDFV;
              }
            }
            this.show.changeContentLoading("Descargando Cuentas por Cobrar")
            this.con.getCtaCobrar(IDFV_min).then(resCtaCobrar=>{
              this.show.changeContentLoading("Guardando Registros de Cuentas por Cobrar")
              this.sqlMan.insertarDatos("CtasCobrar",resCtaCobrar).then(()=>{              
                this.show.continuarTiempo();
                this.goPrincipal();
              })
            })          
          })  
        });
      })
    }else{
      this.goPrincipal();
    }
   
  }

  goPrincipal(){    
    this.navCtrl.setRoot(PrincipalPage);
  }

  login() {    
    this.errorMessage = '';
    this.sqlMan.selectData("Usuarios","U",'U.Login="'+this.formData.customers_usuario+'"').then((dataUser:Usuarios[])=>{
      if(dataUser.length===0){
        this.errorMessage='Usuario no existe'
      }else{
        let temp =this.seguridad.cifrarClave(this.formData.customers_password);
        if(temp === dataUser[0].Clave){
          dataUser[0].isLogin=true;
          //console.log("Entro")
          this.sqlMan.insertarDatos("Usuarios",dataUser).then(async ()=>{
            this.descargarInsertar(await this.valorDefecto());            
          });         
        }else{
          this.errorMessage='Contraseña Incorrecta'
        }
      }      
    })
    
  }

  async valorDefecto(){
    let conConf = await this.sqlMan.selectData("Configuracion","CONF")
    if(conConf.length === 0){
      this.sqlMan.insertarDatos("Configuracion",
      [
        {
          Tipo:"VerFacturasCero",
          Estado:false,
          Valor:0,
          Objeto:null
        },        {
          Tipo:"isPrimeraVez",
          Estado:false,
          Valor:0,
          Objeto:null
        },        {
          Tipo:"fechaUpdate",
          Estado:false,
          Valor:0,
          Objeto:null
        },{
          Tipo:"montoPagoCobrar",
          Estado:false,
          Valor:0,
          Objeto:null
        }
      ]
      );      
      return true;
    }else{
      return false;
    }
  }

}
