import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Configuracion } from '../../Estructuras/Configuracion';
import { SqlManagerProvider } from '../../providers/sql-manager/sql-manager';
import { ConexionHttpProvider } from '../../providers/conexion-http/conexion-http';
import { ShowProvider } from '../../providers/show/show';

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

  public isHabiFac={
    Estado:true
  };
  private Config:Configuracion[];

  constructor(private show:ShowProvider,private con:ConexionHttpProvider,private sqlman:SqlManagerProvider,public navCtrl: NavController, public navParams: NavParams) {

  }

  async ionViewDidLoad() {
    await this.sqlman.selectData("Configuracion","CONF",'CONF.Tipo="VerFacturasCero"').then(res=>{
      this.isHabiFac = res[0];
    })
    
  }
  
  ionViewWillLeave() {
    this.sqlman.insertarDatos("Configuracion",this.isHabiFac);
  }

  subirInformacion(){
    this.show.detenerTiempo("Registrando Informacion");
    this.sqlman.selectData("CtasCobrar","CTA","CTA.saveMovil==true").then((selCtas)=>{
      this.show.changeContentLoading("Guardando Pagos Realizados");
      this.con.setCtsCobrar(selCtas).then((countInsertar)=>{      
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
                      this.show.continuarTiempo();
                    });       
                  });
                });  
              });
            })
          })
        });
      })
    })    
  }


}
