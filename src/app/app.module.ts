import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConexionHttpProvider } from '../providers/conexion-http/conexion-http';
import { SqlManagerProvider } from '../providers/sql-manager/sql-manager';
import { paginas } from './app.page';
import { importaciones } from './app.importaciones';
import { proveedores } from './app.provedores';
import { SeguridadProvider } from '../providers/seguridad/seguridad';
import { ShowProvider } from '../providers/show/show';
import { ArchivoProvider } from '../providers/archivo/archivo';
import { IonicStorageModule } from '@ionic/storage';
import { staticConfigStorage } from './app.config';

@NgModule({
  declarations: [
   paginas
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(staticConfigStorage),
    importaciones
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    paginas
  ],
  providers: [
    proveedores,
    ArchivoProvider
  ]
})
export class AppModule {}
