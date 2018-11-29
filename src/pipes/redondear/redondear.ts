import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the RedondearPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'redondear',
})


export class RedondearPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number,tipo: string) {
   if(tipo!==undefined){
    return this.isEntrero(value);
   }else{
    return this.isDecimal(value)
   }
  }

  isEntrero(value){
    if(value!=undefined && value!=null){      
      let numAux = Math.round(value * 100) / 100;
      let text=numAux.toString();
      return text.split(".")[0]
    }else{
      return 0;
    }
  }

  isDecimal(value){
    if(value!=undefined && value!=null){      
      let numAux = Math.round(value * 100) / 100;
      let text=numAux.toString();
      if(text.split(".").length>=2){
        if(text.split(".")[1].length>=2){    
          return numAux;
        }else{          
          return text+="0";
        }
      }else{
        return text+=".00";
      }      
    }else{
      return 0.00;
    }
  }
}
