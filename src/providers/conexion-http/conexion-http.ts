import { Injectable } from '@angular/core';
import { Http, RequestOptions, ResponseContentType, Headers, RequestMethod } from '@angular/http';
import { uriAPI } from './rutas';
import { splitDepsDsl } from '@angular/core/src/view/util';

@Injectable()
export class ConexionHttpProvider {

  private opciones:RequestOptions;
  public dirServer:string="";
  public metodo:string;               //-- Metodo de solicitud realizado
  public codigo:number;               //-- codigo HTTP estandar.
  public mensaje:string;              //-- Mensaje correspondiente al codigo HTPP .  
  public isOnline:boolean = true;;

  constructor(public http: Http) {
    
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
      const ipser = this.dirServer+uriAPI.getFacturasCredito
      const respuesta = await this.http.get(ipser).toPromise();       
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
      const parametro = IDFV;
      const respuesta = await this.http.get(this.dirServer+uriAPI.getCtsPagarFactura+parametro).toPromise();
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
      const respuesta = await this.http.get(this.dirServer+uriAPI.getusuarios).toPromise();
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
      const ipser = this.dirServer+uriAPI.setCtasAll 
      const respuesta = await this.http.post(ipser,data).toPromise();
      this.isOnline=true;
      return JSON.parse(await this.llenarDatosRespons(respuesta));
    }catch{
      console.log("erro http")
      this.isOnline=false;
      return [];
    }    
  }

}
