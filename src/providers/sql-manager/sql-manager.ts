import { Injectable } from '@angular/core';
import { createConnection, ConnectionOptions, getConnectionManager, Connection } from 'ionic-orm';
import { CtasCobrar } from '../../Estructuras/CtasCobrar';
import { VentasPendientes } from '../../Estructuras/VentasPendientes';

@Injectable()
export class SqlManagerProvider {

  public conexion:Connection;
  private nameServer:string="default";  // NO TOCAR EL NOMBRE - YA ES POR DEFECTO
  private nameBD="bdEvinDemostracion";
  public isCone:boolean=false;

  constructor() {
  }

  private async crearSQLLite(){

    let tablas = [
      CtasCobrar,
      VentasPendientes
    ]

    let conexion:ConnectionOptions = {
      driver: {
        type: "websql",
        database: this.nameBD
      },
      entities: tablas,
      logging: {
        logFailedQueryError: true,
        logQueries: true,
        logSchemaCreation: true,
        logOnlyFailedQueries: true
      },
      autoSchemaSync: true
    }
    return conexion;
  }

  private async crearConexion(){
    return createConnection(await this.crearSQLLite()).then(async con =>{
      this.conexion = con;
      this.isCone=true;
      return true;
    }).catch(async error =>{
      this.isCone=false;
      return false
    })
  }

  public async abrirConexion(){
    let s:any = await getConnectionManager();
    if(s.connections.length === 0){
      return await this.crearConexion().then(res=>{        
        return true;
      }).catch(error=>{
        console.log(error)
        return false;
      })
    }else{
      console.log("Error de conexion");
      return false;            
    }

  }

}
