import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Configuracion } from '../../Estructuras/Configuracion';
import { SqlManagerProvider } from '../../providers/sql-manager/sql-manager';

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

  constructor(private sqlman:SqlManagerProvider,public navCtrl: NavController, public navParams: NavParams) {

  }

  async ionViewDidLoad() {
    await this.sqlman.selectData("Configuracion","CONF",'CONF.Tipo="VerFacturasCero"').then(res=>{
      this.isHabiFac = res[0];
    })
    
  }

  
  ionViewWillLeave() {
    this.sqlman.insertarDatos("Configuracion",this.isHabiFac);
  }


}
