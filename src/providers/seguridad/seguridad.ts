import { Injectable } from '@angular/core';
import {Md5} from "md5-typescript";

/*
  Generated class for the SeguridadProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SeguridadProvider {

  constructor() {    
  }

  cifrarClave(clave:string){    
    return Md5.init(clave);
  }

}
