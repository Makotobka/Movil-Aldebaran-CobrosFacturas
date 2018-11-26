import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ArchivoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ArchivoProvider {

  constructor( private storage: Storage) {
  }

  async escribirArchivo(key:string, value:any){
    return this.storage.set(key, value);
  }

  async leerArchivo(key:string){
    let aux,temp;
    temp = await this.storage.get(key).then(async (val)=>{
      aux = await val
    }).catch((err)=>{
      console.log(err);
    })
    return aux;
  }

}
