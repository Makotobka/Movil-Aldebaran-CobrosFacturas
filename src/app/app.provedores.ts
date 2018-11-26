import { ArchivoProvider } from './../providers/archivo/archivo';
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ErrorHandler, NgModule } from '@angular/core';
import { ConexionHttpProvider } from "../providers/conexion-http/conexion-http";
import { SqlManagerProvider } from "../providers/sql-manager/sql-manager";
import { SeguridadProvider } from "../providers/seguridad/seguridad";
import { ShowProvider } from "../providers/show/show";

export const proveedores = [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConexionHttpProvider,
    SqlManagerProvider,    
    SeguridadProvider,
    ShowProvider,
    ArchivoProvider
]