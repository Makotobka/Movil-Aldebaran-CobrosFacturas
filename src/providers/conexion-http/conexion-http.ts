import { Injectable } from '@angular/core';
import { Http, RequestOptions, ResponseContentType, Headers, RequestMethod } from '@angular/http';
import { dirServer, uriAPI } from './rutas';

@Injectable()
export class ConexionHttpProvider {

  private opciones:RequestOptions;
  public metodo:string;               //-- Metodo de solicitud realizado
  public codigo:number;               //-- codigo HTTP estandar.
  public mensaje:string;              //-- Mensaje correspondiente al codigo HTPP .  
  public isOnline;

  constructor(public http: Http) {
    
  }

  llenarDatosRespons(respuesta:any){
    //this.data = respuesta._body;
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
        let respuesta = await this.http.get(dirServer+uriAPI.getFacturasCredito).toPromise();
        return JSON.parse(await this.llenarDatosRespons(respuesta));
    }catch{
      console.log("erro http")
      return [];
    }    
  }

  async getCtaCobrar(IDFV){
    try{      
      let parametro = IDFV;
      let respuesta = await this.http.get(dirServer+uriAPI.getCtsPagarFactura+parametro).toPromise();
      return JSON.parse(await this.llenarDatosRespons(respuesta));
    }catch{
      console.log("erro http")
      return [];
    }    
  }

  async getUsuarios(){
    try{            
      let respuesta = await this.http.get(dirServer+uriAPI.getusuarios).toPromise();
      return JSON.parse(await this.llenarDatosRespons(respuesta));
    }catch{
      console.log("erro http")
      return [];
    }    
  }

}
