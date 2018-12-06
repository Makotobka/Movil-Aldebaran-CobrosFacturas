import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, ModalController,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ListaCobrosPage } from '../pages/lista-cobros/lista-cobros';
import { CobroFacturaPage } from '../pages/cobro-factura/cobro-factura';
import { ConfiguracionPage } from '../pages/configuracion/configuracion';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any = LoginPage;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public modal:ModalController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goCobros(){
    this.nav.push(ListaCobrosPage);
  }

  goConfiguracion(){
    this.nav.push(ConfiguracionPage);
  }
}

