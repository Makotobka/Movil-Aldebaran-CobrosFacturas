import { Injectable } from '@angular/core';
import { Http, RequestOptions, ResponseContentType, Headers, RequestMethod } from '@angular/http';
import { dirCone } from '../../app/app.config';

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

  async getCaja(IDSU:number, EST:Boolean){
    try{
      if(this.isOnline){
        let parametros:string;        
        parametros +=IDSU+"/"+EST;
        let respuesta = await this.http.get(dirCone).toPromise();
        return await this.llenarDatosRespons(respuesta);
      }else{
        //Modo Fuera de Linea
        return null;
      }
    }catch{
      return [];
    }    
  }

}
