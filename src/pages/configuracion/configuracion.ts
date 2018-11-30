import { ArchivoProvider } from './../../providers/archivo/archivo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Configuracion } from '../../Estructuras/Configuracion';
import { SqlManagerProvider } from '../../providers/sql-manager/sql-manager';
import { ConexionHttpProvider } from '../../providers/conexion-http/conexion-http';
import { ShowProvider } from '../../providers/show/show';
import { CamposDatos } from '../../app/app.config';

/**
 * Generated class for the ConfiguracionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {

  public EstadoVF:any={Estado:true};
  public EstadoMC:any={Estado:true};
  public fechaSincro:any = { Objeto:"" };
  private DirServe:any;
  private Config:Configuracion[];
  public IP:any="";
  public Puerto:any="";
  public isDisabled=false;
  public isDisabledTog:boolean;

  constructor(private app:App,private show:ShowProvider,private con:ConexionHttpProvider,public sqlman:SqlManagerProvider,public navCtrl: NavController, public navParams: NavParams) {

  }

  async ionViewDidLoad() {    
    this.fechaSincro =  (await this.sqlman.selectData("Configuracion","C",'C.Tipo == "fechaUpdate"'))[0]
    this.EstadoMC =     (await this.sqlman.selectData("Configuracion","C",'C.Tipo == "montoPagoCobrar"'))[0]     
    this.DirServe =     (await this.sqlman.selectData("Configuracion","C",'C.Tipo == "conexionStandar"'))[0]   
    let temp:any[] =           await this.sqlman.selectData("Usuarios","U",'U.isLogin='+true);
    console.log(temp);
    if( temp.length === 0 ){
      this.isDisabled=true;
    }else{
      this.isDisabled=false;
    }
    if(this.fechaSincro.Objeto === undefined || this.fechaSincro.Objeto === null){
      this.fechaSincro.Objeto = {};
    }         
    
    const dirCompleta:string = this.DirServe.Objeto.substring(7,this.DirServe.Objeto.length);
    this.IP = dirCompleta.split(" ")[0]
    this.Puerto = dirCompleta.split(" ")[1]
  }
  
  ionViewWillLeave() {
    this.sqlman.insertarDatos("Configuracion",this.EstadoVF);   
    this.sqlman.insertarDatos("Configuracion",this.EstadoMC);   
  }

  subirInformacion(){
    console.log("Click")
    /*
    this.show.detenerTiempo("Registrando Informacion");
    this.sqlman.selectData("CtasCobrar","CTA","CTA.saveMovil==true").then((selCtas)=>{
      this.show.changeContentLoading("Guardando Pagos Realizados");
      this.con.setCtsCobrar(selCtas).then((countInsertar)=>{ 
        if(this.con.isOnline){
          this.show.changeContentLoading("Actualizando Informacion 1/2")
          this.sqlman.selectData("Facturas","F").then((selFactura)=>{
            this.sqlman.eliminarData("CtasCobrar",selCtas).then(()=>{
              this.sqlman.eliminarData("Facturas",selFactura).then(()=>{
                this.con.getFacturas().then(resultFactura=>{
                  this.sqlman.insertarDatos("Facturas",resultFactura).then(()=>{
                    let IDFV_min=1000000;
                    for (let i = 0; i < resultFactura.length; i++) {
                      const element = resultFactura[i];
                      if(IDFV_min.valueOf()>element.IDFV.valueOf())            {
                        IDFV_min = element.IDFV;
                      }
                    }
                    this.show.changeContentLoading("Actualizando Informacion 2/2")
                    this.con.getCtaCobrar(IDFV_min).then(resultCtaCobrar=>{
                      this.sqlman.insertarDatos("CtasCobrar",resultCtaCobrar).then(()=>{
                        this.fechaSincro.Objeto = new Date().toLocaleString();
                        this.sqlman.insertarDatos("Configuracion",this.fechaSincro);                   
                        this.show.continuarTiempo();
                        this.show.showToast("Sincronizacion completa");
                      });       
                    });
                  });  
                });
              })
            })
          });
        }else{
          this.show.continuarTiempo();
          this.show.showToast("No se tiene acceso al servidor, intentelo mas tarde o verifique su direccion");
        }
        
      })
    })    
    */
  }

  async guardarDatos(){    
    /*http://buhocorp.com/api/cobros_aldebaran/pruebas*/
    if(!this.isDisabledTog){
      this.DirServe.Objeto = "http://"+this.IP
    }else{
      this.DirServe.Objeto = "http://"+this.IP+":"+this.Puerto
    }    
    this.sqlman.insertarDatos("Configuracion",this.DirServe);
    this.con.dirServer = await this.DirServe.Objeto;
    this.app.goBack();
  }
}
