import { Injectable } from '@angular/core';
import { Http, RequestOptions, ResponseContentType, Headers, RequestMethod } from '@angular/http';
import { uriAPI } from './rutas';

@Injectable()
export class ConexionHttpProvider {

  private opciones:RequestOptions;
  private dirServer:string="";
  public metodo:string;               //-- Metodo de solicitud realizado
  public codigo:number;               //-- codigo HTTP estandar.
  public mensaje:string;              //-- Mensaje correspondiente al codigo HTPP .  
  public isOnline:boolean = true;;

  constructor(public http: Http) {
    
  }

  cambiarDirServer(URI:string){    
    this.dirServer = URI;
  }

  llenarDatosRespons(respuesta:any){
    this.mensaje = respuesta.statusText;
    this.codigo = respuesta.status;    
    if(!respuesta.ok){
      if(this.codigo==0){
        console.log("Sin señal")
      }else{
        console.log("Error")
      }
    }
    return respuesta._body;
  }

  async getFacturas(){
    try{      
        let respuesta = await this.http.get(this.dirServer+uriAPI.getFacturasCredito).toPromise();       
        this.isOnline=true;
        return JSON.parse(await this.llenarDatosRespons(respuesta));
    }catch{
      console.log("erro http")
      this.isOnline=false;
      return [];
    }    
  }

  async getCtaCobrar(IDFV){
    try{      
      let parametro = IDFV;
      let respuesta = await this.http.get(this.dirServer+uriAPI.getCtsPagarFactura+parametro).toPromise();
      this.isOnline=true;
      return JSON.parse(await this.llenarDatosRespons(respuesta));
    }catch{
      console.log("erro http")
      this.isOnline=false;
      return [];
    }    
  }

  async getUsuarios(){
    try{            
      let respuesta = await this.http.get(this.dirServer+uriAPI.getusuarios).toPromise();
      this.isOnline=true;
      return JSON.parse(await this.llenarDatosRespons(respuesta));
    }catch{
      console.log("erro http")
      this.isOnline=false;
      return [];
    }    
  }

  async setCtsCobrar(data:any){
    try{                 
      let respuesta = await this.http.post(this.dirServer+uriAPI.setCtasAll,data).toPromise();
      this.isOnline=true;
      return JSON.parse(await this.llenarDatosRespons(respuesta));
    }catch{
      console.log("erro http")
      this.isOnline=false;
      return [];
    }    
  }

}
