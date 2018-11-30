import { Injectable } from '@angular/core';
import { createConnection, ConnectionOptions, getConnectionManager, Connection } from 'ionic-orm';
import { CtasCobrar } from '../../Estructuras/CtasCobrar';
import { Facturas } from '../../Estructuras/Facturas';
import { Alias } from 'ionic-orm/dist/src/query-builder/alias/Alias';
import { Usuarios } from '../../Estructuras/Usuarios';
import { Configuracion } from '../../Estructuras/Configuracion';
@Injectable()
export class SqlManagerProvider {

  public conexion:Connection;
  public nameBD="bdCobros.3";
  public isCone:boolean=false;
  private tablas;

  constructor() {
  }

  private async crearSQLLite(){
    this.tablas = [
      Usuarios,
      Facturas,
      CtasCobrar,
      Configuracion
    ]

    let conexion:ConnectionOptions = {
      driver: {
        type: "websql",
        database: this.nameBD
      },
      entities: this.tablas,
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

  public async insertarDatos(Tabla:any,data:any){
    let repFacturas = this.conexion.getRepository(Tabla);
    return await repFacturas.persist(data);
  }

  public async selectGrupCliente(estado:boolean){
    let repFacturas = this.conexion.getRepository(Facturas);
    let resData:Facturas[];
    if(estado){
      resData = await repFacturas.createQueryBuilder("F").getResults();
    }else{
      resData = await repFacturas.createQueryBuilder("F").where("F.Saldo>0").getResults();
    }    
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

  public async selectFacCliente(Id_Cliente){
    let repFacturas = this.conexion.getRepository(Facturas);
    return await repFacturas.createQueryBuilder("F").where("F.IDCT=:idcli",{idcli:Id_Cliente}).getResults();
  }

  public async selectDetalleCobro(ID_Factura){
    let repCtasCobrar = this.conexion.getRepository(CtasCobrar);
    return await repCtasCobrar.createQueryBuilder("CC").where("CC.IDFV=:id",{id:ID_Factura}).getResults();
  }

  public async selectData (Tabla:any,AliasTabla:string, where?:string){
    if(where===undefined){
      let repositorio = this.conexion.getRepository(Tabla);
    return await repositorio.createQueryBuilder(AliasTabla).getResults();
    }else{
      let repositorio = this.conexion.getRepository(Tabla);
      return await repositorio.createQueryBuilder(AliasTabla).where(where).getResults();
    }
  }

  public async eliminarData(Tabla:any,registro:any){
    let repositorio = this.conexion.getRepository(Tabla);    
    return await repositorio.remove(registro);
  }
}
